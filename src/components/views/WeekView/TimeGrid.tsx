import React from 'react';
import { formatDate } from '../../../utils/dateUtils';
import TimeSlotEvent from './TimeSlotEvent';
import type { EventLayout } from '../../../types';

interface WeekEventData {
  date: Date;
  eventLayouts: EventLayout[];
}

interface TimeGridProps {
  timeSlots: number[];
  weekEvents: WeekEventData[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: any, e: React.MouseEvent) => void;
  formatEventTimeRange: (startTime: string, endTime: string) => string;
}

const TimeGrid: React.FC<TimeGridProps> = ({
  timeSlots,
  weekEvents,
  onTimeSlotClick,
  onEventClick,
  formatEventTimeRange,
}) => {
  // 시간 포맷팅 함수 (한국어 형식)
  const formatTimeLabel = (hour: number): string => {
    if (hour === 0) return '';
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return '오후 12시';
    return `오후 ${hour - 12}시`;
  };

  const getEventLayoutsForTimeSlot = (
    eventLayouts: EventLayout[],
    hour: number
  ) => {
    return eventLayouts.filter((layout) => {
      const event = layout.event;
      if (event.isAllDay) return false;

      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const eventEndHour = parseInt(event.endTime.split(':')[0]);
      const eventEndMin = parseInt(event.endTime.split(':')[1]);

      return (
        hour >= eventStartHour &&
        (hour < eventEndHour || (hour === eventEndHour && eventEndMin === 0))
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-h-full">
        {timeSlots.map((hour) => (
          <div key={hour} className="flex relative">
            {/* 시간 라벨 */}
            <div className="w-20 flex-shrink-0 relative">
              {hour !== 0 && (
                <div className="absolute -top-[9px] right-[17px] text-[11px] text-[#444746] bg-white px-1">
                  {formatTimeLabel(hour)}
                </div>
              )}
            </div>

            {/* 각 날짜별 시간 슬롯 */}
            {weekEvents.map(({ date, eventLayouts }) => {
              const layoutsInSlot = getEventLayoutsForTimeSlot(
                eventLayouts,
                hour
              );

              return (
                <div
                  key={`${formatDate(date)}-${hour}`}
                  className="flex-1 relative border-l border-b border-[#dadce0] min-h-[48px] cursor-pointer"
                  onClick={() => onTimeSlotClick(date, hour)}
                >
                  {layoutsInSlot.map((layout) => {
                    const event = layout.event;
                    const eventStartHour = parseInt(
                      event.startTime.split(':')[0]
                    );

                    // 이벤트가 이 시간에 시작하는 경우에만 렌더링
                    if (eventStartHour === hour) {
                      return (
                        <TimeSlotEvent
                          key={event.id}
                          layout={layout}
                          onEventClick={onEventClick}
                          formatEventTimeRange={formatEventTimeRange}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGrid;
