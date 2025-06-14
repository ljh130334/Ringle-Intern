import type { CalendarEvent } from '../types';
import { EVENT_CATEGORIES, EVENT_COLORS } from '../constants';

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
 * 고유한 이벤트 ID 생성
 */
export const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 특정 날짜의 이벤트들 필터링
 */
export const getEventsByDate = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  const targetDateString = formatDateToString(date);
  return events.filter((event) => event.date === targetDateString);
};

/**
 * 날짜 범위 내의 이벤트들 필터링
 */
export const getEventsByDateRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  const startStr = formatDateToString(startDate);
  const endStr = formatDateToString(endDate);

  return events.filter(
    (event) => event.date >= startStr && event.date <= endStr
  );
};

/**
 * 이벤트들을 시간순으로 정렬
 */
export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    // 종일 이벤트는 맨 위에 표시
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;
    if (a.isAllDay && b.isAllDay) return a.title.localeCompare(b.title);

    // 시간이 있는 이벤트들은 시작 시간순으로 정렬
    return a.startTime.localeCompare(b.startTime);
  });
};

/**
 * 카테고리에 따른 이벤트 색상 가져오기
 */
export const getEventColor = (category?: string): string => {
  const categoryInfo = EVENT_CATEGORIES.find((cat) => cat.id === category);
  if (categoryInfo) {
    return categoryInfo.color;
  }

  // 기본 색상 (파란색)
  return EVENT_COLORS[0].value;
};

/**
 * 카테고리에 따른 배경 색상 가져오기
 */
export const getEventBackgroundColor = (category?: string): string => {
  const categoryInfo = EVENT_CATEGORIES.find((cat) => cat.id === category);
  if (categoryInfo) {
    // 메인 색상을 기반으로 연한 배경색 생성
    const mainColor = categoryInfo.color;
    return mainColor + '20'; // 투명도 20% 적용
  }

  return EVENT_COLORS[0].bg;
};

/**
 * 이벤트 유효성 검사
 */
export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = [];

  if (!event.title?.trim()) {
    errors.push('제목을 입력해주세요.');
  }

  if (!event.date) {
    errors.push('날짜를 선택해주세요.');
  }

  if (!event.isAllDay && event.startTime && event.endTime) {
    const startTime = event.startTime;
    const endTime = event.endTime;

    if (startTime >= endTime) {
      errors.push('종료 시간은 시작 시간보다 늦어야 합니다.');
    }
  }

  if (event.title && event.title.length > 100) {
    errors.push('제목은 100자 이내로 입력해주세요.');
  }

  if (event.description && event.description.length > 500) {
    errors.push('설명은 500자 이내로 입력해주세요.');
  }

  return errors;
};

/**
 * 이벤트 시간 포맷팅 (표시용)
 */
export const formatEventTime = (event: CalendarEvent): string => {
  if (event.isAllDay) {
    return '종일';
  }

  return `${event.startTime} - ${event.endTime}`;
};

/**
 * 이벤트 지속 시간 계산 (분 단위)
 */
export const getEventDuration = (
  startTime: string,
  endTime: string
): number => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  return endMinutes - startMinutes;
};

/**
 * 이벤트가 특정 시간대에 겹치는지 확인
 */
export const isEventOverlapping = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  // 다른 날짜면 겹치지 않음
  if (event1.date !== event2.date) return false;

  // 종일 이벤트는 겹치지 않는다고 가정
  if (event1.isAllDay || event2.isAllDay) return false;

  const event1Start = event1.startTime;
  const event1End = event1.endTime;
  const event2Start = event2.startTime;
  const event2End = event2.endTime;

  return (
    (event1Start < event2End && event1End > event2Start) ||
    (event2Start < event1End && event2End > event1Start)
  );
};

/**
 * 특정 시간대의 이벤트들 가져오기
 */
export const getEventsAtTime = (
  events: CalendarEvent[],
  date: Date,
  hour: number
): CalendarEvent[] => {
  const dateString = formatDateToString(date);

  return events.filter((event) => {
    if (event.date !== dateString) return false;
    if (event.isAllDay) return false;

    const eventStartHour = parseInt(event.startTime.split(':')[0]);
    const eventEndHour = parseInt(event.endTime.split(':')[0]);

    return hour >= eventStartHour && hour < eventEndHour;
  });
};

/**
 * 이벤트 검색
 */
export const searchEvents = (
  events: CalendarEvent[],
  searchTerm: string
): CalendarEvent[] => {
  if (!searchTerm.trim()) return events;

  const term = searchTerm.toLowerCase();

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(term) ||
      event.description?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term)
  );
};

/**
 * 카테고리별 이벤트 필터링
 */
