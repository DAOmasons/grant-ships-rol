import { isNumberish, isString } from '@daohaus/utils';
import {
  Claim,
  ClaimMetadata,
  EventData,
  Mutiny,
  ProjectMetadata,
  SummonShaman,
  UpdateInterval,
  UpdateLock,
  UpdateTPS,
} from './timeline';

export const isEvent = (event: any): event is EventData => {
  return (
    isString(event.id) && isString(event.createdAt) && isString(event.createdBy)
  );
};

export const isClaim = (event: any): event is Claim => {
  return (
    event.type === 'claim' &&
    isString(event.metadata) &&
    isString(event.totalSecondsWorked) &&
    isString(event.totalAmountClaimed) &&
    Array.isArray(event.sessionsTime) &&
    Array.isArray(event.sessionsValue) &&
    event.sessionsTime.every(isString) &&
    event.sessionsValue.every(isString) &&
    isEvent(event)
  );
};
export const isClaimMetadata = (metadata: any): metadata is ClaimMetadata => {
  return (
    Array.isArray(metadata.claimDetails) &&
    metadata.claimDetails.every(isString) &&
    isString(metadata.morale) &&
    isString(metadata.future) &&
    isString(metadata.obstacles)
  );
};
export const isProjectMetadata = (
  metadata: any
): metadata is ProjectMetadata => {
  return (
    isString(metadata.name) &&
    isString(metadata.description) &&
    isString(metadata.imageUrl)
  );
};
export const isUpdateLock = (event: any): event is UpdateLock => {
  return (
    event.type === 'updateLock' &&
    typeof event.isLocked === 'boolean' &&
    isEvent(event)
  );
};
export const isMutiny = (event: any): event is Mutiny => {
  return (
    event.type === 'mutiny' &&
    isString(event.mutinyFrom) &&
    isString(event.mutinyTo) &&
    isEvent(event)
  );
};
export const isUpdatePercs = (event: any): event is UpdateLock => {
  return (
    event.type === 'updatePercs' &&
    Array.isArray(event.updatePercsFrom) &&
    Array.isArray(event.updatePercsTo) &&
    event.updatePercsFrom.every(isNumberish) &&
    event.updatePercsTo.every(isNumberish) &&
    isEvent(event)
  );
};
export const isUpdateTPS = (event: any): event is UpdateTPS => {
  return (
    event.type === 'updateTokenPerSecond' &&
    isNumberish(event.updateTPSFrom) &&
    isNumberish(event.updateTPSTo) &&
    isEvent(event)
  );
};
export const isUpdateInterval = (event: any): event is UpdateInterval => {
  return (
    event.type === 'updateInterval' &&
    isNumberish(event.updateIntervalFrom) &&
    isNumberish(event.updateIntervalTo) &&
    isEvent(event)
  );
};
export const isSummonShaman = (event: any): event is SummonShaman => {
  return (
    event.type === 'summon' && isString(event.projectMetadata) && isEvent(event)
  );
};
