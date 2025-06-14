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
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const monthDays = getMonthDays(currentDateObj);
  const weekNames = getWeekNames();

  const handleDayClick = (date: Date) => {
    const dateString = formatDate(date);
    dispatch(setSelectedDate(dateString));
    dispatch(
      openEventModal({
        date: dateString,
        startTime: '09:00',
        endTime: '10:00',
        isAllDay: false,
      })
    );
  };

  const handleEventClick = (event: React.MouseEvent, eventId: string) => {
    event.stopPropagation();
    // 이벤트 클릭 시 모달 열기 또는 상세 보기
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-gray-300">
        {weekNames.map((day, index) => (
          <div
            key={day}
            className={`
              py-2 pb-0 px-3 text-center text-[11px] font-medium text-[#1f1f1f] border-r border-gray-200
              ${index === 6 ? 'border-r-0' : ''}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="flex-1 grid grid-cols-7 border-l border-gray-300">
        {monthDays.map((date, index) => {
          const dateString = formatDate(date);
          const dayEvents = getEventsByDate(events, date);
          const sortedEvents = sortEventsByTime(dayEvents);
          const isCurrentMonth = isSameMonthAsDate(date, currentDateObj);
          const isTodayCheck = isTodayDate(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={dateString}
              className={`
                min-h-[120px] border-r border-b border-gray-300 p-1 cursor-pointer hover:bg-gray-50 transition-colors duration-150
                ${index % 7 === 6 ? 'border-r-0' : ''}
                ${Math.floor(index / 7) === Math.floor((monthDays.length - 1) / 7) ? 'border-b-0' : ''}
              `}
              onClick={() => handleDayClick(date)}
            >
              {/* 날짜 숫자 */}
              <div className="flex justify-center mb-1">
                <span
                  className={`
                    inline-flex items-center justify-center w-6 h-6 text-[12px] font-medium rounded-full
                    ${
                      isTodayCheck
                        ? 'bg-blue-600 text-white'
                        : isCurrentMonth
                          ? isWeekend
                          : 'text-gray-400'
                    }
                  `}
                >
                  {date.getDate()}
                </span>
              </div>

              {/* 이벤트 목록 */}
              <div className="space-y-0.5">
                {sortedEvents.slice(0, 4).map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className={`
                      text-xs px-1.5 py-0.5 rounded text-white font-medium cursor-pointer hover:opacity-80 transition-opacity duration-150 truncate
                      ${eventIndex >= 3 ? 'opacity-90' : ''}
                    `}
                    style={{
                      backgroundColor: event.color,
                    }}
                    onClick={(e) => handleEventClick(e, event.id)}
                    title={
                      event.isAllDay
                        ? event.title
                        : `${event.startTime} ${event.title}`
                    }
                  >
                    {event.isAllDay
                      ? event.title
                      : `${event.startTime} ${event.title}`}
                  </div>
                ))}

                {/* 더 많은 이벤트가 있을 때 표시 */}
                {sortedEvents.length > 4 && (
                  <div className="text-xs text-gray-500 px-1 py-0.5 font-medium cursor-pointer hover:text-gray-700">
                    +{sortedEvents.length - 4}개 더
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
