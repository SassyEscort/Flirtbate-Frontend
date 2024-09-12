import React from 'react';
import { RatingStartBox } from 'views/protectedDashboardViews/ratingAndReview/RatingAndReview.styled';

interface IStartRating {
  value: number;
  isReadOnly?: boolean;
  handleStarClick?: (val: number) => void;
  resize?: boolean;
}
const StartRating = ({ value, isReadOnly, resize, handleStarClick }: IStartRating) => {
  return (
    <RatingStartBox
      name="customized-rating"
      value={value || 0}
      max={5}
      readOnly={!!isReadOnly}
      onChange={(event, newValue) => {
        event.preventDefault();
        handleStarClick && handleStarClick(newValue || 0);
      }}
      {...(resize && {
        sx: {
          '& svg': {
            width: '16px',
            height: '16px'
          }
        }
      })}
    />
  );
};

export default StartRating;
