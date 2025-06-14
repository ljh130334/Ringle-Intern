import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import { openEventModal } from '../../store/slices/uiSlice';
import { getWeekDays, formatDate } from '../../utils/dateUtils';
import {
  getEventsByDate,
  sortEventsByTime,
  getEventLayoutsForDate,
} from '../../utils/eventUtils';
import WeekHeader from './WeekView/WeekHeader';
import AllDayEventsRow from './WeekView/AllDayEventsRow';
import TimeGrid from './WeekView/TimeGrid';

const WeekView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const weekDays = getWeekDays(currentDateObj);

  // 시간대 배열 생성 (0시부터 23시까지)
  const timeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => hour);
  }, []);

  // 각 날짜별 이벤트와 레이아웃 정보 가져오기
  const weekEvents = useMemo(() => {
    return weekDays.map((date) => {
      const dayEvents = getEventsByDate(events, date);
      const eventLayouts = getEventLayoutsForDate(events, date);

      return {
        date,
        events: sortEventsByTime(dayEvents),
        eventLayouts,
      };
    });
  }, [weekDays, events]);

  const handleDayClick = (date: Date) => {
    const dateString = formatDate(date);
    dispatch(setSelectedDate(dateString));
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const dateString = formatDate(date);
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;

    dispatch(
      openEventModal({
        date: dateString,
        startTime,
        endTime,
        isAllDay: false,
      })
    );
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEventModal(event));
  };

  // 이벤트용 시간 포맷팅 함수 (한국어 형식)
  const formatEventTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(':').map(Number);

    if (hour === 0) {
      return minute === 0
        ? '오전 12시'
        : `오전 12:${minute.toString().padStart(2, '0')}`;
    } else if (hour < 12) {
      return minute === 0
        ? `오전 ${hour}시`
        : `오전 ${hour}:${minute.toString().padStart(2, '0')}`;
    } else if (hour === 12) {
      return minute === 0
        ? '오후 12시'
        : `오후 12:${minute.toString().padStart(2, '0')}`;
    } else {
      return minute === 0
        ? `오후 ${hour - 12}시`
        : `오후 ${hour - 12}:${minute.toString().padStart(2, '0')}`;
    }
  };

  // 이벤트 시간 범위 포맷팅
  const formatEventTimeRange = (startTime: string, endTime: string): string => {
    return `${formatEventTime(startTime)}~${formatEventTime(endTime)}`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 주간 헤더 */}
      <WeekHeader weekDays={weekDays} onDayClick={handleDayClick} />

      {/* 종일 이벤트 영역 */}
      <AllDayEventsRow
        weekEvents={weekEvents}
        onEventClick={handleEventClick}
      />

      {/* 시간 그리드 컨테이너 */}
      <TimeGrid
        timeSlots={timeSlots}
        weekEvents={weekEvents}
        onTimeSlotClick={handleTimeSlotClick}
        onEventClick={handleEventClick}
        formatEventTimeRange={formatEventTimeRange}
      />
    </div>
  );
};

export default WeekView;
