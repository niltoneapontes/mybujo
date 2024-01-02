import React, { useEffect } from 'react';

import './styles.css'

function Logout() {
  useEffect(() => {
    localStorage.removeItem("@mybujo/id")
    window.location.href = '/'
  }, [])

    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
}

export default Logout;
