import { Bold, ParLg, ParMd } from '@daohaus/ui';

import { BaseEventCard } from '../components/BaseEventCard';
import { Claim } from '../types/timeline';
import {
  HiOutlineClipboardCopy,
  HiOutlineExclamationCircle,
  HiOutlineChartPie,
} from 'react-icons/hi';
import { FaRegClock } from 'react-icons/fa';
import {
  formatPeriods,
  formatValueTo,
  fromWei,
  isString,
  truncateAddress,
} from '@daohaus/utils';
import { VALUE_LABELS } from '../utils/rubric';
import styled from 'styled-components';
import { useMemberProfile } from '../hooks/useMemberProfile';
import { MetadataWarning } from './MetadataWarning';

export const ClaimCard = (
  props: Claim & { tokenPerSecond: string; valueScalePercs: string[] }
) => {
  const {
    createdAt,
    createdBy,
    totalAmountClaimed,
    totalSecondsWorked,
    valueScalePercs,
  } = props;
  const { profile } = useMemberProfile({ address: createdBy });

  return (
    <BaseEventCard
      title={profile?.name || profile?.ens || truncateAddress(createdBy)}
      Icon={HiOutlineClipboardCopy}
      createdAt={createdAt}
      createdBy={createdBy}
      descriptionLine={
        <ParMd>
          Claimed{' '}
          <Bold>
            {formatValueTo({
              value: fromWei(totalAmountClaimed),
              unit: 'Shares',
              format: 'short-number',
              decimals: 2,
            })}
          </Bold>{' '}
          for <Bold>{formatPeriods(totalSecondsWorked)}</Bold>
        </ParMd>
      }
      expandContent={<ClaimsData {...props} />}
    />
  );
};

const ClaimsContainer = styled.div`
  .session-bar {
    display: flex;
    margin-bottom: 2rem;
    max-width: 70rem;
    > * {
      width: 100rem;
    }
  }
  .indicator {
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.75rem;
      color: ${(props) => props.theme.secondary.step11};
    }
  }
`;

const ClaimsData = ({
  sessionsTime,
  sessionsValue,
  id,
  metadata,
  tokenPerSecond,
  valueScalePercs,
}: Claim & { tokenPerSecond: string; valueScalePercs: string[] }) => {
  return (
    <ClaimsContainer>
      <ParLg className="bold mb-md">Sessions</ParLg>
      {sessionsTime.map((sessionTime, index) => {
        const valuePerc = valueScalePercs[sessionsValue[index]];

        return (
          <div key={`${id}-${index}`}>
            <ParMd className="mb-sm bold">Session {index + 1}</ParMd>
            <div className="session-bar">
              <div className="indicator">
                <FaRegClock size="1.6rem" />
                <ParMd>{formatPeriods(sessionTime)}</ParMd>
              </div>
              <div className="indicator">
                <HiOutlineExclamationCircle size="1.8rem" />
                <ParMd>{VALUE_LABELS[sessionsValue[index]]}</ParMd>
              </div>
              <div className="indicator">
                <HiOutlineChartPie size="1.8rem" />
                <ParMd>
                  {formatValueTo({
                    value: fromWei(
                      (
                        BigInt(sessionTime) *
                        BigInt(
                          (
                            (Number(tokenPerSecond) * Number(valuePerc)) /
                            100
                          ).toFixed()
                        )
                      ).toString()
                    ),
                    format: 'short-number',
                    unit: 'Shares',
                    decimals: 2,
                  })}
                </ParMd>
              </div>
            </div>
            <ParMd className="tint-secondary mb-lg">
              {metadata === 'Corrupt'
                ? 'Corrupt Metadata: Claim description not available'
                : metadata.claimDetails[index]}
            </ParMd>
          </div>
        );
      })}
      <ParLg className="bold mb-md">Claim Metadata</ParLg>
      {metadata === 'Corrupt' ? (
        <MetadataWarning text="Corrupt Metadata: Claim breakdown not available" />
      ) : (
        <>
          {Object.entries(metadata)
            .filter(([_key, value]) => isString(value))
            .map(([key, value]) => {
              return (
                <span key={key}>
                  <ParMd className="mb-sm capitalize">{key}:</ParMd>
                  <ParMd className="tint-secondary mb-md">{value}</ParMd>
                </span>
              );
            })}
        </>
      )}
    </ClaimsContainer>
  );
};
