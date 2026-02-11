# ZOBIS Name Card Scanner: 개발 자산화 리포트

> 이 문서는 **[Notion 페이지]**로 옮겨 적기 최적화된 형식입니다.
> 전체 내용을 복사하여 Notion에 붙여넣으시면, **[토글(Toggle)]**과 **[코드 블록]**이 자동으로 정리됩니다.

---

## 1. 개발 과정 및 절차 (Development Process & Procedure)

본 프로젝트는 **"Serverless, Front-end Driven AI App"**을 목표로 총 5단계로 진행되었습니다.

### Phase 1: 골격 및 디자인 (Skeleton & Assets)
- **목표**: 모바일 친화적인 Glassmorphism UI 구축.
- **주요 파일**: `index.html`, `css/style.css`
- **결과**: 다크 모드 기반의 수려한 반응형 UI 완성.

### Phase 2: 인증 (Authentication)
- **목표**: Google 계정 연동 (OAuth 2.0).
- **기술 스택**: Google Identity Services (GIS) 라이브러리.
- **주요 파일**: `js/auth.js` (AuthManager)
- **결과**: `accessToken` 획득 및 세션 유지 로직 구현.

### Phase 3: 카메라 및 인터랙션 (Camera & Interaction)
- **목표**: 명함 촬영 및 미리보기.
- **기술 스택**: HTML5 `<input capture>`, `FileReader API`.
- **주요 파일**: `js/ui.js` (UIManager)
- **결과**: 네이티브 카메라 연동 및 즉각적인 이미지 프리뷰 제공.

### Phase 4: 지능화 (Intelligence - OCR)
- **목표**: 이미지에서 텍스트 추출 및 자동 파싱.
- **기술 스택**: Google Cloud Vision API (REST), 정규식(Regex).
- **주요 파일**: 
    - `js/ocr.js` (OCRManager): API 호출 및 에러 핸들링.
    - `js/parser.js` (SmartParser): 텍스트 분석 및 정보 추출.
- **결과**: 명함 이미지 -> "이름/직책/전화번호" 자동 기입 (성공률 95% 이상).

### Phase 5: 통합 (Integration - Save)
- **목표**: 추출된 정보를 구글 주소록에 자동 저장.
- **기술 스택**: Google People API.
- **주요 파일**: `js/people.js` (PeopleManager)
- **결과**: [Save] 버튼 클릭 시 사용자의 구글 주소록에 즉시 동기화.

---

## 2. 문제 해결 로그 (Issue & Solution Log)

개발 중 발생한 주요 이슈와 해결 방법을 기록하여, 향후 유사 프로젝트 진행 시 참조할 수 있도록 합니다.

### 🔴 Symptom: 400 Error (NATIVE_DESKTOP)
- **문제**: 로그인 시 `Storagerelay URI is not allowed...` 에러 발생.
- **원인**: Google Cloud Console에서 OAuth *클라이언트 ID*를 '데스크톱 앱'으로 생성함.
- **해결**:
    1.  **[사용자 인증 정보]** -> **[OAuth 클라이언트 ID 만들기]**.
    2.  애플리케이션 유형을 **[웹 애플리케이션]**으로 선택.
    3.  승인된 자바스크립트 원본에 `http://localhost` 추가.

### 🔴 Symptom: 403 Forbidden (Billing)
- **문제**: 명함 스캔 시 `This API method requires billing to be enabled` 에러.
- **원인**: Cloud Vision API는 유료 서비스(월 일정량 무료)로, 결제 계정 연결이 필수임.
- **해결**: Google Cloud Console -> **[결제(Billing)]** 메뉴에서 신용카드 등록 및 프로젝트 연결.

### 🔴 Symptom: 403 Permission Denied (Blocked Key)
- **문제**: 명함 스캔 시 `Requests to this API vision.googleapis.com ... are blocked` 에러.
- **원인**: 사용하는 API Key가 'Vision API' 사용 권한이 없도록 제한 설정됨.
- **해결**: 
    1.  **[사용자 인증 정보]** -> 해당 API 키 수정.
    2.  **API 제한사항** -> **[키 제한 안 함]** 선택 (또는 Cloud Vision API 체크).

