import React, { useState, useContext } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, View } from 'native-base';
import {StyleSheet} from 'react-native'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from '../src/utilities/Layout';
import { LOGIN_MUTATION } from '../src/utilities/Mutations';
import {CURRENT_USER_QUERY, UserContext} from '../src/utilities/UserContext'


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

  },

  form: {
    width: '90%',
    backgroundColor: "#7a0019"

  },
  contentArea: {
    backgroundColor: "#7a0019"
  }
});

const LoginScreen = ({ history }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null)
  const [login, { data }] = useMutation(LOGIN_MUTATION, { refetchQueries: ["CURRENT_USER_QUERY"], awaitRefetchQueries: true });
  const { userRefetch } = useContext(UserContext);

  return (
    <Layout>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7a0019' }}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={{color: "#f3f3f3"}}>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={email}
              onChangeText={email => setEmail(email)}
              textContentType="emailAddress"
              autoCapitalize="none"
              style={{color: "#f3f3f3"}}
              />
          </Item>
          <Item floatingLabel last>
            <Label style={{color: "#f3f3f3"}}>Password</Label>
            <Input
              style={{color: "#f3f3f3"}}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
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
        <View>
          <Button transparent onPress={() => history.push('/signup')}>
            <Text style={{color: "#f3f3f3"}}>Go To Sign Up Screen</Text>
          </Button>
        </View>

      </View>
    </Layout>
  );
};
export default LoginScreen;
