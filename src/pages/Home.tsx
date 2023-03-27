import { H2, Link, ParMd, SingleColumnLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { HausAnimated } from '../components/HausAnimated';
import { TARGET_DAO } from '../constants';
import { useShamanData } from '../hooks/useShamanData';

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Home = () => {
  const { name, description, links, imageUrl } = TARGET_DAO.PROJECT_DATA;

  return (
    <SingleColumnLayout>
      <H2 className="mb-lg">{name}</H2>
      <img src={imageUrl} className="mb-md" />
      <ParMd style={{ marginBottom: '2.4rem' }}>{description}</ParMd>

      <LinkBox>
        {links?.map((link) => (
          <Link href={link.url} linkType="external">
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
    </SingleColumnLayout>
  );
};
