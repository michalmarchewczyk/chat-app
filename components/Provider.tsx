import { ApolloProvider } from '@apollo/client';
import React from 'react';

import { AuthContext } from '../utils/AuthContext';
import { getClient } from '../utils/client';

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <ApolloProvider client={getClient(token)}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
}

export default Provider;
