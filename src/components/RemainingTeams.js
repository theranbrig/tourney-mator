import React, { useState, useEffect } from 'react';
import { View, Text } from 'native-base';

const RemainingTeams = ({ region, teams, title }) => {
  const [teamGroup, setTeamGroup] = useState([]);

  useEffect(() => {
    const sortedTeamList = teams.filter(team => team.region === region).sort((a, b) => (a.seed > b.seed ? 1 : -1));
    setTeamGroup([...sortedTeamList]);
  }, [teams]);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <Text>{title}</Text>
      {teamGroup.map(team => (
        <Text
          style={
            team.picked
              ? { fontFamily: 'graduate', color: '#7a0019', textAlign: 'center', fontSize: 14 }
              : { fontFamily: 'graduate', color: '#fc0', textAlign: 'center', fontSize: 14 }
          }
        >
          <Text style={{ fontFamily: 'graduate', color: '#7a0019', textAlign: 'center', fontSize: 14 }}>
            {team.seed} -
          </Text>
          {team.name}
        </Text>
      ))}
    </View>
  );
};

export default RemainingTeams;
