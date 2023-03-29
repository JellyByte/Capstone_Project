import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";

export const ListingsSearchBar = () => {
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [listing, setListing] = useState(null);

  const handleSearch = async () => {
    const q = query(collection(db, "Listings"), where("description", ">=", description));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setListing(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyDown={handleKeyDown}
      />
      {listing && (
        <div>
          <img src={listing.photoURL} alt={listing.title} />
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
        </div>
      )}
    </div>
  );
};