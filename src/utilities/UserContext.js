import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      token
    }
  }
`;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  console.log(data);

  return (
    <UserContext.Provider
      value={{
        userLoading: loading,
        userError: error,
        user: data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
