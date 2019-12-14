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

const WaitingTournamentScreen = ({ history }) => {
  const { tournamentId, admin, currentMember } = history.location.state;
  const [docSnap, setDocSnap] = useState(null);
  const [listLoading, setListLoading] = useState(false);

  const { loading: tournamentLoading, data: tournamentData } = useQuery(
    TOURNAMENT_INFORMATION_QUERY,
    {
      variables: { id: tournamentId },
    }
  );

  const {loading: teamLoading, data: teamData, onCompleted} = useQuery(TOURNAMENT_GROUP_QUERY, {variables: {id: "ck3qej9qdynvx0b09uqrdf3j5"},  onCompleted: async data => {
  console.log(data)

    }} );

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

  useEffect(() => {
    if (liveTournamentFirebaseValue) {
      setDocSnap(liveTournamentFirebaseValue.data());
    }
    if (teamData) {
      console.log(teamData.teams)
    }
  }, [liveTournamentFirebaseValue, tournamentData]);

  return (
    <Layout title="Pools">
      <BackButtonHeader history={history} title="Ready" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <GoldSpinner />
        {docSnap && docSnap.status === "WAITING" && (
          <>
            <Text
              style={{
                textAlign: 'center',
                color: '#ffcc33',
                fontFamily: 'graduate',
                marginBottom: 5,
                fontSize: 25,
              }}>
              Waiting For All Tournament Members
            </Text>
            <List
              style={{
                backgroundColor: '#fc3',
                width: '100%',
                borderTopWidth: 2,
                borderTopColor: '#fff',
              }}>
              {docSnap.currentMembers.map(member => (
                <MemberItem key={member} memberId={member.id}  />
              ))}
            </List>
            {docSnap && (docSnap.currentMembers.length !== tournament.maxMember) && (
              <Button
                onPress={() => {
                  setTournamentStatus(tournamentId, "SELECTPICKS");
                  history.push('/live', { tournamentId, admin, currentMember });
                }}
                block
                style={{
                  borderColor: '#fc3',
                  backgroundColor: '#f3f3f3',
                  borderWidth: 2,
                  width: '90%',
                  borderRadius: 0,
                  marginLeft: '5%',
                  marginTop: 40,
                }}>
                <Text style={{ fontSize: 20, color: '#7a0019', fontFamily: 'graduate' }}>
                  Start Picking Now
                </Text>
              </Button>
            )}
          </>
        )}
      </View>
    </Layout>
  );
};

export default WaitingTournamentScreen;
