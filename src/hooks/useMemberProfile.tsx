import { truncateAddress } from '@daohaus/utils';
import { useQuery } from 'react-query';
import { fetchProfile } from '../utils/cacheProfile';

export const useMemberProfile = ({ address }: { address: string }) => {
  const { data, error, ...rest } = useQuery(
    [`memberProfile-${address}`, { address }],
    () => fetchProfile(address),
    { enabled: !!address }
  );

  return {
    profile: data,
    displayName: data?.name || data?.ens || truncateAddress(address),
    error: error as Error,
    ...rest,
  };
};
