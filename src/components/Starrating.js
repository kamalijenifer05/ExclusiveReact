import React from 'react';
import styled from 'styled-components';

const StarRating = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; 
  const emptyStars = maxRating - fullStars - halfStars;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img
          key={`full-${i}`}
          src={require(`../assets/images/Vector (11).png`)}
          alt="Full Star"
          style={{ width: '20px', height: '20px' }}
        />
      );
    }

    if (halfStars) {
      stars.push(
        <img
          key="half"
          src={require(`../assets/images/star-half-filled.png`)}
          alt="Half Star"
          style={{ width: '20px', height: '20px' }}
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <img
          key={`empty-${i}`}
          src={require(`../assets/images/Vector (12).png`)}
          alt="Empty Star"
          style={{ width: '20px', height: '20px' }}
        />
      );
    }

    return stars;
  };

  return (
    <Star>
        {renderStars()}
    </Star>
  );
};

const Star = styled.div``;
export default StarRating;
