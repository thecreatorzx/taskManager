import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import your image at the top
import dashboardImg from '../assets/dashboard.png'; 

const Hero = ({ login }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Small Badge */}
        <span className="bg-sky-100 text-sky-700 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          Command Center
        </span>

        {/* Headlines */}
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
          Master your time. <br />
          <span className="text-sky-600 italic">Master your life.</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
          <span className="font-bold text-gray-800">TaskMaster</span> turns your chaotic "to-do" list into a 
          streamlined plan of action. Organize, prioritize, and conquer your goals.
        </p>

        {/* Conditional CTAs */}
        {!login ? (
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <button 
              className="w-full sm:w-auto px-10 py-4 bg-sky-600 text-white font-bold rounded-full shadow-xl shadow-sky-200 cursor-pointer hover:bg-sky-700 transition duration-300 transform hover:-translate-y-1 active:scale-95" 
              onClick={() => navigate("/signup")}
            >
              Start Mastering for Free
            </button>
            <button 
              className="w-full sm:w-auto px-10 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 hover:border-sky-200 transition duration-300 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              See it in Action
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-full font-bold cursor-pointer hover:bg-black transition-all group"
          >
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
            Go to Dashboard
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        )}

        {/* Image Mockup with a "Floating" effect */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-gray-100 overflow-hidden bg-white">
          <img 
            src={dashboardImg} 
            alt="TaskMaster Dashboard Preview" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
