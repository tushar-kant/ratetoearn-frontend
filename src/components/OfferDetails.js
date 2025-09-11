import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOfferDetails } from '../api/apiService';
import { completeReview } from '../api/apiService'; // Import the new API function
import { ChevronRight, Download, Clock, Trophy, CheckCircle, Info, Star, TrendingUp, Gift, Shield, Zap, AlertCircle } from 'lucide-react';

function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [startTask, setStartTask] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const data = await getOfferDetails(id);
        console.log(data, "data")
        setOffer(data);
      } catch (error) {
        console.error("Error fetching offer details:", error);
        // Handle error appropriately, e.g., display an error message
      }
    };

    fetchOfferDetails();
  }, [id]);

  useEffect(() => {
    const completed = completedSteps.length;
    const total = offer?.instructions?.length || 0;
    setProgress((completed / total) * 100);
  }, [completedSteps, offer?.instructions?.length]);

  const handleStartTask = () => {
    setStartTask(true);
    setShowStartModal(true);
  };

  const handleStartTaskConfirm = async () => {
      try {
      const taskId = id;
      const userData = JSON.parse(localStorage.getItem('userData'));
      const phone = userData?.phoneNumber;
      if (!phone) {
        console.error("Phone number not found in local storage");
        return;
      }
      await completeReview(taskId, phone);
      console.log("Review completed successfully");
    } catch (error) {
      console.error("Error completing review:", error);
    }
    setShowStartModal(false);
    // Redirect to primary link if it exists
    if (offer?.primaryLink) {
      window.open(offer.primaryLink, '_blank');
    }
  };

  const handleCompleteTask = async () => {
    setShowCompletionModal(true);
  
  };

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <>
      {offer ? (
        <div className="min-vh-100 bg-light p-3">
          <div className="container max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="card border-0 shadow-lg overflow-hidden mb-4">
              <div className="bg-primary text-white p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-white bg-opacity-20 rounded-pill text-xs fw-semibold">
                        {offer?.category}
                      </span>
                      <span className="badge bg-success bg-opacity-30 rounded-pill text-xs fw-semibold">
                        {offer?.difficulty}
                      </span>
                    </div>
                    <h1 className="h2 fw-bold mb-2">{offer?.name}</h1>
                    <p className="text-white text-opacity-90 mb-0">{offer?.description}</p>
                  </div>
                  <div className="text-end ms-3">
                    <div className="bg-white bg-opacity-10 rounded-3 p-3">
                      <div className="h3 fw-bold mb-1"> coins {offer?.earning}</div>
                      <div className="small text-white text-opacity-80">Total Reward</div>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="d-flex gap-4 mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="fw-semibold">{offer?.rating}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{offer?.completions?.toLocaleString()} completed</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{offer?.timeRequired}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="px-4 py-3 bg-light">
                <div className="d-flex gap-2">
                  {offer?.badges?.map((badge, i) => (
                    <span key={i} className="badge bg-white text-dark rounded-pill shadow-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-4">
              {!startTask ? (
                <button
                  onClick={handleStartTask}
                  className="btn btn-primary btn-lg w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Start Earning Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteTask}
                  className="btn btn-success btn-lg w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Complete & Claim Reward
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {startTask && (
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Your Progress</h5>
                    <span className="text-muted small">{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  How to Complete
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  {offer?.instructions?.map((instruction, index) => {
                    const isCompleted = completedSteps.includes(index);
                    return (
                      <div
                        key={index}
                        onClick={() => startTask && toggleStep(index)}
                        className={`d-flex align-items-center gap-3 p-3 rounded mb-2 ${isCompleted ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'} ${startTask ? 'cursor-pointer' : ''}`}
                      >
                        <div className={`rounded-circle d-flex align-items-center justify-content-center ${isCompleted ? 'bg-success text-white' : 'bg-primary bg-opacity-10 text-primary'}`} style={{ width: '45px', height: '45px' }}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2">
                            <small className="text-muted">Step {index + 1}</small>
                            {isCompleted && <span className="badge bg-success">Completed</span>}
                          </div>
                          <p className={`mb-0 ${isCompleted ? 'text-success fw-medium' : 'fw-medium'}`}>
                            {instruction}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="alert alert-info">
                  <div className="d-flex gap-2">
                    <Info className="w-5 h-5 text-info flex-shrink-0" />
                    <div>
                      <p className="fw-medium mb-1">Important Note</p>
                      <p className="mb-0 small">
                        Keep the app installed for the full duration to receive your complete reward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Modals */}
          {showStartModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body text-center p-4">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="h4 fw-bold mb-2">Ready to Start?</h3>
                    <p className="text-muted mb-3">You'll be redirected to download the app. Complete all steps to earn your reward!</p>

                    <div className="alert alert-warning mb-3">
                      <div className="d-flex gap-2">
                        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                        <p className="small mb-0">
                          Your reward will be credited within 24 hours after task completion and verification.
                        </p>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setShowStartModal(false)}
                        className="btn btn-outline-secondary flex-fill"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleStartTaskConfirm}
                        className="btn btn-primary flex-fill"
                      >
                        Let's Go!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCompletionModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body text-center p-4">
                    <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="h4 fw-bold mb-2">Congratulations!</h3>
                    <p className="text-muted">You've successfully completed the task</p>

                    <div className="alert alert-success mb-3">
                      <div className="text-center">
                        <p className="small mb-1">Your Reward</p>
                        <p className="small mb-1">Your Reward</p>
                        <p className="h4 fw-bold text-success mb-1">write coins {offer?.earning}</p>
                        <p className="small mb-0">Will be credited within 24 hours</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowCompletionModal(false)}
                      className="btn btn-success w-100"
                    >
                      Awesome!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading offer details...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default OfferDetails;
