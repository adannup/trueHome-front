import React, { Component } from 'react';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import Request from '../../request/Request';
import CardList from '../CardList';
import Loader from '../../components/Loader';
import brandLogo from '../../../public/assets/logo_beta_white.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      propiedadesData: [],
      details: {
        isOpen: false,
        data: {}
      }
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.fetchAllData = this.fetchAllData.bind(this);
  }

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData() {
    Request.addRequest('http://localhost:4001/propiedades').then(res => {
      this.setState({ propiedadesData: res.response.data, isLoaded: true });
    });
  }

  handleDetails(data) {
    if (data) {
      this.setState({
        details: {
          isOpen: true,
          data
        }
      });
    }
  }

  render() {
    const { propiedadesData, isLoaded } = this.state;
    return (
      <div>
        {isLoaded ? (
          <div>
            <Header logo={brandLogo} />
            <CardList propiedadesData={propiedadesData} handleDetails={this.handleDetails} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
