import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md p-4 flex justify-between items-center shadow-md">
            <img src="../../public/images/bit.png" alt="Bank Logo" className="h-12 text-white" />
            <h1 className="text-xl font-bold text-white">Bit's Bank</h1>
        </nav>
  )
}

export default Navbar