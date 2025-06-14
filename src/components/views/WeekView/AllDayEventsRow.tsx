import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { deleteEvent } from '../../../store/slices/eventsSlice';
import { formatDate } from '../../../utils/dateUtils';
import { getContrastTextColor } from '../../../utils/colorUtils';
import type { CalendarEvent } from '../../../types';

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  color?: string;
}

interface WeekEventData {
  date: Date;
  events: CalendarEvent[];
}

interface AllDayEventsRowProps {
  weekEvents: WeekEventData[];
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

const AllDayEventsRow: React.FC<AllDayEventsRowProps> = ({
  weekEvents,
  onEventClick,
}) => {
  const dispatch = useAppDispatch();

  // 종일 이벤트 컴포넌트
  const AllDayEvent: React.FC<{ event: Event }> = ({ event }) => {
    const backgroundColor = event.color || '#4285f4';
    const textColor = getContrastTextColor(backgroundColor);

    return (
      <div
        className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity mb-1 truncate"
        style={{
          backgroundColor,
          color: textColor,
          fontSize: '11px',
          lineHeight: '16px',
          minHeight: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={(e) => onEventClick(event, e)}
        title={event.title}
        onContextMenu={(e) => {
          e.preventDefault();
          if (window.confirm('이벤트를 삭제하시겠습니까?')) {
            dispatch(deleteEvent(event.id));
          }
        }}
      >
        {event.title}
      </div>
    );
  };

  return (
    <div className="flex border-b border-[#dadce0] border-t-0 pr-[15px]">
      <div className="w-20 flex-shrink-0"></div>
      {weekEvents.map(({ date, events: dayEvents }) => {
        const allDayEvents = dayEvents.filter((event) => event.isAllDay);

        return (
          <div
            key={formatDate(date)}
            className="flex-1 border-l border-[#dadce0] pr-3"
            style={{ minHeight: allDayEvents.length > 0 ? 'auto' : '24px' }}
          >
            {allDayEvents.map((event) => (
              <AllDayEvent key={event.id} event={event} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AllDayEventsRow;
