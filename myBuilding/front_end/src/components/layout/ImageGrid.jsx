import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import { auth, db, storage } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { SingleListing } from "../LandLord/SingleListing";

const ImageGrid = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "Listings")), (querySnapshot) => {
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        listingsData.push(doc.data());
      });
      setListings(listingsData);
      console.log(listings[0].photoURL);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  console.log("Current listings: ", listings);

  return (
    <div className="flex flex-wrap justify-center items-center -mx-2">
    {listings.map((listing) => (
      <div className="w-full md:w-1/2 lg:w-1/3 p-2" key={listing.title}>
        <SingleListing
          photoURL={listing.photoURL}
          title={listing.title}
          descrip={listing.descrip}
        />
      </div>
    ))}
  </div>
  
  );
};

export default ImageGrid;

