import React from 'react'
import { BiTask } from "react-icons/bi"
import Nav from "./Nav"
import { useNavigate } from 'react-router-dom'

const Header = ({ login, setLogin }) => {
  const navigate = useNavigate
  return (
    <header className='sticky top-0 z-50 w-full h-20 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-sky-50 transition-all'>
      
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 text-sky-600 group cursor-pointer">
        <div className="p-2 bg-sky-100 rounded-xl group-hover:scale-110 transition-transform">
          <BiTask size="32px"/>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-gray-800">
          Task<span className="text-sky-600">Master</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <Nav login={login} setLogin={setLogin}/>
      
    </header>
  )
}

export default Header
