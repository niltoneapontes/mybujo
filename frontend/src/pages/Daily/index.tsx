import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { db } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { IDaily } from '../../models/Daily';
import { AuthContext } from '../../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Daily() {
  const today = new Date()
  const todayFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  .toISOString()
  .split('T')[0]


  const [content, setContent] = useState("")
  const authContext = useContext(AuthContext)
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html: string) => {
    setContent(html);
  };

  useEffect(() => {
    const fetchPost = async () => {

      await getDocs(collection(db, "Daily"))
          .then((querySnapshot)=>{
              const newData = querySnapshot.docs
                  .find((doc: any) => (doc.data().date === todayFormatted && doc.data().userId === authContext?.id));
              setContent(newData?.data().content);
          })

  }
  fetchPost()
  }, [])

  return (
    <div className='w-full bg-white'>
      <Sidebar></Sidebar>
      <div className='ml-72 h-screen' >
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        className='bg-white'
      />
      </div>
    </div>
  );
}

export default Daily;
