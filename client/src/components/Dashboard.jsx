import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Finish landing page design", completed: false },
    { id: 2, task: "Integrate Firebase Auth", completed: true },
    { id: 3, task: "Setup TaskMaster API", completed: false },
    { id: 4, task: "Review team pull requests", completed: true },
    { id: 5, task: "Update project documentation", completed: false },
    { id: 6, task: "Schedule weekly sync meeting", completed: false },
    { id: 7, task: "Fix navigation bug on mobile", completed: true },
    { id: 8, task: "Research competitor features", completed: false },
    { id: 9, task: "Prepare monthly analytics report", completed: false },
    { id: 10, task: "Optimize database queries", completed: false },
    { id: 11, task: "Refactor SignUp component logic", completed: true }
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), task: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const progress = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0;

  return (
    <div className='w-full min-h-[calc(100vh-80px)] bg-slate-50 p-6 md:p-10 overflow-y-auto'>
      <div className='max-w-4xl mx-auto'>
        
        {/* Header & Stats */}
        <div className='flex justify-between items-end mb-8'>
          <div>
            <h1 className='text-3xl font-black text-gray-800'>My Tasks</h1>
            <p className='text-slate-500 font-medium'>You have {tasks.filter(t => !t.completed).length} tasks remaining</p>
          </div>
          <div className='text-right hidden sm:block'>
            <span className='text-xs font-bold uppercase tracking-widest text-sky-600'>Daily Progress</span>
            <div className='w-40 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden shadow-inner'>
               <div 
                className='h-full bg-sky-500 transition-all duration-700 ease-out' 
                style={{ width: `${progress}%` }}
               ></div>
            </div>
            <span className='text-[10px] text-slate-400 font-bold'>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={addTask} className='relative mb-10 group'>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done today?"
            className='w-full p-5 pl-7 pr-16 bg-white shadow-xl shadow-sky-100/50 rounded-2xl outline-none border-2 border-transparent focus:border-sky-500 transition-all text-lg font-medium placeholder:text-slate-300'
          />
          <button className='absolute right-2 top-2 bottom-2 px-6 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all shadow-md active:scale-95'>
            <FaPlus />
          </button>
        </form>

        {/* Task List */}
        <div className='flex flex-col gap-3 pb-20'>
          {tasks.map((item) => (
            <div key={item.id} className='group flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-100 transition-all'>
              <div className='flex items-center gap-4 cursor-pointer flex-1' onClick={() => toggleTask(item.id)}>
                <div className='transition-transform duration-200 group-active:scale-90'>
                  {item.completed ? 
                    <FaCheckCircle className="text-emerald-500 text-2xl" /> : 
                    <FaRegCircle className="text-slate-300 text-2xl group-hover:text-sky-400" />
                  }
                </div>
                <span className={`text-lg font-medium transition-all duration-300 ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {item.task}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(item.id)} 
                className='p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110'
                title="Delete Task"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className='text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200'>
              <p className='text-slate-400 italic text-lg'>All caught up! Time to relax.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
