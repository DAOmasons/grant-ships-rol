import {
  Bold,
  Link,
  ParLg,
  ParMd,
  SingleColumnLayout,
  Spinner,
} from '@daohaus/ui';

import { BaseEventCard } from '../components/BaseEventCard';
import { TARGET_DAO } from '../targetDAO';
import { useTimeline } from '../hooks/useTimeline';
import styled from 'styled-components';
import { ClaimCard } from '../components/ClaimCard';
import { ProjectMetadata, SummonShaman, UpdateLock } from '../types/timeline';
import {
  HiOutlineLockOpen,
  HiOutlineLockClosed,
  HiOutlineFire,
} from 'react-icons/hi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useMemberProfile } from '../hooks/useMemberProfile';

import ReactJson from 'react-json-view';
import { useShamanData } from '../hooks/useShamanData';
import { MetadataWarning } from '../components/MetadataWarning';

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
  if (!timeline) return <ParLg>Timeline not found</ParLg>;
  if (!shaman) return <ParLg>Shaman not found</ParLg>;

  return (
    <SingleColumnLayout>
      <TimelineLayout>
        {timeline?.map((event) => {
          if (event.type === 'claim') {
            return (
              <ClaimCard
                key={event.id}
                {...event}
                tokenPerSecond={shaman.tokenPerSecond}
                valueScalePercs={shaman.valueScalePercs}
              />
            );
          }
          if (event.type === 'updateLock') {
            return (
              <UpdateLockCard
                key={event.id}
                {...event}
                teamLead={shaman?.teamLead}
              />
            );
          }
          if (event.type === 'summon') {
            return (
              <SummonCard
                key={event.id}
                {...event}
                projectMetadata={shaman.projectMetadata}
              />
            );
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

const UpdateLockCard = (props: UpdateLock & { teamLead: string }) => {
  const { createdAt, createdBy, isLocked, teamLead } = props;
  const { displayName } = useMemberProfile({ address: teamLead });
  const LockIcon = isLocked ? HiOutlineLockClosed : HiOutlineLockOpen;

  return (
    <BaseEventCard
      title={isLocked ? 'Claims Locked' : 'Claims Unlocked'}
      Icon={LockIcon}
      createdAt={createdAt}
      createdBy={createdBy}
      descriptionLine={
        <ParMd>
          Team Lead <Bold>{displayName}</Bold> has{' '}
          <Bold>{isLocked ? 'locked' : 'unlocked'}</Bold> claims
        </ParMd>
      }
      expandContent={
        <>
          <ParMd className="bold mb-sm">
            This Contract is {isLocked ? 'locked' : 'unlocked'}
          </ParMd>
          {isLocked ? (
            <ParMd className="tint-secondary mb-md">
              The project team lead has locked this contract from accepting
              Project DAO member claims. The team lead can unlock the contract
              on the <Link href="/settings">settings</Link> panel
            </ParMd>
          ) : (
            <ParMd className="tint-secondary mb-md">
              The project team lead unlocked this contract. This project may now
              accept member claims. The team lead can unlock the contract on the{' '}
              <Link href="/settings">settings</Link> panel
            </ParMd>
          )}
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

const SummonCard = (
  props: SummonShaman & { projectMetadata: 'Corrupt' | ProjectMetadata }
) => {
  const { createdAt, createdBy, projectMetadata } = props;
  const { displayName } = useMemberProfile({ address: createdBy });

  return (
    <BaseEventCard
      title="Project DAO Summoned"
      Icon={HiOutlineFire}
      createdAt={createdAt}
      createdBy={createdBy}
      descriptionLine={
        <ParMd>
          {'Project DAO'} Summoned by <Bold>{displayName}</Bold>{' '}
        </ParMd>
      }
      expandContent={
        <>
          <ParLg className="mb-md">
            <Bold>Project Metadata:</Bold>
          </ParLg>
          {projectMetadata && projectMetadata !== 'Corrupt' ? (
            <>
              {Object.entries(projectMetadata).map(([key, value]) => {
                return (
                  <>
                    <ParMd key={key} className="mb-sm capitalize">
                      <Bold>{key}:</Bold>
                    </ParMd>
                    <ParMd key={key} className="mb-md">
                      {JSON.stringify(value)}
                    </ParMd>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <MetadataWarning text="Corrupt Metadata: Claim description not available" />
            </>
          )}
        </>
      }
    />
  );
};
