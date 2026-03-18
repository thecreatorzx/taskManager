import React from 'react';
import { FaTasks, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    { title: "Product", links: ["Features", "Pricing", "About"] },
    { title: "Support", links: ["Help Center", "Privacy", "Terms"] },
  ];

  return (
    <footer className='w-full bg-sky-900 text-white p-10 mt-auto'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10'>
        
        {/* Brand & Mission */}
        <div className='col-span-1 md:col-span-2'>
          <div className="flex items-center font-bold text-2xl mb-4 italic">
            <FaTasks size={30} className='mr-3 text-sky-400' />
            Task Master
          </div>
          <p className='text-sky-200 text-sm max-w-xs leading-relaxed'>
            Master your time and conquer your goals with the world's most intuitive task manager.
          </p>
        </div>

        {/* Dynamic Links */}
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className='font-bold mb-4 text-sky-400 uppercase text-xs tracking-widest'>{section.title}</h4>
            <ul className='space-y-2 text-sm text-sky-100'>
              {section.links.map(link => (
                <li key={link} className='hover:text-white cursor-pointer transition-colors'>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className='max-w-6xl mx-auto border-t border-sky-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sky-300'>
        <p>© {currentYear} Task Master Inc. All rights reserved.</p>
        <div className='flex gap-6 text-lg'>
          <FaTwitter className='hover:text-white cursor-pointer' />
          <FaGithub className='hover:text-white cursor-pointer' />
          <FaLinkedin className='hover:text-white cursor-pointer' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
