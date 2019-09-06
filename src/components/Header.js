import React from 'react';
import { Header, Button, Left, Body, Right, Icon, Text, Title } from 'native-base';

const AppHeader = props => (
  <Header style={{ backgroundColor: '#171f33' }} iosBarStyle="light-content">
    <Left>
      <Button style={{ backgroundColor: '#171f33' }} onPress={() => props.navigation.goBack()}>
        <Icon style={{ color: '#f8f8f8' }} type="FontAwesome5" name="chevron-left" />
      </Button>
    </Left>
    <Body style={{ textAlign: 'center' }}>
      <Title style={{ color: '#f8f8f8' }}>{props.title}</Title>
    </Body>
    <Right />
  </Header>
);

export default AppHeader;
