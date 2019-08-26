import React, { useState, useContext } from 'react';
import { View, Text, Form, Item, Label, Input, Button, Picker, Icon, DatePicker } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import Layout from '../src/utilities/Layout';
import { UserContext } from '../src/utilities/UserContext';

const CreateTournamentScreen = props => {
  const { userLoading, user } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState('draft');
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
          <Form>
            <Item floatingLabel>
              <Label>Pool Name</Label>
              <Input autoCapitalize="none" value={name} onChangeText={name => setName(name)} />
            </Item>
            <Item floatingLabel>
              <Label>Pool Password</Label>
              <Input autoCapitalize="none" value={password} onChangeText={name => setPassword(password)} />
            </Item>
            <Label>Pool Type</Label>
            <Picker
              mode="dropdown"
              iosHeader="Select Pool Type"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={type}
              onValueChange={type => setType(type)}
              placeholder="Choose One"
            >
              <Picker.Item label="Random" value="random" />
              <Picker.Item label="Draft" value="draft" />
              <Picker.Item label="Seed" value="seed" />
            </Picker>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2022, 12, 31)}
              locale="en"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType="fade"
              androidMode="default"
              placeHolderText="Select Start Date"
              // textStyle={{ color: 'green' }}
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              disabled={false}
            />
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
