import React from 'react';
import { Content } from 'native-base';
import PropTypes from 'prop-types';

const Layout = ({ children }) => <Content>{children}</Content>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
