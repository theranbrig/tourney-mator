import React, { useState, useEffect, useContext } from 'react';
import { Text, Button } from 'native-base';
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
            console.log(pick);
            console.log('Hello');
            // TODO: Set user to pick in Firebase
          }, 5000);
        }
      }
    }
  };
  useEffect(() => {
    if (tournamentInfo) {
      setPickOrder(tournamentInfo.pickOrder);
    }
  }, [pickOrder, tournamentInfo, data]);

  if (loading) return <GoldSpinner />;

  return (
    <Button onPress={() => selectMember()}>
      <Text>Hello</Text>
    </Button>
  );
};

export default SelectOrder;
