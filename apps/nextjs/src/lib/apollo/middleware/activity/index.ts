import { from } from '@apollo/client';

import LatencyTimerLink from './LatencyTimer';
import OperationCountLink from './OperationCount';
import ReportErrorLink from './ReportError';

const OpCountLink = new OperationCountLink();

const activityMiddlware = from([
  LatencyTimerLink,
  OpCountLink,
  ReportErrorLink,
]);

export default activityMiddlware;
