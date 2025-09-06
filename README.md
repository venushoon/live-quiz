# Live Quiz Platform (PWA)
실시간 퀴즈 플랫폼 — 관리자/학생 모드, Firestore 동기화, PWA 오프라인 지원

## 배포 (GitHub Pages)
1. 새 리포지토리 생성 (Public 권장)
2. 이 폴더의 모든 파일 업로드 (또는 `live-quiz-pwa-v1.zip` 압축 해제 후 업로드)
3. **Settings → Pages → Source: `Deploy from a branch` → Branch: `main` (또는 `master`) / root**
4. 저장 후 제공된 URL 접속
5. Firebase 설정을 `firebase.js`에 입력

## PWA 체크리스트
- `index.html`에 `manifest.json` 링크, `theme-color` 메타 포함
- `sw.js` 서비스워커 등록 (첫 로드시 자동 등록)
- 아이콘: `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-1024-maskable.png`
- iOS: 홈 화면 추가 시 `apple-touch-icon` 사용

## 개발 메모
- Firestore 보안 규칙을 운영 전 반드시 강화
- 기기당 1회 제출, PIN 잠금, 타이머 등은 추후 확장 미들웨어로 추가 가능
