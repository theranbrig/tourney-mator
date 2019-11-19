import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { List } from 'native-base';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';
import { FirebaseContext } from '../src/utilities/Firebase';
import '@firebase/firestore';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { TOURNAMENT_INFORMATION_QUERY } from '../src/utilities/Queries';
import MemberItem from '../src/components/MemberItem';

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
      setDocSnap(liveTournamentFirebaseValue.data());
      console.log(docSnap);
    }
  }, [liveTournamentFirebaseValue, data]);

  return (
    <Layout title="Pools">
      <BackButtonHeader history={history} title="Ready" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Waiting For Tournament Members</Text>
        <List>
          {docSnap &&
            docSnap.currentMembers.length &&
            docSnap.currentMembers.map(member => <MemberItem memberId={member} />)}
        </List>
      </View>
    </Layout>
  );
};

export default WaitingTournamentScreen;
