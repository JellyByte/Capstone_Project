import React  from 'react'
import UploadForm from '../common/UploadForm';

import { SingleListing } from '../LandLord/SingleListing';
import ImageGrid from './ImageGrid';
import { ListingsSearchBar } from './ListingsSearchBar';

export const Listings = () => {

 
  
  
  return (
    <div className="flex flex-col gap-2 p-2 ">
      <ListingsSearchBar/>
      <ImageGrid/>



  </div>
  )
}
