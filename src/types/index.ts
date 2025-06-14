// 캘린더 뷰 타입
export type CalendarView = 'month' | 'week' | 'day';

// 이벤트 타입
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD 형식
  startTime: string; // HH:mm 형식
  endTime: string; // HH:mm 형식
  color: string; // hex color
  isAllDay: boolean;
  category?: string;
  location?: string;
  attendees?: string[];
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    count?: number;
  };
}

// 날짜 범위 타입
export interface DateRange {
  start: Date;
  end: Date;
}

// 캘린더 날짜 정보 타입
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}

// 이벤트 필터 타입
export interface EventFilters {
  categories: string[];
  showCompleted: boolean;
}

// 알림 타입
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: number;
}

// 이벤트 레이아웃 정보 타입
export interface EventLayout {
  event: CalendarEvent;
  column: number; // 몇 번째 열에 위치할지 (0부터 시작)
  totalColumns: number; // 전체 열 개수
  width: number; // 너비 비율 (0-1)
  left: number; // 왼쪽 위치 비율 (0-1)
}
