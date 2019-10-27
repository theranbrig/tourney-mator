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
        tournamentMembers {
          id
        }
      }
      tournamentRequests {
        id
        tournament {
          id
          name
        }
      }
      tournamentMembers {
        id
        tournament {
          id
          name
          startDate
          tournamentMembers {
            id
          }
        }
        points
        role
      }
    }
  }
`;

export const TOURNAMENT_INFORMATION_QUERY = gql`
  query TOURNAMENT_INFORMATION_QUERY($id: ID!) {
    tournament(where: { id: $id }) {
      id
      type
      name
      startDate
      tournamentMembers {
        user {
          id
          username
        }
        role
      }
    }
  }
`;
