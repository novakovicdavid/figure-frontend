import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_URL
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const fsDB = getFirestore(app);
export const fbAuth = getAuth(app);
export const fbStorage = getStorage(app);