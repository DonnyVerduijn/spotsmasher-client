import gql from 'graphql-tag';

export const update = (obj, args, { cache }) => {
  const query = gql`
    query Attribute($id: ID!) {
      Attribute(id: $id) @client {
        id
        name
        value
      }
    }
  `;

  const data = cache.readQuery({
    query,
    variables: {
      id: args.id.toString()
    }
  });

  const Attribute = Object.assign({}, data.Attribute, { value: args.value });

  cache.writeQuery({ query, data: { value: args.value } });
  return { Attribute, ...Attribute };
};
