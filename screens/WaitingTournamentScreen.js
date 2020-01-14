import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { List, Button } from 'native-base';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';
import { FirebaseContext } from '../src/utilities/Firebase';
import '@firebase/firestore';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { TOURNAMENT_INFORMATION_QUERY, TOURNAMENT_GROUP_QUERY } from '../src/utilities/Queries';
import MemberItem from '../src/components/MemberItem';
import SpinningImage from 'react-native-spinning-image';
import GoldSpinner from '../src/components/SpinnerGold';
import BasketBallButton from '../src/components/BasketBallButton';

const WaitingTournamentScreen = ({ history }) => {
  const { tournamentId, admin, currentMember } = history.location.state;
  const [currentMembers, setCurrentMembers] = useState([]);
  const [docSnap, setDocSnap] = useState(null);

  const { loading: tournamentLoading, data: tournamentData } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = tournamentData;

  const { firebase, setTournamentStatus, setFirebaseTeams } = useContext(FirebaseContext);

  const [
    liveTournamentFirebaseValue: value,
    liveTournamentFirebaseLoading: loading,
    liveTournamentFirebaseError: error,
  ] = useDocument(
    firebase
      .firestore()
      .collection('tournaments')
      .doc(tournamentId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const setOrder = () => {
    setTournamentStatus(tournamentId, 'SELECTPICKS');
    history.push('/live', { tournamentId, admin, currentMember });
  };

  useEffect(() => {
    if (liveTournamentFirebaseValue) {
      setDocSnap(liveTournamentFirebaseValue.data());
      setCurrentMembers([...liveTournamentFirebaseValue.data().currentMembers]);
    }
    if (docSnap && docSnap.status === 'STARTDRAFT') {
      history.push('/live', { tournamentId, admin, currentMember });
    }
  }, [liveTournamentFirebaseValue, tournamentData, docSnap]);

  return (
    <Layout title="Pools">
      <BackButtonHeader history={history} title="Ready" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <GoldSpinner height={150} />
        {docSnap && docSnap.status === 'WAITING' && (
          <>
            <Text
              style={{
                textAlign: 'center',
                color: '#ffcc33',
                fontFamily: 'graduate',
                marginBottom: 5,
                fontSize: 25,
              }}
            >
              Waiting For All Tournament Members
            </Text>
            {currentMembers.length && (
              <List
                style={
                  currentMembers.length > 0
                    ? { width: '100%', borderTopWidth: 2, borderTopColor: '#fff' }
                    : { width: '100%' }
                }
              >
                {currentMembers.map(member => (
                  <MemberItem key={member.id} memberId={member.id} />
                ))}
              </List>
            )}

            {currentMembers.length !== 8 && (
              <View style={{ height: 200 }}>
                <BasketBallButton
                  clickFunction={setOrder}
                  disabled={currentMembers.length === 8}
                  title=" START PICKING DRAFT ORDER NOW"
                />
              </View>
            )}
          </>
        )}
      </View>
    </Layout>
  );
};

export default WaitingTournamentScreen;
