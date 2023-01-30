import { DHLayout } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { FormTest } from './pages/FormTest';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';
import { Ritual } from './pages/Ritual';
import { Settings } from './pages/Settings';
import { Timeline } from './pages/Timeline';

export const Routes = () => {
  const { pathname } = useLocation();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Timeline', href: '/timeline' },
        { label: 'Claim', href: '/claim' },
        { label: 'Leaderboard', href: '/leaderboard' },
        { label: 'Settings', href: '/settings' },
      ]}
    >
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/claim" element={<Ritual />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
      </Router>
    </DHLayout>
  );
};
