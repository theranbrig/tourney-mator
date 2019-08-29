import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomFooter = ({ history }) => (
  <Footer style={{ backgroundColor: '#7a0019' }}>
    <FooterTab>
      <Button onPress={() => history.push('/home')}>
        <Icon name="basketball" size={25} color="#ffcc33" />
        <Text style={{ color: '#fff' }}>Home</Text>
      </Button>
      <Button onPress={() => history.push('/home')}>
        <Icon name="tournament" size={25} color="#ffcc33" />
        <Text style={{ color: '#fff' }}>Pools</Text>
      </Button>
      <Button onPress={() => history.push('/home')}>
        <Icon name="format-list-numbered" size={25} color="#ffcc33" />
        <Text style={{ color: '#fff' }}>Results</Text>
      </Button>
      <Button onPress={() => history.push('/profile')}>
        <Icon name="basketball-hoop" size={25} color="#ffcc33" />
        <Text style={{ color: '#fff' }}>Profile</Text>
      </Button>
    </FooterTab>
  </Footer>
);

export default BottomFooter;
