import React from "react";

import { MyComponent } from "../svgs/addIcon";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { v4 as uuid } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase-config";

export default function AddTenantModal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  console.log(searchQuery);
  const [users, setUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  const handleAdd = () => {
    // handle adding searchQuery to something else here
    setSearchQuery("");
  };

  const handleClick = async () => {
    setShowModal(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  };

  return (
    <div>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        Add a tenant
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Add Tenant
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700 font-bold">Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="border-gray-400 border-solid border rounded py-2 px-4 w-full"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg mr-4 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={handleAdd}
                >
                  Add
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
