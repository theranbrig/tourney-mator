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
import { StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SpinningImage from 'react-native-spinning-image';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';
import { UserContext } from '../src/utilities/UserContext';
import {
  REMOVE_POOL_MUTATION,
  CREATE_TOURNAMENT_REQUEST_MUTATION,
} from '../src/utilities/Mutations';
import { TOURNAMENT_INFORMATION_QUERY } from '../src/utilities/Queries';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Error from '../src/components/ErrorMessage';
import { FirebaseContext } from '../src/utilities/Firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

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
    fontSize: 25,
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
  const [currentMember, setCurrentMember] = useState(null);
  const [tournamentInfo, setTournamentInfo] = useState(null);
  const [email, setEmail] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [admin, setAdmin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const { firebase, setLiveUserData, firebaseValue, createTournamentData } = useContext(
    FirebaseContext
  );

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

  const removeTournamentAlert = () => {
    Alert.alert('Remove Pool?', 'Are you sure you want to remove this pool?', [
      { text: 'NO', onPress: () => console.warn('Thanks for staying'), style: 'cancel' },
      {
        text: 'YES',
        onPress: async () => {
          await removeTournament();
          console.warn('Sorry to see you go.');
        },
      },
    ]);
  };

  const [
    liveTournamentFirebaseValue: value,
    liveTournamentFirebaseLoading: loading,
    liveTournamentFirebaseError: error,
  ] = useDocument(
    firebase
      .firestore()
      .collection('tournaments')
      .doc(history.location.state.tournamentId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [
    createTournamentRequest,
    requestOnCompleted: onCompleted,
    requestLoading: loading,
    onError,
  ] = useMutation(CREATE_TOURNAMENT_REQUEST_MUTATION, {
    variables: { tournament: history.location.state.tournamentId, userEmail: email },
    onError: async error => setError(error.message),
  });

  const { tournament } = data;

  useEffect(() => {
    if (tournament) {
      const adminRole = tournament.tournamentMembers.filter(member => member.role === 'ADMIN');
      setAdmin(adminRole[0].user.id);
      const currentTournamentMember = tournament.tournamentMembers.filter(
        member => (member.user.id = user.id)
      );
      setCurrentMember(currentTournamentMember[0].id);
      setTournamentInfo(liveTournamentFirebaseValue.data());
    }
  }, [data, requestOnCompleted, onError, liveTournamentFirebaseValue]);

  if (loading)
    return (
      <Layout title="Pools">
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
    <Layout title="Pools" style={{ backgroundColor: '#7a0019' }}>
      <BackButtonHeader history={history} title="Pool Info" />
      <View style={styles.mainView}>
        <ScrollView
          bounces
          endFillColor="#7a0019"
          style={{ width: '100%', marginTop: 20, marginBottom: 20, backgroundColor: '#7a0019' }}
        >
          {tournament && (
            <>
              <View style={{ marginBottom: 10, backgroundColor: '#7a0019' }}>
                <View>
                  <Text style={styles.title}>{tournament.name}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.subTitle}>{tournament.startDate} </Text>
                    <Text style={styles.subTitle}>~ {tournament.type}</Text>
                  </View>
                </View>
              </View>
              <List
                style={{
                  backgroundColor: '#fc3',
                  width: '100%',
                  borderTopWidth: 2,
                  borderTopColor: '#fff',
                }}
              >
                {tournament.tournamentMembers.map((member, index) => (
                  <ListItem
                    style={{
                      backgroundColor: '#fc3',
                      width: '100%',
                      height: 50,
                      borderColor: '#7a0019',
                      marginLeft: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: '#fff',
                    }}
                    key={member.user.id}
                  >
                    <Body>
                      <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>
                        {member.user.username}
                      </Text>
                    </Body>
                    <Right>
                      <Button style={{ backgroundColor: '#fc3' }}>
                        {member.user.id === admin ? (
                          <Icon name="star" size={30} color="#7a0019" />
                        ) : (
                          <Icon name="account-outline" size={30} color="#7a0019" />
                        )}
                      </Button>
                    </Right>
                  </ListItem>
                ))}
              </List>
              {admin === user.id && (
                <Button
                  block
                  style={styles.mainButton2}
                  onPress={() => {
                    createTournamentData(tournament.id, currentMember);
                    setMessage('Taking you to the big show...');
                    history.push('/waiting', { tournamentId: tournament.id });
                  }}
                >
                  <Text style={styles.mainButtonText}>Begin Pool Now</Text>
                </Button>
              )}

              <Form style={styles.form}>
                <Item regular style={{ marginBottom: 10 }}>
                  <Input
                    placeholder="Email Address"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    style={{ color: '#f3f3f3', fontFamily: 'graduate' }}
                    placeholderTextColor="#fc3"
                  />
                </Item>
                <Button
                  block
                  style={styles.mainButton}
                  onPress={() => {
                    createTournamentRequest();
                    setMessage(`Tournament request sent to ${email}.  Waiting for confirmation`);
                  }}
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
              {message !== '' && (
                <View
                  style={{
                    backgroundColor: '#fc3',
                    width: '90%',
                    marginLeft: '5%',
                    borderColor: '#fff',
                    borderWidth: 2,
                    padding: 10,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: '#7a0019',
                      fontFamily: 'graduate',
                      textAlign: 'center',
                    }}
                  >
                    {message}
                  </Text>
                </View>
              )}
              {admin === user.id && (
                <Button
                  block
                  style={styles.mainButton2}
                  onPress={() => {
                    removeTournamentAlert();
                  }}
                >
                  <Text style={styles.mainButtonText}>Remove Pool</Text>
                </Button>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default TournamentInformationScreen;
