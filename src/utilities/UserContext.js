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
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  return (
    <UserContext.Provider
      value={{
        userLoading: loading,
        userError: error,
        user: data.me,
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
export { CURRENT_USER_QUERY };
