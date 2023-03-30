import { CustomField } from './config';

export const FIELD: Record<string, CustomField> = {
  MORALE: {
    id: 'morale',
    type: 'input',
    label: 'Morale',
    placeholder: 'How have you been since the last check in period?',
  },
  FUTURE: {
    id: 'future',
    type: 'input',
    label: 'Future Actions',
    placeholder: 'What are you going to do next?',
  },
  OBSTACLES: {
    id: 'obstacles',
    type: 'input',
    label: 'Obstacles',
    placeholder: 'What obstacles got in your way?',
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
