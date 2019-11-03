import React from 'react';
import { Header, Button, Left, Body, Right, Icon, Text, Title, Subtitle } from 'native-base';

const PoolsHeader = ({ history, user }) => (
  <Header style={{ backgroundColor: '#fc3', borderBottomWidth: 2, borderBottomColor: '#fff' }}>
    <Left>
      <Icon
        style={{ color: '#7a0019' }}
        type='FontAwesome5'
        name='chevron-left'
        onPress={() => history.goBack()}
      />
    </Left>
    <Body>
      <Title style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>MY POOLS</Title>
      <Subtitle style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 15 }}>
        {user.username}
      </Subtitle>
    </Body>
    <Right>
      <Button transparent>
        <Icon
          style={{ color: '#7a0019' }}
          type='FontAwesome5'
          name='plus-circle'
          onPress={() => history.push('/create')}
        />
      </Button>
    </Right>
  </Header>
);

export default PoolsHeader;
