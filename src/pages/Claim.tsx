import { FormBuilder } from '@daohaus/form-builder';
import React from 'react';
import { customFields } from '../legos/config';
import { FORM } from '../legos/forms';

export const Claim = () => {
  return <FormBuilder form={FORM.CLAIM} customFields={customFields} />;
};
