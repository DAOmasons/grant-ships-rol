import { ParMd, SingleColumnLayout } from '@daohaus/ui';
import React from 'react';
import { BaseEventCard } from '../components/BaseEventCard';
import { TARGET_DAO } from '../constants';
import { useTimeline } from '../hooks/useTimeline';

export const Timeline = () => {
  const { timeline } = useTimeline({ shamanAddress: TARGET_DAO.ROS_V2_SHAMAN });

  return (
    <SingleColumnLayout>
      {timeline?.map((event) => {
        return (
          <BaseEventCard
            key={event.id}
            createdAt={event.createdBy}
            createdBy={event.createdBy}
            descriptionLine={"You've claimed your ROS"}
          />
        );
      })}
    </SingleColumnLayout>
  );
};
