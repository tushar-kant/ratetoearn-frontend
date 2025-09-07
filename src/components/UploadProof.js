import React from 'react';

function UploadProof({ onUploadSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual upload logic
    onUploadSuccess();
  };

  return (
    <div>
      <h3>Upload Proof</h3>
      <form onSubmit={handleSubmit}>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadProof;
