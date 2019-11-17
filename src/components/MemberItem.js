import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Text } from 'native-base';
import { TOURNAMENT_MEMBER_QUERY } from '../utilities/Queries';

const MemberItem = ({ memberId }) => {
  const { data, loading, onCompleted } = useQuery(TOURNAMENT_MEMBER_QUERY, {
    variables: { id: memberId },
  });

  useEffect(() => {
    console.log('MEMBER', data);
  }, [onCompleted, memberId, data]);

  return <Text>{memberId}</Text>;
};

export default MemberItem;
