import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { deleteEvent } from '../../../store/slices/eventsSlice';
import { getContrastTextColor } from '../../../utils/colorUtils';
import type { EventLayout, CalendarEvent } from '../../../types';

interface TimeSlotEventProps {
  layout: EventLayout;
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void;
  formatEventTimeRange: (startTime: string, endTime: string) => string;
}

const TimeSlotEvent: React.FC<TimeSlotEventProps> = ({
  layout,
  onEventClick,
  formatEventTimeRange,
}) => {
  const dispatch = useAppDispatch();
  const event = layout.event;

  const eventStartHour = parseInt(event.startTime.split(':')[0]);
  const eventStartMin = parseInt(event.startTime.split(':')[1]);
  const eventEndHour = parseInt(event.endTime.split(':')[0]);
  const eventEndMin = parseInt(event.endTime.split(':')[1]);

  const durationInMinutes =
    eventEndHour * 60 + eventEndMin - (eventStartHour * 60 + eventStartMin);
  const heightInPixels = Math.max((durationInMinutes / 60) * 48, 24);
  const topOffset = (eventStartMin / 60) * 48;

  const eventBackgroundColor = event.color || '#4285f4';
  const eventTextColor = getContrastTextColor(eventBackgroundColor);

  const widthPercentage = layout.width * 100;
  const leftPercentage = layout.left * 100;

  return (
    <div
      className="absolute rounded px-2 py-1 text-xs font-medium shadow-sm cursor-pointer hover:shadow-md z-10"
      style={{
        backgroundColor: eventBackgroundColor,
        color: eventTextColor,
        height: `${heightInPixels}px`,
        top: `${topOffset}px`,
        left: `${leftPercentage}%`,
        width: `${widthPercentage - 2}%`,
        minWidth: '60px',
      }}
      onClick={(e) => onEventClick(event, e)}
      onContextMenu={(e) => {
        e.preventDefault();
        if (window.confirm('이벤트를 삭제하시겠습니까?')) {
          dispatch(deleteEvent(event.id));
        }
      }}
    >
      <div className="truncate font-medium text-xs leading-tight">
        {event.title}
      </div>
      {!event.isAllDay && heightInPixels > 30 && (
        <div className="text-xs opacity-90 leading-tight">
          {formatEventTimeRange(event.startTime, event.endTime)}
        </div>
      )}
    </div>
  );
};

export default TimeSlotEvent;
