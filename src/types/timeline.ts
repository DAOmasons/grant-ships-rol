export type EventData = {
  id: string;
  createdAt: string;
  createdBy: string;
};
export type ClaimMetadata = {
  claimDetails: string[];
  morale: string;
  future: string;
  obstacles: string;
};
export type ProjectLink = {
  name: string;
  url: string;
};
export type ProjectMetadata = {
  name: string;
  description: string;
  imageUrl: string;
  mission?: string;
  rubric?: [string, string, string, string, string];
  links?: ProjectLink[];
  dueDate?: string;
  parentDAOInfo?: {
    name?: string;
    address?: string;
    description?: string;
    imageUrl?: string;
  };
};
export type Claim = EventData & {
  type: 'claim';
  metadata: 'Corrupt' | ClaimMetadata;
  totalSecondsWorked: string;
  totalAmountClaimed: string;
  sessionsTime: string[];
  sessionsValue: string[];
};

export type SummonShaman = EventData & {
  type: 'summon';
  projectMetadata: ProjectMetadata | 'Corrupt';
};

export type UpdateLock = EventData & {
  type: 'updateLock';
  isLocked: boolean;
};

export type Mutiny = EventData & {
  type: 'mutiny';
  mutinyFrom: string;
  mutinyTo: string;
};

export type UpdatePercs = EventData & {
  type: 'updatePercs';
  updatePercsFrom: [number, number, number, number, number];
  updatePercsTo: [number, number, number, number, number];
};

export type UpdateTPS = EventData & {
  type: 'updateTokenPerSecond';
  updateTPSFrom: string;
  updateTPSTo: string;
};

export type UpdateInterval = EventData & {
  type: 'updateInterval';
  updateIntervalFrom: string;
  updateIntervalTo: string;
};

export type TimelineEvent =
  | Claim
  | SummonShaman
  | UpdateLock
  | Mutiny
  | UpdatePercs
  | UpdateTPS;
