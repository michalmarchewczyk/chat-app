import { ApolloProvider } from '@apollo/client';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContext } from './AuthContext';
import { getClient } from '../../api/client';

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        <ApolloProvider client={getClient(token)}>{children}</ApolloProvider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

export default Provider;
