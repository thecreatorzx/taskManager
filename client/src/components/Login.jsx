import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Simple validation helper
  const getStatus = (id, val) => {
    if (!val) return "empty";
    const isValid = id === 'email' 
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) 
      : val.length >= 8;
    return isValid ? "valid" : "invalid";
  };

  const fields = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" }
  ];

  return (
    <div className='w-full h-[calc(100vh-80px)] bg-sky-50 flex justify-center items-center p-4'>
      <form onSubmit={(e) => e.preventDefault()} className='w-full max-w-sm bg-white p-8 flex flex-col gap-5 shadow-xl rounded-2xl'>
        <h1 className='text-3xl font-black text-center text-gray-800 mb-2 italic'>Welcome Back</h1>
        
        {fields.map(({ id, label, type }) => {
          const state = getStatus(id, user[id]);
          return (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">
                {label}
              </label>
              <input 
                className={`border-2 p-3 px-5 rounded-full outline-none transition-all ${
                  state === "invalid" ? "border-red-200 bg-red-50 focus:border-red-400" : "border-gray-100 focus:border-sky-500 bg-gray-50 focus:bg-white"
                }`}
                type={type} id={id} value={user[id]} 
                onChange={(e) => setUser({ ...user, [id]: e.target.value })} 
              />
            </div>
          );
        })}
        
        <button className="bg-sky-600 hover:bg-sky-700 text-white py-3 mt-2 rounded-full font-black shadow-lg shadow-sky-100 transition-transform active:scale-95">
          LOG IN
        </button>
        
        <p className="text-center text-sm text-gray-500 font-medium">
          New to TaskMaster? 
          <span onClick={() => navigate("/signup")} className="ml-1 text-sky-600 cursor-pointer font-bold hover:underline">Register Now</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
