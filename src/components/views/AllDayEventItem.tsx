import React from 'react';
import type { CalendarEvent } from '../../types';

interface AllDayEventItemProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
}

const AllDayEventItem: React.FC<AllDayEventItemProps> = ({
  event,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className="bg-blue-500 text-white text-xs px-2 py-1 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors mb-1 truncate"
      style={{
        backgroundColor: event.color || '#4285f4',
        fontSize: '11px',
        lineHeight: '14px',
        minHeight: '16px',
      }}
      onClick={handleClick}
      title={event.title}
    >
      {event.title}
    </div>
  );
};

export default AllDayEventItem;
