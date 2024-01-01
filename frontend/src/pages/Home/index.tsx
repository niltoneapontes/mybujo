import React from 'react';
import Sidebar from '../../components/Sidebar';

function Home() {
  return (
    <div className='w-full h-screen bg-white'>
    <Sidebar></Sidebar>
    <div className='h-screen flex flex-col items-center justify-center'>
      <img src="./logo-transparent-black.svg" alt="Logo" className='w-60 h-60 -mr-20'/>
      <h1 className='text-4xl font-semibold'>Organize sua vida com o MyBujo</h1>
      <p className='text-lg font-semibold'>Você pode começar pelo Daily Log</p>
    </div>
    </div>
  );
}

export default Home;
