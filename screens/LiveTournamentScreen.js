import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import Layout from '../src/utilities/Layout';
import SelectOrder from '../src/components/SelectOrder';
import { FirebaseContext } from '../src/utilities/Firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserContext } from '../src/utilities/UserContext';
import SelectRandomPick from '../src/components/SelectRandomPick';

const LiveTournamentScreen = ({ history }) => {
  const [docSnap, setDocSnap] = useState(null);
  const [tournamentStatus, setTournamentStatus] = useState('SELECTPICKS');
  const { tournamentId, admin, currentMember } = history.location.state;

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
    }
  }, [liveTournamentFirebaseValue]);

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {docSnap && docSnap.status === 'SELECTPICKS' && (
          <SelectOrder firebaseTournamentInfo={docSnap} tournamentId={tournamentId} admin={admin} />
        )}
        {docSnap && docSnap.status === 'STARTDRAFT' && (
          <SelectRandomPick
            firebaseTournamentInfo={docSnap}
            tournamentId={tournamentId}
            currentMember={currentMember.id}
          />
        )}
        {docSnap && docSnap.status === 'PICKS' && <Text>Set Order</Text>}
        {docSnap && docSnap.status === 'RESULTS' && <Text>Set Order</Text>}
      </SafeAreaView>
    </Layout>
  );
};

export default LiveTournamentScreen;
