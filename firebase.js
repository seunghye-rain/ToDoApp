// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHAO1gKlfTFhpiTkbZVr2sUh-iJO-0wAw",
  authDomain: "fir-todoapp-eed32.firebaseapp.com",
  projectId: "fir-todoapp-eed32",
  storageBucket: "fir-todoapp-eed32.firebasestorage.app",
  messagingSenderId: "655974297876",
  appId: "1:655974297876:web:2f5e79a770db4c1ab25201",
  measurementId: "G-PDP5EK0T76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
