import React, { useContext } from 'react';
import { Content, Container, View } from 'native-base';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

const Layout = ({ children }) => (
  <Content>
    <Container style={{backgroundColor: '#7a0019'}}>{children}</Container>
  </Content>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
