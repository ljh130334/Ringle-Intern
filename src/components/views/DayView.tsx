import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openEventModal } from '../../store/slices/uiSlice';
import { formatDate, isTodayDate } from '../../utils/dateUtils';
import { getEventsByDate, sortEventsByTime } from '../../utils/eventUtils';

const DayView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  const selectedDateObj = new Date(selectedDate);
  const dayEvents = getEventsByDate(events, selectedDateObj);
  const sortedEvents = sortEventsByTime(dayEvents);
  const isToday = isTodayDate(selectedDateObj);

  const handleTimeSlotClick = (hour: number) => {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;

    dispatch(
      openEventModal({
        date: selectedDate,
        startTime,
        endTime,
        isAllDay: false,
      })
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 일일 헤더 */}
      <div className="border-b p-4">
        <h2 className="text-xl font-medium">
          {formatDate(selectedDateObj, 'yyyy년 M월 d일')}
          {isToday && <span className="ml-2 text-blue-600">(오늘)</span>}
        </h2>
      </div>

      <div className="flex-1 flex">
        {/* 전일 일정 */}
        <div className="w-64 border-r p-4">
          <h3 className="font-medium mb-3">종일 일정</h3>
          <div className="space-y-2">
            {sortedEvents
              .filter((event) => event.isAllDay)
              .map((event) => (
                <div
                  key={event.id}
                  className="p-2 rounded text-sm"
                  style={{
                    backgroundColor: event.color + '20',
                    color: event.color,
                  }}
                >
                  {event.title}
                </div>
              ))}
          </div>
        </div>

        {/* 시간별 일정 */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-px">
            {Array.from({ length: 24 }, (_, hour) => {
              const hourEvents = sortedEvents.filter((event) => {
                if (event.isAllDay) return false;
                const eventHour = parseInt(event.startTime.split(':')[0]);
                return eventHour === hour;
              });

              return (
                <div
                  key={hour}
                  className="flex border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTimeSlotClick(hour)}
                >
                  <div className="w-20 p-2 text-xs text-gray-500 text-right">
                    {hour === 0
                      ? '12 AM'
                      : hour < 12
                        ? `${hour} AM`
                        : hour === 12
                          ? '12 PM'
                          : `${hour - 12} PM`}
                  </div>
                  <div className="flex-1 p-2 min-h-[60px]">
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-2 rounded mb-1 text-sm"
                        style={{
                          backgroundColor: event.color + '20',
                          color: event.color,
                        }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-75">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
