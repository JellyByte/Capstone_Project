import React from 'react'

export const About = () => {

  const videoId = 'SIXov3jAfAs';
  const videoId1= 'A4_uIbrrEio';

  console.log("hello")
  return (
    <div>
      <h1>Welcome to myBuilding</h1>
      <p>
        myBuilding is an innovative platform designed to simplify property management for both landlords and tenants. 
        Our app allows tenants to easily browse through a wide range of listings, search by location, and communicate with other users through our messaging feature. 
        For landlords, myBuilding offers an easy-to-use "Upload Listings" modal, which enables them to add, delete, and update their property listings in real-time. 
        They can also add tenants to their account and send notifications and reminders to keep everyone informed.
      </p>
      <p>
        Our "Documents" page allows for streamlined file management, making it easier than ever to keep track of important documents. 
        With our chatting feature, users can communicate with each other in real-time, making it easier than ever to stay in touch. 
        Whether you're a tenant or landlord, myBuilding is the ultimate platform for property management.
      </p>
      <p>
        How to use our messaging feature: 
      </p>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId1}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

  )
}
