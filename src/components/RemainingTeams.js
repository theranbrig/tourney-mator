import React, { useState, useEffect } from 'react';
import { View, Text } from 'native-base';

const RemainingTeams = ({ region, teams, title }) => {
  const [teamGroup, setTeamGroup] = useState([]);

  useEffect(() => {
    const sortedTeamList = teams.filter(team => team.region === region).sort((a, b) => (a.seed > b.seed ? 1 : -1));
    setTeamGroup([...sortedTeamList]);
  }, [teams]);

  return (
    <View style={{ backgroundColor: '#fff', width: '100%', padding: 5 }}>
      <Text style={{ fontFamily: 'graduate', color: '#7a0019', textAlign: 'center', fontSize: 14, paddingBottom: 5 }}>
        {title}
      </Text>
      {teamGroup.map(team => (
        <Text
          style={
            team.picked
              ? {
                  fontFamily: 'graduate',
                  color: '#fc0',
                  textAlign: 'center',
                  fontSize: 12,
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                }
              : {
                  fontFamily: 'graduate',
                  color: '#7a0019',
                  textAlign: 'center',
                  fontSize: 12,
                }
          }
        >
          {team.seed} - {team.name}
        </Text>
      ))}
    </View>
  );
};

export default RemainingTeams;
