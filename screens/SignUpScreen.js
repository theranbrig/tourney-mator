import React, { useState } from 'react';
import { Container, Header, H1, Content, View, Form, Item, Input, Button, Text, Label } from 'native-base';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet } from 'react-native';
import Layout from '../src/utilities/Layout';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      password
    }
  }
`;

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

const SignUpScreen = ({ history }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [signup, { data }] = useMutation(SIGNUP_MUTATION);
  return (
    <Layout>
      <View style={styles.mainView}>
        <H1 style={styles.title}>Tourney-mator</H1>
        <Form style={styles.form}>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              keyboardType="email-address"
              value={email}
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              onChangeText={email => setEmail(email)}
              textContentType="emailAddress"
              autoCapitalize="none"
              placeholder="Email Address"
              placeholderTextColor="#fc3"
            />
          </Item>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              type="text"
              value={username}
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              onChangeText={username => setUsername(username)}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor="#fc3"
            />
          </Item>
          <Item regular style={{ marginBottom: 10 }}>
            <Input
              value={password}
              style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
              onChangeText={password => setPassword(password)}
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#fc3"
            />
          </Item>
          <Button
            style={styles.mainButton}
            block
            type="submit"
            onPress={async () => {
              await signup({ variables: { email, username, password } });
              history.push('/home');
            }}
          >
            <Text style={styles.mainButtonText}>Sign Up</Text>
          </Button>
        </Form>
        <Button transparent onPress={() => history.push('/login')}>
          <Text style={{ color: '#f3f3f3' }}>Already a member?</Text>
          <Text style={{ color: '#f3f3f3' }}>Go To Login</Text>
        </Button>
        <Button transparent onPress={() => history.push('/home')}>
          <Text style={{ color: '#f3f3f3' }}>Go To Main</Text>
        </Button>
      </View>
    </Layout>
  );
};
export default SignUpScreen;
