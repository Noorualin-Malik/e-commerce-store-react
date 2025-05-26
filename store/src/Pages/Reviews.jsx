import React from 'react';
import './Reviews.css';

const reviewsData = [
  {
    name: "Ali Khan",
    rating: 5,
    comment: "Great product quality and fast delivery!",
  },
  {
    name: "Sara Ahmed",
    rating: 4,
    comment: "Very satisfied with the purchase, will order again.",
  },
  {
    name: "Usman Raza",
    rating: 3,
    comment: "Product was good but delivery took longer than expected.",
  },
];

function Reviews() {
  return (
    <div className="reviews-section">
      <h2 className="reviews-title">Customer Reviews</h2>
      <div className="reviews-list">
        {reviewsData.map((review, index) => (
          <div className="review-card" key={index}>
            <h3 className="reviewer-name">{review.name}</h3>
            <div className="review-rating">
              {"⭐".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="review-comment">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
