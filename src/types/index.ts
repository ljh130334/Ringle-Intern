// 전역 타입 정의
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  // 추후 확장
}

export type CalendarView = 'month' | 'week' | 'day';
