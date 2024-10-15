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
        <div className="w-full flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold ml-72">Oops... Parece que você não tem Collections :(</h1>
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
