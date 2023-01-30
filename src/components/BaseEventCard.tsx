import { useDHConnect } from '@daohaus/connect';
import { Button, Card, ParLg, ParSm } from '@daohaus/ui';
import { truncateAddress } from '@daohaus/utils';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useMemberProfile } from '../hooks/useMemberProfile';

const BaseCard = styled(Card)`
  width: 100%;
  margin-bottom: 2.4rem;
  .top-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .expand {
    padding: 0;
    min-width: 0;
  }
`;

export const BaseEventCard = ({
  createdBy,
  createdAt,
  icon,
  descriptionLine,
  shouldExpand = true,
  expandLabels = {
    expand: 'Show',
    collapse: 'Hide',
  },
  expandContent,
}: {
  createdBy: string;
  createdAt: string;
  descriptionLine: string;
  icon?: ReactNode;
  shouldExpand?: boolean;
  expandLabels?: {
    expand: string;
    collapse: string;
  };
  expandContent?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
      <div className="description-line">{descriptionLine}</div>
      {shouldExpand && (
        <Button
          className="expand"
          variant="link"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? expandLabels.collapse : expandLabels.expand}
        </Button>
      )}
      {shouldExpand && isOpen && (
        <div className="expand-section">{expandContent}</div>
      )}
    </BaseCard>
  );
};
