import { POSTER_TAGS, TXLego } from '@daohaus/utils';
import { buildMultiCallTX } from '@daohaus/tx-builder';
import { CONTRACT } from './contract';

export enum ProposalTypeIds {
  Signal = 'SIGNAL',
  IssueSharesLoot = 'ISSUE',
  AddShaman = 'ADD_SHAMAN',
  TransferErc20 = 'TRANSFER_ERC20',
  TransferNetworkToken = 'TRANSFER_NETWORK_TOKEN',
  UpdateGovSettings = 'UPDATE_GOV_SETTINGS',
  UpdateTokenSettings = 'TOKEN_SETTINGS',
  TokensForShares = 'TOKENS_FOR_SHARES',
  GuildKick = 'GUILDKICK',
  WalletConnect = 'WALLETCONNECT',
}

export const TX: Record<string, TXLego> = {
  CLAIM: {
    id: 'CLAIM',
    contract: CONTRACT.CHECKIN_V2,
    method: 'claim',
    args: [
      '.formValues.sessionsTime',
      '.formValues.sessionsValue',
      {
        type: 'JSONDetails',
        jsonSchema: {
          claimDetails: '.formValues.sessionsDescription',
          morale: '.formValues.morale',
          obstacles: '.formValues.obstacles',
          future: '.formValues.future',
        },
      },
    ],
  },
};
