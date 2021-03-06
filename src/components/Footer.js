import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomFooter = ({ history }) => (
  <Footer style={{ backgroundColor: '#7a0019' }}>
    <FooterTab style={{ padding: 0 }}>
      <Button onPress={() => history.push('/home')}>
        <Icon name='basketball' size={23} color='#ffcc33' />
        <Text style={{ color: '#fff' }}>Home</Text>
      </Button>
      <Button onPress={() => history.push('/pools')}>
        <Icon name='tournament' size={23} color='#ffcc33' />
        <Text style={{ color: '#fff' }}>Pools</Text>
      </Button>
      <Button onPress={() => history.push('/standings')}>
        <Icon name='format-list-numbered' size={23} color='#ffcc33' />
        <Text style={{ color: '#fff', fontFamily: 'graduate' }}>Results</Text>
      </Button>
      <Button onPress={() => history.push('/profile')}>
        <Icon name='basketball-hoop-outline' size={23} color='#ffcc33' />
        <Text style={{ color: '#fff' }}>Profile</Text>
      </Button>
    </FooterTab>
  </Footer>
);

export default BottomFooter;
