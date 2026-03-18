import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClipboard, FaHome, FaLightbulb } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import api from "../api/axios.ts"


const Nav = ({ login, setLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const iconBtn = "cursor-pointer text-lg p-3 text-sky-600 hover:text-sky-800 hover:bg-sky-50 active:text-blue-700 active:bg-sky-100 rounded-lg transition-all";

  const handleLogout = async() => {
      try {
            await api.post('/auth/logout')
            setLogin(false)
            navigate('/')
          } catch (err) {
            setError(err.response?.data?.error || "Logout failed")
          }
    }
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
          onClick={handleLogout} 
          className="flex items-center gap-1 text-red-600 font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors cursor-pointer ml-auto"
        >
          <FiLogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      )}
      {error &&login && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  ) 
}

export default Nav;
