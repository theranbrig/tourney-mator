import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';
import { FirebaseContext } from '../src/utilities/Firebase';
import '@firebase/firestore';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { TOURNAMENT_INFORMATION_QUERY } from '../src/utilities/Queries';

const WaitingTournamentScreen = ({ history }) => {
  const [docSnap, setDocSnap] = useState(null);

  const { loading, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: history.location.state.tournamentId },
  });

  const { tournament } = data;

  const { firebase } = useContext(FirebaseContext);

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
      console.log(JSON.stringify(liveTournamentFirebaseValue.data()));
      setDocSnap(JSON.stringify(liveTournamentFirebaseValue.data()));

    }
  }, [liveTournamentFirebaseValue, data]);

  return (
    <Layout title='Pools'>
      <BackButtonHeader history={history} title='Ready' />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Waiting For Tournament Members</Text>

        {/* {docSnap.currentMembers && docSnap.currentMembers.map(member => <Text>{member}</Text>)} */}
      </View>
    </Layout>
  );
};

export default WaitingTournamentScreen;
