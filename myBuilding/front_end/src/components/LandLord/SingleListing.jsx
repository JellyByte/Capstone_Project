import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import ListingDetails from "../layout/ListingDetails";

export const SingleListing = (props) => {
  const [showBigImage, setShowBigImage] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowBigImage(true);
  };

  const handleClose = () => {
    setShowBigImage(false);
  };

  const handleListingClick = () => {
    navigate(`/listing/${props.title}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-64 object-cover object-center hover:opacity-75 transition-opacity"
        src={props.photoURL}
        alt={props.title}
        onClick={handleClick}
      />
      {showBigImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
          onClick={handleClose}
        >
          <ListingDetails 
            title={props.title}
            photoURL={props.photoURL}
            address={props.address}
            city={props.city}
            state={props.state}
            descrip={props.descrip}
            postedby={props.postedby}
          />
          <img
            className="max-h-full max-w-full"
            src={props.photoURL}
            alt={props.title}
          />
        </div>
      )}
      <div className="px-6 py-4 bg-white">
        <div
          className="font-bold text-xl mb-2 cursor-pointer"
          onClick={handleListingClick} // Add click event handler for listing click
        >
          {props.title}
        </div>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-semibold">Address:</span> {props.address},{" "}
          {props.city}, {props.state}
        </p>
        <p className="text-gray-700 text-base truncate mb-4">
          <span className="font-semibold">Description:</span> {props.descrip}
        </p>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Listed by: {props.postedby}
        </span>
      </div>
    </div>
  );
};

