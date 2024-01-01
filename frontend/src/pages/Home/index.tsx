import React from 'react';
import Sidebar from '../../components/Sidebar';

function Home() {
  return (
    <div className='w-full h-screen bg-white'>
    <Sidebar></Sidebar>
    <div className='flex flex-col flex-1 h-screen bg-white'>
      <img src="./logo-transparent-black.svg" alt="Logo" className='w-60 h-60'/>
      <h1>Organize sua vida com o MyBujo</h1>
    </div>
    </div>
  );
}

export default Home;
