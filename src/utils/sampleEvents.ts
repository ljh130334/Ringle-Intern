import type { CalendarEvent } from '../types';
import { generateEventId } from './eventUtils';

/**
 * 고정된 샘플 이벤트 데이터 (2025년 6월 기준)
 * 실제 프로덕션에서는 제거하고 빈 배열로 시작
 */
export const getSampleEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [
    // 6월 16일 (월요일) 이벤트
    {
      id: generateEventId(),
      title: '팀 미팅',
      description: '주간 팀 미팅',
      date: '2025-06-16',
      startTime: '09:00',
      endTime: '10:30',
      color: '#4285f4',
      isAllDay: false,
      category: 'work',
    },
    {
      id: generateEventId(),
      title: '프로젝트 리뷰',
      description: '분기별 프로젝트 리뷰',
      date: '2025-06-16',
      startTime: '14:00',
      endTime: '16:00',
      color: '#ea4335',
      isAllDay: false,
      category: 'work',
    },

    // 6월 17일 (화요일) 이벤트
    {
      id: generateEventId(),
      title: '점심 약속',
      description: '동료와 점심',
      date: '2025-06-17',
      startTime: '10:30',
      endTime: '12:00',
      color: '#ff9800',
      isAllDay: false,
      category: 'personal',
    },
    {
      id: generateEventId(),
      title: '회의 준비',
      description: '내일 발표 준비',
      date: '2025-06-17',
      startTime: '11:00',
      endTime: '12:30',
      color: '#9c27b0',
      isAllDay: false,
      category: 'work',
    },

    // 6월 18일 (수요일) 이벤트
    {
      id: generateEventId(),
      title: '중요한 미팅',
      description: '분기 실적 검토',
      date: '2025-06-18',
      startTime: '17:30',
      endTime: '21:15',
      color: '#4285f4',
      isAllDay: false,
      category: 'work',
    },

    // 6월 19일 (목요일) 이벤트
    {
      id: generateEventId(),
      title: '가족 저녁식사',
      description: '가족과 함께하는 시간',
      date: '2025-06-19',
      startTime: '18:00',
      endTime: '20:00',
      color: '#ea4335',
      isAllDay: false,
      category: 'family',
    },

    // 6월 20일 (금요일) 이벤트
    {
      id: generateEventId(),
      title: '운동',
      description: '헬스장 운동',
      date: '2025-06-20',
      startTime: '07:00',
      endTime: '08:30',
      color: '#fbbc04',
      isAllDay: false,
      category: 'health',
    },
    {
      id: generateEventId(),
      title: '회사 파티',
      description: '분기별 회식',
      date: '2025-06-20',
      startTime: '19:00',
      endTime: '22:00',
      color: '#9c27b0',
      isAllDay: false,
      category: 'work',
    },

    // 6월 21일 (토요일) 이벤트
    {
      id: generateEventId(),
      title: '영화 관람',
      description: '친구들과 영화보기',
      date: '2025-06-21',
      startTime: '15:00',
      endTime: '17:30',
      color: '#ff9800',
      isAllDay: false,
      category: 'personal',
    },

    // 종일 이벤트
    {
      id: generateEventId(),
      title: '휴가',
      description: '연차 휴가',
      date: '2025-06-22',
      startTime: '00:00',
      endTime: '23:59',
      color: '#2196f3',
      isAllDay: true,
      category: 'personal',
    },
  ];

  return events;
};

/**
 * 프로덕션용 빈 이벤트 배열
 */
export const getInitialEvents = (): CalendarEvent[] => {
  return [];
};

/**
 * 개발/데모용 샘플 이벤트 초기화
 * 실제 배포 시에는 getInitialEvents()를 사용
 */
export const initializeEvents = (): CalendarEvent[] => {
  // 개발 환경에서는 샘플 이벤트 사용
  if (process.env.NODE_ENV === 'development') {
    return getSampleEvents();
  }

  // 프로덕션에서는 빈 배열로 시작
  return getInitialEvents();
};
