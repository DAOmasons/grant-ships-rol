import { Bold, ParLg, ParMd, SingleColumnLayout } from '@daohaus/ui';

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
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useMemberProfile } from '../hooks/useMemberProfile';
import { truncateAddress } from '@daohaus/utils';
import ReactJson from 'react-json-view';

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
              title="Unknown Event"
              key={event.id}
              Icon={AiOutlineQuestionCircle}
              createdAt={event.createdAt}
              createdBy={event.createdBy}
              descriptionLine={
                <ParMd>
                  Event type <Bold>{event.type}</Bold> not found in factory
                </ParMd>
              }
              expandLabels={{
                expand: 'View Event Data',
                collapse: 'Hide Data',
              }}
              expandContent={
                <>
                  <ParMd className="mb-md bold">Event Data</ParMd>
                  <ReactJson
                    src={event}
                    theme="ashes"
                    displayDataTypes={false}
                    style={{ fontSize: '1.4rem', background: 'none' }}
                  />
                </>
              }
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
      title={isLocked ? 'Claims Locked' : 'Claims Unlocked'}
      Icon={LockIcon}
      createdAt={createdAt}
      createdBy={createdBy}
      descriptionLine={
        <ParMd>
          Team Lead <Bold>TODO</Bold> has{' '}
          <Bold>{isLocked ? 'locked' : 'unlocked'}</Bold> claims
        </ParMd>
      }
      expandContent={
        <>
          <ParMd className="bold mb-sm">This Contract is Locked</ParMd>
          <ParMd className="tint-secondary">
            The project team lead has locked this contract from accepting
            Project DAO member claims.
          </ParMd>
        </>
      }
    />
  );
};

const SummonCard = (summon: SummonShaman) => {
  const { createdAt, createdBy } = summon;
  const { profile } = useMemberProfile({ address: createdBy });

  return (
    <BaseEventCard
      title="Project DAO Summoned"
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
