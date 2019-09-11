import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Picker,
  Icon,
  DatePicker,
  H1
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Layout from '../src/utilities/Layout';
import { UserContext } from '../src/utilities/UserContext';
import { CREATE_POOL_MUTATION } from '../src/utilities/Mutations';
import Header from '../src/components/Header';

const styles = StyleSheet.create({
  mainButton: {
    marginTop: 10,
    borderColor: '#f3f3f3',
    backgroundColor: '#ffcc33',
    borderWidth: 2,
    width: '100%',
    borderRadius: 0
  },
  mainButtonText: {
    fontSize: 20,
    color: '#7a0019',
    fontFamily: 'graduate'
  },

  form: {
    width: '90%',
    backgroundColor: '#7a0019',
    marginBottom: 10
  },
  contentArea: {
    backgroundColor: '#7a0019'
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 20
  },
  label: {
    color: '#ffcc33',
    fontFamily: 'graduate'
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a0019'
  }
});

const CreateTournamentScreen = ({ history }) => {
  const { userLoading, user } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toString().substr(4, 11));

  const [createTournament, { data }] = useMutation(CREATE_POOL_MUTATION);

  return (
    <Layout title='Pools'>
      <Header history={history} title='Create Pool' />
      <View style={styles.mainView}>
        <H1 style={styles.title}>Create a Pool</H1>
        <Form style={styles.form}>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              placeholder='Enter Pool Name'
              autoCapitalize='none'
              value={name}
              onChangeText={name => setName(name)}
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              placeholderTextColor='#fc3'
            />
          </Item>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              placeholder='Enter Pool Password'
              autoCapitalize='none'
              value={password}
              onChangeText={password => setPassword(password)}
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              placeholderTextColor='#fc3'
            />
          </Item>
          <Label style={styles.label}>Pool Type</Label>
          <Picker
            mode='dropdown'
            iosHeader='Select Pool Type'
            iosIcon={<Icon name='arrow-down' style={{ color: '#fc3', fontSize: 25 }} />}
            selectedValue={type}
            onValueChange={type => setType(type)}
            placeholder='Choose One'
            placeholderStyle={{ color: '#fc3', fontFamily: 'graduate' }}
            textStyle={{ color: '#fff', fontFamily: 'graduate' }}>
            <Picker.Item label='Random' value='RANDOM' />
            <Picker.Item label='Draft' value='DRAFT' />
            <Picker.Item label='Seed' value='SEED' />
          </Picker>
          <Label style={styles.label}>Draft Date</Label>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2022, 12, 31)}
            locale='en'
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType='fade'
            androidMode='default'
            placeHolderText='Select Date'
            disabled={false}
            animationType='slide'
            textStyle={{ color: '#fff', fontFamily: 'graduate' }}
            placeHolderTextStyle={{ color: '#fc3', fontFamily: 'graduate' }}
            placeholderTextColor='#fc3'
            onDateChange={startDate => {
              console.log(startDate.toString().substr(4, 11));
              setStartDate(startDate.toString().substr(4, 11));
            }}
          />
          <Button
            block
            style={styles.mainButton}
            onPress={async () => {
              await createTournament({ variables: { name, password, type, startDate } });
            }}>
            <Text style={styles.mainButtonText}>Create Tournament</Text>
          </Button>
        </Form>
        <Text style={styles.label}>Please note your password for your group members.</Text>
      </View>
    </Layout>
  );
};

export default CreateTournamentScreen;
