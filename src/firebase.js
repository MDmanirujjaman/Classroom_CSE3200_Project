import { initializeApp } from '@firebase/app';
import { getStorage} from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBPbd_2aPOKWubybK0uYhSk43Okztllg38",
//   authDomain: "my-final-app-3100.firebaseapp.com",
//   projectId: "my-final-app-3100",
//   storageBucket: "gs://my-final-app-3100.appspot.com",
//   messagingSenderId: "438461403438",
//   appId: "1:438461403438:web:4223147b16caa908742abf",
//   measurementId: "G-Y1PTQ66F4C"
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBDUEpxoBEs2TGMJoJ3dmvp7D8IMpCZNRQ",
//   authDomain: "class-84dd8.firebaseapp.com",
//   projectId: "class-84dd8",
//   storageBucket: "class-84dd8.appspot.com",
//   messagingSenderId: "859362613250",
//   appId: "1:859362613250:web:26fad6aa893e3d075b6f1b",
//   measurementId: "G-YDFH9T8KMH"
// };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Rhd_ly6DOZxGMweCN_SKCWxMj4uOa6g",
  authDomain: "final-3200.firebaseapp.com",
  projectId: "final-3200",
  storageBucket: "final-3200.appspot.com",
  messagingSenderId: "502782246026",
  appId: "1:502782246026:web:37c3f25933b49fbef7c173",
  measurementId: "G-6K33SBN3GJ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default firebaseConfig;