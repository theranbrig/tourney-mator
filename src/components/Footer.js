import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

const BottomFooter = ({ history }) => (
  <Footer>
    <FooterTab>
      <Button onPress={() => history.push('/home')}>
        <Text>Home</Text>
      </Button>
      <Button onPress={() => history.push('/home')}>
        <Text>Pools</Text>
      </Button>
      <Button onPress={() => history.push('/home')}>
        <Text>Results</Text>
      </Button>
      <Button onPress={() => history.push('/profile')}>
        <Text>Profile</Text>
      </Button>
    </FooterTab>
  </Footer>
);

export default BottomFooter;
