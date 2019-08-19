import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import LogoutButton from '../src/components/LogoutButton';
import { UserContext } from '../src/utilities/UserContext';

const ProfileScreen = props => {
  const { user, userLoading } = useContext(UserContext);
  console.log(user);
  if (userLoading) return <Text>Loading...</Text>;
  return (
    <Layout title="Profile">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Users Screen</Text>
        <Button title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => props.navigation.goBack()} />
        <LogoutButton navigate={() => props.navigation.navigate('Loading')} />
        <Text>{user.email}</Text>
        <Text>{user.username}</Text>
      </View>
    </Layout>
  );
};

export default ProfileScreen;
