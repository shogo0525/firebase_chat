import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueFire);

const firebaseApp = firebase.initializeApp({
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER,
  apiKey: "AIzaSyC9zTbCoyKL4Ciy_HXvckbMpL7WM-pxARI",
  authDomain: "tadoru-chat.firebaseapp.com",
  databaseURL: "https://tadoru-chat.firebaseio.com",
  projectId: "tadoru-chat",
  storageBucket: "tadoru-chat.appspot.com",
  messagingSenderId: "700406072986"
});

export const db = firebaseApp.firestore();

const settings = { };
db.settings(settings);
