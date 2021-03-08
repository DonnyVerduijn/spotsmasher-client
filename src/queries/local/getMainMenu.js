import gql from 'graphql-tag';

export default gql`
  query getMainMenu {
    MainMenu @client {
      isOpen
    }
  }
`;
