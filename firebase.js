// Firebase v8 초기화 — 본인 프로젝트 키로 교체하세요
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
