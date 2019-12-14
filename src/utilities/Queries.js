import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      token
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
            user {
              id
            }
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
      name
      password
      teams {
        id
      }
      type
      startDate
      tournamentMembers {
        id
        user {
          id
          username
        }
        role
      }
      maxMembers
      tournamentGroup {
        id
        name
        teams {
          id
          name
          seed
          region
        }
      }
    }
  }
`;

export const TOURNAMENT_MEMBER_QUERY = gql`
  query TOURNAMENT_MEMBER_QUERY($id: ID!) {
    tournamentMember(where: { id: $id }) {
      id
      user {
        id
        username
      }
    }
  }
`;

export const TOURNAMENT_GROUP_QUERY = gql`
  query TOURNAMENT_GROUP_QUERY($id: ID!) {
    tournamentGroup(where: { id: $id }) {
      id
      teams {
        id
        name
        seed
        region
      }
    }
  }
`;
