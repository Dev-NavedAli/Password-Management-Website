import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white text-centeer flex flex-col justify-center items-center fixed bottom-0 w-full h-[60px]'>
      <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-500'>&lt;</span>
        <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

      </div>
      <div className='flex justify-center items-center'>
        Created by <img src="/icon/heart.svg" alt="nk" className='w-8 mx-2' /> Naved Khan 
      </div>

    </div>
  )
}

export default Footer;