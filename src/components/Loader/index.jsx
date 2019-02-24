import React from 'react';
import './styles/index.scss';

const Loading = () => (
  <div className="loading">
    <svg className="loader" viewBox="0 0 120 120">
      <circle className="internal-circle" cx="60" cy="60" r="30" />
      <circle className="external-circle" cx="60" cy="60" r="50" />
    </svg>
  </div>
);

export default Loading;
