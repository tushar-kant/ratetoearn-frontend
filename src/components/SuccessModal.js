import React from 'react';

function SuccessModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Success!</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <p>Your reward will be credited within 24 hrs.</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
