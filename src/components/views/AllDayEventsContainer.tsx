import React from 'react';
import type { CalendarEvent } from '../../types';
import AllDayEventItem from './AllDayEventItem';

interface AllDayEventsContainerProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const AllDayEventsContainer: React.FC<AllDayEventsContainerProps> = ({
  events,
  onEventClick,
}) => {
  // 종일 이벤트만 필터링
  const allDayEvents = events.filter((event) => event.isAllDay);

  if (allDayEvents.length === 0) {
    return null;
  }

  return (
    <div className="px-1 py-1 bg-gray-50 border-b border-gray-200">
      {allDayEvents.map((event) => (
        <AllDayEventItem key={event.id} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
};

export default AllDayEventsContainer;
