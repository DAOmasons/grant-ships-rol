import { ParMd, SingleColumnLayout } from '@daohaus/ui';
import React from 'react';
import { TARGET_DAO } from '../constants';
import { useTimeline } from '../hooks/useTimeline';

export const Timeline = () => {
  const { timeline } = useTimeline({ shamanAddress: TARGET_DAO.ROS_V2_SHAMAN });

  return (
    <SingleColumnLayout>
      {timeline?.map((event) => {
        if (event.type === 'claim') {
          return <ParMd key={event.id}>{event.type}</ParMd>;
        }
        return <ParMd key={event.id}>{event.type}</ParMd>;
      })}
    </SingleColumnLayout>
  );
};
