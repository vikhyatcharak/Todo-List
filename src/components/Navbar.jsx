import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="w-full flex justify-between py-2 px-4 mb-16 bg-violet-700 min-h-12">
        <div className="logo text-3xl text-white font-extrabold">TM</div>
        <ul className="flex list-none gap-5 text-xl font-medium text-slate-50">
            <li className="hover:text-white hover:font-bold hover:cursor-pointer">Home</li>
            <li className="hover:text-white hover:font-bold hover:cursor-pointer">Your Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
