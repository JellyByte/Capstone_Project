import React, { useState } from "react";
import { About_others } from "./About_others";

export const About = () => {
  const videoId = "SIXov3jAfAs";
  const videoId1 = "A4_uIbrrEio";
  const [showOthers, setShowOthers] = useState(false);

  const handleShowOthers = () => {
    setShowOthers(true);
  };

  const handleShowHome = () => {
    setShowOthers(false);
  };

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="justify-between border-b border-gray-500 pb-2 mb-2 ">
          <button
            className="px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200"
            onClick={handleShowHome}
          >
            Home
          </button>
          <button
            className="px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200"
            onClick={handleShowOthers}
          >
            See More
          </button>
        </div>
        {showOthers ? (
          <About_others />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center">
              Welcome to myBuilding
            </h1>
            <p className="text-lg leading-7 text-gray-500 mb-8">
              myBuilding is an innovative platform designed to simplify property
              management for both landlords and tenants. Our app allows tenants
              to easily browse through a wide range of listings, search by
              location, and communicate with other users through our messaging
              feature. For landlords, myBuilding offers an easy-to-use "Upload
              Listings" modal, which enables them to add, delete, and update
              their property listings in real-time. They can also add tenants to
              their account and send notifications and reminders to keep
              everyone informed.
            </p>
            <p className="text-lg leading-7 text-gray-500 mb-8">
              Our "Documents" page allows for streamlined file management,
              making it easier than ever to keep track of important documents.
              With our chatting feature, users can communicate with each other
              in real-time, making it easier than ever to stay in touch. Whether
              you're a tenant or landlord, myBuilding is the ultimate platform
              for property management.
            </p>
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg font-bold mb-2">
                How to use our messaging feature:
              </p>
              <iframe
                className="w-full h-72"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg font-bold mb-2">
                How to use our listings feature:
              </p>
              <iframe
                className="w-full h-72"
                src={`https://www.youtube.com/embed/${videoId1}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// import React from "react";
// import About_Others from "./About_others";
// import { useNavigate } from "react-router-dom";

// export const About = () => {
//   const videoId = "SIXov3jAfAs";
//   const videoId1 = "A4_uIbrrEio";
//   const navigate = useNavigate();

//   console.log("hello");
//   return (
//     <div className="bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="justify-between border-b border-gray-500 pb-2 mb-2 ">
//           <a href="/about">
//             <button className="px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200">
//               Home
//             </button>
//           </a>
//           <a href="/about_others">
//             <button className="px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200">
//               See More
//             </button>
//           </a>
//         </div>
//         <h1 className="text-4xl font-bold mb-4 text-center">
//           Welcome to myBuilding
//         </h1>
//         <p className="text-lg leading-7 text-gray-500 mb-8">
//           myBuilding is an innovative platform designed to simplify property
//           management for both landlords and tenants. Our app allows tenants to
//           easily browse through a wide range of listings, search by location,
//           and communicate with other users through our messaging feature. For
//           landlords, myBuilding offers an easy-to-use "Upload Listings" modal,
//           which enables them to add, delete, and update their property listings
//           in real-time. They can also add tenants to their account and send
//           notifications and reminders to keep everyone informed.
//         </p>
//         <p className="text-lg leading-7 text-gray-500 mb-8">
//           Our "Documents" page allows for streamlined file management, making it
//           easier than ever to keep track of important documents. With our
//           chatting feature, users can communicate with each other in real-time,
//           making it easier than ever to stay in touch. Whether you're a tenant
//           or landlord, myBuilding is the ultimate platform for property
//           management.
//         </p>
//         <div className="max-w-4xl mx-auto mb-8">
//           <p className="text-lg font-bold mb-2">
//             How to use our messaging feature:
//           </p>
//           <iframe
//             className="w-full h-72"
//             src={`https://www.youtube.com/embed/${videoId}`}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//         <div className="max-w-4xl mx-auto mb-8">
//           <p className="text-lg font-bold mb-2">
//             How to use our listings feature:
//           </p>
//           <iframe
//             className="w-full h-72"
//             src={`https://www.youtube.com/embed/${videoId1}`}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//         <p className="text-sm leading-5 text-gray-500"></p>
//       </div>
//     </div>
//   );
// };
