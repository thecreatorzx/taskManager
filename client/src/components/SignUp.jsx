import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [user, setUser] = useState({ name: "", username: "", email: "", password: "", confirmPass: "" });
  const navigate = useNavigate();

  // Unified validation logic
  const getStatus = (id, val) => {
    if (!val) return "empty";
    const rules = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      password: val.length >= 8,
      confirmPass: val === user.password && val !== "",
      default: val.trim().length >= 3
    };
    return (rules[id] ?? rules.default) ? "valid" : "invalid";
  };

  const fields = [
    { id: 'name', label: 'Full Name', type: 'text' },
    { id: 'username', label: 'User Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
    { id: 'confirmPass', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div className='w-full h-screen bg-sky-100 flex justify-center items-center p-4'>
      <form onSubmit={(e) => e.preventDefault()} className='w-full max-w-md bg-white p-8 flex flex-col gap-4 shadow-xl rounded-2xl'>
        <h1 className='text-3xl font-black text-center text-gray-800 mb-2'>Create Account</h1>
        
        {fields.map(({ id, label, type }) => {
          const state = getStatus(id, user[id]);
          return (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 ml-4">
                {label}
                {state === "valid" && <FaCheck className="text-green-500 animate-bounce" />}
                {state === "invalid" && <FaTimes className="text-red-500" />}
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
        
        <button className="bg-sky-600 hover:bg-sky-700 text-white py-3 mt-4 rounded-full font-black shadow-lg shadow-sky-200 transition-transform active:scale-95">
          SIGN UP
        </button>
        
        <p className="text-center text-sm text-gray-500 font-medium">
          Already have an account? 
          <span onClick={() => navigate("/login")} className="ml-1 text-sky-600 cursor-pointer font-bold hover:underline">Log In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
