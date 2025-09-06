# Live Quiz Platform (PWA + Secrets Injection)
Firebase 키를 코드에 직접 올리지 않도록 **GitHub Actions 시크릿**으로 주입하는 구성입니다.

## 사용법
1. 본 저장소를 GitHub에 업로드 (main 브랜치 권장)

2. GitHub → Repository → **Settings → Secrets and variables → Actions → New repository secret** 에 아래 항목 등록:

   - `FIREBASE_API_KEY`

   - `FIREBASE_AUTH_DOMAIN`

   - `FIREBASE_PROJECT_ID`

   - `FIREBASE_STORAGE_BUCKET`

   - `FIREBASE_MESSAGING_SENDER_ID`

   - `FIREBASE_APP_ID`

3. 루트의 `firebase.config.template.js`는 템플릿이며, Actions가 실행되면 `firebase.config.js`가 생성됩니다.

4. **GitHub Pages 배포**: Settings → Pages → Source = `Deploy from a branch`, Branch = `gh-pages` (Actions가 자동 생성) 또는 v3 액션의 기본 설정에 따릅니다.

5. `firebase.js`는 `window.__FIREBASE_CONFIG__`를 사용해 SDK를 초기화합니다.


## 보안 노트
- Firebase API Key는 *식별자* 성격이라 노출되어도 치명적 비밀은 아닙니다. **중요한 건 Firestore 보안 규칙**입니다.

- Admin SDK 등 서버용 키는 절대로 클라이언트(이 저장소)에 포함하지 마세요.


## 개발 팁
- 로컬 테스트 시에는 `firebase.config.template.js`를 복제하여 `firebase.config.js`로 만들고 직접 값을 채워 넣으면 됩니다.

