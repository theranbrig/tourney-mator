import React, { useEffect, useContext } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TOURNAMENT_TEAM_MUTATION } from '../utilities/Mutations';
import NextUp from './NextUp';
import { FirebaseContext } from '../utilities/Firebase';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember, tournamentId }) => {
  const [addTournamentTeam, data] = useMutation(ADD_TOURNAMENT_TEAM_MUTATION);

  const { nextPick, removeTeam, setPreviousPick } = useContext(FirebaseContext);

  const selectTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * firebaseTournamentInfo.teams.length);
    console.log(randomTeamNumber);
    const pick = firebaseTournamentInfo.teams[randomTeamNumber];
    // await addTournamentTeam({ variables: { memberId: currentMember, teamId: pick.id } });
    const newTeamList = firebaseTournamentInfo.teams.filter(team => team.id !== pick.id);
    removeTeam(tournamentId, newTeamList);
    const newPickOrder = firebaseTournamentInfo.pickOrder.map(member => member);
    newPickOrder.shift();
    nextPick(tournamentId, newPickOrder);
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
