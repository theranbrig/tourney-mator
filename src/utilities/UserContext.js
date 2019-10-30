import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './Queries';

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { loading: userLoading, error: userError, data, refetch } = useQuery(CURRENT_USER_QUERY);

  const user = data && data.me;

  return (
    <UserContext.Provider
      value={{
        userLoading,
        userError,
        user,
        userRefetch: refetch,
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

