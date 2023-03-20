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
    <div>
      {listings &&
        listings.map(listing => {
          const image = listing.photoURL
          return (
            
              <div key={listing.photoURL}>
                <img
                  src={listing.photoURL}
                  className={`border-2 border-gray-500 hover:border-red-500 m-2 p-2 ${
                    image && 'border-green-500'
                  }`}
                  style={{ width: '150px', height: '100px', userSelect: 'text' }}
                  //onClick={event => handleImageSelect(event, url)}
                />
                <div>
                  title {listing.title}

              </div>
              <div>
                description {listing.description}

              </div>

              </div>
            
          )
          
        



        
        }
         
        )}
    </div>
  );
};

export default ImageGrid;

