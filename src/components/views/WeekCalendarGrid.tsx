import React from 'react';
import type { CalendarEvent } from '../../types';
import WeekDayColumn from './WeekDayColumn';

interface WeekCalendarGridProps {
  weekDays: Date[];
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
}

const WeekCalendarGrid: React.FC<WeekCalendarGridProps> = ({
  weekDays,
  events,
  onEventClick,
  onTimeSlotClick,
}) => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // 시간 라벨 생성 (0시부터 23시까지)
  const timeLabels = Array.from({ length: 24 }, (_, hour) => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour < 12 ? '오전' : '오후';
    return `${period} ${displayHour}시`;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 주간 헤더와 종일 이벤트 영역 */}
      <div className="flex border-b border-gray-200">
        {/* 시간 라벨 영역의 헤더 */}
        <div className="w-16 flex-shrink-0 bg-gray-50 border-r border-gray-200">
          <div className="h-16 flex items-center justify-center text-xs text-gray-500">
            GMT+09
          </div>
        </div>

        {/* 각 날짜의 헤더와 종일 이벤트 */}
        {weekDays.map((date) => {
          const dateString = date.toISOString().split('T')[0];
          const isToday = dateString === todayString;

          return (
            <WeekDayColumn
              key={dateString}
              date={date}
              events={events}
              isToday={isToday}
              onEventClick={onEventClick}
              onTimeSlotClick={onTimeSlotClick}
            />
          );
        })}
      </div>

      {/* 시간대별 그리드 */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* 시간 라벨 열 */}
          <div className="w-16 flex-shrink-0 bg-gray-50 border-r border-gray-200">
            {timeLabels.map((label, hour) => (
              <div
                key={hour}
                className="h-12 flex items-start justify-end pr-2 text-xs text-gray-500 border-b border-gray-100"
                style={{ paddingTop: '2px' }}
              >
                {hour === 0 ? '' : label}
              </div>
            ))}
          </div>

          {/* 각 날짜의 시간대별 슬롯 */}
          {weekDays.map((date) => {
            const dateString = date.toISOString().split('T')[0];

            return (
              <div
                key={dateString}
                className="flex-1 border-r border-gray-200 last:border-r-0"
              >
                {timeLabels.map((_, hour) => (
                  <div
                    key={hour}
                    className="h-12 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative"
                    onClick={() => onTimeSlotClick?.(date, hour)}
                  >
                    {/* 여기에 시간대별 이벤트들이 표시됩니다 */}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekCalendarGrid;
