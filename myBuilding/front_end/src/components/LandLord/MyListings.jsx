import { AuthContext } from "../../context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { auth, db, storage } from "../../firebase-config";
import { collection, query, onSnapshot, doc } from "firebase/firestore";
import { SingleListing } from "../LandLord/SingleListing";
import { Loading } from "../Loading";
import { Link } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const uid = currentUser?.uid;

  useEffect(() => {
    const ListingsRef = collection(db, "Listings");
    const uid = currentUser?.uid;
    if (uid) {
      const ListingsDoc = doc(ListingsRef, uid);
      const unsubscribe = onSnapshot(ListingsDoc, (doc) => {
        if (doc.exists()) {
          const listingsData = doc.data().listings;
          setListings(listingsData);
          setLoading(false);
        } else {
          setListings([]);
          setLoading(false);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (listings === undefined) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center h-screen">
        <p className="text-gray-600 font-medium text-center">
          You don't have any listings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-rows sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {listings.map((listing) => (
        <div className="mx-auto" key={listing.uid}>
          <Link to={`/mylistings/${listing.uid}`}>
            <SingleListing
              loading={setLoading}
              photoURL={listing.downLoadURL}
              title={listing.titleValue}
              descrip={listing.description}
              state={listing.state}
              city={listing.city}
              postedby={listing.postedBy}
              address={listing.adress}
              zip={listing.zip}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
