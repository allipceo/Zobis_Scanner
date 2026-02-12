# AG_Test02: ZOBIS 명함 스캐너 최종 완료 히스토리 (Project Completion History)

**작성자**: 안과장 (Antigravity Assistant)
**수신인**: 조대표님
**날짜**: 2026-02-12

---

## 1. 프로젝트 개요 (Project Summary)
ZOBIS 명함 스캐너 프로젝트는 명함 이미지에서 정보를 추출하여 사용자의 구글 주소록에 즉시 저장하는 **서버리스 모바일 웹 앱**입니다. 복잡한 설치 없이 브라우저에서 즉시 실행되며, 정확한 OCR과 사용자 검수를 결합한 'Human-in-the-loop' 방식을 채택했습니다.

## 2. 주요 개발 연혁 (Development Milestones)

### [Phase 1] 기초 설계 및 UI 구축 (UI & Core Setup)
- **모바일 우선 디자인**: 화면 비율 및 터치 최적화 레이아웃 설계.
- **카메라 및 파일 통합**: 브라우저 기반의 카메라 촬영 및 사진 업로드 시스템 구축.

### [Phase 2] 지능형 데이터 처리 (OCR & Parsing)
- **Google Vision API 연동**: 이미지 내 텍스트 추출 기능 구현.
- **Smart Parser 개발**: 정규식을 활용하여 비정형 텍스트에서 이름, 전화번호, 이메일, 직책 등을 자동으로 분류.

### [Phase 3] 구글 에코시스템 통합 (Integration)
- **Google Identity Services (GIS)**: OAuth 2.0 기반의 안전한 로그인 시스템 구축.
- **Google People API**: 추출된 정보를 실제 구글 주소록 연락처로 생성하는 기능 완료.

### [Phase 4] 안정화 및 배포 (Deployment & Security)
- **GitHub Pages 배포**: 전 세계 어디서나 접속 가능한 인터넷 주소(`https://allipceo.github.io/Zobis_Scanner/`) 확보.
- **OAuth 보안 설정**: 배포 환경에 맞는 도메인 승인 및 보안 강화.
- **보안 사고 대응**: 노출된 API 키 무효화 조치 및 `.gitignore` 설정을 통한 보안 환경 구축.

## 3. 핵심 기술 스택 (Technical Stack)
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **APIs**:
  - Google Cloud Vision API (OCR)
  - Google People API (Contacts Management)
  - Google Identity Services (Authentication)
- **Infrastructure**: GitHub Pages (Static Hosting)

## 4. 주요 이슈 해결 로그 (Issue Resolution Log)

| 증상 (Symptom) | 해결책 (Solution) |
| :--- | :--- |
| 로그인 차단 (400 Error) | OAuth 클라이언트 유형을 '웹 앱'으로 변경 및 도메인(localhost/GitHub) 등록. |
| People API 403 에러 | 구글 클라우드 콘솔 내 서비스 활성화 및 토큰 스코프(`contacts`) 정합성 확인. |
| GitHub Pages 404 에러 | 배포 브랜치를 `main`으로 수동 지정 및 Actions 빌드 트리거를 통해 해결. |
| API 키 보안 유출 | 즉각적인 키 무효화(Revocation) 및 환경 변수 주입 방식으로 코드 전면 수정. |

## 5. 최종 상태 (Final Status)
- **웹(Desktop) 버전**: 정상 작동 및 구글 로그인 확인 완료.
- **모바일(Mobile) 버전**: 카메라 촬영 및 연락처 저장 기능 최종 검증 완료.
- **보안 상태**: 민감 정보 격리 및 공개 리포지토리 안전성 확보 완료.

---
조대표님, ZOBIS 명함 스캐너 프로젝트가 이제 현장에서 실질적인 성과를 낼 준비를 마쳤습니다. 안과장으로서 이 프로젝트의 성공적인 마무리를 보고하게 되어 영광입니다.

*중단 없는 전진, ZOBIS 시스템의 다음 단계를 기대합니다.*
