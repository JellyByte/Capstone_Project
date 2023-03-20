import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import { auth, db, storage } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";

const ImageGrid = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "Listings")), (querySnapshot) => {
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        listingsData.push(doc.data());
      });
      setListings(listingsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("Current listings: ", listings);

  return (
    <div>
      {listings &&
        listings.map((listing) => (
          <div key={listing.id}>
            <img src={listing.photoUrl} alt={listing.title} />
            <div>{listing.title}</div>
            <div>{listing.description}</div>
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;

