import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const getClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_API_URL,
  });

  const token = process.env.EXPO_PUBLIC_API_TOKEN;

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
