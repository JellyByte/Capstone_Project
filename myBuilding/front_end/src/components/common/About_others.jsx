import React from 'react'

export const About_others = () => {
  return (
    <div className='bg-gray-100 py-8 px-4 max-w-7xl mx-auto'>
      <div className='justify-between border-b border-gray-500 pb-2 mb-2 '>
      <a href="/about">
        <button className='px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200'>Home</button>
      </a>
      <a href='./about_others'>
        <button className='px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200'>See More</button>
      </a>
      
    </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to myBuilding(More)</h1>
        <p>Team: Vladyslav Yatsuta, Afreen Ahmad, and Joe Yeung</p>
        <a 
        className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' 
        href="https://github.com/JellyByte/Capstone_Project.git">
            GitHub Link
        </a>
        <br />
        <br />
        <p>Support</p>
        <p>How to use: click around, pretty self explanatory</p>
        <br />
        <p>System Documentation</p>
        <p>Framworks: Reactjs, firebase</p>
        <p>Requirement: Any Modern Browser</p>
        <br />
        <a href='./'>
        <button className='px-4 py-2 bg-emerald-500 text-white hover:text-fuchsia-200'>Click Here To Get Started</button>
      </a>
        
    </div>
  )
}
