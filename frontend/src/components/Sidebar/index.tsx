import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { lightTheme } from '../../tokens/colors';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const path = useMemo(() => {
    const uriParts = window.location.href.split("/")
    return uriParts[uriParts.length - 1]
  },[])

  const authContext = useContext(AuthContext)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex align-top absolute justify-start overflow-visible">
      <button onClick={toggleSidebar} className={`absolute top-2 ${isOpen ? "left-56" : "left-3"}  transition-all ease-in-out duration-150`}>
        <svg
          className="h-6 w-6 text-gray-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke={isOpen ? lightTheme.WHITE : lightTheme.TEXT_COLOR}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <div
        className={`w-64 flex-col bg-white border-r border-r-slate-300
          overflow-y-auto ${!isOpen && "-translate-x-64"} transition-all ease-in-out duration-150`}
      >
        <div className="flex items-end pb-4 bg-primary justify-between mb-4 h-28 px-4 border-b border-b-slate-400" >
          <span className="text-lg text-white font-bold">Olá, {authContext?.givenName}</span>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/daily' className={`${path.includes('daily') && 'text-primary font-semibold'}`}>Daily Log</Link>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/monthly' className={`${path.includes('monthly') && 'text-primary font-semibold'}`}>Monthly Log</Link>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/future' className={`${path.includes('future') && 'text-primary font-semibold'}`}>Future Log</Link>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/collections' className={`${path.includes('collections') && 'text-primary font-semibold'}`}>Listas</Link>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/settings' className={`${path.includes('settings') && 'text-primary font-semibold'}`}>Configurações</Link>
        </div>
        <div className={`w-full h-16 flex justify-start px-4 py-4 border-b border-b-slate-300 hover:opacity-60`}>
          <Link to='/logout'>Sair</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
