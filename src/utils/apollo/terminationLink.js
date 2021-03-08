import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
});

// const wsLink = new WebSocketLink({
//   uri: process.env.REACT_APP_GRAPHQL_WS_URI,
//   options: {
//     reconnect: true
//   }
// });

// const terminationLink = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLink
// );

export default httpLink;