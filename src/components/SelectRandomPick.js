import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { TouchableOpacity, ScrollView, Image } from 'react-native';
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pulse from 'react-native-pulse';
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
  const [isMyPicksCollapsed, setIsMyPicksCollapsed] = useState(true);
  const [randomTeamView, setRandomTeamView] = useState('');
  const [status, setStatus] = useState('');

  const { setNextPick, removeTeam, setPreviousPick, setRemainingTeams } = useContext(FirebaseContext);

  const { teams, remainingTeams, previousPicks, pickOrder } = firebaseTournamentInfo;

  const currentPickNumber = 64 - pickOrder.length + 1;

  const remainingBoxCollapsed = () => {
    setIsRemainingCollapsed(!isRemainingCollapsed);
    setIsMyPicksCollapsed(true);
  };

  const myPicksBoxCollapsed = () => {
    setIsMyPicksCollapsed(!isMyPicksCollapsed);
    setIsRemainingCollapsed(true);
  };

  const displayRandomTeam = () => {
    const newRemainingTeams = remainingTeams.filter(team => !team.picked);
    const randomTeamNumber = Math.floor(Math.random() * newRemainingTeams.length);
    setRandomTeamView(newRemainingTeams[randomTeamNumber].name);
  };

  const runDisplay = () => {
    let count = 0;
    function display() {
      const intervalId = setInterval(() => {
        if (++count == 10) {
          clearInterval(intervalId);
        }
        displayRandomTeam();
      }, 500);
    }
    display();
  };

  // TODO: NEEDS TO BE MOVED OUT FOR REUSABLITY
  const selectTeam = async () => {
    runDisplay();
    setTimeout(() => {
      const randomTeamNumber = Math.floor(Math.random() * teams.length);
      const pick = teams[randomTeamNumber];
      // GraphQL Add Tournament Team to Member
      const newTeamList = teams.filter(team => team.id !== pick.id);
      removeTeam(tournamentId, newTeamList);
      // Set Remaining Teams List
      const pickedTeams = remainingTeams.map(team => (team.id === pick.id ? { ...team, picked: true } : team));
      console.log(pickedTeams);
      setRemainingTeams(tournamentId, pickedTeams);
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
      addTournamentTeam({
        variables: { tournamentMemberId: currentMember, teamId: pick.id },
      });
      setRandomTeamView('');
    }, 5500);
  };

  useEffect(() => {}, [firebaseTournamentInfo, currentMember]);

  return (
    <View style={{ width: '100%' }}>
      {/* TODO: TIMER */}
      <CurrentPick pick={pickOrder[0]} currentPick={currentPickNumber} currentMember={currentMember} />
      {randomTeamView === '' ? (
        <>
          <NextUp picks={pickOrder.slice(1, 4)} currentPick={currentPickNumber} />
          <PreviousPicks previousPicks={firebaseTournamentInfo.previousPicks.slice(0, 3)} />
        </>
      ) : (
        <View
          style={{
            height: 160,
            justifyContent: 'center',
            alignContent: 'center',
            borderBottomColor: 'white',
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: '#fc0',
              fontFamily: 'graduate',
              textAlign: 'center',
            }}
          >
            Picking...
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#fc0',
              fontFamily: 'graduate',
            }}
          >
            {randomTeamView}
          </Text>
        </View>
      )}
      <View>
        <View style={{ height: 200, width: '100%' }}>
          {pickOrder[0].id === currentMember && (
            <View style={{ alignItems: 'center' }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fc0',
                    fontFamily: 'graduate',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Pick Now
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    borderColor: '#fff',
                    backgroundColor: '#fc3',
                    borderWidth: 4,
                    borderRadius: 75,
                    padding: 10,
                    height: 150,
                    width: 150,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    textAlign: 'center',
                  }}
                  onPress={() => selectTeam()}
                >
                  <Pulse color="white" numPulses={3} diameter={150} speed={20} duration={2000} />
                  <Image
                    style={{ height: 90, width: 110, textAlign: 'center', alignSelf: 'center' }}
                    source={require('../../assets/images/maroonBasketballOutlineSmall.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <RevealBox
        buttonTitle="Remaining Teams"
        propHeight={300}
        propBackground="white"
        isCollapsed={!isRemainingCollapsed}
        collapseFunction={remainingBoxCollapsed}
      >
        <RemainingTeams teams={firebaseTournamentInfo.remainingTeams} region="W" title="WEST" />
      </RevealBox>
      <RevealBox
        buttonTitle="My Picks"
        propHeight={300}
        propBackground="white"
        isCollapsed={!isMyPicksCollapsed}
        collapseFunction={myPicksBoxCollapsed}
      >
        <MyPicks currentMember={currentMember} />
      </RevealBox>
    </View>
  );
};

export default SelectRandomPick;
