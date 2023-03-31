import { DHLayout, useDHConnect } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { FormTest } from './pages/FormTest';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';
import { Claim } from './pages/Claim';
import { Settings } from './pages/Settings';
import { Timeline } from './pages/Timeline';
import { TXBuilder } from '@daohaus/tx-builder';
import { TARGET_DAO } from './targetDAO';
import { Project } from './pages/Project';

export const Routes = () => {
  const { pathname } = useLocation();
  const { provider } = useDHConnect();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Project', href: '/project' },
        { label: 'Timeline', href: '/timeline' },
        { label: 'Claim', href: '/claim' },
      ]}
    >
      <TXBuilder
        provider={provider}
        chainId={TARGET_DAO.CHAIN_ID}
        daoId={TARGET_DAO.ADDRESS}
        // safeId={TARGET_DAO.SAFE_ADDRESS}
        appState={{
          shamanAddress: TARGET_DAO.ROS_V2_SHAMAN,
        }}
      >
        <Router>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
        </Router>
      </TXBuilder>
    </DHLayout>
  );
};
