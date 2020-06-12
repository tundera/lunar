import { concat } from '@apollo/client';
import { ApolloLink } from '@apollo/client';

const TimeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation);
});

const LogTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    const time = new Date().getTime() - operation.getContext().start.getTime();
    console.log(
      `operation ${operation.operationName} took ⏲ ${time} ms to complete! 🏔`,
    );

    return data;
  });
});

const LatencyTimerLink = concat(TimeStartLink, LogTimeLink);

export default LatencyTimerLink;
