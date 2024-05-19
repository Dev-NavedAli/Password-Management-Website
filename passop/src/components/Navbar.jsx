import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800  text-white'>
      <div className="mycontainer flex  justify-between items-center px-4
      py-5 h-14 ">
        <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>Op/&gt;</span>
          
          </div>
        <ul>
          <li className='flex gap-4'>
            <a href='/' className='hover:font-bold'>Home</a>
            <a href='#' className='hover:font-bold'>About</a>
            <a href='#' className='hover:font-bold'>Conatct us</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar