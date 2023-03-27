import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';
import { ProjectMetadata } from './types/timeline';

export const SHAMAN_GRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/jordanlesich/ritualsacrificeshaman';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
  CHAIN_NAME: string;
  ROS_V2_SHAMAN: EthAddress;
  PROJECT_DATA: ProjectMetadata;
} = {
  ADDRESS: '0x853fea54aa815d32ecef67bbb15dc31da963b2d5',
  CHAIN_ID: '0x64',
  CHAIN_NAME: 'Gnosis Chain',
  ROS_V2_SHAMAN: '0xf1972b7801c4a479fb79598534dc055406db75a1',
  PROJECT_DATA: {
    name: 'Arbitrum | DAO Builder Campaign',
    description: 'DAO Masons hunting outreach program for DAOs on Arbitrum',
    imageUrl:
      'https://mma.prnewswire.com/media/1888305/Arbitrum_Logo.jpg?w=200',
    mission:
      "This project aims to promote our DAO's services to other DAOs within the Arbitrum ecosystem, increase brand awareness, and establish partnerships.",
    links: [
      {
        name: 'Project Proposal',
        url: 'https://hackmd.io/REwxi-dFQe29Z_-fvy7YNQ',
      },
    ],
  },
};
