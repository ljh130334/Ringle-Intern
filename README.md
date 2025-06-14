# 📅 구글 캘린더 클론 프로젝트

> **링글(Ringle) 프론트엔드 인턴 1차 과제**  
> React + TypeScript + Redux Toolkit을 활용한 구글 캘린더 주별 화면 클론

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?style=flat-square&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## 🎯 프로젝트 목표

구글 캘린더의 **주별 화면 및 월별 화면**을 React로 클론하여 일정 관리 기능을 구현합니다. 사용자가 직관적으로 일정을 생성, 수정, 삭제할 수 있는 완전한 캘린더 애플리케이션입니다.

## ✨ 주요 기능

### 🗓️ 핵심 캘린더 기능
- **주별 보기 캘린더**: 구글 캘린더와 동일한 UI/UX
- **날짜 네비게이션**: 이전/다음 주 이동, 오늘로 돌아가기
- **좌측 date-picker**: 특정 날짜 선택으로 해당 주차 이동
- **실시간 동기화**: date-picker와 주별 달력 완벽 연동

### 📝 이벤트 관리
- **이벤트 생성**: 모달을 통한 직관적인 일정 추가
- **이벤트 수정**: 기존 일정 클릭으로 편집 가능
- **이벤트 삭제**: 간편한 일정 삭제 기능
- **시간 설정**: 시작/종료 시간 또는 종일 일정 선택
- **시각적 표시**: 시간대별 정확한 위치에 이벤트 박스 렌더링

### 🔄 고급 기능
- **반복 일정**: 일간/주간/월간/연간 반복 스케줄
- **이벤트 중첩 처리**: 겹치는 시간대 이벤트의 레이아웃
- **월별 보기**: 주별 보기와 함께 제공되는 월간 캘린더
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화

## 🛠️ 기술 스택

### Frontend
- **React 19**: 최신 React 훅과 함수형 컴포넌트
- **TypeScript**: 타입 안전성과 개발 효율성
- **Redux Toolkit**: 효율적인 상태 관리
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### Libraries
- **react-day-picker**: 고급 날짜 선택 컴포넌트
- **date-fns**: 날짜 계산 및 포맷팅
- **@reduxjs/toolkit**: 현대적인 Redux 사용법

### Development Tools
- **Vite**: 빠른 개발 서버와 빌드 도구
- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 전처리

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

### 시스템 요구사항
- Node.js 18+ 
- npm 9+

## 🎨 사용법

### 기본 사용법

1. **날짜 이동**
   - 상단의 `<` `>` 버튼으로 주간 이동
   - 좌측 캘린더에서 특정 날짜 클릭
   - "오늘" 버튼으로 현재 날짜로 이동

2. **일정 생성**
   - 시간대 셀 클릭으로 빠른 생성
   - `+` 버튼으로 상세 생성
   - 제목, 시간, 반복 설정 가능

3. **일정 관리**
   - 기존 이벤트 클릭으로 수정
   - 모달에서 삭제 버튼으로 제거

### 고급 기능

#### 반복 일정 설정
```typescript
// 매주 반복되는 회의
{
  title: "팀 미팅",
  recurrence: {
    type: "weekly",
    interval: 1,
    count: 12
  }
}
```

#### 이벤트 중첩 처리
시간이 겹치는 이벤트들은 자동으로 적절한 너비와 위치로 배치됩니다.

## 🏗️ 주요 구현 사항

### Redux 상태 관리 구조

```typescript
// 전역 상태 구조
{
  calendar: {
    currentDate: string,    // 현재 보고 있는 날짜
    selectedDate: string,   // 선택된 날짜
    view: 'week' | 'month'  // 현재 뷰 타입
  },
  events: {
    events: CalendarEvent[], // 모든 이벤트 데이터
    filters: EventFilters,   // 이벤트 필터링
    selectedEventId: string  // 선택된 이벤트 ID
  },
  ui: {
    eventModalOpen: boolean,    // 이벤트 모달 상태
    eventFormData: EventData,   // 모달 폼 데이터
    mobileView: boolean         // 모바일 뷰 여부
  }
}
```

### 핵심 컴포넌트

#### WeekView 컴포넌트
```typescript
// 주별 보기의 핵심 로직
const weekDays = getWeekDays(currentDateObj);
const weekEvents = weekDays.map(date => ({
  date,
  events: getEventsByDate(events, date),
  eventLayouts: getEventLayoutsForDate(events, date)
}));
```

#### EventModal 컴포넌트
- 이벤트 생성/수정을 위한 모달
- React 훅을 활용한 폼 상태 관리
- 유효성 검사 및 에러 핸들링

### 날짜 및 시간 처리

**date-fns**를 활용한 안정적인 날짜 계산:
```typescript
// 주간 날짜 계산
export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
};
```

## 🎯 과제 요구사항 달성도

### ✅ 필수 구현 범위 (100% 완료)
- [x] 구글 캘린더 주별 화면 클론
- [x] Redux를 활용한 date-picker와 달력 연동
- [x] 이벤트 추가/삭제 기능
- [x] 달력 이동 시 이벤트 데이터 유지
- [x] 모달을 통한 이벤트 관리

### ✅ 권장 사항 (100% 완료)
- [x] TypeScript 사용
- [x] Tailwind CSS 사용
- [x] Redux Toolkit 사용  
- [x] 반응형 디자인

### ✅ 추가 구현
- [x] 반복 일정 구현
- [x] 이벤트 중첩 처리
- [x] 월별 보기 추가 구현

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (#4285f4) - 구글 캘린더와 동일
- **Success**: Green (#34a853)
- **Warning**: Yellow (#fbbc04)
- **Danger**: Red (#ea4335)

### 타이포그래피
- **Headers**: font-semibold, 적절한 크기 스케일
- **Body**: font-normal, 가독성 우선
- **Captions**: text-sm, 보조 정보용

## 🧪 테스트 및 품질 관리

- **TypeScript**: 컴파일 타임 타입 체크
- **ESLint**: 코드 스타일 일관성
- **Component 구조**: 재사용 가능한 모듈화

## 📱 반응형 디자인

```css
/* Tailwind 브레이크포인트 활용 */
sm: 640px   /* 모바일 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 화면 */
```

- **모바일**: 사이드바 자동 숨김, 터치 최적화
- **태블릿**: 적절한 여백과 버튼 크기
- **데스크톱**: 전체 기능 활용 가능

## 🚀 성능 최적화

- **Code Splitting**: 라우트별 청크 분할
- **Memo**: 불필요한 리렌더링 방지
- **Redux**: 최적화된 상태 구독
- **Date Calculation**: 효율적인 날짜 연산