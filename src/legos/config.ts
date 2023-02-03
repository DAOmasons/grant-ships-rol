import { CoreFieldLookup } from '@daohaus/form-builder';
import { Buildable } from '@daohaus/ui';
import { FieldLegoBase, FormLegoBase } from '@daohaus/utils';
import { ClaimBuilder } from '../components/ClaimBuilder';

export const customFields = {
  ...CoreFieldLookup,
  claimBuilder: ClaimBuilder,
};

export type CustomField = FieldLegoBase<typeof customFields>;
export type CustomForm = FormLegoBase<typeof customFields>;
