import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api/apiService';
import API_PATHS from '../../api/apiPath';

function ReviewPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('earning');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await get(API_PATHS.REVIEW_OFFERS);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = filter === 'all' ? tasks : tasks.filter(task => task.type === filter);

    // Sort tasks
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

    setFilteredTasks(filtered);
  }, [filter, sortBy, tasks]);

  const getDifficultyClass = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'badge bg-success';
      case 'Medium': return 'badge bg-warning text-dark';
      case 'Hard': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  const getTaskIcon = (type) => {
    switch(type) {
      case 'google': return '🔍';
      case 'app': return '📱';
      case 'trustpilot': return '⭐';
      default: return '📝';
    }
  };

  const handleTaskClick = (taskId) => {
    // Navigate to task details - replace with your routing logic
    console.log(`Navigate to review task ${taskId}`);
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
          cursor: pointer;
        }
        .purple-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(118, 75, 162, 0.2);
          border-color: #b794f6;
        }
        .filter-btn {
          background: #f7fafc;
          border: 2px solid #e8e5ff;
          color: #553c9a;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .filter-btn:hover {
          background: #b794f6;
          color: white;
          border-color: #b794f6;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #764ba2;
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
        .review-type-google {
          background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .review-type-app {
          background: linear-gradient(135deg, #007aff 0%, #34c759 100%);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .review-type-trustpilot {
          background: linear-gradient(135deg, #00b67a 0%, #73d13d 100%);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .category-badge {
          background: linear-gradient(135deg, #b794f6 0%, #9f7aea 100%);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .earnings-badge {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          box-shadow: 0 2px 10px rgba(72, 187, 120, 0.3);
        }
        .star-rating {
          color: #ffd700;
        }
        .review-title {
          color: #553c9a;
          font-weight: 600;
        }
        .review-description {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .time-estimate {
          color: #9ca3af;
          font-size: 0.8rem;
        }
        .reviews-count {
          color: #6b7280;
          font-size: 0.85rem;
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
              <h2 className="mb-1 text-dark">Review Tasks</h2>
              <span className="text-muted">{filteredTasks.length} results</span>
            </div>
            
            {/* Sort Control */}
            <div>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="earning">Sort by Earning</option>
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex gap-2 mb-4 flex-wrap">
            <button 
              className={`btn filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Reviews
            </button>
            <button 
              className={`btn filter-btn ${filter === 'google' ? 'active' : ''}`}
              onClick={() => setFilter('google')}
            >
              🔍 Google Reviews
            </button>
            <button 
              className={`btn filter-btn ${filter === 'app' ? 'active' : ''}`}
              onClick={() => setFilter('app')}
            >
              📱 App Reviews
            </button>
            <button 
              className={`btn filter-btn ${filter === 'trustpilot' ? 'active' : ''}`}
              onClick={() => setFilter('trustpilot')}
            >
              ⭐ Trustpilot
            </button>
          </div>
          
          {loading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            /* Reviews Grid */
            <div className="row">
              {filteredTasks.map(task => (
                <div key={task._id} className="col-md-6 col-lg-4 mb-4">
                 <Link 
                  to={`/review/${task._id}`} 
                  className="card text-decoration-none text-dark h-100 purple-card"
                >
                    <div className="card-body p-4">
                      {/* Header with review type and difficulty */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.5rem' }}>{getTaskIcon(task.type)}</span>
                          <span className={`review-type-${task.type}`}>
                            {task.type === 'app' ? 'App Store' : task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                          </span>
                        </div>
                        <span className={getDifficultyClass(task.difficulty)}>
                          {task.difficulty}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="mb-3">
                        <span className="category-badge">
                          {task.category}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <div className="mb-4">
                        <h5 className="card-title review-title mb-2">{task.name}</h5>
                        <p className="card-text review-description mb-3">{task.description}</p>

                        {/* Rating, Reviews Count and Time */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div className="star-rating me-2">
                              {'★'.repeat(Math.floor(task.rating))}
                              {task.rating % 1 !== 0 && '☆'}
                            </div>
                            <span className="text-muted small">{task.rating}</span>
                          </div>
                          <span className="time-estimate">
                            ⏱️ {task.timeEstimate}
                          </span>
                        </div>

                        {/* Reviews Count */}
                        <div className="mb-2">
                          <span className="reviews-count">
                            📊 {task.reviews?.toLocaleString() ?? 0} existing reviews
                          </span>
                        </div>
                      </div>

                      {/* Footer with earnings and arrow */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="earnings-badge">
                          {task.earning?.toFixed(2) ?? 0}coins
                        </span>
                        <div className="d-flex align-items-center">
                          <span className="text-muted me-2 small">Start Review</span>
                          <i className="fas fa-chevron-right" style={{ color: '#b794f6' }}></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {filteredTasks.length === 0 && !loading && !error && (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem' }} className="mb-4">📝</div>
              <h3 className="fw-semibold text-muted mb-2">No review tasks found</h3>
              <p className="text-muted">Try selecting a different filter</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
