import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { db } from '../../App';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Daily() {
  const editorRef = useRef<ReactQuill>(null);

  const today = new Date()
  const todayFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  .toISOString()
  .split('T')[0]


  const [content, setContent] = useState("")
  const authContext = useContext(AuthContext)
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html: string) => {
    setContent(html);

    const fetchPost = async () => {
      try {
        await addDoc(collection(db, "Daily"), {
          content: html,
          date: todayFormatted,
          updatedAt: today.toISOString(),
          userId: authContext?.id
         })
        console.log('Sent data to firestore')
      } catch(error) {
        console.error('Error sending data to firestore', error)
      }
    }
  if(html) {
    fetchPost()
  }
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
      <div className='ml-64 h-screen' >
        <h1 className='text-4xl text-gray-dark font-bold p-4'>Daily Log: {today.toLocaleDateString("pt-BR", {
          month: "long",
          day: "2-digit",
          year: "numeric"
        })}</h1>
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

export default Daily;
