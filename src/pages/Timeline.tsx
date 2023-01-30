import { ParMd, SingleColumnLayout } from '@daohaus/ui';
import React from 'react';
import { TARGET_DAO } from '../constants';
import { useTimeline } from '../hooks/useTimeline';

export const Timeline = () => {
  const { timeline } = useTimeline({ shamanAddress: TARGET_DAO.ROS_V2_SHAMAN });
  console.log('timeline', timeline);
  return (
    <SingleColumnLayout>
      {timeline?.map((event, index) => {
        return <ParMd key={event.id}>{event.type}</ParMd>;
      })}
    </SingleColumnLayout>
  );
};
