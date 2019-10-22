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
    borderColor: '#fc3',
    backgroundColor: '#7a0019',
    borderWidth: 2,
    width: '100%',
    borderRadius: 0,
  },
  mainButtonText: {
    fontSize: 20,
    color: '#fc3',
    fontFamily: 'graduate',
  },
  form: {
    width: '90%',
    backgroundColor: '#f3f3f3',
  },
  contentArea: {
    backgroundColor: '#f3f3f3',
  },
  title: {
    textAlign: 'center',
    color: '#7a0019',
    fontFamily: 'graduate',
    marginBottom: 10,
    marginTop: 20,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
});

const JoinPool = ({ history }) => {
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [login, { data }, onCompleted, onError] = useMutation(LOGIN_MUTATION, {
  //   refetchQueries: ['CURRENT_USER_QUERY'],
  //   awaitRefetchQueries: true,
  //   onError: error => setError(error.message),
  //   onCompleted: data => history.push('/loading', { destination: '/home' }),
  // });
  // const { userRefetch, userError } = useContext(UserContext);

  return (
    <View style={styles.mainView}>
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
            onChangeText={name => setEmail(name)}
            autoCapitalize='none'
            style={{
              color: '#f3f3f3',
              fontFamily: 'graduate',
            }}
            placeholderTextColor='#fc3'
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
            <Text style={styles.mainButtonText}>Join Pool</Text>
          )}
        </Button>
      </Form>
      <View>
        <Button transparent onPress={() => history.push('/signup')}>
          <Text style={{ color: '#f3f3f3' }}>Not yet a member?</Text>
          <Text style={{ color: '#f3f3f3' }}>Go To Sign Up Screen</Text>
        </Button>
      </View>
      {error && <ErrorMessage errorMessage={error} error={error.message} />}
    </View>
  );
};
export default JoinPool;
