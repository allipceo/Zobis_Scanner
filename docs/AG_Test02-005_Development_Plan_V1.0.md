# AG_Test02 종합 개발 계획 (Comprehensive Development Plan) V1.0

본 문서는 **AG_Test02: ZOBIS Name Card Scanner**의 개발 로드맵을 정의합니다.
조대표님의 **"중단 없는 전진(Unstoppable Progress)"**을 위해, 각 단계는 [개발] -> [검증/시뮬레이션] -> [디버깅] -> [완료]의 엄격한 사이클을 거칩니다.

---

## 1. 개발 전략 (Strategy)
*   **모듈 단위 완결성**: 각 모듈은 독립적으로 실행 및 테스트 가능해야 함.
*   **단계별 검증**: 앞 단계가 100% 검증되지 않으면 다음 단계로 넘어가지 않음.
*   **환경**: `Client-Side Only` (Serverless), `Localhost:80` (Auth Requirement).

## 2. 단계별 계획 (Phased Roadmap)

### 📌 Phase 1: 뼈대 및 디자인 (Skeleton & Assets) - *Estimated: 10%*
*   **목표**: `index.html` 생성 및 `GlassPanel` 자산 적용.
*   **모듈**: `Module A (HTML/CSS)`
*   **검증**:
    *   반응형 레이아웃 확인 (PC/Mobile 크기 조절).
    *   Glassmorphism 효과 및 입력창 가독성(Solid Background) 확인.

### 📌 Phase 2: 인증 시스템 (Authentication) - *Estimated: 30%*
*   **목표**: Google 로그인 및 계정 선택 기능 구현.
*   **모듈**: `Module B (Auth Manager)`
*   **검증**:
    *   [로그인 버튼] 클릭 -> 구글 팝업 -> 계정 선택 -> 토큰 발급.
    *   발급된 토큰이 콘솔에 찍히는지 확인 (OAuth Scope: `contacts`).
    *   로그아웃 및 재로그인 시나리오 테스트.

### 📌 Phase 3: 카메라 및 UI (Camera & Interaction) - *Estimated: 20%*
*   **목표**: 명함 촬영 및 이미지 미리보기, 입력 폼 연동.
*   **모듈**: `Module C (UI Controller)`
*   **검증**:
    *   `<input capture>` 동작 확인 (PC: 파일 선택, Mobile: 카메라).
    *   선택된 이미지의 `src`가 미리보기 `img` 태그에 즉시 반영되는지.
    *   입력 폼(이름, 전화번호 등)에 더미 데이터 입력 및 수정 테스트.

### 📌 Phase 4: 지능형 엔진 (Intelligence) - *Estimated: 30%*
*   **목표**: OCR(Cloud Vision or Paste) 및 파싱 알고리즘 탑재.
*   **모듈**: `Module D (Logic Core)`
*   **검증**:
    *   이미지 처리: Canvas 리사이징 로직 시뮬레이션.
    *   파싱: 다양한 명함 텍스트 샘플(정규식 테스트)로 `이름`, `전화번호` 추출 정확도 검증.
    *   OCR 연동: (API Key 사용) 실제 이미지 전송 -> 텍스트 수신 확인.

### 📌 Phase 5: 통합 및 배포 (Integration & Deploy) - *Estimated: 10%*
*   **목표**: 주소록 저장(People API) 및 최종 배포.
*   **모듈**: `Module E (Contacts API)`
*   **검증**:
    *   추출된 정보가 실제 `ceo.allip@gmail.com` 주소록에 생성되는지 확인.
    *   `sensitive.env` 제외 후 GitHub Pages 배포 (옵션).

## 3. 리스크 및 시뮬레이션 계획
*   **Auth**: `localhost` 포트 이슈 발생 시 `http-server -p 80` 명령어로 즉시 대응.
*   **OCR**: API 할당량 초과 시 "잠시 후 다시 시도" 로직 동작 확인.

## 4. 승인 (Approval)
위 계획이 확정되면, 즉시 **Phase 1** 개발에 착수합니다.

**서명**: ____________________ (조대표)
**서명**: _Anti-Team Leader_ (안팀장)
