import { FormLego } from '@daohaus/form-builder';
import { CustomForm } from './config';
import { FIELD } from './fields';
import { TX } from './tx';

export const FORM: Record<string, CustomForm> = {
  CLAIM: {
    id: 'CLAIM',
    title: 'Claim DAO Tokens',
    subtitle: 'Claim Proposal',
    description: 'Claim DAO tokens for work completed',
    requiredFields: { obstacles: true, future: true, morale: true },
    log: true,
    tx: TX.CLAIM,
    fields: [FIELD.MORALE, FIELD.OBSTACLES, FIELD.FUTURE, FIELD.CLAIM_BUILDER],
  },
};
