import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Text, ListItem, Spinner } from 'native-base';
import { TOURNAMENT_MEMBER_QUERY } from '../utilities/Queries';

const MemberItem = ({ memberId, order }) => {
  const [memberData, setMemberData] = useState(null);

  const { data, loading, onCompleted } = useQuery(TOURNAMENT_MEMBER_QUERY, {
    variables: { id: memberId },
  });

  useEffect(() => {
    console.log('MEMBER', data.tournamentMember);
    setMemberData(data.tournamentMember);
  }, [onCompleted, memberId, data]);

  if (loading) return <Spinner color="#7a0019" />;
  return (
    <>
      {memberData && (
        <ListItem
          style={{
            backgroundColor: '#fc3',
            width: '100%',
            height: 50,
            borderColor: '#7a0019',
            marginLeft: 0,
            borderBottomWidth: 2,
            borderBottomColor: '#fff',
            padding: 15,
          }}
        >
          <Text style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>
            {order !== undefined && `${order + 1} - `}
            {memberData.user.username}
          </Text>
        </ListItem>
      )}
    </>
  );
};

export default MemberItem;
