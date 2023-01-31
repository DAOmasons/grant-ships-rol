import { Button, Card, ParLg, ParMd, ParSm } from '@daohaus/ui';
import { truncateAddress } from '@daohaus/utils';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useMemberProfile } from '../hooks/useMemberProfile';
import { IconType } from 'react-icons';
import { format } from 'date-fns';

const BaseCard = styled(Card)`
  width: 100%;
  margin-bottom: 2.4rem;
  .top-line {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .description-line {
    margin-bottom: 2rem;
  }
  .card-icon {
    margin-right: 1rem;
    transform: translateY(-0.2rem);
  }
  .date {
    margin-left: auto;
  }
  .expand {
    padding: 0;
    min-width: 0;
    height: fit-content;
  }
`;

export const BaseEventCard = ({
  createdBy,
  createdAt,
  Icon,
  descriptionLine,
  title,
  shouldExpand = true,
  expandLabels = {
    expand: 'Show More',
    collapse: 'Hide',
  },
  expandContent,
}: {
  title: string;
  createdBy: string;
  createdAt: string;
  descriptionLine: ReactNode;
  Icon?: IconType;
  shouldExpand?: boolean;
  expandLabels?: {
    expand: string;
    collapse: string;
  };
  expandContent?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BaseCard>
      <div className="top-line">
        {Icon && <Icon size="4rem" className="card-icon" />}
        <ParLg>{title}</ParLg>
        <ParSm className="date">
          {format(new Date(Number(createdAt) * 1000), 'MM/dd/yyyy')}
        </ParSm>
      </div>
      <div className="description-line">{descriptionLine}</div>
      {shouldExpand && (
        <Button
          className={`expand ${isOpen ? 'mb-md' : ''}`}
          variant="link"
          onClick={handleOpen}
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
