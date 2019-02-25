import React, { Component } from 'react';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import Request from '../../request/Request';
import CardList from '../CardList';
import ModalPage from '../ModalPage';
import Loader from '../../components/Loader';
import brandLogo from '../../../public/assets/logo_beta_white.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      propiedadesData: [],
      modalDetails: {
        isOpen: false,
        data: {}
      }
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.fetchAllData = this.fetchAllData.bind(this);
    this.closeModalDetails = this.closeModalDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAllData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.modalDetails.isOpen && !this.state.modalDetails.isOpen) {
      this.fetchAllData();
    }
  }

  fetchAllData() {
    this.setState({
      isLoaded: false
    });

    // Se anade el setTimeout debido a que como realice el backend a traves de fileSystem y no de una base de datos como tal
    // se demora en actualizar el archivo json, y no trae toda la data actualizada
    setTimeout(() => {
      Request.addRequest('https://polar-ocean-30517.herokuapp.com/propiedades').then(res => {
        this.setState({ propiedadesData: res.response.data, isLoaded: true });
      });
    }, 100);
  }

  handleDetails(data) {
    if (data) {
      this.setState({
        modalDetails: {
          isOpen: true,
          data
        }
      });
    }
  }

  closeModalDetails() {
    this.setState({
      modalDetails: {
        isOpen: false,
        data: {}
      }
    });
  }

  render() {
    const { propiedadesData, isLoaded, modalDetails } = this.state;
    console.log({ propiedadesData });
    return (
      <div>
        {modalDetails.isOpen ? (
          <ModalPage modalDetails={modalDetails} onClose={this.closeModalDetails} />
        ) : null}
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
