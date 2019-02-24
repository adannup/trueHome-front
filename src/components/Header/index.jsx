import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => <h1>{title}</h1>;

Header.defaultProps = {
  title: 'Title Header'
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
