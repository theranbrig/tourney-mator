import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, View } from 'native-base';
import {StyleSheet} from 'react-native'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from '../src/utilities/Layout';
import { LOGIN_MUTATION } from '../src/utilities/Mutations';
import {CURRENT_USER_QUERY} from '../src/utilities/UserContext'

const styles = StyleSheet.create({
  mainButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    borderColor: '#7a0019',
    backgroundColor: '#ffcc33',
    borderWidth: 2,
  },
  mainButtonText: {
    fontSize: 20,
    color: '#7a0019',
    textAlign: 'center'
  },
});

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [login, { data }] = useMutation(LOGIN_MUTATION, { refetchQueries: ["CURRENT_USER_QUERY"], awaitRefetchQueries: true });
  return (
    <Layout>
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email Address</Label>
              <Input
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email)}
                textContentType="emailAddress"
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
              />
            </Item>
            <Button
              style={styles.mainButton}
              type="submit"
              onPress={async () => {
                await login({ variables: { email, password } });
                navigation.navigate('Home')
              }}
              >
              <Text style={styles.mainButtonText}>Login</Text>
            </Button>
          </Form>
          <View>

            <Button style={styles.mainButton} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.mainButtonText}>Go To Sign Up Screen</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </Layout>
  );
};
export default LoginScreen;
