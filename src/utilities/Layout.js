import React, { useContext } from 'react';
import { Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

const Layout = ({ children }) => <Content>{children}</Content>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
