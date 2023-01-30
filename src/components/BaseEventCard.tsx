import { useDHConnect } from '@daohaus/connect';
import { Card, ParLg, ParSm } from '@daohaus/ui';
import { truncateAddress } from '@daohaus/utils';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useMemberProfile } from '../hooks/useMemberProfile';

const BaseCard = styled(Card)``;

export const BaseEventCard = ({
  createdBy,
  createdAt,
  icon,
  descriptionLine,
}: {
  createdBy: string;
  createdAt: string;
  descriptionLine: string;
  icon: ReactNode;
}) => {
  const { profile } = useMemberProfile({ address: createdBy });
  return (
    <BaseCard>
      <div className="top-line">
        <div>
          {icon}
          <ParLg>
            {profile?.name || profile?.ens || truncateAddress(createdBy)}
          </ParLg>
        </div>
        <ParSm>10/18/2021</ParSm>
      </div>
      <div>{descriptionLine}</div>
    </BaseCard>
  );
};
