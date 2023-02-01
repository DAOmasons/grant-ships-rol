import { ProjectMetadata } from './timeline';

export type ShamanData = {
  id: string;
  createdAt: string;
  baal: string;
  summoner: string;
  address: string;
  tokenPerSecond: string;
  isLocked: boolean;
  interval: string;
  valueScalePercs: string[];
  teamLead: string;
  projectMetadata: 'Corrupt' | ProjectMetadata;
};
