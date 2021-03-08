import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import apolloLogger from 'apollo-link-logger';

import { errorLink } from './errorLink';
import { authLink } from './authLink';
import terminationLink from './terminationLink';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './../../generated/introspection-result.json';

const inDeveloperMode = process.env.NODE_ENV === 'development';
const links = (() => (inDeveloperMode ? [apolloLogger] : []))().concat([
  errorLink,
  authLink,
  terminationLink
]);

const link = ApolloLink.from(links);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      Attribute: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Attribute', id: args.id });
      },
      Spot: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'UnlockedSpot', id: args.id });
      }
    }
  }
});

export const createApolloClient = ({ resolvers, typeDefs, defaults }) => {
  const apolloClient = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers
    // queryDeduplication: false
  });

  // set default local state
  cache.writeData({
    data: defaults
  });

  return apolloClient;
};
