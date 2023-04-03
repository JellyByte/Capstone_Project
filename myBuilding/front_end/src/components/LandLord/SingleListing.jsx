import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
export const SingleListing = (props) => {
  console.log(props.descrip);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-64 object-cover object-center hover:opacity-75 transition-opacity"
        src={props.photoURL}
        alt={props.title}
      />
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2">{props.title}</div>
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
