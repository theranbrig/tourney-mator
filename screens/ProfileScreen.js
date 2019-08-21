import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import LogoutButton from '../src/components/LogoutButton';
import { UserContext } from '../src/utilities/UserContext';

const ProfileScreen = props => {
  const { user, userLoading } = useContext(UserContext);
  const [userState, setUserState] = useState(null)
  return (
    <Layout title="Profile">
      <NavigationEvents
        onDidFocus={async payload => {
          if(userLoading) return <Text>Loading...</Text>
          setUserState(user)
        }}
      />
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
