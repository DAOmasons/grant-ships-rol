import { Bold, ParMd, SingleColumnLayout } from '@daohaus/ui';

import { BaseEventCard } from '../components/BaseEventCard';
import { TARGET_DAO } from '../constants';
import { useTimeline } from '../hooks/useTimeline';
import styled from 'styled-components';
import { ClaimCard } from '../components/ClaimCard';
import { SummonShaman, UpdateLock } from '../types/timeline';
import {
  HiOutlineLockOpen,
  HiOutlineLockClosed,
  HiOutlineFire,
} from 'react-icons/hi';
import { useMemberProfile } from '../hooks/useMemberProfile';
import { truncateAddress } from '@daohaus/utils';

const TimelineLayout = styled.div`
  width: 100%;
  max-width: 70rem;
`;

export const Timeline = () => {
  const { timeline } = useTimeline({ shamanAddress: TARGET_DAO.ROS_V2_SHAMAN });

  return (
    <SingleColumnLayout>
      <TimelineLayout>
        {timeline?.map((event) => {
          console.log('event.type', event.type);
          console.log('event.createdAt', event.createdAt);
          if (event.type === 'claim') {
            return <ClaimCard key={event.id} {...event} />;
          }
          if (event.type === 'updateLock') {
            return <UpdateLockCard key={event.id} {...event} />;
          }
          if (event.type === 'summon') {
            return <SummonCard key={event.id} {...event} />;
          }

          return (
            <BaseEventCard
              key={event.id}
              createdAt={event.createdAt}
              createdBy={event.createdBy}
              descriptionLine={event.type}
            />
          );
        })}
      </TimelineLayout>
    </SingleColumnLayout>
  );
};

const UpdateLockCard = (updateLock: UpdateLock) => {
  const { createdAt, createdBy, isLocked } = updateLock;

  const LockIcon = isLocked ? HiOutlineLockClosed : HiOutlineLockOpen;

  return (
    <BaseEventCard
      Icon={LockIcon}
      createdAt={createdAt}
      createdBy={createdBy}
      shouldExpand={false}
      descriptionLine={
        <ParMd>
          Team Lead <Bold>TODO</Bold> has{' '}
          <Bold>{isLocked ? 'locked' : 'unlocked'}</Bold> claims
        </ParMd>
      }
    />
  );
};

const SummonCard = (summon: SummonShaman) => {
  const { createdAt, createdBy } = summon;
  const { profile } = useMemberProfile({ address: createdBy });

  return (
    <BaseEventCard
      Icon={HiOutlineFire}
      createdAt={createdAt}
      createdBy={createdBy}
      shouldExpand={false}
      descriptionLine={
        <ParMd>
          Project DAO Summoned by{' '}
          <Bold>
            {profile?.name || profile?.ens || truncateAddress(createdBy)}
          </Bold>{' '}
          for <Bold>TODO</Bold>
        </ParMd>
      }
    />
  );
};
