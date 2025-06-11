import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CalendarEvent, EventFilters } from '../../types';

interface EventsState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  filters: EventFilters;
  selectedEventId: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  filters: {
    categories: [],
    showCompleted: true,
  },
  selectedEventId: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // 로딩 상태 설정
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // 에러 상태 설정
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // 이벤트 추가
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
      state.error = null;
    },

    // 이벤트 수정
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
        state.error = null;
      } else {
        state.error = '수정할 이벤트를 찾을 수 없습니다.';
      }
    },

    // 이벤트 삭제
    deleteEvent: (state, action: PayloadAction<string>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload
      );
      if (index !== -1) {
        state.events.splice(index, 1);
        state.error = null;
        // 삭제된 이벤트가 선택된 이벤트였다면 선택 해제
        if (state.selectedEventId === action.payload) {
          state.selectedEventId = null;
        }
      } else {
        state.error = '삭제할 이벤트를 찾을 수 없습니다.';
      }
    },

    // 모든 이벤트 설정
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
      state.error = null;
    },

    // 이벤트 선택
    selectEvent: (state, action: PayloadAction<string | null>) => {
      state.selectedEventId = action.payload;
    },

    // 카테고리 필터 토글
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.categories.indexOf(category);

      if (index === -1) {
        state.filters.categories.push(category);
      } else {
        state.filters.categories.splice(index, 1);
      }
    },

    // 완료된 이벤트 표시 토글
    toggleShowCompleted: (state) => {
      state.filters.showCompleted = !state.filters.showCompleted;
    },

    // 필터 초기화
    resetFilters: (state) => {
      state.filters = {
        categories: [],
        showCompleted: true,
      };
    },

    // 특정 날짜의 이벤트들 가져오기
    setFilteredEventsByDate: (state, action: PayloadAction<string>) => {
      const targetDate = action.payload;
      state.events = state.events.filter((event) => event.date === targetDate);
    },
  },
});

export const {
  setLoading,
  setError,
  addEvent,
  updateEvent,
  deleteEvent,
  setEvents,
  selectEvent,
  toggleCategoryFilter,
  toggleShowCompleted,
  resetFilters,
} = eventsSlice.actions;

export default eventsSlice.reducer;
