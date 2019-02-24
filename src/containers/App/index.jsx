import React, { Component } from 'react';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="True Home" />
        <p>True Home</p>
      </div>
    );
  }
}

export default App;
