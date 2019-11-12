import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';
import * as firebase from "firebase";
import "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const WaitingTournamentScreen = ({ history }) => {
  const doc = firebase
    .firestore()
    .collection("tournaments")
    .doc(history.location.state.tournamentId);

  const [
    firebaseTournamentValue: value,
    firebaseTournamentLoading: loading,
    firebaseTournamentError: error
  ] = useDocument(doc, {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  
  return(
  <Layout title='Pools'>
    <BackButtonHeader history={history} title='Ready' />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting for Tournaments</Text>
    </View>
  </Layout>
);}

export default WaitingTournamentScreen;
