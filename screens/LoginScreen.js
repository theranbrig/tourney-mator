import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, View } from 'native-base';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Layout from './Layout';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [login, { data }] = useMutation(LOGIN_MUTATION);
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
              type="submit"
              onPress={() => {
                login({ variables: { email, password } });
                console.log(data);
              }}
            >
              <Text>Login</Text>
            </Button>
          </Form>
          <View>
            <Button onPress={() => navigation.navigate('SignUp')}>
              <Text>Go To Sign Up Screen</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </Layout>
  );
};
export default LoginScreen;
