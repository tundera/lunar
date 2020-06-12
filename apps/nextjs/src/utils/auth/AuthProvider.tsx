import React, { createContext, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import ErrorPage from '../../pages/_error';
import { logout } from './auth-helpers';

// TODO: Set-up your real user query here
const GET_CURRENT_USER = gql`
  query getCurrentUser {
    me {
      id
    }
  }
`;

type AuthContextParams = [{ data: any }, typeof logout];

const AuthContext = createContext<AuthContextParams>([{ data: null }, logout]);

const AuthProvider: React.FC = ({ children }) => {
  const { loading, data, error } = useQuery(GET_CURRENT_USER);

  // Usally you dont see this, because we have no "loading" state on SSR
  if (loading) {
    return <div>Loading...</div>;
  }

  // JWT token expired or any API-level errors, you can use redirects here
  if (error) {
    return <ErrorPage statusCode={401} />;
  }

  return (
    <AuthContext.Provider value={[{ data }, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

// Returns authentication-related data and functions
const useAuth = (): AuthContextParams => useContext(AuthContext);

export { AuthProvider, useAuth };
