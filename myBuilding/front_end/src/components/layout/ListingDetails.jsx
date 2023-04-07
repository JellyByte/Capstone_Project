import React, { useEffect, useState } from "react";

const ListingDetails = (props) => {
    return (
      <div>
        <h1 className="font-bold text-2xl mb-2">{props.title}</h1>
        <img
          className="w-full h-64 object-cover object-center hover:opacity-75 transition-opacity"
          src={props.photoURL}
          alt={props.title}
        />
        <p className="text-gray-700 text-base mb-2">
          <span className="font-semibold">Address:</span> {props.address},{" "}
          {props.city}, {props.state}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">Description:</span> {props.descrip}
        </p>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Listed by: {props.postedby}
        </span>
      </div>
    );
  };
  
  
  
  

export default ListingDetails ;
