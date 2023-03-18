import React from 'react';


export function MyIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

export function GenericUserIcon(props) {
  return (
    <svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"{...props}>
      <g id="user-square" transform="translate(-2 -2)">
        <path id="secondary" fill="#2ca9bc" d="M20,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H7V20a5,5,0,0,1,5-5,4,4,0,1,1,4-4,4,4,0,0,1-4,4,5,5,0,0,1,5,5v1h3a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3Z"/>
        <path id="primary" d="M12,15h0a5,5,0,0,0-5,5v1H17V20A5,5,0,0,0,12,15Zm0-8a4,4,0,1,0,4,4A4,4,0,0,0,12,7Zm8,14H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H20a1,1,0,0,1,1,1V20A1,1,0,0,1,20,21Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
    </svg>
  );
}

export function MyComponent() {
  return (
    <div>
      <MyIcon className='h-6 w-6' />
    </div>
  );
}

export function GenericUser() {
  return(
    <div>
      <GenericUserIcon className='w-80 h-60'/>
    </div>
  )
}
