import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAnhgfCFhbxZHHWLq0ddkgBueSvsxUfvqI",
    authDomain: "facebook-clone-919ea.firebaseapp.com",
    projectId: "facebook-clone-919ea",
    storageBucket: "facebook-clone-919ea.appspot.com",
    messagingSenderId: "570588048387",
    appId: "1:570588048387:web:762574993fbebc16457236",
    measurementId: "G-T0D63ZNDPF"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };


