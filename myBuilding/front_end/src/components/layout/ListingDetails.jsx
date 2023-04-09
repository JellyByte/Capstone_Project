import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";

const ListingDetails = () => {
  const { id } = useParams();
  const [listingData, setListing] = useState([]);
  console.log(id);

  useEffect(() => {
    const docRef = doc(db, "generalListings", id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setListing([doc.data()]);
        console.log(doc.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  //console.log();
  if (listingData.length === 0) {
    return <Loading />;
  }
  const listing = listingData[0];
  console.log(listing);

  //const { id } = useParams();
  //const listing = listings.find((listing) => listing.id === id);
  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-lg">
      <div className="relative h-64">
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={listing.photoURL}
          alt={listing.title}
        />
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h1 className="font-bold text-3xl mb-2">{listing.titleValue}</h1>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">Location:</span> {listing.address},{" "}
          {listing.city}, {listing.state}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {listing.description}
        </p>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Listed by: {listing.postedBy}
        </span>
      </div>
    </div>
  );
};

export default ListingDetails;
