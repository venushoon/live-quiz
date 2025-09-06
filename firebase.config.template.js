// firebase.config.template.js — ⚠️ 실키 없음(Secrets 템플릿)
// GitHub Actions가 이 파일을 복제하여 firebase.config.js로 치환합니다.
window.__FIREBASE_CONFIG__ = {
  apiKey: "${FIREBASE_API_KEY}",
  authDomain: "${FIREBASE_AUTH_DOMAIN}",
  projectId: "${FIREBASE_PROJECT_ID}",
  storageBucket: "${FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${FIREBASE_APP_ID}"
};
