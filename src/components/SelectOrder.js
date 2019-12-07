import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, View, List } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../utilities/UserContext';
import { TOURNAMENT_INFORMATION_QUERY } from '../utilities/Queries';
import GoldSpinner from './SpinnerGold';
import { FirebaseContext } from '../utilities/Firebase';
import MemberItem from './MemberItem';

const SelectOrder = ({ tournamentInfo, tournamentId, admin }) => {
  const [pickOrder, setPickOrder] = useState([]);

  const { user } = useContext(UserContext); // Used to refetch data for going back to the previous page.
  const { setFirebasePickOrder, setTournamentStatus } = useContext(FirebaseContext);

  const { loading, data } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = data;

  const selectMember = () => {
    if (tournament && pickOrder && tournamentInfo) {
      if (user.tournamentMembers.some(member => (member.id = admin))) {
        if (pickOrder.length < tournament.maxMembers && tournamentInfo.currentMembers.length > 0) {
          const pick = tournamentInfo.currentMembers[Math.floor(Math.random() * tournamentInfo.currentMembers.length)];
          setPickOrder([...pickOrder, pick]);
        }
      }
    }
  };

  const goLive = () => {
    if (pickOrder.length === tournament.maxMembers) {
      let fullPickOrder = [];
      let currentRound = 1;
      const totalRounds = Math.round(64 / pickOrder.length);
      const emptyPicks = 64 % totalRounds; // To be used if not divisible by 64
      while (currentRound <= totalRounds) {
        if (currentRound % 2 !== 0) {
          fullPickOrder = [...fullPickOrder, ...pickOrder];
          console.log(fullPickOrder);
        } else {
          fullPickOrder = [...fullPickOrder, ...pickOrder.reverse()];
          console.log(fullPickOrder);
        }
        currentRound += 1;
      }
      console.log(fullPickOrder);
      setFirebasePickOrder(tournamentId, pickOrder);
      setTournamentStatus(tournamentId, 'STARTDRAFT');
    }
  };

  if (loading) return <GoldSpinner />;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Text>Draft Order</Text>
      {pickOrder.length > 0 && tournamentInfo.currentMembers && (
        <List
          style={{
            backgroundColor: '#fc3',
            width: '100%',
            borderTopWidth: 2,
            borderTopColor: '#fff',
          }}
        >
          {pickOrder.map((pick, index) => (
            <MemberItem key={pick.id} memberId={pick.id} order={index} />
          ))}
        </List>
      )}
      {tournamentInfo && pickOrder.length !== tournament.maxMembers && (
        <Button
          style={{
            marginTop: 10,
            borderColor: '#fc3',
            backgroundColor: '#f3f3f3',
            borderWidth: 2,
            borderRadius: 0,
            textAlign: 'center',
          }}
          onPress={() => selectMember()}
        >
          <Text
            style={{
              fontSize: 20,
              color: '#7a0019',
              fontFamily: 'graduate',
              textAlign: 'center',
            }}
          >
            SELECT NEXT IN DRAFT ORDER
          </Text>
        </Button>
      )}
      {pickOrder.length === tournament.maxMembers && (
        <View>
          <Button
            style={{
              marginTop: 10,
              borderColor: '#fc3',
              backgroundColor: '#f3f3f3',
              borderWidth: 2,
              borderRadius: 0,
              textAlign: 'center',
            }}
            onPress={() => goLive()}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#7a0019',
                fontFamily: 'graduate',
                textAlign: 'center',
              }}
            >
              Set Picks
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default SelectOrder;
