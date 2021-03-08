import gql from 'graphql-tag';


export default gql`
  query SpotMap {
    SpotMap @client {
      
      zoom
      center {
        lat
        lng
      }
    }
  }
`;
