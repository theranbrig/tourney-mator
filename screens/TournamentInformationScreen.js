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
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SpinningImage from 'react-native-spinning-image';
import Layout from '../src/utilities/Layout';
import Header from '../src/components/Header';
import { UserContext } from '../src/utilities/UserContext';
import { REMOVE_POOL_MUTATION, CREATE_TOURNAMENT_REQUEST } from '../src/utilities/Mutations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    marginTop: 100,
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
  },
  mainButton2: {
    marginTop: 10,
    borderColor: '#fc3',
    backgroundColor: '#f3f3f3',
    borderWidth: 2,
    width: '90%',
    borderRadius: 0,
    marginLeft: '5%',
    marginTop: 100,
  },
  subTitle: {
    textAlign: 'center',
    color: '#f3f3f3',
    fontFamily: 'graduate',
    fontSize: 20,
  },
});

const TOURNAMENT_INFORMATION_QUERY = gql`
  query TOURNAMENT_INFORMATION_QUERY($id: ID!) {
    tournament(where: { id: $id }) {
      id
      type
      name
      startDate
      tournamentMembers {
        user {
          id
          username
        }
        role
      }
    }
  }
`;

const TournamentInformationScreen = ({ history }) => {
  const { userRefetch, user } = useContext(UserContext); // Used to refetch data for going back to the previous page.
  const [email, setEmail] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState(null);

  const { loading, error, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: history.location.state.tournamentId },
  });

  const [removeTournament, onCompleted] = useMutation(REMOVE_POOL_MUTATION, {
    variables: { id: history.location.state.tournamentId },
    onCompleted: async data => {
      await userRefetch();
      history.push('/pools');
    },
  });

  const [createTournamentRequest, requestOnCompleted: onCompleted] = useMutation(
    CREATE_TOURNAMENT_REQUEST,
    {
      variables: { tournament: history.location.state.tournamentId, userEmail: email },
      requestOnCompleted: async data => {
        setMessage(`Tournament request sent to ${email}.  Waiting for confirmation`);
      },
    }
  );

  const { tournament } = data;

  useEffect(() => {
    if (tournament && tournament.tournamentMembers.length) {
      const adminCheck = tournament.tournamentMembers.filter(member => member.role === 'ADMIN');
      if (adminCheck[0].user.id === user.id) {
        setAdminRole(true);
      }
      setAdmin(adminCheck[0].user.id);
      console.log(admin);
    }
  }, [data, user, message]);

  return (
    <Layout title='Pools'>
      <Header history={history} title='Pool Info' />
      <View style={styles.mainView}>
        {loading && (
          <>
            <Text style={styles.title}>Loading Pool Information...</Text>
            <View style={{ height: 350 }}>
              <Image
                style={{ width: 300, height: 250 }}
                source={require('../assets/images/goldBasketball.png')}
              />
            </View>
          </>
        )}
        {tournament && (
          <>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.title}>{tournament.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subTitle}>{tournament.startDate} </Text>
                <Text style={styles.subTitle}>~ {tournament.type}</Text>
              </View>
            </View>
            <List style={{ backgroundColor: '#fc3', width: '100%' }}>
              {tournament.tournamentMembers.map(member => (
                <ListItem
                  style={{ backgroundColor: '#fc3', width: '100%', height: 50 }}
                  key={member.user.id}
                >
                  <Body>
                    <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>
                      {member.user.username}
                    </Text>
                  </Body>
                  {admin === user.id && (
                    <Right>
                      <Button style={{ backgroundColor: '#fc3' }}>
                        <Icon name='star' size={30} color='#7a0019' style={{ paddingRight: 10 }} />
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
              <Button block style={styles.mainButton} onPress={() => createTournamentRequest()}>
                <Text style={styles.mainButtonText}>Send Invitation</Text>
              </Button>
            </Form>
            {adminRole && (
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
            {message !== null && <Text>{message}</Text>}
          </>
        )}
      </View>
    </Layout>
  );
};

export default TournamentInformationScreen;