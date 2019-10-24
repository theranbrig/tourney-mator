import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
  View,
  H1,
  Spinner,
} from 'native-base';
import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  mainButton: {
    marginTop: 10,
    borderColor: '#7a0019',
    backgroundColor: '#fc3',
    borderWidth: 2,
    width: '100%',
    borderRadius: 0,
  },
  mainButtonText: {
    fontSize: 20,
    color: '#7a0019',
    fontFamily: 'graduate',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
  },
  contentArea: {
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    color: '#7a0019',
    fontFamily: 'graduate',
    marginBottom: 10,
    marginTop: 20,
  },
});

const JoinPool = props => {
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(props);
  return (
    <Form>
      <Form style={styles.form}>
        <H1 style={styles.title}>Enter Pool Information</H1>
        <Item
          regular
          style={{
            marginBottom: 10,
            borderColor: '#710019',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
          }}
        >
          <Input
            placeholder='Pool Name'
            value={name}
            onChangeText={name => setName(name)}
            autoCapitalize='none'
            style={{
              color: '#7a0019',
              fontFamily: 'graduate',
            }}
            placeholderTextColor='#7a0019'
            required
          />
        </Item>
        <Item
          regular
          style={{
            marginBottom: 10,
            borderColor: '#710019',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
          }}
        >
          <Input
            required
            placeholder='Password'
            style={{ color: '#7a0019', fontFamily: 'graduate' }}
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry
            textContentType='password'
            autoCapitalize='none'
            placeholderTextColor='#7a0019'
          />
        </Item>
        <Button
          block
          style={styles.mainButton}
          type='submit'
          onPress={async () => {
            setLoading(true);
            await joinTournament({ variables: { name, password } });
            userRefetch();
            setName(null);
            setPassword(null);
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? (
            <Spinner color='#7a0019' />
          ) : (
            <Text style={styles.mainButtonText}>Join Pool</Text>
          )}
        </Button>
      </Form>
      {error && <ErrorMessage errorMessage={error} error={props.joinError} />}
    </Form>
  );
};
export default JoinPool;
