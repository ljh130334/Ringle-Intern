import type { CalendarEvent } from '../types';
import { generateEventId } from './eventUtils';

/**
 * 현재 주의 샘플 이벤트 데이터 생성
 */
export const generateSampleEvents = (currentDate: Date): CalendarEvent[] => {
  // 현재 주의 시작 날짜를 구하기
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day);

  const events: CalendarEvent[] = [
    // 월요일 이벤트
    {
      id: generateEventId(),
      title: '팀 미팅',
      description: '주간 팀 미팅',
      date: new Date(startOfWeek.getTime() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
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
      date: new Date(startOfWeek.getTime() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '14:00',
      endTime: '16:00',
      color: '#ea4335',
      isAllDay: false,
      category: 'work',
    },

    // 화요일 이벤트
    {
      id: generateEventId(),
      title: '의사 방문',
      description: '정기 건강검진',
      date: new Date(startOfWeek.getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '11:00',
      endTime: '12:00',
      color: '#34a853',
      isAllDay: false,
      category: 'health',
    },

    // 수요일 이벤트
    {
      id: generateEventId(),
      title: '중요한 미팅',
      description: '오후 5:30 - 9:15',
      date: new Date(startOfWeek.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '17:30',
      endTime: '21:15',
      color: '#4285f4',
      isAllDay: false,
      category: 'work',
    },

    // 목요일 이벤트
    {
      id: generateEventId(),
      title: '가족 저녁식사',
      description: '가족과 함께하는 시간',
      date: new Date(startOfWeek.getTime() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '18:00',
      endTime: '20:00',
      color: '#ea4335',
      isAllDay: false,
      category: 'family',
    },

    // 금요일 이벤트
    {
      id: generateEventId(),
      title: '운동',
      description: '헬스장 운동',
      date: new Date(startOfWeek.getTime() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
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
      date: new Date(startOfWeek.getTime() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '19:00',
      endTime: '22:00',
      color: '#9c27b0',
      isAllDay: false,
      category: 'work',
    },

    // 토요일 이벤트
    {
      id: generateEventId(),
      title: '영화 관람',
      description: '친구들과 영화보기',
      date: new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      startTime: '15:00',
      endTime: '17:30',
      color: '#ff9800',
      isAllDay: false,
      category: 'personal',
    },
  ];

  return events;
};

/**
 * 스토어에 샘플 이벤트를 추가하는 액션 생성자 (임시 개발용)
 */
export const initializeSampleEvents = (currentDate: Date) => {
  return generateSampleEvents(currentDate);
};
