import React from 'react';
import { testRequest } from '../hooks/useTimeline';

export const Timeline = () => {
  console.log('testRequest', testRequest());
  return <div>Timeline</div>;
};
