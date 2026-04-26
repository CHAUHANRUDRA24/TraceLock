import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot, getCountFromServer, deleteDoc, doc, getDocs, where, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBU-qmN4EP_SrueaYPRu_Z8q9VXnlqlbBI",
  authDomain: "tracelock-2b9e3.firebaseapp.com",
  projectId: "tracelock-2b9e3",
  storageBucket: "tracelock-2b9e3.firebasestorage.app",
  messagingSenderId: "893812064883",
  appId: "1:893812064883:web:2c6b1a72ac718a4947e006",
  measurementId: "G-SCBM6WB7W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Helper function to log activity
async function logActivity(title, description, type = 'info') {
  try {
    await addDoc(collection(db, "activityLogs"), {
      title,
      description,
      type,
      time: serverTimestamp(),
      userName: auth.currentUser?.displayName || "System",
      userId: auth.currentUser?.uid || "system"
    });
  } catch (e) {
    console.error("Error logging activity: ", e);
  }
}

async function logAccess(documentId, traceId, event, node = "Global-Node-01") {
  try {
    await addDoc(collection(db, "accessLogs"), {
      documentId,
      traceId,
      event,
      node,
      timestamp: serverTimestamp(),
      userName: auth.currentUser?.displayName || "Anonymous",
      userId: auth.currentUser?.uid || "anon"
    });
  } catch (e) {
    console.error("Error logging access: ", e);
  }
}

export { analytics, db, auth, storage, logActivity, logAccess, collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot, getCountFromServer, deleteDoc, doc, getDocs, where, setDoc, getDoc, updateDoc, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, ref, uploadBytesResumable, getDownloadURL, deleteObject };
