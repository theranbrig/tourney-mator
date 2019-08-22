import React, { useState, useContext } from 'react';
import { View, Text, Form, Item, Label, Input, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Layout from '../src/utilities/Layout';
import { UserContext } from '../src/utilities/UserContext';

const CreateTournamentScreen = props => {
  const { userLoading, user } = useContext(UserContext);
  const [userState, setUserState] = useState(null);

  return (
    <Layout title="Pools">
      <NavigationEvents
        onDidFocus={payload => {
          if (userLoading) return <Text>Loading...</Text>;
          setUserState(user);
        }}
      />
      {userState !== null && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Create a Pool</Text>
          <Text>{userState.username}</Text>
          <Form>
            <Item floatingLabel>
              <Label>Pool Name</Label>
              <Input keyboardType="email-address" textContentType="emailAddress" autoCapitalize="none" />
            </Item>
            <Item floatingLabel last>
              <Label>Pool Type</Label>
              <Input secureTextEntry textContentType="password" autoCapitalize="none" />
            </Item>
            <Item floatingLabel last>
              <Label>Start Time</Label>
              <Input secureTextEntry textContentType="password" autoCapitalize="none" />
            </Item>
            <Button>
              <Text>Create Tournament</Text>
            </Button>
          </Form>
        </View>
      )}
    </Layout>
  );
};

export default CreateTournamentScreen;
