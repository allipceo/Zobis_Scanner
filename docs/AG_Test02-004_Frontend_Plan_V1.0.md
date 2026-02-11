# AG_Test02 프론트엔드 기획 (Frontend Plan) V1.0

본 문서는 **AG_Test02: ZOBIS Name Card Scanner**의 화면 구성(UI)과 사용자 경험(UX) 설계를 정의합니다.
조대표님의 지시인 **"자발적 비판 시뮬레이션"**을 거쳐 보완된 최종안입니다.

---

## 1. 디자인 컨셉 (Design Concept)
*   **테마**: **Dark Glassmorphism** (AG_Test01의 `GlassPanel` 자산 재활용)
*   **전략**: **Mobile First** (모바일 화면 우선 설계 -> PC 확장은 반응형 처리)
*   **색상**:
    *   배경: Deep Space Blue (`#0f172a`) + Radial Gradient
    *   패널: `rgba(255, 255, 255, 0.05)` + Blur 10px
    *   입력창: **Solid Black** (`rgba(0, 0, 0, 0.6)`) - *가독성 확보를 위한 비판 수용*
    *   강조색: Neon Blue (`#3b82f6`)

## 2. 화면 구성 (UI Layout) - Single Page

### 2.1. Header Area
*   **로고**: ZOBIS Scanner (좌측 상단)
*   **상태 표시**: 구글 로그인 상태 / 연결된 계정 (우측 상단, 작게)

### 2.2. Main Content (Scrollable)
1.  **Image Preview Section** (상단)
    *   촬영된 명함 이미지가 화면 너비에 맞춰 표시 (`<img src="...">`)
    *   초기 상태: "명함을 탭하여 촬영하세요" 안내 문구와 카메라 아이콘 Placeholder.
2.  **Analyzed Data Form** (하단)
    *   각 필드는 `Label` + `Input` + `Clear Button(x)` 구조.
    *   **필드 목록**:
        *   `Name` (이름)
        *   `Company` (회사)
        *   `Job Title` (직책)
        *   `Mobile` (휴대폰)
        *   `Email` (이메일)
    *   *UX 개선*: 입력창 배경을 어둡게 불투명 처리하여 야외 시인성 확보.

### 2.3. Footer Action Area (Sticky/Floating)
*   **[Scan New Card]**: 재촬영/초기화 (보조 버튼)
*   **[Save to Google]**: 저장 실행 (메인 버튼, Neon Color)
*   *UX 개선*: 키보드가 올라와도 버튼이 가려지지 않도록 `position: sticky` 또는 충분한 하단 여백(`padding-bottom: 50vh`) 확보.

## 3. 인터랙션 (Interaction Logic)
*   **Loading State**: OCR 처리 중에는 전체 화면에 "ZOBIS Analyzing..." 스피너 표시 (터치 방지).
*   **Toast Message**: 저장 성공 시 화면 하단에 3초간 "Saved Successfully" 알림.
*   **Error Handling**: 인식 실패 시 "다시 촬영해주세요" 모달 팝업.

## 4. 자산 활용 (Asset Usage)
*   **`MOD-UI-GlassPanel`**: 메인 컨테이너 및 폼 배경에 적용.
*   **`MOD-JS-StateStore`**: (이번 프로젝트에서는 제외 - `FormData`로 단순화하여 경량화)

## 5. 승인 (Approval)
위 설계를 바탕으로 **[4단계: 종합 개발 계획]**으로 통합하겠습니다.

**서명**: ____________________ (조대표)
**서명**: _Anti-Team Leader_ (안팀장)
