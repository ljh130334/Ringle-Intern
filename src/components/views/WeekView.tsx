import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import { openEventModal } from '../../store/slices/uiSlice';
import { deleteEvent } from '../../store/slices/eventsSlice';
import { getWeekDays, formatDate, isTodayDate } from '../../utils/dateUtils';
import {
  getEventsByDate,
  sortEventsByTime,
  getEventLayoutsForDate,
} from '../../utils/eventUtils';
import { getContrastTextColor } from '../../utils/colorUtils';
import type { EventLayout } from '../../types';

const WeekView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  const currentDateObj = new Date(currentDate);
  const weekDays = getWeekDays(currentDateObj);

  // 시간대 배열 생성 (0시부터 23시까지)
  const timeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => hour);
  }, []);

  // 각 날짜별 이벤트와 레이아웃 정보 가져오기
  const weekEvents = useMemo(() => {
    return weekDays.map((date) => {
      const dayEvents = getEventsByDate(events, date);
      const eventLayouts = getEventLayoutsForDate(events, date);

      return {
        date,
        events: sortEventsByTime(dayEvents),
        eventLayouts,
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

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEventModal(event));
  };

  // 시간 포맷팅 함수 (한국어 형식)
  const formatTimeLabel = (hour: number): string => {
    if (hour === 0) return '';
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return '오후 12시';
    return `오후 ${hour - 12}시`;
  };

  // 이벤트용 시간 포맷팅 함수 (한국어 형식)
  const formatEventTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(':').map(Number);

    if (hour === 0) {
      return minute === 0
        ? '오전 12시'
        : `오전 12:${minute.toString().padStart(2, '0')}`;
    } else if (hour < 12) {
      return minute === 0
        ? `오전 ${hour}시`
        : `오전 ${hour}:${minute.toString().padStart(2, '0')}`;
    } else if (hour === 12) {
      return minute === 0
        ? '오후 12시'
        : `오후 12:${minute.toString().padStart(2, '0')}`;
    } else {
      return minute === 0
        ? `오후 ${hour - 12}시`
        : `오후 ${hour - 12}:${minute.toString().padStart(2, '0')}`;
    }
  };

  // 이벤트 시간 범위 포맷팅
  const formatEventTimeRange = (startTime: string, endTime: string): string => {
    return `${formatEventTime(startTime)}~${formatEventTime(endTime)}`;
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
        onClick={(e) => handleEventClick(event, e)}
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
    <div className="h-full flex flex-col bg-white">
      {/* 주간 헤더 */}
      <div className="flex bg-white sticky top-0 z-10 pr-[15px]">
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

      {/* 종일 이벤트 영역 */}
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
              {weekEvents.map(({ date, eventLayouts }) => {
                const layoutsInSlot = getEventLayoutsForTimeSlot(
                  eventLayouts,
                  hour
                );

                return (
                  <div
                    key={`${formatDate(date)}-${hour}`}
                    className="flex-1 relative border-l border-b border-[#dadce0] min-h-[48px] cursor-pointer"
                    onClick={() => handleTimeSlotClick(date, hour)}
                  >
                    {layoutsInSlot.map((layout) => {
                      const event = layout.event;
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

                      // 이벤트가 이 시간에 시작하는 경우에만 렌더링
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

                        const eventBackgroundColor = event.color || '#4285f4';
                        const eventTextColor =
                          getContrastTextColor(eventBackgroundColor);

                        // 중첩을 고려한 위치와 크기 계산
                        const widthPercentage = layout.width * 100;
                        const leftPercentage = layout.left * 100;

                        return (
                          <div
                            key={event.id}
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
                            onClick={(e) => handleEventClick(event, e)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (
                                window.confirm('이벤트를 삭제하시겠습니까?')
                              ) {
                                dispatch(deleteEvent(event.id));
                              }
                            }}
                          >
                            <div className="truncate font-medium text-xs leading-tight">
                              {event.title}
                            </div>
                            {!event.isAllDay && heightInPixels > 30 && (
                              <div className="text-xs opacity-90 leading-tight">
                                {formatEventTimeRange(
                                  event.startTime,
                                  event.endTime
                                )}
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
