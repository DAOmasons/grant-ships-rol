import { z } from 'zod';

const EventValidator = z.object({
  id: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
});
export type EventData = z.infer<typeof EventValidator>;

const ClaimMetadataValidator = z.object({
  claimDetails: z.array(z.string()),
  morale: z.string(),
  future: z.string(),
  obstacles: z.string(),
});
export type ClaimMetadata = z.infer<typeof ClaimMetadataValidator>;

const ProjectLinkValidator = z.object({
  name: z.string(),
  url: z.string(),
});
export type ProjectLink = z.infer<typeof ProjectLinkValidator>;

const ProjectMetadataValidator = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  rubricType: z.enum(['time-only', 'time-value']),
  dueDate: z.number().optional(),
  mission: z.string().optional(),
  usdPerBaseShare: z.number().optional(),
  rubricDescription: z
    .tuple([z.string(), z.string(), z.string(), z.string(), z.string()])
    .optional(),
  links: z.array(ProjectLinkValidator).optional(),
  parentDAOInfo: z
    .object({
      name: z.string().optional(),
      address: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
    })
    .optional(),
});
export type ProjectMetadata = z.infer<typeof ProjectMetadataValidator>;

const ClaimValidator = EventValidator.extend({
  type: z.literal('claim'),
  metadata: z.union([z.literal('Corrupt'), ClaimMetadataValidator]),
  totalSecondsWorked: z.string(),
  totalAmountClaimed: z.string(),
  sessionsTime: z.array(z.string()),
  sessionsValue: z.array(z.number()),
});
export type Claim = z.infer<typeof ClaimValidator>;

const SummonShamanValidator = EventValidator.extend({
  type: z.literal('summon'),
  projectMetadata: z.union([z.literal('Corrupt'), ProjectMetadataValidator]),
});
export type SummonShaman = z.infer<typeof SummonShamanValidator>;

const UpdateLockValidator = EventValidator.extend({
  type: z.literal('updateLock'),
  isLocked: z.boolean(),
});
export type UpdateLock = z.infer<typeof UpdateLockValidator>;

const MutinyValidator = EventValidator.extend({
  type: z.literal('mutiny'),
  mutinyFrom: z.string(),
  mutinyTo: z.string(),
});
export type Mutiny = z.infer<typeof MutinyValidator>;

const UpdatePercsValidator = EventValidator.extend({
  type: z.literal('updatePercs'),
  updatePercsFrom: z.tuple([
    z.number(),
    z.number(),
    z.number(),
    z.number(),
    z.number(),
  ]),
  updatePercsTo: z.tuple([
    z.number(),
    z.number(),
    z.number(),
    z.number(),
    z.number(),
  ]),
});
export type UpdatePercs = z.infer<typeof UpdatePercsValidator>;

const UpdateTPSValidator = EventValidator.extend({
  type: z.literal('updateTokenPerSecond'),
  updateTPSFrom: z.string(),
  updateTPSTo: z.string(),
});
export type UpdateTPS = z.infer<typeof UpdateTPSValidator>;

const UpdateIntervalValidator = EventValidator.extend({
  type: z.literal('updateInterval'),
  updateIntervalFrom: z.string(),
  updateIntervalTo: z.string(),
});
export type UpdateInterval = z.infer<typeof UpdateIntervalValidator>;

const TimelineEventValidator = z.discriminatedUnion('type', [
  ClaimValidator,
  SummonShamanValidator,
  UpdateLockValidator,
  MutinyValidator,
  UpdatePercsValidator,
  UpdateTPSValidator,
  UpdateIntervalValidator,
]);
export type TimelineEvent = z.infer<typeof TimelineEventValidator>;
