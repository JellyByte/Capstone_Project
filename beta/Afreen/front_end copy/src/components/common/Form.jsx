import React  from 'react';
import TextField from '@mui/material/TextField';
import Button from './Button'
import { GoogleOutlined } from '@ant-design/icons'
import firebase from 'firebase/compat/app';

import {auth} from '../../firebase-config'




export default function BasicTextFieldFields({title ,setPassword, setEmail, handleAction,googleSignIn}){





    return( 

    
     <div className=' bg-gradient-to-r from-blue-200 to-slate-200 h-screen w-screen'>


        
        <div className='flex justify-center py-40 '>
        <div className='flex flex-col gap-4 w-64 h-80  shadow-lg border border-slate-600 rounded-md'>
          <div className=' flex flex-col gap-4 px-8 py-2'>
            <div className=' text-lg font-medium text-center font-sans'>{title} Form</div>
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)} 
                    className='p-2 text-white'
                    size="small"
                />
                <TextField 
                    id="password" 
                    label="Password" 
                    variant="outlined" 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='my-2 rounded-md text-white'
                    size="small"
                />
                <Button 
                    title={title} 
                    handleAction={handleAction}
                    className='my-2 bg-green-500 text-white rounded-md'
                />
                <div onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} className='bg-sky-600/75 text-white flex justify-center p-2 cursor-pointer rounded-md border-solid border-2 border-sky-500  hover:shadow-lg bg-sky-700'>
                    <span className='my-1 px-2 mr-1'>
                        <GoogleOutlined/>

                    </span>
                    <span className='my-1'> {title} </span>

                </div>



                

                

            </div>
        </div>
    </div>
    

    </div>

    
    
       
    )
}