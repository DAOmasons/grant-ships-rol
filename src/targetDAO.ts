import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';
import { ProjectMetadata } from './types/timeline';

export const SHAMAN_GRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/jordanlesich/ritualsacrificeshaman';

type TargetDAO = {
  ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
  CHAIN_NAME: string;
  ROL_V2_SHAMAN: EthAddress;
  PROJECT_DATA: ProjectMetadata;
};

const DemoProject: TargetDAO = {
  ADDRESS: '0x11f2d7f509ccace8a6cf835f30e3912ce579507b',
  CHAIN_ID: '0xa4b1',
  CHAIN_NAME: 'Arbitrum One',
  ROL_V2_SHAMAN: '0xfa68fb88cf2c47a836c3a292bf5aad58103f65a9',
  PROJECT_DATA: {
    name: 'Demo Project',
    description:
      'This is a demo POC app to show how we fairly and transparently coordinate project work',
    imageUrl:
      'https://cdn.discordapp.com/attachments/1087525376630198312/1088883720309710858/Bjav6ge.png',
    mission:
      'Display how we manage project work so that others may find fair and transparent ways to coordinate their own projects.',
    links: [
      {
        name: 'Project Proposal',
        url: 'https://hackmd.io/REwxi-dFQe29Z_-fvy7YNQ',
      },
    ],
    dueDate: 1682713862,
    parentDAOInfo: {
      name: 'DAO Masons',
      address: '0x5b448757a34402deacc7729b79003408cdfe1438',
      description: 'DAO Masons is a DAO that helps other DAOs',
      imageUrl:
        'https://cdn.discordapp.com/attachments/1087525376630198312/1088883720309710858/Bjav6ge.png',
    },
    rubricType: 'time-only',
    rubricDescription: [
      "Low effort/focus work. Ex. Casual research, low impact calls. Any work that doesn't require a lot of focus.",
      'Easy or simple work. Or high impact work where the worker is still learning and takes longer than usual. Ex. Organizing, simple refactors, hacking using a new language.',
      'Baseline work. Nothing too high impact, but still requires effort and focus',
      'High impact work. Ex. Baseline work done with someone with a lot of experience or work done that yields high impact or requires a lot of focus.',
      'Excellent work. High impact, high focus work. This work would require a lot of focus and experience to complete.',
    ],
  },
};

const GrantShips: TargetDAO = {
  ADDRESS: '0x88c958a3b04d7c9367dc4a1d3d3436dbbdc010c1',
  CHAIN_ID: '0xa4b1',
  CHAIN_NAME: 'Arbitrum One',
  ROL_V2_SHAMAN: '0x44e20dea3bafd3d483a4452d6eacfc62dd936815',
  PROJECT_DATA: {
    name: 'Build Grant Ships',
    description: 'Project DAO for building Grant Ships on Arbitrum',
    imageUrl:
      'https://mma.prnewswire.com/media/1888305/Arbitrum_Logo.jpg?w=200',
    mission:
      'This project aims to complete the Grant Ships project as specified in the Plurality Labs Proposal.',
    links: [
      {
        name: 'Pluraly Labs Proposal',
        url: 'https://hackmd.io/REwxi-dFQe29Z_-fvy7YNQ',
      },
      {
        name: 'Grant Ships Proposal',
        url: 'https://hackmd.io/REwxi-dFQe29Z_-fvy7YNQ',
      },
    ],
    dueDate: 1706745600,
    rubricType: 'time-only',
    parentDAOInfo: {
      name: 'DAO Masons',
      address: '0x5b448757a34402deacc7729b79003408cdfe1438',
      description: 'DAO Masons is a DAO that helps other DAOs',
      imageUrl:
        'https://cdn.discordapp.com/attachments/1087525376630198312/1088883720309710858/Bjav6ge.png',
    },
  },
};

// const FinishDocs: TargetDAO = {
//   ADDRESS: '0xceb89a2d2876d0b624494725776355de07a8edf7',
//   CHAIN_ID: '0xa4b1',
//   CHAIN_NAME: 'Arbitrum One',
//   ROL_V2_SHAMAN: '0x171669682d75a8D421456802ad83063c0fa64ecF',
//   PROJECT_DATA: {
//     name: 'Finish the Docs!',
//     description: "last push to get the docs done for the DAO's website",
//     imageUrl:
//       'https://media.discordapp.net/attachments/1093964334369083432/1093994376545456168/DALLE_2023-04-07_13.22.32_-_mediabal_art_style_picture_of_3_saints_panicking_to_get_the_docs_done.png?width=532&height=532',
//     mission: 'Finally get the goddamn docs done!',
//     links: [
//       {
//         name: 'Project Proposal',
//         url: 'https://hackmd.io/0haYsy98RU6l5p9KXDpsWw',
//       },
//     ],
//     dueDate: 1682021911,
//     rubricType: 'time-only',
//     parentDAOInfo: {
//       name: 'DAO Masons',
//       address: '0x5b448757a34402deacc7729b79003408cdfe1438',
//       description: 'DAO Masons is a DAO that helps other DAOs',
//       imageUrl:
//         'https://cdn.discordapp.com/attachments/1087525376630198312/1088883720309710858/Bjav6ge.png',
//     },
//   },
// };

const Projects: Record<string, TargetDAO> = {
  'Demo Project': DemoProject,
  GrantShips,
};

const getTargetDAO = (targetProject?: string) => {
  console.log('targetProject', targetProject);
  const targetDAO = targetProject && Projects[targetProject];
  if (!targetDAO) {
    throw new Error(`\n\nCould not find target project: ${targetProject}\n\nPlease check your .env file and make sure VITE_TARGET_PROJECT is set to one of the following project strings:\n\n${Object.keys(
      Projects
    )
      .map((name) => '- ' + '"' + name + '"')
      .join('\n')}
    `);
  }
  return targetDAO;
};

export const TARGET_DAO = getTargetDAO(import.meta.env.VITE_TARGET_PROJECT);
