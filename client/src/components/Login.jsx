import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = ({ login, setLogin }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getStatus = (id, val) => {
    if (!val) return "empty";
    const rules = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      password: val.length >= 8,
    };
    return rules[id] ? "valid" : "invalid";
  };

  const fields = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post('/auth/login', user);
      setLogin(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-[calc(100vh-80px)] bg-sky-50 flex justify-center items-center p-4'>
      <form onSubmit={handleSubmit} className='w-full max-w-sm bg-white p-8 flex flex-col gap-5 shadow-xl rounded-2xl'>
        <h1 className='text-3xl font-black text-center text-gray-800 mb-2 italic'>Welcome Back</h1>

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
                  state === "invalid"
                    ? "border-red-200 bg-red-50 focus:border-red-400"
                    : "border-gray-100 focus:border-sky-500 bg-gray-50 focus:bg-white"
                }`}
                type={type} id={id} value={user[id]}
                onChange={(e) => setUser({ ...user, [id]: e.target.value })}
              />
            </div>
          );
        })}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white py-3 mt-2 rounded-full font-black shadow-lg shadow-sky-100 transition-transform active:scale-95 disabled:opacity-50">
          {loading ? 'Logging in...' : 'LOG IN'}
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