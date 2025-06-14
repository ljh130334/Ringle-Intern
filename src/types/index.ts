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
