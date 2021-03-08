import gql from 'graphql-tag';

export const show = gql`
  mutation showFilterSheet {
    showFilterSheet @client {
      isOpen
    }
  }
`;

export const hide = gql`
  mutation hideFilterSheet {
    hideFilterSheet @client {
      isOpen
    }
  }
`

