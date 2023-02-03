import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';

export const SHAMAN_GRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/jordanlesich/ritualsacrificeshaman';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
  CHAIN_NAME: string;
  ROS_V2_SHAMAN: EthAddress;
} = {
  ADDRESS: '0x853fea54aa815d32ecef67bbb15dc31da963b2d5',
  CHAIN_ID: '0x64',
  CHAIN_NAME: 'Gnosis Chain',
  ROS_V2_SHAMAN: '0xf1972b7801c4a479fb79598534dc055406db75a1',
};
