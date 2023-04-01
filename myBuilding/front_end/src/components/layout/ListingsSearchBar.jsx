import React, { useState, useContext, useEffect } from "react";
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
  const [description, setDescription] = useState("");
  const [listing, setListing] = useState(null);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (mounted && description !== '') {
      handleSearch();
    } else {
      setListing(null);
      setMounted(true);
    }
  }, [description, mounted]);

  return (
    <div>
      <input
        type="text"
        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
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
