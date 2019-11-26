import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import SelectOrder from '../src/components/SelectOrder';
import { FirebaseContext } from '../src/utilities/Firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

const LiveTournamentScreen = ({ history }) => {
  const [docSnap, setDocSnap] = useState(null);

  const { firebase, startTournament } = useContext(FirebaseContext);

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

  useEffect(() => {
    if (liveTournamentFirebaseValue) {
      setDocSnap(liveTournamentFirebaseValue.data());
      console.log(docSnap);
    }
  }, [liveTournamentFirebaseValue]);

  return (
    <Layout title="Pools">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Live Tournament</Text>
        <SelectOrder tournamentInfo={docSnap} tournamentId={history.location.state.tournamentId} />
      </View>
    </Layout>
  );
};

export default LiveTournamentScreen;
