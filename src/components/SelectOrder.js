import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, View, List, ListItem } from 'native-base';
import { UserContext } from '../utilities/UserContext';
import { TOURNAMENT_INFORMATION_QUERY } from '../utilities/Queries';
import { useQuery } from '@apollo/react-hooks';
import GoldSpinner from './SpinnerGold';

const SelectOrder = ({ tournamentInfo, tournamentId, admin }) => {
  const [pickOrder, setPickOrder] = useState([]);

  const { userRefetch, user } = useContext(UserContext); // Used to refetch data for going back to the previous page.

  const { loading, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = data;

  const selectMember = () => {
    if (tournament && pickOrder && tournamentInfo) {
      if (user.tournamentMembers.some(member => (member.id = admin))) {
        if (pickOrder.length < tournament.maxMembers) {
          setTimeout(() => {
            const pick =
              tournamentInfo.currentMembers[
                Math.floor(Math.random() * tournamentInfo.currentMembers.length)
              ];
            // TODO: Set user to pick in Firebase
            setPickOrder([...pickOrder, pick]);
          }, 5000);
        }
      }
    }
  };
  useEffect(() => {
    console.log('hello');
    console.log(pickOrder);
  }, [pickOrder, tournamentInfo, data]);

  if (loading) return <GoldSpinner />;

  return (
    <View>
      {pickOrder.map(pick => (
        <Text>{pick}</Text>
      ))}
      <Button onPress={() => selectMember()}>
        <Text>Hello</Text>
      </Button>
    </View>
  );
};

export default SelectOrder;
