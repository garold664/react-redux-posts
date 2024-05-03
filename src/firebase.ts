// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'test-20e2d.firebaseapp.com',
  databaseURL: 'https://test-20e2d-default-rtdb.firebaseio.com',
  projectId: 'test-20e2d',
  storageBucket: 'test-20e2d.appspot.com',
  messagingSenderId: '683626359190',
  appId: '1:683626359190:web:90624227acdfecdcb155b7',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
