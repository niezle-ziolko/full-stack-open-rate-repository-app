import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './utils/authStorage';

const createApolloClient = (authStorage = new AuthStorage()) => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await authStorage.getAccessToken();

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

export default createApolloClient;