import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { SHAMAN_GRAPH_ENDPOINT } from '../constants';

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
  const data = await graphQLClient.request(query, {
    shamanAddress: shamanAddress,
  });
  return data;
};

export const testRequest = async () => {
  const result = await fetchDAOTimeline(
    '0xf1972b7801c4a479fb79598534dc055406db75a1'
  );
  console.log(result);
};

export const useTimeline = () => {
  return null;
};
