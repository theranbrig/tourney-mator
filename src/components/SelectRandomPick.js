import React, { useEffect, useContext } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TOURNAMENT_TEAM_MUTATION } from '../utilities/Mutations';
import NextUp from './NextUp';
import { FirebaseContext } from '../utilities/Firebase';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember }) => {
  const [addTournamentTeam, data] = useMutation(ADD_TOURNAMENT_TEAM_MUTATION);

  const [nextPick, removeTeam] = useContext(FirebaseContext);

  const selectTeam = () => {
    const pick = firebaseTournamentInfo.teams[Math.floor(Math.random() * firebaseTournamentInfo.teams.length)];
    console.log(pick.id);
  };

  useEffect(() => {
    console.log('EQUAL', firebaseTournamentInfo.pickOrder[0].id === currentMember);
  }, [firebaseTournamentInfo, currentMember]);

  return (
    <View style={{ height: 400, width: '100%' }}>
      <NextUp
        current={firebaseTournamentInfo.pickOrder[0].user.username}
        next={firebaseTournamentInfo.pickOrder[1].user.username}
        later={firebaseTournamentInfo.pickOrder[2].user.username}
      />
      {firebaseTournamentInfo.pickOrder[0].id === currentMember && (
        <Button onPress={() => selectTeam()}>
          <Text>Pick Now</Text>
        </Button>
      )}
    </View>
  );
};

export default SelectRandomPick;
