import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

const Card = props => {
  const { id, user, address, image, price, handleDetails } = props;
  const cardData = { id, user, address, image, price };

  return (
    <div className="col-md-4 my-2" onClick={event => handleDetails(cardData)}>
      <div className="card card-propiedad">
        <img className="card-img-top" src={image} alt={address} />
        <div className="card-body">
          <h5 className="card-title text-danger">{`$ ${price}`}</h5>
          <p className="card-text">{address}</p>
          <p className="card-text text-secondary">{`Contacto: ${user.fullname}`}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.shape({
    fullname: PropTypes.string,
    username: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  handleDetails: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired
};

export default Card;
