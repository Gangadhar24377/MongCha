
import './App.css';
import SignIn from './component/auth/Signin';
import { onAuthStateChanged, signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthDetails from './component/AuthDetails';
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import Chatbot from './chatbot'; 

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <div className="App">
      {authUser ? <Chatbot /> : <SignIn />}
      <AuthDetails />
    </div>
  );
}

export default App;
