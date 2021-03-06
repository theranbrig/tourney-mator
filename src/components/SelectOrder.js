import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, View, List } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { StyleSheet } from 'react-native';
import { UserContext } from '../utilities/UserContext';
import { TOURNAMENT_INFORMATION_QUERY } from '../utilities/Queries';
import GoldSpinner from './SpinnerGold';
import { FirebaseContext } from '../utilities/Firebase';
import MemberItem from './MemberItem';

import { mainStyles } from '../utilities/Styles';
import BasketBallButton from './BasketBallButton';

const SelectOrder = ({ firebaseTournamentInfo, tournamentId, admin }) => {
  const [pickOrder, setPickOrder] = useState([]);

  const { user } = useContext(UserContext); // Used to refetch data for going back to the previous page.
  const { setFirebasePickOrder, setTournamentStatus } = useContext(FirebaseContext);

  const { loading, data } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = data;

  const selectMember = () => {
    if (tournament && pickOrder && firebaseTournamentInfo) {
      if (user.tournamentMembers.some(member => (member.id = admin))) {
        if (pickOrder.length < tournament.maxMembers && firebaseTournamentInfo.currentMembers.length > 0) {
          const pick =
            firebaseTournamentInfo.currentMembers[
              Math.floor(Math.random() * firebaseTournamentInfo.currentMembers.length)
            ];
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
      setFirebasePickOrder(tournamentId, fullPickOrder);
      setTournamentStatus(tournamentId, 'STARTDRAFT');
    }
  };

  // if (loading) return <GoldSpinner />;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Text style={mainStyles.goldTitle}>Draft Order</Text>
      <List style={pickOrder.length > 0 ? mainStyles.listWithItems : mainStyles.listNoItems}>
        {pickOrder.length > 0 && firebaseTournamentInfo.currentMembers && (
          <>
            {pickOrder.map((pick, index) => (
              <MemberItem key={pick.id} memberId={pick.id} order={index} />
            ))}
          </>
        )}
      </List>
      {firebaseTournamentInfo && pickOrder.length !== tournament.maxMembers && (
        <View style={{ height: 200 }}>
          <BasketBallButton clickFunction={selectMember} disabled={false} title="SELECT NEXT IN DRAFT ORDER" />
        </View>
      )}
      {pickOrder.length === tournament.maxMembers && (
        <View style={{ height: 200 }}>
          <BasketBallButton clickFunction={goLive} disabled={false} title="TO THE DRAFT" />
        </View>
      )}
    </View>
  );
};

export default SelectOrder;
