import { getFirestore } from "@firebase/firestore";
import { initializeApp } from '@firebase/app';
import firebaseConfig from "../firebase";

const db = getFirestore();
export default db;