import React from 'react';

function MyComponent() {
  return (
    <div>
      <MyIcon className='h-6 w-6' />
    </div>
  );
}

function MyIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

export default MyComponent;
