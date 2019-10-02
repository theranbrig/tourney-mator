import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      token
      tournaments {
        id
        name
        startDate
      }
      tournamentRequests {
        id
        tournament {
          id
          name
        }
      }
    }
  }
`;
