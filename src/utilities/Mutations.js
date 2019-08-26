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
  mutation CreatePool($name: String!, $password: String!, $startTime: DateTime, $type: String) {
    createTournament(name: $name, password: $password, startTime: $startTime, type: $type) {
      id
      name
      password
      date
      type
    }
  }
`;
