import React  from 'react'
import UploadForm from '../common/UploadForm';

import { SingleListing } from '../LandLord/SingleListing';
import ImageGrid from './ImageGrid';

export const Listings = () => {

 
  
  
  return (
    <div className="flex flex-col gap-2 p-2 ">

      <ImageGrid/>
      <UploadForm/>

    <SingleListing/>
    <SingleListing/>
    <SingleListing/>

    <SingleListing/>
      <SingleListing/>
      <SingleListing/>

      <SingleListing/>
      <SingleListing/>


  </div>
  )
}
