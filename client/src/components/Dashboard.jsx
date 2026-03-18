import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import api from '../api/axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // fetch all tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks')
        setTasks(res.data)
      } catch (err) {
        setError("Failed to load tasks")
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    try {
      const res = await api.post('/tasks', { task: inputValue })
      setTasks([...tasks, res.data])
      setInputValue("");
    } catch (err) {
      setError("Failed to add task")
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status: completed ? "pending" : "completed" })
      setTasks(tasks.map(t => t.id === id ? res.data : t))
    } catch (err) {
      setError("Failed to update task")
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      setError("Failed to delete task")
    }
  };

  const progress = tasks.length > 0 
    ? (tasks.filter(t => t.status === "completed").length / tasks.length) * 100 
    : 0;

  if (loading) return (
    <div className='w-full min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center'>
      <p className='text-slate-400 text-lg font-medium'>Loading tasks...</p>
    </div>
  )
  return (
    <div className='w-full min-h-[calc(100vh-80px)] bg-slate-50 p-6 md:p-10 overflow-y-auto'>
      <div className='max-w-4xl mx-auto'>
        
        {/* Header & Stats */}
        <div className='flex justify-between items-end mb-8'>
          <div>
            <h1 className='text-3xl font-black text-gray-800'>My Tasks</h1>
            <p className='text-slate-500 font-medium'>
              You have {tasks.filter(t => t.status !== "completed").length} tasks remaining
            </p>
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

        {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}

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
              <div 
                className='flex items-center gap-4 cursor-pointer flex-1' 
                onClick={() => toggleTask(item.id, item.status === "completed")}
              >
                <div className='transition-transform duration-200 group-active:scale-90'>
                  {item.status === "completed" ? 
                    <FaCheckCircle className="text-emerald-500 text-2xl" /> : 
                    <FaRegCircle className="text-slate-300 text-2xl group-hover:text-sky-400" />
                  }
                </div>
                <span className={`text-lg font-medium transition-all duration-300 ${
                  item.status === "completed" ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}>
                  {item.task}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(item.id)} 
                className='p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110'
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