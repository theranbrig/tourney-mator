import React, { useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import NextUp from './NextUp';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember }) => {
  console.log('PICK', firebaseTournamentInfo.pickOrder[0].id);
  console.log('MEMBER', currentMember);

  useEffect(() => {
    console.log('EQUAL', firebaseTournamentInfo.pickOrder[0].id === currentMember);
  }, [firebaseTournamentInfo, currentMember]);
  return (
    <View>
      <NextUp
        current={firebaseTournamentInfo.pickOrder[0].user.username}
        next={firebaseTournamentInfo.pickOrder[1].user.username}
        later={firebaseTournamentInfo.pickOrder[2].user.username}
      />
      {firebaseTournamentInfo.pickOrder[0].id === currentMember && (
        <Button>
          <Text>Pick Now</Text>
        </Button>
      )}
    </View>
  );
};

export default SelectRandomPick;
