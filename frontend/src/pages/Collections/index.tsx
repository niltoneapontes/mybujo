import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { db } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { ICollection } from '../../models/Collection';
import { AuthContext } from '../../context/AuthContext';

function Collections() {
  const today = new Date()
  const todayFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  .toISOString()
  .split('T')[0]


  const [content, setContent] = useState("")
  const authContext = useContext(AuthContext)

  useEffect(() => {
    const fetchPost = async () => {

      await getDocs(collection(db, "Collection"))
          .then((querySnapshot)=>{
              const newData = querySnapshot.docs
                  .find((doc: any) => (doc.data().date === todayFormatted && doc.data().userId === authContext?.id));
              setContent(newData?.data().content);
          })
  }
  fetchPost()
  }, [])

  console.log(content)

  if(!content) {
    return (
      <div className="w-full">
        <Sidebar></Sidebar>
        <div className="w-full flex flex-col items-center justify-center h-screen pl-72">
          <h1 className="text-2xl font-bold">Oops... Parece que você não tem Collections :(</h1>
          <p className="text-xl font-regular">Por enquanto, só é possível criá-las no App</p>
          <a href="https://play.google.com/store/apps/details?id=br.com.bubblesolutions.mybujo&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
            <img src="./google-play-badge.png" alt="Badge do Google Play" className='w-48 mt-8'/>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-soft-white'>
      <Sidebar></Sidebar>
      <div className='ml-72' dangerouslySetInnerHTML={
        {
          __html: content
        }
      }></div>
    </div>
  );
}

export default Collections;
