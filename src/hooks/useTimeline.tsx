import { GraphQLClient, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { SHAMAN_GRAPH_ENDPOINT } from '../constants';
import { Claim, SummonShaman } from '../types/timeline';
import {
  isClaim,
  isClaimMetadata,
  isSummonShaman,
  isUpdateLock,
} from '../types/typeguards';
import { handleClaimMetadata, handleProjectMetadata } from '../utils/metadata';

const parseClaim = (claim: any): Claim => {
  return { ...claim, metadata: handleClaimMetadata(claim.metadata as string) };
};
const parseSummon = (summon: any): SummonShaman => {
  return {
    ...summon,
    metadata: handleProjectMetadata(summon.metadata as string),
  };
};

const parseEvents = (events: any) => {
  if (!Array.isArray(events))
    throw new Error('Did not receive an array of events');
  return events.map((event: any) => {
    if (isClaim(event)) {
      return parseClaim(event);
    }
    if (isUpdateLock(event)) {
      return event;
    }
    if (isSummonShaman(event)) {
      return parseSummon(event);
    }
  });
};

const fetchDAOTimeline = async (shamanAddress: string) => {
  const graphQLClient = new GraphQLClient(SHAMAN_GRAPH_ENDPOINT);
  const query = gql`
    query getTimeline($shamanAddress: String!) {
        timelineEvents(
        first: 20
        where: { shamanAddress: "${shamanAddress}" }
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

    return parseEvents(data?.timelineEvents);
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useTimeline = ({ shamanAddress }: { shamanAddress: string }) => {
  const { data, error, ...rest } = useQuery(`timeline-${shamanAddress}`, () =>
    fetchDAOTimeline(shamanAddress)
  );

  return { timeline: data, error: error as Error, ...rest };
};
