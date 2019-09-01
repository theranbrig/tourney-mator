import React, { useState, useContext, useEffect } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, View, H1 } from 'native-base';
import {StyleSheet, StatusBar} from 'react-native'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from '../src/utilities/Layout';
import { LOGIN_MUTATION } from '../src/utilities/Mutations';
import {CURRENT_USER_QUERY, UserContext} from '../src/utilities/UserContext'
import ErrorMessage from '../src/components/ErrorMessage'


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
    fontFamily: 'graduate'
  },

  form: {
    width: '90%',
    backgroundColor: "#7a0019"

  },
  contentArea: {
    backgroundColor: "#7a0019"
  },
  title: {
    textAlign: 'center',
    color: "#ffcc33",
    fontFamily: 'graduate',
    marginBottom: 10
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a0019'
  }
});

const LoginScreen = ({ history }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null)
  const [login, { data }] = useMutation(LOGIN_MUTATION, { refetchQueries: ["CURRENT_USER_QUERY"], awaitRefetchQueries: true });
  const { userRefetch, userError } = useContext(UserContext);

  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainView}>
        <Form style={styles.form}>
          <H1 style={styles.title}>Tourney-mator</H1>
          <Item regular style={{marginBottom: 10}} >
            <Input
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={email => setEmail(email)}
              textContentType="emailAddress"
              autoCapitalize="none"
              style={{color: "#f3f3f3", fontFamily: 'graduate'}}
              placeholderTextColor="#fc3"
              />
          </Item>
          <Item regular>
            <Input
              placeholder="Password"
              style={{color: "#f3f3f3", fontFamily: 'graduate'}}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
              placeholderTextColor="#fc3"
              />
          </Item>
          <Button
            block
            style={styles.mainButton}
            type="submit"
            onPress={async () => {
              await login({ variables: { email, password } });
              userRefetch()
              history.push('/home')
            }}
            >
            <Text style={styles.mainButtonText}>Login</Text>
          </Button>
        </Form>
        {userError && <ErrorMessage error={userError}/>}
        <View>
          <Button transparent onPress={() => history.push('/signup')}>
            <Text style={{color: "#f3f3f3"}}>Not yet a member?</Text>
            <Text style={{color: "#f3f3f3"}}>Go To Sign Up Screen</Text>
          </Button>
        </View>
      </View>
    </Layout>
  );
};
export default LoginScreen;
