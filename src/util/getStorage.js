import { getStorage } from "@firebase/storage";
import { initializeApp } from '@firebase/app';
import firebaseConfig from "../firebase";

const storage = getStorage();
export default storage;