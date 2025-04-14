import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating?: (value: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  readOnly = false,
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={`cursor-pointer text-xl ${
            value <= rating ? "text-yellow-400" : "text-gray-500"
          }`}
          onClick={() => {
            if (!readOnly && setRating) setRating(value);
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
