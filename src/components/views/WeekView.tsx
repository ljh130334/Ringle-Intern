import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import { openEventModal } from '../../store/slices/uiSlice';
import { getWeekDays, formatDate, isTodayDate } from '../../utils/dateUtils';
import { getEventsByDate } from '../../utils/eventUtils';

const WeekView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate, selectedDate } = useAppSelector(
    (state) => state.calendar
  );
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const weekDays = getWeekDays(currentDateObj);

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

  return (
    <div className="h-full flex flex-col">
      {/* 주간 헤더 */}
      <div className="grid grid-cols-8 gap-px bg-gray-200 border-b">
        <div className="bg-gray-50 p-3"></div>
        {weekDays.map((date) => {
          const dateString = formatDate(date);
          const isTodayCheck = isTodayDate(date);
          const isSelected = selectedDate === dateString;

          return (
            <div
              key={dateString}
              className={`bg-gray-50 p-3 text-center cursor-pointer ${
                isTodayCheck ? 'bg-blue-50' : ''
              } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleDayClick(date)}
            >
              <div className="text-xs text-gray-600">
                {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
              </div>
              <div
                className={`text-lg font-medium ${isTodayCheck ? 'text-blue-600' : ''}`}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* 시간 그리드 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          {Array.from({ length: 24 }, (_, hour) => (
            <React.Fragment key={hour}>
              <div className="bg-white p-2 text-xs text-gray-500 text-right border-r">
                {hour === 0
                  ? '12 AM'
                  : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                      ? '12 PM'
                      : `${hour - 12} PM`}
              </div>
              {weekDays.map((date) => {
                const dateString = formatDate(date);
                const dayEvents = getEventsByDate(events, date).filter(
                  (event) => {
                    if (event.isAllDay) return false;
                    const eventHour = parseInt(event.startTime.split(':')[0]);
                    return eventHour === hour;
                  }
                );

                return (
                  <div
                    key={`${dateString}-${hour}`}
                    className="bg-white p-1 min-h-[60px] border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTimeSlotClick(date, hour)}
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded mb-1"
                        style={{
                          backgroundColor: event.color + '20',
                          color: event.color,
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
