// 캘린더 뷰 타입
export const CALENDAR_VIEWS = {
  MONTH: 'month' as const,
  WEEK: 'week' as const,
  DAY: 'day' as const,
};

// 이벤트 색상 팔레트
export const EVENT_COLORS = [
  { name: '파란색', value: '#4285f4', bg: '#e8f0fe' },
  { name: '빨간색', value: '#ea4335', bg: '#fce8e6' },
  { name: '초록색', value: '#34a853', bg: '#e6f4ea' },
  { name: '노란색', value: '#fbbc04', bg: '#fef7e0' },
  { name: '보라색', value: '#9c27b0', bg: '#f3e5f5' },
  { name: '주황색', value: '#ff9800', bg: '#fff3e0' },
  { name: '회색', value: '#6b7280', bg: '#f3f4f6' },
];

// 이벤트 카테고리
export const EVENT_CATEGORIES = [
  { id: 'work', name: '업무', color: '#4285f4', icon: '💼' },
  { id: 'personal', name: '개인', color: '#34a853', icon: '👤' },
  { id: 'family', name: '가족', color: '#ea4335', icon: '👨‍👩‍👧‍👦' },
  { id: 'health', name: '건강', color: '#fbbc04', icon: '💪' },
  { id: 'education', name: '교육', color: '#9c27b0', icon: '📚' },
  { id: 'travel', name: '여행', color: '#ff9800', icon: '✈️' },
];

// 시간 슬롯
export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return [
    { value: `${hour}:00`, label: `${hour}:00` },
    { value: `${hour}:15`, label: `${hour}:15` },
    { value: `${hour}:30`, label: `${hour}:30` },
    { value: `${hour}:45`, label: `${hour}:45` },
  ];
}).flat();

// 요일 이름
export const WEEKDAY_NAMES = {
  SHORT: ['일', '월', '화', '수', '목', '금', '토'],
  FULL: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
};

// 월 이름
export const MONTH_NAMES = {
  SHORT: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  FULL: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
};

// 반응형 브레이크포인트
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// 캘린더 설정
export const CALENDAR_CONFIG = {
  WEEK_STARTS_ON: 0, // 0: 일요일, 1: 월요일
  DAYS_IN_WEEK: 7,
  HOURS_IN_DAY: 24,
  DEFAULT_EVENT_DURATION: 60, // 분
  MIN_EVENT_DURATION: 15, // 분
  MAX_EVENTS_PER_DAY: 10,
};

// 알림 설정
export const NOTIFICATION_CONFIG = {
  DURATION: 5000,
  MAX_NOTIFICATIONS: 5,
};
