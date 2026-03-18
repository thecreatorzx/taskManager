import React from 'react';
import { FiTarget, FiShield, FiUsers, FiClock } from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: <FiTarget size={30} className="text-sky-600" />,
      title: "Our Mission",
      desc: "To eliminate digital burnout by transforming chaotic to-do lists into streamlined plans of action."
    },
    {
      icon: <FiShield size={30} className="text-sky-600" />,
      title: "Privacy First",
      desc: "Your data is yours. We believe productivity shouldn't come at the cost of your personal privacy."
    },
    {
      icon: <FiUsers size={30} className="text-sky-600" />,
      title: "Built for Teams",
      desc: "Collaboration is at our core. TaskMaster is designed to keep everyone in sync, effortlessly."
    },
    {
      icon: <FiClock size={30} className="text-sky-600" />,
      title: "Save Time",
      desc: "Our goal is simple: spend less time managing your work and more time actually doing it."
    }
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-sky-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            We’re on a mission to <br />
            <span className="text-sky-600 italic">Simplify Work.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            TaskMaster was born out of a simple frustration: most tools are too complex. 
            We built a platform that stays out of your way so you can focus on what matters.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((val, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="p-5 bg-sky-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{val.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
