import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyDqvtKPfVJOtTSejiQjgaP_iN-0B0Us8aQ",
  authDomain: "photo-tagging-app-852b2.firebaseapp.com",
  projectId: "photo-tagging-app-852b2",
  storageBucket: "photo-tagging-app-852b2.appspot.com",
  messagingSenderId: "517857579073",
  appId: "1:517857579073:web:b0ce48259e5baa43f5f6c0",
});

const firestore = firebase.firestore();
const storage = firebase.storage();
export { firestore, storage };
