import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import { auth, db, storage } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { SingleListing } from "../LandLord/SingleListing";
import { ListingsSearchBar } from "./ListingsSearchBar";
import { Loading } from "../Loading";

const ImageGrid = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "generalListings")),
      (querySnapshot) => {
        const listingsData = [];
        querySnapshot.forEach((doc) => {
          listingsData.push(doc.data());
        });
        setListings(listingsData);
        setLoading(false);
        console.log(listings);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("Current listings: ", listings);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-flow-rows sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {listings.map((listing) => (
            <div className="mx-auto" key={listing.id}>
              <SingleListing
                photoURL={listing.photoURL}
                title={listing.titleValue}
                descrip={listing.description}
                state={listing.state}
                city={listing.city}
                postedby={listing.postedBy}
                address={listing.address}
                zip={listing.zip}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
