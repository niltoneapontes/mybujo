import React from 'react';
import Sidebar from '../../components/Sidebar';

function Settings() {
  return (
    <div className="w-full">
      <Sidebar></Sidebar>
      <div className="w-full flex flex-col items-center justify-center h-screen pl-72">
        <h1 className="text-2xl font-bold">Para alterar suas configurações e preferências, acesse o App</h1>
        <a href="https://play.google.com/store/apps/details?id=br.com.bubblesolutions.mybujo&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
          <img src="./google-play-badge.png" alt="Badge do Google Play" className='w-48 mt-8'/>
        </a>
      </div>
    </div>
  );
}

export default Settings;
