import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import { openEventModal } from '../../store/slices/uiSlice';
import {
  getMonthDays,
  getWeekNames,
  isTodayDate,
  isSameMonthAsDate,
  formatDate,
} from '../../utils/dateUtils';
import { getEventsByDate, sortEventsByTime } from '../../utils/eventUtils';

const MonthView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate, selectedDate } = useAppSelector(
    (state) => state.calendar
  );
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const monthDays = getMonthDays(currentDateObj);
  const weekNames = getWeekNames();

  const handleDayClick = (date: Date) => {
    const dateString = formatDate(date);
    dispatch(setSelectedDate(dateString));
  };

  const handleDayDoubleClick = (date: Date) => {
    const dateString = formatDate(date);
    dispatch(
      openEventModal({
        date: dateString,
        startTime: '09:00',
        endTime: '10:00',
        isAllDay: false,
      })
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border-b">
        {weekNames.map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="flex-1 calendar-grid">
        {monthDays.map((date) => {
          const dateString = formatDate(date);
          const dayEvents = getEventsByDate(events, date);
          const sortedEvents = sortEventsByTime(dayEvents);
          const isCurrentMonth = isSameMonthAsDate(date, currentDateObj);
          const isTodayCheck = isTodayDate(date);
          const isSelected = selectedDate === dateString;

          return (
            <div
              key={dateString}
              className={`calendar-day ${isTodayCheck ? 'today' : ''} ${
                !isCurrentMonth ? 'other-month' : ''
              } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleDayClick(date)}
              onDoubleClick={() => handleDayDoubleClick(date)}
            >
              <div
                className={`day-number ${isTodayCheck ? 'bg-blue-500 text-white' : ''}`}
              >
                {date.getDate()}
              </div>

              <div className="day-events">
                {sortedEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="event-item"
                    style={{
                      backgroundColor: event.color + '20',
                      color: event.color,
                    }}
                  >
                    {event.isAllDay
                      ? event.title
                      : `${event.startTime} ${event.title}`}
                  </div>
                ))}
                {sortedEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{sortedEvents.length - 3}개 더
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
