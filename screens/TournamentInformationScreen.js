import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SpinningImage from 'react-native-spinning-image';
import Layout from '../src/utilities/Layout';
import Header from '../src/components/Header';

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
  },
  contentArea: {
    backgroundColor: '#7a0019',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 20,
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
});

const TOURNAMENT_INFORMATION_QUERY = gql`
  query TOURNAMENT_INFORMATION_QUERY($id: ID!) {
    tournament(where: { id: $id }) {
      id
      type
      name
      startDate
      members {
        id
        username
      }
    }
  }
`;

const TournamentInformationScreen = ({ history }) => {
  const { loading, error, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: history.location.state.tournamentId },
  });
  const { tournament } = data;
  console.log(tournament);

  return (
    <Layout title='Pools'>
      <Header history={history} title='Pool Info' />
      <View style={styles.mainView}>
        {loading && (
          <View style={{ height: 350 }}>
            <Image
              style={{ width: 300, height: 250 }}
              source={require('../assets/images/goldBasketball.png')}
            />
          </View>
        )}
        {tournament !== undefined && (
          <>
            <Text>{tournament.name}</Text>
            <Text>{tournament.startDate}</Text>
            <Text>{tournament.name} Members</Text>
            {tournament.members.map(member => (
              <Text>{member.username}</Text>
            ))}
          </>
        )}
      </View>
    </Layout>
  );
};

export default TournamentInformationScreen;
