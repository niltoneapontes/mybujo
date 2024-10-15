import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { db } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { IMonthly } from '../../models/Monthly';
import { AuthContext } from '../../context/AuthContext';
import ReactQuill from 'react-quill';

function Monthly() {
  const editorRef = useRef<ReactQuill>(null);

  const today = new Date()
  const todayFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  .toISOString()
  .split('T')[0]

  const [content, setContent] = useState("")
  const authContext = useContext(AuthContext)

  const handleChange = (html: string) => {
    setContent(html);
  };

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

  useEffect(() => {
    // Send new content to firestore
    console.log("Sending to firestore")
  }, [content])

  return (
    <div className='w-full bg-white'>
      <Sidebar></Sidebar>
      <div className='ml-64 h-screen' >
        <h1 className='text-4xl text-gray-dark font-bold p-4'>Monthly Log: {todayFormatted.split("-")[1]}</h1>
      <ReactQuill
      ref={editorRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        className='bg-white'
        modules={{
          toolbar: {
            container: [
              [{ header: [4, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          },
        }
        }
      />
      </div>
    </div>
  );
}

export default Monthly;
