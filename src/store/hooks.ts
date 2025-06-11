import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 타입이 적용된 useDispatch 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 타입이 적용된 useSelector 훅
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 캘린더 상태 훅
export const useCalendarState = () => {
  return useAppSelector((state) => state.calendar);
};

// 이벤트 상태 훅
export const useEventsState = () => {
  return useAppSelector((state) => state.events);
};

// UI 상태 훅
export const useUIState = () => {
  return useAppSelector((state) => state.ui);
};

// 특정 날짜의 이벤트들을 가져오는 훅
export const useEventsByDate = (date: string) => {
  return useAppSelector((state) =>
    state.events.events.filter((event) => event.date === date)
  );
};

// 현재 주의 이벤트들을 가져오는 훅
export const useCurrentWeekEvents = () => {
  const currentDate = useAppSelector((state) => state.calendar.currentDate);

  return useAppSelector((state) => {
    const current = new Date(currentDate);
    const weekStart = new Date(current);
    weekStart.setDate(current.getDate() - current.getDay()); // 일요일로 이동

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // 토요일로 이동

    const startStr = weekStart.toISOString().split('T')[0];
    const endStr = weekEnd.toISOString().split('T')[0];

    return state.events.events.filter(
      (event) => event.date >= startStr && event.date <= endStr
    );
  });
};

// 필터링된 이벤트들을 가져오는 훅
export const useFilteredEvents = () => {
  return useAppSelector((state) => {
    const { events, filters } = state.events;

    return events.filter((event) => {
      // 카테고리 필터링
      if (filters.categories.length > 0 && event.category) {
        if (!filters.categories.includes(event.category)) {
          return false;
        }
      }

      // 추후 추가될 필터링 로직

      return true;
    });
  });
};

// 선택된 이벤트 정보를 가져오는 훅
export const useSelectedEvent = () => {
  const selectedEventId = useAppSelector(
    (state) => state.events.selectedEventId
  );
  const events = useAppSelector((state) => state.events.events);

  return selectedEventId
    ? events.find((event) => event.id === selectedEventId)
    : null;
};
