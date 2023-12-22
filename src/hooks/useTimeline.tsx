import { GraphQLClient, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { SHAMAN_GRAPH_ENDPOINT } from '../targetDAO';
import { Claim, TimelineEvent } from '../types/timeline';
import {
  isClaim,
  isEvent,
  isMutiny,
  isSummonShaman,
  isUpdateInterval,
  isUpdateLock,
  isUpdatePercs,
  isUpdateTPS,
} from '../types/typeguards';
import { handleClaimMetadata } from '../utils/metadata';

const parseClaim = (claim: any): Claim => {
  return { ...claim, metadata: handleClaimMetadata(claim.metadata as string) };
};

const parseEvents = (events: any) => {
  let hasUnknownEvents = false;
  let hasCorruptEvents = false;

  if (!Array.isArray(events))
    throw new Error('Did not receive an array of events');
  const parsedEvents = events.map((event: any) => {
    if (isClaim(event)) {
      return parseClaim(event);
    }
    if (isUpdateLock(event)) {
      return event;
    }
    if (isSummonShaman(event)) {
      return event;
    }
    if (isMutiny(event)) {
      return event;
    }
    if (isUpdateInterval(event)) {
      return event;
    }
    if (isUpdatePercs(event)) {
      return event;
    }
    if (isUpdateTPS(event)) {
      return event;
    }
    if (isEvent(event)) {
      console.warn(
        'Unhandled event: Data mismatch between subgraph event and client',
        event
      );
      hasUnknownEvents = true;
      return event;
    }
    console.error('Unhandled event: Could not parse event:', event);
    hasCorruptEvents = true;
    return undefined;
  });

  return {
    parsedEvents,
    hasUnknownEvents,
    hasCorruptEvents,
  };
};

const fetchDAOTimeline = async (shamanAddress: string) => {
  const graphQLClient = new GraphQLClient(SHAMAN_GRAPH_ENDPOINT);
  const query = gql`
    query getTimeline($shamanAddress: String!) {
        timelineEvents(
        # first: 100,
        where: { shamanAddress: "${shamanAddress}" },
        orderBy: createdAt,
        orderDirection: desc
      ) {
    id
    createdAt
    createdBy
    type
    shamanAddress
    metadata
    totalSecondsWorked
    sessionsTime
    sessionsValue
    totalAmountClaimed
    isLocked
    mutinyFrom
    mutinyTo
    updateTokenPerSecondTo
    updateTokenPerSecondFrom
    updatePercsFrom
    updatePercsTo
    updateIntervalTo
    updatePercsFrom
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query, {
      shamanAddress,
    });

    const parsed = parseEvents(data?.timelineEvents);
    return {
      parsedEvents: parsed.parsedEvents,
      hasUnknownEvents: parsed.hasUnknownEvents,
      hasCorruptEvents: parsed.hasCorruptEvents,
    };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useTimeline = ({ shamanAddress }: { shamanAddress: string }) => {
  const { data, error, ...rest } = useQuery(`timeline-${shamanAddress}`, () =>
    fetchDAOTimeline(shamanAddress)
  );

  return {
    timeline: data?.parsedEvents as TimelineEvent[] | undefined,
    error: error as Error | undefined,
    hasUnknownEvents: data?.hasUnknownEvents,
    hasCorruptEvents: data?.hasCorruptEvents,
    ...rest,
  };
};
