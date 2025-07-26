# Simple RN Community App

React Native와 Expo를 사용한 간단한 커뮤니티 애플리케이션입니다.

## 🛠 기술 스택

- **Frontend**

  - React Native 0.79.5
  - Expo SDK 53
  - TypeScript
  - Expo Router (파일 시스템 기반 라우팅)
  - Styled Components

- **상태 관리**

  - Tanstack Query (서버 상태 관리)
  - Zustand (클라이언트 상태 관리)

- **백엔드**
  - Supabase (인증, 데이터베이스)

## 🌟 주요 기능

- **인증**

  - 이메일/비밀번호 기반 회원가입
  - 로그인/로그아웃

- **게시판**
  - 게시글 목록 조회
  - 게시글 상세 조회
  - 게시글 작성
  - 댓글 작성

## 📁 프로젝트 구조

```
sample-community/
├── app/                # 라우팅 및 페이지 컴포넌트
│   ├── (auth)/        # 인증 관련 화면
│   └── (home)/        # 메인 화면 및 게시판
├── src/
│   ├── components/    # 재사용 가능한 UI 컴포넌트
│   ├── hooks/        # 커스텀 훅
│   ├── lib/          # 유틸리티 및 API 함수
│   ├── stores/       # Zustand 스토어
│   └── styles/       # 공통 스타일 정의
```

## 🏃‍♂️ 시작하기

1. 저장소 클론

```bash
git clone https://github.com/0Hooni/simple-RN-community-app.git
cd simple-RN-community-app
```

2. 의존성 설치

```bash
cd sample-community
npm install
```

3. 개발 서버 실행

```bash
npm start
```

## 🎯 아키텍처 특징

- **상태 관리 전략**

  - Tanstack Query: 서버 상태 (API 요청, 캐싱)
  - Zustand: 클라이언트 상태 (폼, UI 상태)

- **코드 구조**
  - 기능별 Custom Hook 분리
  - 컴포넌트와 비즈니스 로직 분리
  - 일관된 디렉토리 구조

## 📱 지원 플랫폼

- iOS
- Android
- Web (Expo)
