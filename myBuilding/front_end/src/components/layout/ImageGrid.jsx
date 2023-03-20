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
      console.log(listings[0].photoURL);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  console.log("Current listings: ", listings);

  return (
    <div>
      {listings &&
        listings.map(listing => {
          return(
            <div className="flex">

              <SingleListing photoURL = {listing.photoURL} descrip= {listing.description} title = {listing.title}/>

            </div>

          )

        })
          
        



        
        }
         
        
    </div>
  );
};

export default ImageGrid;

