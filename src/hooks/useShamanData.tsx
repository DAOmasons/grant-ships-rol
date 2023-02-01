import React from 'react';
import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';
import { SHAMAN_GRAPH_ENDPOINT } from '../constants';
import { isShaman } from '../types/typeguards';
import { isJSON } from '@daohaus/utils';
import { ProjectMetadata } from '../types/timeline';
import { ShamanData } from '../types/shaman';

const parseData = (data: any): ShamanData => {
  if (isShaman(data)) {
    return isJSON(data.projectMetadata)
      ? {
          ...data,
          projectMetadata: JSON.parse(
            data.projectMetadata as string
          ) as ProjectMetadata,
        }
      : { ...data, projectMetadata: 'Corrupt' };
  }
  throw new Error('Data mismatch between subgraph Shaman entity and client');
};

const fetchCheckInV2data = async (shamanAddress: string) => {
  const graphQLClient = new GraphQLClient(SHAMAN_GRAPH_ENDPOINT);
  const query = gql`
    query getShamanData($shamanAddress: String!) {
      shamans(
        where: { address: "${shamanAddress}" },
      ) {
        id
        address
        createdAt
        summoner
        tokenPerSecond
        isLocked
        interval
        valueScalePercs
        teamLead
        projectMetadata
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query, {
      shamanAddress,
    });
    const parsed = parseData(data?.shamans[0]);
    return parsed;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useShamanData = ({ shamanAddress }: { shamanAddress: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`checkInV2data-${shamanAddress}`, { shamanAddress }],
    queryFn: () => fetchCheckInV2data(shamanAddress),
    enabled: !!shamanAddress,
  });
  return { shaman: data, error: error as Error | undefined, ...rest };
};
