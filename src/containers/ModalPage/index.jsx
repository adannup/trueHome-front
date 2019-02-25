import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Request from '../../request/Request';

class ModalPage extends Component {
  constructor() {
    super();

    this.action = {};
    this.pages = [];

    this.state = {
      currentPage: {}
    };

    this.setActions();
    this.setPages();
    this.setDefaultPage();

    this.getDataForPage = this.getDataForPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onSaveData = this.onSaveData.bind(this);
  }

  onSaveData(data) {
    if (data !== null) {
      this.updateDataFetch(data);
    }
    this.nextPage();
  }

  setDefaultPage() {
    const { ADDRESS } = this.action;

    Object.assign(this.state, this.state, {
      currentPage: {
        pageNumber: 1,
        action: ADDRESS
      }
    });
  }

  setPages() {
    const { ADDRESS, USER, PRICE } = this.action;

    this.pages = [
      {
        pageNumber: 1,
        action: ADDRESS
      },
      {
        pageNumber: 2,
        action: USER
      },
      {
        pageNumber: 3,
        action: PRICE
      }
    ];
  }

  setActions() {
    this.action = {
      ADDRESS: 'ADDRESS',
      USER: 'USER',
      PRICE: 'PRICE'
    };
  }

  getDataForPage(action) {
    const { modalDetails } = this.props;
    const { ADDRESS, USER, PRICE } = this.action;

    switch (action) {
      case ADDRESS:
        return {
          id: modalDetails.data.id,
          title: 'Actualizar direccion',
          dataInput: {
            address: {
              value: modalDetails.data.address,
              name: 'Direccion',
              type: 'text'
            }
          }
        };
      case USER:
        return {
          id: modalDetails.data.user.id,
          title: 'Actualizar datos usuario',
          dataInput: {
            fullname: {
              value: modalDetails.data.user.fullname,
              name: 'Nombre',
              type: 'text'
            },
            phone: {
              value: modalDetails.data.user.phone,
              name: 'Telefono',
              type: 'tel'
            }
          }
        };
      case PRICE:
        return {
          id: modalDetails.data.id,
          title: 'Actualizar precio',
          dataInput: {
            price: {
              value: modalDetails.data.price,
              name: 'Precio',
              type: 'number'
            }
          }
        };
      default:
        break;
    }
  }

  updateDataFetch(data) {
    let uri = null;

    if (data.data.pageNumber === 1 || data.data.pageNumber === 3) {
      uri = `https://polar-ocean-30517.herokuapp.com/propiedades/${data.data.id}`;
    } else if (data.data.pageNumber === 2) {
      uri = `https://polar-ocean-30517.herokuapp.com/user/${data.data.id}`;
    }
    Request.updateRequest(uri, data.data.dataForm).then(jsondata => console.log(jsondata));
  }

  nextPage() {
    const { currentPage } = this.state;
    const { onClose } = this.props;
    const currentIndex = this.pages.findIndex(x => x.pageNumber === currentPage.pageNumber);

    if (this.pages.length - 1 > currentIndex) {
      this.setState({
        currentPage: this.pages[currentIndex + 1]
      });
    } else if (this.pages.length - 1 === currentIndex) {
      onClose();
    }
  }

  render() {
    const { currentPage } = this.state;
    const { onClose } = this.props;
    const dataPage = this.getDataForPage(currentPage.action);

    return (
      <Modal
        pageNumber={currentPage.pageNumber}
        data={dataPage}
        onClose={onClose}
        onSaveData={this.onSaveData}
      />
    );
  }
}

ModalPage.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalDetails: PropTypes.func.isRequired
};

export default ModalPage;
