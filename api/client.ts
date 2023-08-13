import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { Socket as PhoenixSocket } from 'phoenix';

export const getClient = (token: string | undefined) => {
  const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_API_URL,
  });

  const phoenixSocket = new PhoenixSocket(process.env.EXPO_PUBLIC_WS_URL ?? '', {
    params: () => {
      return { token };
    },
  });

  const absintheSocket = AbsintheSocket.create(phoenixSocket);

  const wsLink = createAbsintheSocketLink(absintheSocket) as unknown as ApolloLink;

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};
