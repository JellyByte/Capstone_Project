import React from 'react'
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header className='bg-slate-600 py-4'>
      <div className='container mx-auto flex justify-between'>
        <NavLink to="/" className='text-emerald-300 text-2xl font-medium mr-4'> myBuilding</NavLink>
        <nav className='flex'>
          <NavLink to="/" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
          <NavLink to="/login" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Login</NavLink>
          <NavLink to="/listings" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Listings</NavLink>
          <NavLink to="/messaging" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Messages</NavLink>
          <NavLink to="/about" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> About</NavLink>
          <NavLink to="/documents" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Documents </NavLink>
          <NavLink to="/upload" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Upload </NavLink>
          <NavLink to="/addAppartments" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Add Appartments </NavLink>          
        </nav>
      </div>
    </header>
  );
}
