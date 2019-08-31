import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import LogoutButton from '../src/components/LogoutButton';
import { UserContext } from '../src/utilities/UserContext';
import BottomFooter from '../src/components/Footer';

const ProfileScreen = ({ history }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Layout title="Profile">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Users Screen</Text>
          <Button title="Go to Home" onPress={() => history.push('/home')} />
          <Button title="Go back" onPress={() => history.push('/loading')} />
          <LogoutButton navigate={() => history.push('/')} />
          <Text>{user.email}</Text>
          <Text>{user.username}</Text>
        </View>
      </Layout>
      <BottomFooter history={history} />
    </>
  );
};

export default ProfileScreen;
