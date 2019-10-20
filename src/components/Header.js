import React from 'react';
import { Header, Button, Left, Body, Right, Icon, Text, Title } from 'native-base';

const AppHeader = props => (
  <Header style={{ backgroundColor: '#fc3' }} iosBarStyle='light-content'>
    <Left>
      <Button style={{ backgroundColor: '#fc3' }} onPress={() => props.history.goBack()}>
        <Icon style={{ color: '#7a0019' }} type='FontAwesome5' name='chevron-left' />
      </Button>
    </Left>
    <Body style={{ textAlign: 'center' }}>
      <Title style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 18 }}>
        {props.title}
      </Title>
    </Body>
    <Right />
  </Header>
);

export default AppHeader;
