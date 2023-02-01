import {
  Bold,
  Link,
  ParLg,
  ParMd,
  SingleColumnLayout,
  Spinner,
} from '@daohaus/ui';

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
import { useShamanData } from '../hooks/useShamanData';

const TimelineLayout = styled.div`
  width: 100%;
  max-width: 70rem;
`;

export const Timeline = () => {
  const { timeline, isLoading: isLoadingTimeline } = useTimeline({
    shamanAddress: TARGET_DAO.ROS_V2_SHAMAN,
  });
  const { shaman, isLoading: isLoadingShaman } = useShamanData({
    shamanAddress: TARGET_DAO.ROS_V2_SHAMAN,
  });
  if (isLoadingTimeline || isLoadingShaman) return <Spinner size="12rem" />;

  return (
    <SingleColumnLayout>
      <TimelineLayout>
        {timeline?.map((event) => {
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
          <ParMd className="tint-secondary mb-md">
            The project team lead has locked this contract from accepting
            Project DAO member claims. The team lead can unlock the contract on
            the <Link href="/settings">settings</Link> panel
          </ParMd>
          <ParMd className="bold mb-sm">Disagree with this decision?</ParMd>
          <ParMd className="tint-secondary mb-md">
            Try talking it over as a group first. If that doesn't work, you can
            make a proposal to replace the team lead{' '}
            <Link href="/settings">here</Link>
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
