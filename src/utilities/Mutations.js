import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      password
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
    }
  }
`;

export const CREATE_POOL_MUTATION = gql`
  mutation CreateTournament($name: String!, $password: String!, $type: String, $startDate: String) {
    createTournament(name: $name, password: $password, type: $type, startDate: $startDate) {
      id
      name
      password
      type
      startDate
    }
  }
`;

export const REMOVE_POOL_MUTATION = gql`
  mutation RemoveTournament($id: ID!) {
    removeTournament(id: $id) {
      message
    }
  }
`;

export const CREATE_TOURNAMENT_REQUEST_MUTATION = gql`
  mutation CreateTournamentRequest($userEmail: String!, $tournament: ID!) {
    createTournamentRequest(userEmail: $userEmail, tournament: $tournament) {
      id
      tournament {
        id
        name
      }
    }
  }
`;

export const ACCEPT_REQUEST_MUTATION = gql`
  mutation AcceptRequest($id: ID!, $tournamentId: ID!) {
    acceptRequest(id: $id, tournamentId: $tournamentId) {
      id
      tournamentRequests {
        id
      }
    }
  }
`;

export const DELETE_REQUEST_MUTATION = gql`
  mutation DeleteRequest($id: ID!) {
    deleteRequest(id: $id) {
      message
    }
  }
`;

export const LEAVE_TOURNAMENT_MUTATION = gql`
  mutation LeaveTournament($id: ID!) {
    leaveTournament(id: $id) {
      message
    }
  }
`;
