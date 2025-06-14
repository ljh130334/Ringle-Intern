import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import { openEventModal } from '../../store/slices/uiSlice';
import { deleteEvent } from '../../store/slices/eventsSlice';
import { getWeekDays, formatDate, isTodayDate } from '../../utils/dateUtils';
import { getEventsByDate, sortEventsByTime } from '../../utils/eventUtils';

const WeekView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const weekDays = getWeekDays(currentDateObj);

  // 시간대 배열 생성 (1시부터 23시까지)
  const timeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => hour);
  }, []);

  // 각 날짜별 이벤트 가져오기
  const weekEvents = useMemo(() => {
    return weekDays.map((date) => {
      const dayEvents = getEventsByDate(events, date);
      return {
        date,
        events: sortEventsByTime(dayEvents),
      };
    });
  }, [weekDays, events]);

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

  // 시간 포맷팅 함수 (한국어 형식)
  const formatTimeLabel = (hour: number): string => {
    if (hour === 0) return '';
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return '오후 12시';
    return `오후 ${hour - 12}시`;
  };

  // 이벤트가 특정 시간대에 표시되는지 확인
  interface Event {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
    color?: string;
  }

  const getEventsForTimeSlot = (dayEvents: Event[], hour: number) => {
    return dayEvents.filter((event) => {
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
    <div className="h-full flex flex-col bg-white">
      {/* 주간 헤더 */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10 pr-[15px]">
        <div className="w-20 flex-shrink-0 p-3 pb-1 flex items-end justify-center">
          <div className="text-[11px] text-[#444746]">GMT+09</div>
        </div>

        {/* 요일별 헤더 */}
        {weekDays.map((date, index) => {
          const dateString = formatDate(date);
          const isTodayCheck = isTodayDate(date);
          const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];

          return (
            <div
              key={dateString}
              className="flex-1 p-3 pt-2 text-center cursor-pointer group"
              onClick={() => handleDayClick(date)}
            >
              {/* 요일 이름 */}
              <div
                className={`text-[11px] mb-1 font-medium ${
                  isTodayCheck ? 'text-[#0b57d0]' : 'text-[#444746]'
                }`}
              >
                {weekdayNames[index]}
              </div>

              {/* 날짜 숫자 */}
              <div className="flex justify-center">
                <div
                  className={`w-[46px] h-[46px] flex items-center justify-center text-2xl font-normal ${
                    isTodayCheck
                      ? 'bg-[#0b57d0] text-white rounded-full'
                      : 'text-[#3c4043] group-hover:bg-[#e5e7eb] group-hover:rounded-full transition-all duration-200'
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 시간 그리드 컨테이너 */}
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
              {weekEvents.map(({ date, events: dayEvents }) => {
                const eventsInSlot = getEventsForTimeSlot(dayEvents, hour);

                return (
                  <div
                    key={`${formatDate(date)}-${hour}`}
                    className="flex-1 relative border-l border-b border-[#dadce0] min-h-[48px] cursor-pointer"
                    onClick={() => handleTimeSlotClick(date, hour)}
                  >
                    {eventsInSlot.map((event, eventIndex) => {
                      const eventStartHour = parseInt(
                        event.startTime.split(':')[0]
                      );
                      const eventStartMin = parseInt(
                        event.startTime.split(':')[1]
                      );
                      const eventEndHour = parseInt(
                        event.endTime.split(':')[0]
                      );
                      const eventEndMin = parseInt(event.endTime.split(':')[1]);

                      if (eventStartHour === hour) {
                        const durationInMinutes =
                          eventEndHour * 60 +
                          eventEndMin -
                          (eventStartHour * 60 + eventStartMin);
                        const heightInPixels = Math.max(
                          (durationInMinutes / 60) * 48,
                          24
                        );
                        const topOffset = (eventStartMin / 60) * 48;

                        return (
                          <div
                            key={event.id}
                            className="absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium text-white shadow-sm cursor-pointer hover:shadow-md z-10"
                            style={{
                              backgroundColor: event.color || '#4285f4',
                              height: `${heightInPixels}px`,
                              top: `${topOffset}px`,
                              marginLeft: `${eventIndex * 2}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (e.detail === 2) {
                                if (
                                  window.confirm('이벤트를 삭제하시겠습니까?')
                                ) {
                                  dispatch(deleteEvent(event.id));
                                }
                              }
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (
                                window.confirm('이벤트를 삭제하시겠습니까?')
                              ) {
                                dispatch(deleteEvent(event.id));
                              }
                            }}
                          >
                            <div className="truncate font-medium">
                              {event.title}
                            </div>
                            {!event.isAllDay && (
                              <div className="text-xs opacity-90">
                                {event.startTime} - {event.endTime}
                              </div>
                            )}
                          </div>
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
    </div>
  );
};

export default WeekView;
