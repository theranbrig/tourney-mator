import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, View, List, ListItem } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../utilities/UserContext';
import { TOURNAMENT_INFORMATION_QUERY } from '../utilities/Queries';
import GoldSpinner from './SpinnerGold';
import { FirebaseContext } from '../utilities/Firebase';
import MemberItem from './MemberItem';

const SelectOrder = ({ tournamentInfo, tournamentId, admin }) => {
  const [pickOrder, setPickOrder] = useState([]);

  const { userRefetch, user } = useContext(UserContext); // Used to refetch data for going back to the previous page.
  const { setFirebasePickOrder } = useContext(FirebaseContext);

  const { loading, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = data;

  const selectMember = () => {
    if (tournament && pickOrder && tournamentInfo) {
      if (user.tournamentMembers.some(member => (member.id = admin))) {
        if (pickOrder.length < tournament.maxMembers && tournamentInfo.currentMembers.length > 0) {
          const pick = tournamentInfo.currentMembers[Math.floor(Math.random() * tournamentInfo.currentMembers.length)];

          setPickOrder([...pickOrder, pick]);
          setFirebasePickOrder(tournamentId, pick);
        }
      }
    }
  };

  useEffect(() => {
    if (tournament) {
      console.log(tournament);
      console.log(tournamentInfo);
    }
  }, [tournamentInfo]);

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
            <MemberItem key={pick} memberId={pick} order={index} />
          ))}
        </List>
      )}
      {tournamentInfo && tournamentInfo.currentMembers.length > 0 && (
        <Button onPress={() => selectMember()}>
          <Text>Hello</Text>
        </Button>
      )}
    </View>
  );
};

export default SelectOrder;
