import React, { useState } from 'react';
import './Description.css';

const Description = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <p>
          {text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
          { text.length > maxLength && <div className='read-more-button-text' onClick={toggleTruncate}>Read more</div>}
        </p>
      ) : (
        <p>
          {text}
          { text.length > maxLength && <div className='read-more-button-text' onClick={toggleTruncate}>Read less</div>}
        </p>
      )}
    </div>
  );
};

export default Description;
