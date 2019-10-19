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
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from '../src/utilities/Layout';
import { LOGIN_MUTATION } from '../src/utilities/Mutations';
import { CURRENT_USER_QUERY, UserContext } from '../src/utilities/UserContext';
import ErrorMessage from '../src/components/ErrorMessage';

const styles = StyleSheet.create({
  mainButton: {
    marginTop: 10,
    borderColor: '#f3f3f3',
    backgroundColor: '#ffcc33',
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
    width: '90%',
    backgroundColor: '#7a0019',
  },
  contentArea: {
    backgroundColor: '#7a0019',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 10,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a0019',
  },
});

const LoginScreen = ({ history }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, { data }, onCompleted, onError] = useMutation(LOGIN_MUTATION, {
    refetchQueries: ['CURRENT_USER_QUERY'],
    awaitRefetchQueries: true,
    onError: error => setError(error.message),
    onCompleted: data => history.push('/loading', { destination: '/home' }),
  });
  const { userRefetch, userError } = useContext(UserContext);

  return (
    <Layout>
      <StatusBar barStyle='light-content' />
      <View style={styles.mainView}>
        <Form style={styles.form}>
          <H1 style={styles.title}>Tourney-mator</H1>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              placeholder='Email Address'
              keyboardType='email-address'
              value={email}
              onChangeText={email => setEmail(email)}
              textContentType='emailAddress'
              autoCapitalize='none'
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              placeholderTextColor='#fc3'
              required
            />
          </Item>
          <Item regular>
            <Input
              required
              placeholder='Password'
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
              textContentType='password'
              autoCapitalize='none'
              placeholderTextColor='#fc3'
            />
          </Item>
          <Button
            block
            style={styles.mainButton}
            type='submit'
            onPress={async () => {
              setLoading(true);
              await login({ variables: { email, password } });
              userRefetch();
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? (
              <Spinner color='#7a0019' />
            ) : (
              <Text style={styles.mainButtonText}>Login</Text>
            )}
          </Button>
        </Form>
        <View>
          <Button transparent onPress={() => history.push('/signup')}>
            <Text style={{ color: '#f3f3f3' }}>Not yet a member?</Text>
            <Text style={{ color: '#f3f3f3' }}>Go To Sign Up Screen</Text>
          </Button>
        </View>
        {error && <ErrorMessage errorMessage={error} />}
      </View>
    </Layout>
  );
};
export default LoginScreen;
