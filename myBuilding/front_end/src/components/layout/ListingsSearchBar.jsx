import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";

export const ListingsSearchBar = () => {
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [mounted, setMounted] = useState(false);

  const handleSearch = async () => {
    try {
      let querySnapshot;
  
      if (searchTerm !== "") {
        const stateQuery = query(collection(db, "generalListings"), where("state", "==", searchTerm));
        const zipCodeQuery = query(collection(db, "generalListings"), where("zip", "==", searchTerm));
  
        // Run both queries in parallel
        const [stateSnapshot, zipCodeSnapshot] = await Promise.all([getDocs(stateQuery), getDocs(zipCodeQuery)]);
  
        // Combine the results of both queries
        querySnapshot = [...stateSnapshot.docs, ...zipCodeSnapshot.docs];
      } else {
        // If searchTerm is empty, fetch all documents
        querySnapshot = await getDocs(collection(db, "generalListings"));
      }
  
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setListings(results);
    } catch (err) {
      setErr(true);
    }
  };

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     let results = [];
  //     querySnapshot.forEach((doc) => {
  //       results.push(doc.data());
  //     });
  //     setListings(results);
  //   } catch (err) {
  //     setErr(true);
  //   }
  // };

  useEffect(() => {
    if (mounted && searchTerm !== "") {
      handleSearch();
    } else {
      setListings([]);
      setMounted(true);
    }
  }, [searchTerm, mounted]);
  console.log(searchTerm)

  return (
    <div>
      <input
        type="text"
        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search by State or Zipcode"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {listings.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
          {listings.map((listing) => (
            <Link
              to={`/listings/${listing.uid}`}
              key={listing.uid}
              className="flex p-2 hover:bg-gray-100"
            >
              <img
                src={listing.photoURL}
                alt={listing.title}
                className="w-16 h-16 object-cover mr-2"
              />
              <div>
                <h2 className="text-xl font-bold">{listing.titleValue}</h2>
                <p className="text-sm font-bold text-gray-800">{listing.address}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


