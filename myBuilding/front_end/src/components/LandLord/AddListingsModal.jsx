import React from 'react'
import { useState } from 'react';
import { MyComponent } from '../svgs/addIcon';
import UploadForm from '../common/UploadForm';

export const AddListingsModal = () => {

    const [showModal, setShowModal] = React.useState(false);
    const [img,setImg] = useState(null);//for the message input
    const [err,setErr] = useState(false);
    const handleSubmit = ()=>{

    }


  return  (
   
    <>
     <button 
    className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
    type="button"
    onClick={() => setShowModal(true)}
>
        add a Listing
      </button>
      {showModal ? (
        
        <>

          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                {err &&(
                           <div>
                           <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                             <p class="font-bold">Be Warned</p>
                             <p>please select a picture to upload</p>
                           </div>
                         </div>

                        )
                        }
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Lorem Ipsum
                  </p>
                  <UploadForm/>

                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { setErr(false); setShowModal(false); }}
                    >
                    Close
                  </button>



                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}

                  >
                    
                  
                    Save Changes

                  </button>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
   

    </>
  );
}