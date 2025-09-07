import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Games() {
  const [offers, setOffers] = useState([
    { id: 1, name: 'App 1', description: 'Description 1', earning: 10 },
    { id: 2, name: 'App 2', description: 'Description 2', earning: 15 },
    { id: 3, name: 'App 3', description: 'Description 3', earning: 20 },
  ]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Offers</h2>
      <div className="row">
        {offers.map(offer => (
          <div key={offer.id} className="col-md-6 col-lg-4 mb-4">
            <Link 
              to={`/offers/${offer.id}`} 
              className="card text-decoration-none text-dark h-100"
              style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title">{offer.name}</h5>
                  <p className="card-text text-muted mb-0">{offer.description}</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="text-success me-2">${offer.earning}</span>
                  <i className="fas fa-chevron-right text-muted"></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;