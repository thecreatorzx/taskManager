import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClipboard, FaHome, FaLightbulb } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

const Nav = ({ login, setLogin }) => {
  const navigate = useNavigate();

  const iconBtn = "cursor-pointer text-lg p-3 text-sky-600 hover:text-sky-800 hover:bg-sky-50 active:text-blue-700 active:bg-sky-100 rounded-lg transition-all";
  return (
    <div className='h-full font-semibold flex flex-row items-center gap-2 sm:gap-5'>
      <div className={iconBtn} onClick={() => navigate("/")}><FaHome size={"20px"}/></div>

      {login ? (
        <>
          <div className={iconBtn} onClick={() => navigate("/dashboard")}><FaClipboard /></div>
        </>
      ) : (
        <div className={`${iconBtn} text-sm`} onClick={() => navigate("/login")}>Log In</div>
      )}

      <div className={iconBtn} onClick={() => navigate("/about")}><FaLightbulb /></div>

      {login && (
        <button 
          onClick={() => { setLogin(false); navigate("/"); }} 
          className="flex items-center gap-1 text-red-600 font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors cursor-pointer ml-auto"
        >
          <FiLogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      )}
    </div>
  ) 
}

export default Nav;
