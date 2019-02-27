import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card';

class CardList extends Component {
  constructor() {
    super();

    this.buildCardList = this.buildCardList.bind(this);
  }

  buildCardList() {
    const { propiedadesData, handleDetails } = this.props;
    return propiedadesData.map(propiedad => (
      <Card key={propiedad.id} handleDetails={handleDetails} {...propiedad} />
    ));
  }

  render() {
    const cardList = this.buildCardList();

    return (
      <div className="container mt-5">
        <div className="row">{cardList}</div>
      </div>
    );
  }
}

CardList.propTypes = {
  handleDetails: PropTypes.func.isRequired,
  propiedadesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      address: PropTypes.string,
      type: PropTypes.string,
      image: PropTypes.string,
      user: PropTypes.object
    })
  ).isRequired
};

export default CardList;
