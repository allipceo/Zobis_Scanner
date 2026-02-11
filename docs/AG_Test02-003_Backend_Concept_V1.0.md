# AG_Test02 백엔드 기획 (Backend Concept) V1.0

본 문서는 **AG_Test02: ZOBIS Name Card Scanner**의 논리적 백엔드 구조와 데이터 흐름을 정의합니다.
조대표님의 철학인 **"완성도 높은 개발"**을 위해, 발생 가능한 6대 에러 시나리오를 사전에 방어하는 설계를 채택했습니다.

---

## 1. 시스템 아키텍처 (System Architecture)
*   **유형**: Serverless Single Page Application (SPA)
*   **호스팅**: GitHub Pages 또는 Netlify (Client-Side Only)
*   **외부 연동**:
    1.  **Google Cloud Vision API** (OCR 엔진) - *High Accuracy*
    2.  **Google People API** (주소록 저장) - *OAuth 2.0*

## 2. 데이터 흐름 (Data Workflow) - Human-in-the-Loop
이 앱의 핵심은 **"기계가 읽고(OCR), 사람이 검증(Verify)한다"**는 원칙입니다.

1.  **Input**: 사용자 명함 촬영/업로드 (Base64 인코딩)
2.  **Process (OCR)**: Google Cloud Vision API로 전송 -> 텍스트 추출
3.  **Process (Smart Parsing)**: 정규식(Regex) 엔진이 텍스트 덩어리에서 `이름`, `전화번호`, `이메일`, `직책`, `회사` 추출
4.  **Review (Human Interaction)**:
    *   사용자에게 추출된 결과를 **[수정 가능한 입력 필드]**로 제시
    *   (중요) 원본 이미지와 텍스트를 나란히 보여주어 비교 수정 가능하게 함
5.  **Commit**: 사용자가 [저장] 버튼 클릭 -> Google People API로 주소록 생성

## 3. 핵심 모듈 설계 (Logic Modules)

### 3.1. Auth Manager (Google Identity Services)
*   **역할**: 로그인, 로그아웃, 토큰 갱신
*   **안전장치**:
    *   `token_client.requestAccessToken()` 사용 (팝업 방식)
    *   **[Account Chooser] 강제**: 다중 계정 사용자인 조대표님을 위해 매 로그인 시 계정 선택창 띄움 (`prompt: 'select_account'`)

### 3.2. OCR Controller (Google Vision Wrapper)
*   **역할**: 이미지 최적화 및 API 호출
*   **최적화**: 4MB 이상 이미지는 전송 전 브라우저(Canvas)에서 리사이징 (속도/비용 절감)

### 3.3. Smart Parser (RegEx Engine)
*   **추출 알고리즘**:
    *   **이메일**: `/[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+/`
    *   **휴대폰**: `/(010|82-10)[- ]?\d{3,4}[- ]?\d{4}/`
    *   **직책**: `(대표|이사|팀장|매니저|CEO|CTO|Manager)` 키워드 매칭
    *   **이름**: 2~4글자 한글, 직책 앞뒤 단어 우선 탐색

### 3.4. Contacts Manager (People API)
*   **역할**: `person.createContact` 호출
*   **데이터 필드**: `names`, `phoneNumbers`, `emailAddresses`, `organizations`, `biographies`(원본 텍스트 백업)

## 4. 위험 관리: 6대 에러 시나리오 방어 (Risk Management)

| 시나리오 (Scenario) | 발생 원인 | 방어 전략 (Countermeasure) |
|:---|:---|:---|
| **1. 네트워크 단절** | 오프라인 상태에서 촬영 | 로컬 스토리지 임시 저장 + "재연결 시 자동 재시도" 버튼 활성화 |
| **2. API 할당량 초과** | 단기간 과도한 요청 (429) | 지수 백오프(Exponential Backoff) 재시도 로직 + 사용자 안내 ("잠시 후 다시..") |
| **3. 엉뚱한 이미지** | 명함이 아닌 사진 (Text 없음) | "명함이 감지되지 않습니다" 알림 + 재촬영 유도 |
| **4. 파싱 실패** | 특이한 디자인의 명함 | **'비고(Note)'** 란에 OCR 원본 전체 저장 (데이터 유실 0%) |
| **5. 권한 거부** | 로그인 창에서 취소/닫기 | "주소록 저장을 위해 권한이 꼭 필요합니다" 정중한 팝업 + 재로그인 버튼 |
| **6. 토큰 만료** | 장시간 사용 시 세션 종료 | API 호출 전 `tokenValidity` 체크 -> 만료 시 조용히 토큰 재발급(Silent Refresh) |

## 5. 승인 (Approval)
위 설계를 바탕으로 **[3단계: 프론트엔드 기획]**으로 진입하겠습니다.

**서명**: ____________________ (조대표)
**서명**: _Anti-Team Leader_ (안팀장)
