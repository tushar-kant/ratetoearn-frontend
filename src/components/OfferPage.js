import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/apiService';
import API_PATHS from '../api/apiPath';

function OfferPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredOffers, setFilteredOffers] = useState(offers);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('earning');

  const categories = ['All', ...new Set(offers.map(offer => offer.category))];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await get(API_PATHS.APP_OFFERS);
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    let filtered = offers.filter(offer =>
      selectedCategory === 'All' || offer.category === selectedCategory
    );

    // Sort offers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'earning':
          return b.earning - a.earning;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredOffers(filtered);
  }, [selectedCategory, sortBy, offers]);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'badge bg-success';
      case 'Medium': return 'badge bg-warning text-dark';
      case 'Hard': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <>
      <style jsx>{`
        .purple-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .purple-card {
          border: 1px solid #e8e5ff;
          background: linear-gradient(145deg, #ffffff 0%, #fefcff 100%);
          box-shadow: 0 2px 15px rgba(118, 75, 162, 0.1);
          transition: all 0.3s ease;
        }
        .purple-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(118, 75, 162, 0.2);
          border-color: #b794f6;
        }
        .category-badge {
          background: linear-gradient(135deg, #b794f6 0%, #9f7aea 100%);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .price-badge {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          box-shadow: 0 2px 10px rgba(72, 187, 120, 0.3);
        }
        .filter-select {
          border: 2px solid #e8e5ff;
          border-radius: 10px;
          padding: 0.5rem 1rem;
          background: white;
          transition: all 0.3s ease;
        }
        .filter-select:focus {
          border-color: #b794f6;
          box-shadow: 0 0 0 0.2rem rgba(183, 148, 246, 0.25);
        }
        .star-rating {
          color: #ffd700;
        }
        .offer-title {
          color: #553c9a;
          font-weight: 600;
        }
        .offer-description {
          color: #6b7280;
          font-size: 0.9rem;
        }
            .page-bg {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }
      `}</style>
      <div className="page-bg">

        <div className="container pt-4">
          {/* Header with filters */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div className="mb-3 mb-md-0">
              <h2 className="mb-1 text-dark">Offers</h2>
              <span className="text-muted">{filteredOffers.length} results</span>
            </div>

            {/* Filter Controls */}
            <div className="d-flex gap-3">
              <div>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="earning">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading offers...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            /* Offers Grid */
            <div className="row">
              {filteredOffers.map(offer => (
                <div key={offer._id} className="col-md-6 col-lg-4 mb-4">
                  <Link
                    to={`/offer/${offer._id}`}
                    className="card text-decoration-none text-dark h-100 purple-card"
                  >
                    <div className="card-body p-4">
                      {/* Header with category and difficulty */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="category-badge">
                          {offer.category}
                        </span>
                        <span className={getDifficultyClass(offer.difficulty)}>
                          {offer.difficulty}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <div className="mb-4">
                        <h5 className="card-title offer-title mb-2">{offer.name}</h5>
                        <p className="card-text offer-description mb-3">{offer.description}</p>

                        {/* Rating */}
                        <div className="d-flex align-items-center mb-2">
                          <div className="star-rating me-2">
                            {'★'.repeat(Math.floor(offer.rating))}
                            {offer.rating % 1 !== 0 && '☆'}
                          </div>
                          <span className="text-muted small">{offer.rating}</span>
                        </div>
                      </div>

                      {/* Footer with price and arrow */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="price-badge">
                          ${offer.earning}
                        </span>
                        <div className="d-flex align-items-center">
                          <span className="text-muted me-2 small">View Details</span>
                          <i className="fas fa-chevron-right" style={{ color: '#b794f6' }}></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default OfferPage;
