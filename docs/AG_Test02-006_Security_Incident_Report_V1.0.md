# AG_Test02 보안 사고 대응 및 해결 보고서 (Security Incident Report) V1.0

## 1. 사고 개요 (Incident Overview)
- **일시**: 2026-02-12
- **사건**: GitHub 저장소를 Private에서 Public으로 전환하는 과정에서 소스 코드 내 하드코딩된 **Notion API Key** 노출.
- **감지**: GitHub Secret Scanning 시스템에 의해 즉시 감지 및 이메일 알림 발생.

## 2. 문제점 분석 (Root Cause Analysis)
- **원인**: `tools/` 디렉토리 내의 관리용 스크립트(`inspect_notion.js`, `register_assets_batch.js` 등) 개발 시, 편의를 위해 API 키를 소스 코드에 직접 기입(Hard-coding)함.
- **취약점**: 리포지토리가 공개로 설정되는 순간, 해당 파일의 모든 내용이 전 세계에 공개되어 누구나 API 키를 탈취할 수 있는 상태가 됨.

## 3. 대응 조치 (Response & Mitigation)

### [1단계] 즉각적인 키 무효화 (Revocation)
- **조치**: 노션 관리 페이지에서 노출된 인테그레이션 토큰을 삭제 및 재발급하여 기존 키를 종이 조각으로 만듦. 
- **결과**: 외부인이 키를 획득했더라도 더 이상 노션 데이터베이스에 접근할 수 없도록 차단.

### [2단계] 소스 코드 수정 (Remediation)
- **조치**: 모든 관리용 스크립트에서 하드코딩된 키 문자열을 삭제.
- **변경**: `process.env.NOTION_KEY`와 같은 환경 변수 참조 방식으로 전환하여, 실행 시점에만 키가 주입되도록 개선.

### [3단계] Git 설정 강화 (Prevention)
- **조치**: `.gitignore` 파일을 추가하여 주요 민감 파일이 다시는 GitHub에 올라가지 않도록 설정.
- **차단 대상**: `*.env`, `sensitive.env`, `node_modules/`, `config.js` 등.

## 4. 재발 방지 가이드 (Future Security Guidance)

| 준수 사항 | 관리 방법 |
| :--- | :--- |
| **API 키 격리** | 절대 코드에 직접 쓰지 말고 `.env` 파일이나 환경 변수에 저장할 것. |
| **Public 전환 전 점검** | 공개 전환 전 `git grep` 등을 통해 'key', 'secret', 'token' 키워드 전수 검사. |
| **최소 권한 원칙** | API 키 발급 시 필요한 데이터베이스에만 접근 권한을 부여할 것. |
| **Github 보안 알림** | Secret Scanning 알림 발생 시 즉시 키 무효화를 최우선으로 진행할 것. |

---
*본 문서는 AG_Test02 프로젝트의 보안 인식을 높이고 향후 유사 사고를 방지하기 위해 작성되었습니다.*
