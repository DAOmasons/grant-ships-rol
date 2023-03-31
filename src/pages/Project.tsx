import { BiColumnLayout, Card, H3, ParLg, ParMd, Tabs } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';
import { TARGET_DAO } from '../targetDAO';

const ProjectDataCard = styled(Card)`
  width: 100%;
`;

const ParentDAOCard = styled(Card)`
  width: 50rem;
  .parent-dao-img {
    max-width: 5rem;
    max-height: 5rem;
  }
  .title-section {
    display: flex;
    align-items: center;
  }
`;

export const Project = () => {
  return (
    <BiColumnLayout
      title="Project Data"
      left={
        <ProjectDataCard>
          <ParLg className="mb-sm">{TARGET_DAO.PROJECT_DATA.name}</ParLg>
          <ParMd className="tint-secondary">
            {TARGET_DAO.PROJECT_DATA.description}
          </ParMd>
          <ParMd>{}</ParMd>
        </ProjectDataCard>
      }
      right={
        <ParentDAOCard>
          <ParMd className="mb-sm">Parent DAO:</ParMd>
          <div className="title-section">
            <img
              className="parent-dao-img"
              src={TARGET_DAO.PROJECT_DATA.parentDAOInfo?.imageUrl}
            />
            <ParMd>{TARGET_DAO.PROJECT_DATA.parentDAOInfo?.name}</ParMd>
          </div>
        </ParentDAOCard>
      }
    />
  );
};
