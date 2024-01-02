import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { db } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { IMonthly } from '../../models/Monthly';
import { AuthContext } from '../../context/AuthContext';

function Monthly() {
  const today = new Date()
  const todayFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  .toISOString()
  .split('T')[0]


  const [content, setContent] = useState("")
  const authContext = useContext(AuthContext)

  console.log(todayFormatted, authContext)

  useEffect(() => {
    const fetchPost = async () => {

      await getDocs(collection(db, "Monthly"))
          .then((querySnapshot)=>{
              const newData = querySnapshot.docs
                  .find((doc: any) => (doc.data().date === todayFormatted && doc.data().userId === authContext?.id));
              setContent(newData?.data().content);
          })

  }
  fetchPost()
  }, [])

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

export default Monthly;
