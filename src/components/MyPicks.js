import React, { useEffect } from 'react';
import { View, Text } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { TOURNAMENT_MEMBER_QUERY } from '../utilities/Queries';

const MyPicks = ({ currentMember }) => {
  const { data, loading, error } = useQuery(TOURNAMENT_MEMBER_QUERY, { variables: { id: currentMember } });

  useEffect(() => {
    console.log(data.tournamentMember.teams);
  }, [data]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 10, backgroundColor: 'white' }}>
      <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20, textAlign: 'center', margin: 5 }}>
        My Picks
      </Text>
      <View
        style={{
          width: '95%',
          margin: '2.5%',
          textAlign: 'center',
        }}
      >
        {data.tournamentMember.teams &&
          data.tournamentMember.teams.map(team => (
            <View>
              <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 18, textAlign: 'center', padding: 5 }}>
                {team.seed}
                {team.region}
                {' - '}
                {team.name}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default MyPicks;
