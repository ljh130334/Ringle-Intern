import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CalendarView } from '../../types';

interface CalendarState {
  currentDate: string; // 현재 보고 있는 날짜 (YYYY-MM-DD)
  selectedDate: string; // 선택된 날짜 (YYYY-MM-DD)
  view: CalendarView; // 현재 뷰 타입
  showWeekends: boolean; // 주말 표시 여부
  firstDayOfWeek: number; // 주의 시작일 (0: 일요일, 1: 월요일)
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString().split('T')[0],
  selectedDate: new Date().toISOString().split('T')[0],
  view: 'week', // 기본값 week로 설정
  showWeekends: true,
  firstDayOfWeek: 0, // 일요일 시작
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // 현재 날짜 설정
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },

    // 선택된 날짜 설정
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    // 뷰 타입 변경
    setView: (state, action: PayloadAction<CalendarView>) => {
      state.view = action.payload;
    },

    // 주말 표시 토글
    toggleWeekends: (state) => {
      state.showWeekends = !state.showWeekends;
    },

    // 주의 시작일 설정
    setFirstDayOfWeek: (state, action: PayloadAction<number>) => {
      state.firstDayOfWeek = action.payload;
    },

    // 이전 주/월/일로 이동
    goToPrevious: (state) => {
      const currentDate = new Date(state.currentDate);

      if (state.view === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
      } else if (state.view === 'week') {
        currentDate.setDate(currentDate.getDate() - 7);
      } else if (state.view === 'day') {
        currentDate.setDate(currentDate.getDate() - 1);
      }

      state.currentDate = currentDate.toISOString().split('T')[0];
    },

    // 다음 주/월/일로 이동
    goToNext: (state) => {
      const currentDate = new Date(state.currentDate);

      if (state.view === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (state.view === 'week') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (state.view === 'day') {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      state.currentDate = currentDate.toISOString().split('T')[0];
    },

    // 오늘로 이동
    goToToday: (state) => {
      const today = new Date().toISOString().split('T')[0];
      state.currentDate = today;
      state.selectedDate = today;
    },

    // 특정 날짜로 이동
    navigateToDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setCurrentDate,
  setSelectedDate,
  setView,
  toggleWeekends,
  setFirstDayOfWeek,
  goToPrevious,
  goToNext,
  goToToday,
  navigateToDate,
} = calendarSlice.actions;

export default calendarSlice.reducer;
