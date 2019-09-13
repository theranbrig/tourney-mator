import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Form, Item, Label, Input, Button, Picker, Icon, DatePicker, H1 } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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
  if (loading) {
    return <Text>Loading</Text>;
  }
  console.log(data.tournament);

  return (
    <Layout title="Pools">
      <Header history={history} title="Create Pool" />
      <View style={styles.mainView}>{data.tournament !== undefined && <Text>{data.tournament.name}</Text>}</View>
    </Layout>
  );
};

export default TournamentInformationScreen;
