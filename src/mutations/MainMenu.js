import gql from 'graphql-tag';

export const show = gql`
  mutation showMainMenu {
    showMainMenu @client {
      isOpen
    }
  }
`;

export const hide = gql`
  mutation hideMainMenu {
    hideMainMenu @client {
      isOpen
    }
  }
`;

export const toggle = gql`
  mutation toggleMainMenu {
    toggleMainMenu @client {
      isOpen
    }
  }
`;