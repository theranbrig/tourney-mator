import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from './Layout';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      password
    }
  }
`;

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [signup, { data }] = useMutation(SIGNUP_MUTATION);
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
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                type="text"
                value={username}
                onChangeText={username => setUsername(username)}
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
              type="submit"
              onPress={() => {
                signup({ variables: { email, username, password } });
                console.log(data);
              }}
            >
              <Text>Sign Up</Text>
            </Button>
          </Form>
          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Go To Login</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Main')}>
            <Text>Go To Main</Text>
          </Button>
        </Content>
      </Container>
    </Layout>
  );
};
export default SignUpScreen;
