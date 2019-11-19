import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Text, ListItem } from 'native-base';
import { TOURNAMENT_MEMBER_QUERY } from '../utilities/Queries';

const MemberItem = ({ memberId }) => {
  const [memberData, setMemberData] = useState(null);

  const { data, loading, onCompleted } = useQuery(TOURNAMENT_MEMBER_QUERY, {
    variables: { id: memberId },
  });

  useEffect(() => {
    console.log('MEMBER', data.tournamentMember);
    setMemberData(data.tournamentMember);
  }, [onCompleted, memberId, data]);

  return (
    <>
      {memberData && (
        <ListItem style={{ width: '100%' }}>
          <Text>{memberData.user.username}</Text>
        </ListItem>
      )}
    </>
  );
};

export default MemberItem;
