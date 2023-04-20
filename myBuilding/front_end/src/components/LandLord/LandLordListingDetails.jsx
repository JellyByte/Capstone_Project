import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase-config";
import { Loading } from "../Loading";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { doc } from "firebase/firestore";
const LandLordListingDetails = () => {

  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
 

  const { id } = useParams();
  const [listingData, setListings] = useState([]);
  console.log(id);

  // useEffect(() => {
  //   const docRef = doc(db, "generalListings", id);
  //   const unsubscribe = onSnapshot(docRef, (doc) => {
  //     if (doc.exists()) {
  //       setListing([doc.data()]);
  //       console.log(doc.data());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const ListingsRef = collection(db, "Listings");
    const uid = currentUser?.uid;
    if (uid) {
      const ListingsDoc = doc(ListingsRef, uid);
      const unsubscribe = onSnapshot(ListingsDoc, (doc) => {
        if (doc.exists()) {
          //   console.log(doc.data);
          //const listingsData = doc.data().listings;
          console.log(doc.data().listings);

          setListings([doc.data().listings]);
          //setLoading(false);
        } else {
          //setListings([]);
          //setLoading(false);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);
  console.log(listingData);
  let listing = null;

  if (listingData.length === 0) {
    return <Loading />;
  } else {
    listingData[0].map((listingd) => {
      if (listingd.uid === id) {
        {
          console.log(listingd);
          listing = listingd;
        }
      }
    });
  }
  // const handleImageSelect = (event, url) => {
  //   const decodedUrl = decodeURIComponent(url); // Decode the URL encoding
  //   const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).replace(/\?.*/, ''); // Extract the filename from the decoded URL and remove the query string
  //   setSelectedImage(fileName);
  //   console.log(fileName);

    
  // }

 

  

  //const listing = listingData[0];
  console.log(listing);

  //const { id } = useParams();
  //const listing = listings.find((listing) => listing.id === id);
  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-lg mx-auto">
      <div className="relative h-96">
        <button onClick={deleteImage(listing.downLoadURL)}>Delete </button>
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={listing.downLoadURL}
          alt={listing.title}
        />
      </div>
      <div className="px-4 py-5 sm:px-6 text-center">
        <h1 className="font-bold text-3xl mb-2">{listing.titleValue}</h1>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">Location:</span>
          {listing.address}, {listing.city}, {listing.state}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {listing.description}
        </p>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Listed by:
          {currentUser.displayName}
        </span>
      </div>
    </div>
  );
};

export default LandLordListingDetails;
