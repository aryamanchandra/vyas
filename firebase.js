import { initializeApp, getReactNativePersistence } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3UwPj0OVRCk23UF8GoLaskqVzSZbKmHo",
  authDomain: "vyas-af44b.firebaseapp.com",
  projectId: "vyas-af44b",
  storageBucket: "vyas-af44b.appspot.com",
  messagingSenderId: "527757789075",
  appId: "1:527757789075:web:59cc21f22a3019c82d4a66",
};

let app = initializeApp(firebaseConfig);

const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
