import { ApolloLink } from '@apollo/client';

class OperationCountLink extends ApolloLink {
  public operationCount: number;

  constructor() {
    super();
    this.operationCount = 0;
  }
  request(operation, forward) {
    this.operationCount += 1;
    return forward(operation);
  }
}

export default OperationCountLink;