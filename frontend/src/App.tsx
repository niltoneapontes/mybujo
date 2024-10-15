import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {AuthContext} from './context/AuthContext';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "mybujo-399813.firebaseapp.com",
  databaseURL: process.env.DATABASE_URL,
  projectId: "mybujo-399813",
  storageBucket: "mybujo-399813.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("@mybujo-prod/id"))

  return (
    <AuthContext.Provider value={JSON.parse(user!!) || null}>
      <RouterProvider router={routes}></RouterProvider>
    </AuthContext.Provider>
  )
}

export default App
