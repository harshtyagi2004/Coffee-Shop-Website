import React from 'react';
import offers from '../data/offersData';

const OfferCarousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {offers.map((offer, index) => (
          <button
            key={offer.id}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={offer.image}
              className="d-block w-100 carousel-image"
              alt={offer.text}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{offer.text}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default OfferCarousel;