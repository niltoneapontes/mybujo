import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../../App';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { lightTheme } from '../../tokens/colors';
import { User } from '../../models/User';
import './styles.css'
import { collection, getDocs } from 'firebase/firestore';

function Login() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("@mybujo-prod/id")) {
      setTimeout(() => {
        window.location.href = '/home'
      }, 2000)
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
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

  const fetchUser = async (email: string, origin: string) => {
    const querySnapshot = await getDocs(collection(db, "Users"))
    const foundUser = querySnapshot.docs
      .find((doc: any) => (doc.data().email === email && doc.data().origin === origin));
      return foundUser?.data()
  }


  return (
    <div className='w-full h-screen bg-white'>
      <div className='h-screen flex flex-col items-center justify-center'>
        <img src="./logo-transparent-black.svg" alt="Logo" className='w-60 h-60 -mr-20' />
        <h1 className='text-4xl font-semibold'>Organize sua vida com o MyBujo</h1>
        <button type="button" className="py-2 px-4 bg-slate-200 w-60 flex justify-start items-center rounded-lg mb-3 mt-8 font-medium" onClick={async () => {
          try {
            const googleProvider = new GoogleAuthProvider()
            const { user } = await signInWithPopup(auth, googleProvider)
            const foundUser = await fetchUser(user.email!!, 'GOOGLE')
            const newUser: User = {
              id: foundUser?.id,
              email: user.email,
              givenName: user.displayName?.split(" ")[0] ?? user.displayName,
              familyName: user.displayName?.split(" ")[user.displayName.length - 1] ?? user.displayName,
              metadata: JSON.stringify(user.metadata),
              name: user.displayName,
              origin: 'GOOGLE',
              phoneNumber: user.phoneNumber,
              photo: user.photoURL
            }
            localStorage.setItem("@mybujo-prod/id", JSON.stringify(newUser))
            window.location.reload()
          } catch (error) {
            alert("Crie a conta pelo app para poder usar na web")
            console.error(error)
          }
        }}><FcGoogle size={24} style={{ marginRight: 8 }} />Login com Google </button>
        <button type="button" className="py-2 px-4 bg-slate-200 w-60 flex justify-start items-center rounded-lg font-medium" onClick={async () => {
          try {
            const facebookProvider = new FacebookAuthProvider()
            const { user } = await signInWithPopup(auth, facebookProvider)
            const newUser: User = {
              id: user.uid,
              email: user.email,
              givenName: user.displayName?.split(" ")[0] ?? user.displayName,
              familyName: user.displayName?.split(" ")[user.displayName.length - 1] ?? user.displayName,
              metadata: JSON.stringify(user.metadata),
              name: user.displayName,
              origin: 'FACEBOOK',
              phoneNumber: user.phoneNumber,
              photo: user.photoURL
            }
            localStorage.setItem("@mybujo-prod/id", JSON.stringify(newUser))
            window.location.href = "/home"
          } catch (error) {
            console.error(error)
          }
        }}><FaFacebook size={24} color={lightTheme.PRIMARY_COLOR} style={{ marginRight: 8 }} />Login com Facebook</button>
      </div>
    </div>
  );
}

export default Login;
