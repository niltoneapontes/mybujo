import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {AuthContext} from './context/AuthContext';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAIcjnxnoVZXlQZJtmD_zyOdL3Sb7VidKQ",
  authDomain: "mybujo-399813.firebaseapp.com",
  databaseURL: "https://mybujo-399813-default-rtdb.firebaseio.com",
  projectId: "mybujo-399813",
  storageBucket: "mybujo-399813.appspot.com",
  messagingSenderId: "383023240379",
  appId: "1:383023240379:web:4e06b41298b3de7c25c59e",
  measurementId: "G-7343E9RTVW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("@mybujo/id"))

  return (
    <AuthContext.Provider value={JSON.parse(user!!) || null}>
      <RouterProvider router={routes}></RouterProvider>
    </AuthContext.Provider>
  )
}

export default App
