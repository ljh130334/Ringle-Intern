import type { CalendarEvent } from '../types';
import { generateEventId } from './eventUtils';

// 반복 유형 정의
export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

// 반복 일정 설정 인터페이스
export interface RecurrenceConfig {
  type: RecurrenceType;
  interval: number; // 간격 (예: 매 2주마다 = 2)
  endDate?: string; // 종료 날짜 (선택사항)
  count?: number; // 반복 횟수 (선택사항)
}

/**
 * 날짜에 일수 추가
 */
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * 날짜에 주수 추가
 */
const addWeeks = (date: Date, weeks: number): Date => {
  return addDays(date, weeks * 7);
};

/**
 * 날짜에 월수 추가
 */
const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * 날짜에 년수 추가
 */
const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 문자열 날짜를 Date 객체로 변환
 */
const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * 반복 일정 생성
 */
export const generateRecurringEvents = (
  baseEvent: CalendarEvent,
  recurrence: RecurrenceConfig,
  maxEvents: number = 100 // 최대 생성 개수 제한
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const startDate = parseDate(baseEvent.date);
  let currentDate = new Date(startDate);
  let count = 0;

  // 종료 조건 설정
  const endDate = recurrence.endDate ? parseDate(recurrence.endDate) : null;
  const maxCount = recurrence.count || maxEvents;

  while (count < maxCount) {
    // 종료 날짜 체크
    if (endDate && currentDate > endDate) {
      break;
    }

    // 첫 번째 이벤트는 원본을 그대로 사용
    if (count === 0) {
      events.push(baseEvent);
    } else {
      // 반복 이벤트 생성
      const recurringEvent: CalendarEvent = {
        ...baseEvent,
        id: generateEventId(),
        date: formatDateToString(currentDate),
      };
      events.push(recurringEvent);
    }

    // 다음 날짜 계산
    switch (recurrence.type) {
      case 'daily':
        currentDate = addDays(currentDate, recurrence.interval);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, recurrence.interval);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, recurrence.interval);
        break;
      case 'yearly':
        currentDate = addYears(currentDate, recurrence.interval);
        break;
    }

    count++;
  }

  return events;
};

/**
 * 기본 반복 설정 생성
 */
export const createDefaultRecurrence = (
  type: RecurrenceType
): RecurrenceConfig => {
  return {
    type,
    interval: 1,
    count:
      type === 'daily'
        ? 365
        : type === 'weekly'
          ? 52
          : type === 'monthly'
            ? 12
            : 5,
  };
};

/**
 * 반복 일정 미리보기 텍스트 생성
 */
export const getRecurrencePreviewText = (
  recurrence: RecurrenceConfig
): string => {
  const { type, interval, endDate, count } = recurrence;

  let baseText = '';
  switch (type) {
    case 'daily':
      baseText = interval === 1 ? '매일' : `${interval}일마다`;
      break;
    case 'weekly':
      baseText = interval === 1 ? '매주' : `${interval}주마다`;
      break;
    case 'monthly':
      baseText = interval === 1 ? '매월' : `${interval}개월마다`;
      break;
    case 'yearly':
      baseText = interval === 1 ? '매년' : `${interval}년마다`;
      break;
  }

  // 종료 조건 추가
  if (endDate) {
    baseText += ` (${endDate}까지)`;
  } else if (count) {
    baseText += ` (${count}회)`;
  }

  return baseText;
};

/**
 * 반복 일정인지 확인
 */
export const isRecurringEvent = (event: CalendarEvent): boolean => {
  return !!event.recurrence;
};

/**
 * 반복 일정 업데이트 시 옵션
 */
export enum RecurringUpdateMode {
  THIS_EVENT = 'this', // 이 이벤트만
  THIS_AND_FUTURE = 'future', // 이 이벤트와 미래 이벤트들
  ALL_EVENTS = 'all', // 모든 반복 이벤트
}

/**
 * 반복 일정 삭제 시 옵션
 */
export enum RecurringDeleteMode {
  THIS_EVENT = 'this', // 이 이벤트만
  ALL_EVENTS = 'all', // 모든 반복 이벤트
}
