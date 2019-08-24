import React, { useState, useContext } from 'react';
import { View, Text, Form, Item, Label, Input, Button, Picker, Icon } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import Layout from '../src/utilities/Layout';
import { UserContext } from '../src/utilities/UserContext';

const CreateTournamentScreen = props => {
  const { userLoading, user } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState(null);
  const [nameDate, setDate] = useState(null);

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
              <Input autoCapitalize="none" />
            </Item>
            <Item floatingLabel>
              <Label>Pool Password</Label>
              <Input autoCapitalize="none" />
            </Item>

            <Item floatingLabel last>
              <Label>Start Time</Label>
              <Input autoCapitalize="none" />
            </Item>
            <Label>Pool Type</Label>
            <Picker
              mode="dropdown"
              iosHeader="Select Pool Type"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue="random"
              onValueChange={() => console.log('changed')}
            >
              <Picker.Item label="Random" value="random" />
              <Picker.Item label="Draft" value="draft" />
              <Picker.Item label="Seed" value="seed" />
            </Picker>
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
