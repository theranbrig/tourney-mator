import React from 'react';
import { View, Text } from 'native-base';
import NextUp from './NextUp';

const SelectRandomPick = ({ firebaseTournamentInfo }) => {
  console.log(firebaseTournamentInfo);
  return (
    <View>
      <NextUp
        current={firebaseTournamentInfo.pickOrder[0].user.username}
        next={firebaseTournamentInfo.pickOrder[1].user.username}
        later={firebaseTournamentInfo.pickOrder[2].user.username}
      />
    </View>
  );
};

export default SelectRandomPick;
