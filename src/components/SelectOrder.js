import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'native-base';
import { UserContext } from '../utilities/UserContext';
import { TOURNAMENT_INFORMATION_QUERY } from '../utilities/Queries';
import { useQuery } from '@apollo/react-hooks';
import GoldSpinner from './SpinnerGold';

const SelectOrder = ({ tournamentInfo, tournamentId }) => {
  const [pickOrder, setPickOrder] = useState([]);

  const { userRefetch, user } = useContext(UserContext); // Used to refetch data for going back to the previous page.

  const { loading, data, refetch } = useQuery(TOURNAMENT_INFORMATION_QUERY, {
    variables: { id: tournamentId },
  });

  const { tournament } = data;

  useEffect(() => {
    if (tournament && pickOrder && tournamentInfo) {
      if (pickOrder.length < tournament.maxMembers) {
        setTimeout(() => {
          const pick =
            tournamentInfo.currentMembers[
              Math.floor(Math.random() * tournamentInfo.currentMembers.length)
            ];
          console.log(pick);
          console.log('Hello');
        }, 5000);
      }
    }
  }, [pickOrder, tournamentInfo, data]);

  if (loading) return <GoldSpinner />;

  return <Text>Hello</Text>;
};

export default SelectOrder;
