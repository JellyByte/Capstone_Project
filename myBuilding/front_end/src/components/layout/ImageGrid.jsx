import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import { auth, db, storage } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { SingleListing } from "../LandLord/SingleListing";
import { ListingsSearchBar } from "./ListingsSearchBar";

const ImageGrid = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "Listings")), (querySnapshot) => {
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        listingsData.push(doc.data());
      });
      setListings(listingsData);
      //console.log(listings[0].photoURL);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  console.log("Current listings: ", listings);

  return (
    <div className="grid grid-flow-rows sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    {listings.map((listing) => (
      <div className=" mx-auto" key={listing.title}>
        <SingleListing
          photoURL={listing.photoURL}
          title={listing.title}
          descrip={listing.description}
        />
      </div>
    ))}
  </div>
  
  
  
  
  
  
  );
};

export default ImageGrid;

