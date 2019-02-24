import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

const Header = ({ logo }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 header">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Header.defaultProps = {
//   title: 'Title Header'
// };

Header.propTypes = {
  logo: PropTypes.string.isRequired
};

export default Header;
