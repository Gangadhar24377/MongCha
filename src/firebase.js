// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBQPXd0yI_VbxYZlXUcMKZxHuSAK5TA2I",
  authDomain: "my-auth-test-c0f76.firebaseapp.com",
  projectId: "my-auth-test-c0f76",
  storageBucket: "my-auth-test-c0f76.appspot.com",
  messagingSenderId: "920056788413",
  appId: "1:920056788413:web:8182daec4fa9b17aa20ed4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);