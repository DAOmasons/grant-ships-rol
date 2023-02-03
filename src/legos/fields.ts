import { FieldLego } from '@daohaus/form-builder';
import { CustomField } from './config';

export const FIELD: Record<string, CustomField> = {
  MORALE: {
    id: 'morale',
    type: 'input',
    label: 'Morale',
    placeholder: 'How you feelin, champ?',
  },
  FUTURE: {
    id: 'future',
    type: 'input',
    label: 'Future Actions',
    placeholder: 'Tomorrow, I will sever the head of Moloch',
    info: 'What are you going to do next?',
  },
  OBSTACLES: {
    id: 'obstacles',
    type: 'input',
    label: 'Obstacles',
    placeholder: 'I am being held hostage by a cult',
    info: 'What is getting in your way?',
  },
  DESCRIPTION: {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
  },
  LINK: {
    id: 'link',
    type: 'input',
    label: 'Link',
    placeholder: 'http://',
    expectType: 'url',
  },
  CLAIM_BUILDER: {
    id: 'claimBuilder',
    type: 'claimBuilder',
  },
};
