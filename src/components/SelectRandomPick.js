import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { TouchableOpacity, ScrollView } from 'react-native';
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ADD_TOURNAMENT_TEAM_MUTATION } from '../utilities/Mutations';
import NextUp from './NextUp';
import { FirebaseContext } from '../utilities/Firebase';
import { mainStyles } from '../utilities/Styles';
import PreviousPicks from './PreviousPicks';
import CurrentPick from './CurrentPick';
import RemainingTeams from './RemainingTeams';
import MyPicks from './MyPicks';
import RevealBox from './RevealBox';

const SelectRandomPick = ({ firebaseTournamentInfo, currentMember, tournamentId }) => {
  const [addTournamentTeam] = useMutation(ADD_TOURNAMENT_TEAM_MUTATION);

  const [isRemainingCollapsed, setIsRemainingCollapsed] = useState(true);

  const [randomTeamView, setRandomTeamView] = useState('');

  const { setNextPick, removeTeam, setPreviousPick, setRemainingTeams } = useContext(FirebaseContext);

  const { teams, remainingTeams, previousPicks, pickOrder } = firebaseTournamentInfo;

  const currentPickNumber = 64 - pickOrder.length + 1;

  const displayRandomTeam = () => {
    const newRemainingTeams = remainingTeams.filter(team => !team.picked);
    const randomTeamNumber = Math.floor(Math.random() * newRemainingTeams.length);
    setRandomTeamView(newRemainingTeams[randomTeamNumber].name);
  };

  // TODO: NEEDS TO BE MOVED OUT FOR REUSABLITY
  const selectTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * teams.length);
    const pick = teams[randomTeamNumber];
    // GraphQL Add Tournament Team to Member
    await addTournamentTeam({
      variables: { tournamentMemberId: currentMember, teamId: pick.id },
    });
    const newTeamList = teams.filter(team => team.id !== pick.id);
    removeTeam(tournamentId, newTeamList);
    // Set Remaining Teams List
    const pickedTeams = remainingTeams.map(team => (team.id === pick.id ? { ...team, picked: true } : team));
    console.log(pickedTeams);
    await setRemainingTeams(tournamentId, pickedTeams);
    // Set New Pick Order
    const newPickOrder = pickOrder.map(member => member);
    newPickOrder.shift();
    setNextPick(tournamentId, newPickOrder);
    // Set Previous 3 Picks
    const newPreviousPicks = previousPicks.map(member => member);
    newPreviousPicks.unshift({
      username: pickOrder[0].user.username,
      team: pick.name,
      seed: pick.seed,
      region: pick.region,
      pick: 64 - newPickOrder.length,
    });
    setPreviousPick(tournamentId, newPreviousPicks);
  };

  useEffect(() => {
    console.log('EQUAL', pickOrder[0].id === currentMember);
  }, [firebaseTournamentInfo, currentMember]);

  return (
    <View style={{ width: '100%' }}>
      {/* TODO: TIMER */}
      <CurrentPick pick={pickOrder[0]} currentPick={currentPickNumber} currentMember={currentMember} />
      <NextUp picks={pickOrder.slice(1, 4)} currentPick={currentPickNumber} />
      <PreviousPicks previousPicks={firebaseTournamentInfo.previousPicks.slice(0, 3)} />
      <View style={{ height: 200 }}>
        <View>
          <Text>{randomTeamView}</Text>
        </View>
        {pickOrder[0].id === currentMember && (
          <Button style={mainStyles.goldButton} onPress={() => selectTeam()}>
            <Text style={mainStyles.goldButtonText}>Pick Now</Text>
          </Button>
        )}
      </View>
      <RevealBox buttonTitle="Remaining Teams" propHeight={300} propBackground="white">
        <RemainingTeams teams={firebaseTournamentInfo.remainingTeams} region="W" title="WEST" />
      </RevealBox>
      <RevealBox buttonTitle="My Picks" propHeight={-350} propBackground="white">
        <MyPicks currentMember={currentMember} />
      </RevealBox>
    </View>
  );
};

export default SelectRandomPick;