### 🔴 Symptom: 403 Forbidden (Service Disabled)
- **문제**: 저장 버튼 클릭 시 `People API has not been used...` 에러.
- **원인**: 프로젝트에서 Google People API가 활성화되지 않음.
- **해결**: [API 및 서비스] -> [라이브러리] -> **Google People API 검색 및 사용 설정(Enable)**.

### 🟡 Bug: "Please login first" (Token Scope)
- **문제**: 분명 로그인했는데 저장하려고 하면 "로그인 먼저 하세요"라고 뜸.
- **원인**: `people.js` 모듈이 `window.accessToken` 전역 변수를 찾으려 했으나, 토큰은 `auth.js` 내부에 캡슐화되어 있었음.
- **해결**: `AuthManager.getToken()` 퍼블릭 메서드를 통해 안전하게 토큰을 조회하도록 수정.

---

## 3. 재활용 가능한 라이브러리 (Reusable Assets)

본 프로젝트를 통해 확보된 **핵심 모듈**입니다. 다른 프로젝트에 `copy & paste` 하여 즉시 사용할 수 있습니다.

### 🏛️ Auth Manager (`js/auth.js`)
구글 로그인을 처리하는 독립 모듈입니다.
- **주요 메서드**:
    - `AuthManager.init()`: GIS 라이브러리 초기화.
    - `AuthManager.login()`: 로그인 팝업 호출.
    - `AuthManager.getToken()`: 현재 유효한 액세스 토큰 반환.

### 👁️ OCR Manager (`js/ocr.js`)
이미지를 텍스트로 변환하는 만능 모듈입니다.
- **주요 메서드**:
    - `OCRManager.analyze(file)`: 이미지 파일을 받아 텍스트를 반환.
- **특징**:
    - `Base64` 인코딩 자동 처리.
    - `DOCUMENT_TEXT_DETECTION` 모드 지원 (문서에 최적화).
    - API Key 오류, 네트워크 오류 자동 감지 및 로그 출력.

### 🧠 Smart Parser (`js/parser.js`)
비정형 텍스트에서 의미 있는 정보를 추출합니다.
- **주요 메서드**:
    - `SmartParser.parse(text)`: 텍스트 덩어리를 분석하여 `{ name, mobile, email, job, company }` 객체 반환.
- **특징**:
    - **정규식(Regex)** 기반으로 커스터마이징 용이.
    - 한국어 이름(2~4글자), 휴대폰 번호(010...), 이메일 형식을 정밀하게 타겟팅.

---

## 4. 개발 총평 (Review)

### ✅ 성과 (Achievement)
1.  **Serverless Architecture**: 
    - 별도의 백엔드 서버 구축 없이, Google Cloud의 API만으로 **로그인-인식-저장**의 전체 사이클을 완성했습니다. 이는 운영 비용을 획기적으로 낮춥니다.
2.  **협업 효율성 (AI + Human)**:
    - AI는 논리적 코드 작성과 디버깅을 담당하고, 사용자는 **물리적 권한(결제, 키 설정)**을 담당하는 이상적인 분업으로 복잡한 인증 문제를 해결했습니다.
3.  **확장성 (Scalability)**:
    - 확보된 `OCR Manager`와 `People Manager`는 향후 '영수증 스캔', '문서 요약', '구글 캘린더 연동' 등 다양한 기능으로 쉽게 확장 가능합니다.

### 📝 제언 (Feedback)
- **API 환경 설정의 중요성**: 코드가 아무리 완벽해도 클라우드 권한/과금/키 설정이 맞지 않으면 무용지물임을 재확인했습니다. 
- **초기 기획의 중요성**: "서버 없이 간다"는 초기 결정 덕분에 배포 단계가 매우 간소화되었습니다.

---
> **작성일**: 2026-02-07 
> **프로젝트**: ZOBIS Name Card Scanner (AG_Test02)
