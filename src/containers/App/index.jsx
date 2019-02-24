import React, { Component } from 'react';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import CardList from '../CardList';
import brandLogo from '../../../public/assets/logo_beta_white.svg';

class App extends Component {
  render() {
    return (
      <div>
        <Header logo={brandLogo} />
        <CardList />
        <p>True Home</p>
      </div>
    );
  }
}

export default App;
