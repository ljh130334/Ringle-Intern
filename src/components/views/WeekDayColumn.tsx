import React from 'react';
import type { CalendarEvent } from '../../types';
import AllDayEventsContainer from './AllDayEventsContainer';

interface WeekDayColumnProps {
  date: Date;
  events: CalendarEvent[];
  isToday?: boolean;
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
  children?: React.ReactNode;
}

const WeekDayColumn: React.FC<WeekDayColumnProps> = ({
  date,
  events,
  isToday = false,
  onEventClick,
  onTimeSlotClick,
  children,
}) => {
  const dayOfWeek = date.getDay();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[dayOfWeek];
  const dayNumber = date.getDate();

  // 해당 날짜의 이벤트들 필터링
  const dateString = date.toISOString().split('T')[0];
  const dayEvents = events.filter((event) => event.date === dateString);

  // 24시간 타임슬롯 생성
  const timeSlots = Array.from({ length: 24 }, (_, hour) => hour);

  return (
    <div className="flex-1 border-r border-gray-200 last:border-r-0">
      {/* 날짜 헤더 */}
      <div
        className={`text-center py-2 border-b border-gray-200 ${
          isToday ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-gray-50'
        }`}
      >
        <div className="text-xs text-gray-600">{dayName}</div>
        <div
          className={`text-lg ${isToday ? 'text-blue-600' : 'text-gray-900'}`}
        >
          {dayNumber}
        </div>
      </div>

      {/* 종일 이벤트 영역 */}
      <AllDayEventsContainer events={dayEvents} onEventClick={onEventClick} />

      {/* 시간대별 이벤트 영역 */}
      <div className="relative">
        {timeSlots.map((hour) => (
          <div
            key={hour}
            className="h-12 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative"
            onClick={() => onTimeSlotClick?.(date, hour)}
          >
            {/* 시간대별 이벤트들이 여기에 표시됩니다 */}
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekDayColumn;
