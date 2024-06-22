import React, { useEffect, useState } from 'react';
import './LoadingStrip.css';

const LoadingStrip = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 60000); // 1 minute in milliseconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="loading-container">
      {loading ? (
        <div className="loading-strip"></div>
      ) : (
        <div className="loading-message">
          Request content is not available. Please try to reload the page create new.
        </div>
      )}
    </div>
  );
};

export default LoadingStrip;
