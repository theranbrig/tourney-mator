import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Form, Button, Input, Item } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SpinningImage from 'react-native-spinning-image';
import Layout from '../src/utilities/Layout';
import Header from '../src/components/Header';
import { UserContext } from '../src/utilities/UserContext';
import { REMOVE_POOL_MUTATION } from '../src/utilities/Mutations';

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
    marginBottom: 20,
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

  const { tournament } = data;
  console.log(tournament);
  const [email, setEmail] = useState(null);
  console.log(user.id);
  if (tournament) {
    const isAdmin = tournament.tournamentMembers.some(member => {
      return member.user.id === user.id && member.role === 'ADMIN';
    });
    console.log(isAdmin);
    tournament.tournamentMembers.forEach(member => {
      console.log(member.role);
    });
  }

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
        {tournament !== undefined && (
          <>
            <Text>{tournament.name}</Text>
            <Text>{tournament.startDate}</Text>
            <Text>{tournament.type}</Text>
            <Text>{tournament.name} Members</Text>
            {tournament.tournamentMembers.map(member => (
              <Text>{member.user.username}</Text>
            ))}
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
              <Button block style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Send Invitation</Text>
              </Button>
            </Form>
            <Button
              block
              style={styles.mainButton2}
              onPress={() => {
                if (isAdmin) {
                  removeTournament();
                }
              }}
            >
              <Text style={styles.mainButtonText}>Remove Pool</Text>
            </Button>
          </>
        )}
      </View>
    </Layout>
  );
};

export default TournamentInformationScreen;
