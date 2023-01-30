import { isJSON } from '@daohaus/utils';
import { isClaimMetadata, isProjectMetadata } from '../types/typeguards';

export const handleClaimMetadata = (metadata: string) => {
  if (isJSON(metadata)) {
    const parsed = JSON.parse(metadata);
    return isClaimMetadata(parsed) ? parsed : 'Corrupt';
  }
  return 'Corrupt';
};
export const handleProjectMetadata = (metadata: string) => {
  if (isJSON(metadata)) {
    const parsed = JSON.parse(metadata);
    return isProjectMetadata(parsed) ? parsed : 'Corrupt';
  }
  return 'Corrupt';
};
