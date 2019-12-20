import React, { useEffect, useContext } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TOURNAMENT_TEAM_MUTATION } from '../utilities/Mutations';
import NextUp from './NextUp';
import { FirebaseContext } from '../utilities/Firebase';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember, tournamentId }) => {
  const [addTournamentTeam] = useMutation(ADD_TOURNAMENT_TEAM_MUTATION);

  const { nextPick, removeTeam, previousPick } = useContext(FirebaseContext);

  // TODO: NEEDS TO BE MOVED OUT FOR REUSABLITY
  const selectTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * firebaseTournamentInfo.teams.length);
    const pick = firebaseTournamentInfo.teams[randomTeamNumber];
    await addTournamentTeam({
      variables: { tournamentMemberId: currentMember, teamId: pick.id },
    });
    const newTeamList = firebaseTournamentInfo.teams.filter(team => team.id !== pick.id);
    removeTeam(tournamentId, newTeamList);
    const newPickOrder = firebaseTournamentInfo.pickOrder.map(member => member);
    const previousPicks = firebaseTournamentInfo.previousPicks.map(member => member);
    previousPicks.unshift({
      username: firebaseTournamentInfo.pickOrder[0].user.username,
      team: pick.name,
      seed: pick.seed,
    });
    if (previousPicks.length > 3) {
      previousPicks.pop();
    }
    console.log('PREVIOUS', previousPicks);
    previousPick(tournamentId, previousPicks);
    newPickOrder.shift();
    nextPick(tournamentId, newPickOrder);
  };

  useEffect(() => {
    console.log('EQUAL', firebaseTournamentInfo.pickOrder[0].id === currentMember);
  }, [firebaseTournamentInfo, currentMember]);

  return (
    <View style={{ height: 400, width: '100%' }}>
      {/* TODO: TIMER */}
      <NextUp
        current={firebaseTournamentInfo.pickOrder[0].user.username}
        next={firebaseTournamentInfo.pickOrder[1].user.username}
        later={firebaseTournamentInfo.pickOrder[2].user.username}
      />
      {/* TODO: PREVIOUS THREE PICKS */}
      {firebaseTournamentInfo.pickOrder[0].id === currentMember && (
        <Button onPress={() => selectTeam()}>
          <Text>Pick Now</Text>
        </Button>
      )}
      {/* TODO: MY CURRENT PICKS */}
    </View>
  );
};

export default SelectRandomPick;
