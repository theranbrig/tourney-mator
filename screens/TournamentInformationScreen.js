import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Form,
  Button,
  Input,
  Item,
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner,
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SpinningImage from 'react-native-spinning-image';
import Layout from '../src/utilities/Layout';
import Header from '../src/components/Header';
import { UserContext } from '../src/utilities/UserContext';
import {
  REMOVE_POOL_MUTATION,
  CREATE_TOURNAMENT_REQUEST_MUTATION,
} from '../src/utilities/Mutations';
import { TOURNAMENT_INFORMATION_QUERY } from '../src/utilities/Queries';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Error from '../src/components/ErrorMessage';

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
    marginBottom: 10,
    marginTop: 50,
    marginLeft: '5%',
    justifyContent: 'center',
  },
  contentArea: {
    backgroundColor: '#7a0019',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 5,
    fontSize: 30,
  },
  label: {
    color: '#ffcc33',
    fontFamily: 'graduate',
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a0019',
    marginBottom: 50,
  },
  mainButton2: {
    marginTop: 10,
    borderColor: '#fc3',
    backgroundColor: '#f3f3f3',
    borderWidth: 2,
    width: '90%',
    borderRadius: 0,
    marginLeft: '5%',
    marginTop: 50,
  },
  subTitle: {
    textAlign: 'center',
    color: '#f3f3f3',
    fontFamily: 'graduate',
    fontSize: 20,
  },
});

const TournamentInformationScreen = ({ history }) => {
  const { userRefetch, user } = useContext(UserContext); // Used to refetch data for going back to the previous page.
  const [email, setEmail] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [admin, setAdmin] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { loading, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: history.location.state.tournamentId },
  });

  const [removeTournament, onCompleted] = useMutation(REMOVE_POOL_MUTATION, {
    variables: { id: history.location.state.tournamentId },
    onCompleted: async data => {
      await userRefetch();
      history.push('/pools');
    },
  });

  const [
    createTournamentRequest,
    requestOnCompleted: onCompleted,
    requestLoading: loading,
    onError,
  ] = useMutation(CREATE_TOURNAMENT_REQUEST_MUTATION, {
    variables: { tournament: history.location.state.tournamentId, userEmail: email },
    requestOnCompleted: async data => {
      console.log('REQUEST DATA', data);
      setMessage(`Tournament request sent to ${email}.  Waiting for confirmation`);
    },
    onError: async error => setError(error.message),
  });

  const { tournament } = data;

  useEffect(() => {
    console.log(tournament);
    if (tournament) {
      const adminRole = tournament.tournamentMembers.filter(member => member.role === 'ADMIN');
      setAdmin(adminRole[0].user.id);
    }
    console.log('Error', error);
  }, [data, requestOnCompleted, onError]);

  if (loading)
    return (
      <Layout title='Pools'>
        <View style={styles.mainView}>
          <Text style={styles.title}>Loading Pool Information...</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ height: 350 }}>
              <Image
                style={{ width: 300, height: 250 }}
                source={require('../assets/images/goldBasketball.png')}
              />
            </View>
          </View>
        </View>
      </Layout>
    );

  return (
    <Layout title='Pools' style={{ backgroundColor: '#7a0019' }}>
      <Header history={history} title='Pool Info' />
      <View style={styles.mainView}>
        <ScrollView
          bounces
          endFillColor='#7a0019'
          style={{ width: '100%', marginTop: 20, marginBottom: 20, backgroundColor: '#7a0019' }}
        >
          {tournament && (
            <>
              <View style={{ marginBottom: 10 }}>
                <View>
                  <Text style={styles.title}>{tournament.name}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.subTitle}>{tournament.startDate} </Text>
                    <Text style={styles.subTitle}>~ {tournament.type}</Text>
                  </View>
                </View>
              </View>
              <List style={{ backgroundColor: '#fc3', width: '100%' }}>
                {tournament.tournamentMembers.map((member, index) => (
                  <ListItem
                    style={{
                      backgroundColor: '#fc3',
                      width: '100%',
                      height: 50,
                      borderColor: '#7a0019',
                      marginLeft: 0,
                    }}
                    key={member.user.id}
                  >
                    <Body>
                      <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>
                        {member.user.username}
                      </Text>
                    </Body>
                    {member.user.id === admin && (
                      <Right>
                        <Button style={{ backgroundColor: '#fc3' }}>
                          <Icon name='star' size={30} color='#7a0019' />
                        </Button>
                      </Right>
                    )}
                  </ListItem>
                ))}
              </List>

              <Form style={styles.form}>
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
                  />
                </Item>
                <Button
                  block
                  style={styles.mainButton}
                  onPress={() => createTournamentRequest()}
                  disabled={error}
                >
                  {requestLoading ? (
                    <Spinner />
                  ) : (
                    <Text style={styles.mainButtonText}>Send Invitation</Text>
                  )}
                </Button>
              </Form>
              {error && <Error errorMessage={error} />}
              {admin === user.id && (
                <Button
                  block
                  style={styles.mainButton2}
                  onPress={() => {
                    removeTournament();
                  }}
                >
                  <Text style={styles.mainButtonText}>Remove Pool</Text>
                </Button>
              )}
              {message !== null && (
                <View
                  style={{
                    backgroundColor: '#fc3',
                    width: '95%',
                    marginLeft: '2.5%',
                    borderColor: '#fff',
                  }}
                >
                  <Text
                    style={{
                      color: '#7a0019',
                      fontFamily: 'graduate',
                    }}
                  >
                    {message}
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default TournamentInformationScreen;
