import React, { useEffect, useContext } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TOURNAMENT_TEAM_MUTATION } from '../utilities/Mutations';
import NextUp from './NextUp';
import { FirebaseContext } from '../utilities/Firebase';

import { mainStyles } from '../utilities/Styles';
import PreviousPicks from './PreviousPicks';
import CurrentPick from './CurrentPick';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember, tournamentId }) => {
  const [addTournamentTeam] = useMutation(ADD_TOURNAMENT_TEAM_MUTATION);

  const { nextPick, removeTeam, previousPick, remainingPicks } = useContext(FirebaseContext);

  const currentPickNumber = 64 - firebaseTournamentInfo.pickOrder.length + 1;

  // TODO: NEEDS TO BE MOVED OUT FOR REUSABLITY
  const selectTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * firebaseTournamentInfo.teams.length);
    const pick = firebaseTournamentInfo.teams[randomTeamNumber];
    // GraphQL Add Tournament Team to Member
    await addTournamentTeam({
      variables: { tournamentMemberId: currentMember, teamId: pick.id },
    });

    const newTeamList = firebaseTournamentInfo.teams.filter(team => team.id !== pick.id);
    removeTeam(tournamentId, newTeamList);
    // Set Remaining Teams List
    const newPickedTeams = firebaseTournamentInfo.remainingTeams.map(team => team);
    newPickedTeams[randomTeamNumber] = {
      ...newPickedTeams[randomTeamNumber],
      picked: true,
    };
    // Set Previous 3 Picks
    const previousPicks = firebaseTournamentInfo.previousPicks.map(member => member);
    previousPicks.unshift({
      username: firebaseTournamentInfo.pickOrder[0].user.username,
      team: pick.name,
      seed: pick.seed,
      region: pick.region,
      pick: 64 - newPickOrder.length + 1,
    });
    if (previousPicks.length > 3) {
      previousPicks.pop();
    }
    previousPick(tournamentId, previousPicks);
    // Set New Pick Order
    const newPickOrder = firebaseTournamentInfo.pickOrder.map(member => member);
    newPickOrder.shift();
    nextPick(tournamentId, newPickOrder);
  };

  useEffect(() => {
    console.log('EQUAL', firebaseTournamentInfo.pickOrder[0].id === currentMember);
  }, [firebaseTournamentInfo, currentMember]);

  return (
    <View style={{ height: 400, width: '100%' }}>
      {/* TODO: TIMER */}
      <CurrentPick pick={firebaseTournamentInfo.pickOrder[0]} currentPick={currentPickNumber} />
      <NextUp picks={firebaseTournamentInfo.pickOrder.slice(1, 4)} currentPick={currentPickNumber} />
      <PreviousPicks previousPicks={firebaseTournamentInfo.previousPicks} />
      {/* TODO: REMAINING TEAMS */}
      {firebaseTournamentInfo.pickOrder[0].id === currentMember && (
        <Button style={mainStyles.goldButton} onPress={() => selectTeam()}>
          <Text style={mainStyles.goldButtonText}>Pick Now</Text>
        </Button>
      )}
    </View>
  );
};

export default SelectRandomPick;
