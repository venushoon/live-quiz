// firebase.js — GitHub Actions에서 주입된 window.__FIREBASE_CONFIG__ 사용
firebase.initializeApp(window.__FIREBASE_CONFIG__);
const db = firebase.firestore();