export const filterEventsByCategory = (
  events: CalendarEvent[],
  categories: string[]
): CalendarEvent[] => {
  if (categories.length === 0) return events;

  return events.filter(
    (event) => event.category && categories.includes(event.category)
  );
};

/**
 * 이벤트 복제 (반복 일정용)
 */
export const duplicateEvent = (
  event: CalendarEvent,
  newDate: string
): CalendarEvent => {
  return {
    ...event,
    id: generateEventId(),
    date: newDate,
  };
};

/**
 * 시간을 분 단위로 변환
 */
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * 두 이벤트가 시간적으로 겹치는지 확인 (정확한 분 단위 계산)
 */
export const doEventsOverlap = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  if (event1.date !== event2.date) return false;
  if (event1.isAllDay || event2.isAllDay) return false;

  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);

  return start1 < end2 && start2 < end1;
};

/**
 * 이벤트 레이아웃 정보 인터페이스
 */
export interface EventLayout {
  event: CalendarEvent;
  column: number; // 몇 번째 열에 위치할지
  totalColumns: number; // 전체 열 개수
  width: number; // 너비 비율 (0-1)
  left: number; // 왼쪽 위치 비율 (0-1)
}

/**
 * 이벤트들의 중첩 그룹을 찾기
 */
export const findOverlapGroups = (
  events: CalendarEvent[]
): CalendarEvent[][] => {
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  for (const event of events) {
    if (processed.has(event.id)) continue;

    const group = [event];
    processed.add(event.id);

    // 현재 이벤트와 겹치는 모든 이벤트 찾기
    for (const otherEvent of events) {
      if (processed.has(otherEvent.id)) continue;

      // 그룹 내 어떤 이벤트와라도 겹치면 그룹에 추가
      if (group.some((groupEvent) => doEventsOverlap(groupEvent, otherEvent))) {
        group.push(otherEvent);
        processed.add(otherEvent.id);
      }
    }

    // 시작 시간 순으로 정렬
    group.sort((a, b) => a.startTime.localeCompare(b.startTime));
    groups.push(group);
  }

  return groups;
};

/**
 * 중첩된 이벤트들의 레이아웃 계산
 */
export const calculateEventLayouts = (
  events: CalendarEvent[]
): EventLayout[] => {
  if (events.length === 0) return [];
  if (events.length === 1) {
    return [
      {
        event: events[0],
        column: 0,
        totalColumns: 1,
        width: 1,
        left: 0,
      },
    ];
  }

  const overlapGroups = findOverlapGroups(events);
  const layouts: EventLayout[] = [];

  for (const group of overlapGroups) {
    if (group.length === 1) {
      // 겹치지 않는 단일 이벤트
      layouts.push({
        event: group[0],
        column: 0,
        totalColumns: 1,
        width: 1,
        left: 0,
      });
    } else {
      // 겹치는 이벤트들의 레이아웃 계산
      const groupLayouts = calculateGroupLayout(group);
      layouts.push(...groupLayouts);
    }
  }

  return layouts;
};

/**
 * 겹치는 이벤트 그룹의 레이아웃 계산
 */
const calculateGroupLayout = (group: CalendarEvent[]): EventLayout[] => {
  const layouts: EventLayout[] = [];
  const columns: CalendarEvent[][] = [];

  // 시간 순으로 정렬된 그룹에서 각 이벤트를 적절한 열에 배치
  for (const event of group) {
    let assignedColumn = -1;

    // 기존 열들을 확인하여 겹치지 않는 열 찾기
    for (let i = 0; i < columns.length; i++) {
      const columnEvents = columns[i];
      const canPlaceInColumn = columnEvents.every(
        (columnEvent) => !doEventsOverlap(event, columnEvent)
      );

      if (canPlaceInColumn) {
        assignedColumn = i;
        break;
      }
    }

    // 적절한 열이 없으면 새 열 생성
    if (assignedColumn === -1) {
      assignedColumn = columns.length;
      columns.push([]);
    }

    columns[assignedColumn].push(event);
  }

  const totalColumns = columns.length;

  // 각 이벤트의 레이아웃 정보 계산
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    for (const event of columns[columnIndex]) {
      layouts.push({
        event,
        column: columnIndex,
        totalColumns,
        width: 1 / totalColumns,
        left: columnIndex / totalColumns,
      });
    }
  }

  return layouts;
};

/**
 * 특정 날짜의 이벤트들에 대한 레이아웃 정보 가져오기
 */
export const getEventLayoutsForDate = (
  events: CalendarEvent[],
  date: Date
): EventLayout[] => {
  const dayEvents = getEventsByDate(events, date).filter(
    (event) => !event.isAllDay
  );
  return calculateEventLayouts(dayEvents);
};
