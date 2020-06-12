import { ApolloLink } from '@apollo/client';

const reportErrors = (errorCallback) =>
  new ApolloLink((operation, forward) => {
    const observer = forward(operation);
    observer.subscribe({ error: errorCallback });
    return observer;
  });

const ReportErrorLink = reportErrors(console.error);

export default ReportErrorLink;