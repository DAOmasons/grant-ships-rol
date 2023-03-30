import { H2, Link, ParLg, ParMd, SingleColumnLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { HausAnimated } from '../components/HausAnimated';
import { TARGET_DAO } from '../constants';
import { useShamanData } from '../hooks/useShamanData';

const LinkBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .project-img {
    max-width: 50rem;
    max-height: 50rem;
  }
`;

export const Home = () => {
  const { name, description, links, imageUrl } = TARGET_DAO.PROJECT_DATA;

  return (
    <SingleColumnLayout>
      <Layout>
        <H2 className="mb-md project-img">{name}</H2>
        <img src={imageUrl} className="mb-md project-img" />
        <ParMd style={{ marginBottom: '2.4rem' }}>{description}</ParMd>

        <LinkBox>
          {links?.map((link) => (
            <Link key={link.url} href={link.url} linkType="external">
              {link.name}
            </Link>
          ))}
          <Link href="/timeline">Project Activity</Link>
          <Link href="/claim">Claim</Link>
          <Link
            linkType="external"
            href={`https://admin.daohaus.fun/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/members`}
          >
            Leaderboard
          </Link>
        </LinkBox>
      </Layout>
    </SingleColumnLayout>
  );
};
