import React, { useContext } from 'react';
import { Content, Container, View } from 'native-base';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

const Layout = ({ children }) => <Container style={{ backgroundColor: '#7a0019' }}>{children}</Container>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
