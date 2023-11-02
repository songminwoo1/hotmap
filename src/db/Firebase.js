// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkdRebym7_rMuoxxHgvmD_q95IubpI0Es",
  authDomain: "cs473-8ec88.firebaseapp.com",
  databaseURL: "https://cs473-8ec88-default-rtdb.firebaseio.com",
  projectId: "cs473-8ec88",
  storageBucket: "cs473-8ec88.appspot.com",
  messagingSenderId: "282558422379",
  appId: "1:282558422379:web:086d00a58d93534cfb002e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export function write(key_path, value, onpush = ()=>{}) {
  set(ref(firebaseDB, key_path), value)
  .then(() => {
    onpush();
  });
}

export function append(key_path, value, onpush = ()=>{}) {
  set(push(ref(firebaseDB, key_path)), value)
  .then(() => {
    onpush();
  });
}

export function read(key_path, onload) {
  get(child(ref(firebaseDB), key_path)).then((snapshot) => {
    onload(snapshot.val());
  })
  .catch((error) => {
    onload(null);
  });
}
