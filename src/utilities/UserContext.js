import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const UserContext = React.createContext();

const CURRENT_USER_QUERY = gql`
  {
    me {
      id
      email
      username
      token
    }
  }
`;

const UserProvider = props => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  const currentUserData = () => {
    setUser(data);
    setUserLoading(loading);
    setUserError(error);
  };

  return (
    <UserContext.Provider
      value={{
        currentUserData,
        userLoading,
        userError,
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
