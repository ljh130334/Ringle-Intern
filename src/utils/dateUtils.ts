import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  subDays,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  isSameMonth,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { WEEKDAY_NAMES, MONTH_NAMES } from '../constants';

/**
 * 날짜를 지정된 형식으로 포맷팅
 */
export const formatDate = (
  date: Date | string,
  formatStr: string = 'yyyy-MM-dd'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: ko });
};

/**
 * 현재 주의 모든 날짜 가져오기
 */
export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // 일요일 시작
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: weekStart, end: weekEnd });
};

/**
 * 현재 월의 모든 날짜 가져오기 (캘린더 표시용)
 */
export const getMonthDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

/**
 * 특정 날짜가 오늘인지 확인
 */
export const isTodayDate = (date: Date): boolean => {
  return isToday(date);
};

/**
 * 두 날짜가 같은 날인지 확인
 */
export const isSameDayDate = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

/**
 * 날짜가 현재 월에 속하는지 확인
 */
export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate);
};

/**
 * 날짜가 현재 월에 속하는지 확인 (별칭)
 */
export const isSameMonthAsDate = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate);
};

/**
 * 요일 이름 배열 가져오기
 */
export const getWeekNames = (): string[] => {
  return WEEKDAY_NAMES.SHORT;
};

/**
 * 날짜 문자열을 Date 객체로 변환
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Date 객체를 YYYY-MM-DD 형식 문자열로 변환
 */
export const dateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * 요일 이름 가져오기
 */
export const getWeekdayName = (date: Date, short: boolean = true): string => {
  const dayIndex = date.getDay();
  return short ? WEEKDAY_NAMES.SHORT[dayIndex] : WEEKDAY_NAMES.FULL[dayIndex];
};

/**
 * 월 이름 가져오기
 */
export const getMonthName = (date: Date): string => {
  const monthIndex = date.getMonth();
  return MONTH_NAMES.SHORT[monthIndex];
};

/**
 * 년월 형식으로 포맷팅 (예: 2024년 1월)
 */
export const formatYearMonth = (date: Date): string => {
  return `${date.getFullYear()}년 ${getMonthName(date)}`;
};

/**
 * 날짜 범위 텍스트 생성 (예: 2024년 1월 1일 - 7일)
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  if (isSameMonth(startDate, endDate)) {
    return `${formatYearMonth(startDate)} ${startDate.getDate()}일 - ${endDate.getDate()}일`;
  } else {
    return `${formatDate(startDate, 'yyyy년 M월 d일')} - ${formatDate(endDate, 'yyyy년 M월 d일')}`;
  }
};

/**
 * 시간 문자열 파싱 (HH:mm -> {hours, minutes})
 */
export const parseTimeString = (
  timeString: string
): { hours: number; minutes: number } => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

/**
 * 시간을 문자열로 포맷팅 ({hours, minutes} -> HH:mm)
 */
export const formatTimeString = (hours: number, minutes: number): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * 시간 범위 유효성 검사
 */
export const isValidTimeRange = (
  startTime: string,
  endTime: string
): boolean => {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);

  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;

  return startMinutes < endMinutes;
};

/**
 * 현재 주의 시작 날짜와 끝 날짜 가져오기
 */
export const getCurrentWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });

  return { start, end };
};

/**
 * 두 날짜 사이의 일수 계산
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * 날짜에서 일수 더하기/빼기
 */
export const addDaysToDate = (date: Date, days: number): Date => {
  return days >= 0 ? addDays(date, days) : subDays(date, Math.abs(days));
};
