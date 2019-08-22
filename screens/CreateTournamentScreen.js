import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Layout from '../src/utilities/Layout';
import { UserContext } from '../src/utilities/UserContext';

const CreateTournamentScreen = props => {
  const { userLoading, setUser, userData, user } = useContext(UserContext);
  const [userState, setUserState] = useState(null);

  return (
    <Layout title="Pools">
      <NavigationEvents
        onDidFocus={payload => {
          if (userLoading) return <Text>Loading...</Text>;
          setUserState(user);
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create Pool</Text>
        <Text>{userState.username}</Text>
      </View>
    </Layout>
  );
};

export default CreateTournamentScreen;
