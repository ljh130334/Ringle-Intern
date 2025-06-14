import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CalendarEvent } from '../../types';

interface UiState {
  sidebarOpen: boolean; // 사이드바 열림/닫힘 상태
  eventModalOpen: boolean; // 이벤트 추가/수정 모달 상태
  eventFormData: Partial<CalendarEvent> | null; // 모달에서 편집 중인 이벤트 데이터
  mobileView: boolean; // 모바일 뷰 여부
  headerView: 'calendar' | 'tasks';
  showDatePicker: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  eventModalOpen: false,
  eventFormData: null,
  mobileView: window.innerWidth < 768,
  headerView: 'calendar',
  showDatePicker: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 사이드바 토글
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    // 사이드바 열림/닫힘 직접 설정
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    // 이벤트 모달 열기
    openEventModal: (
      state,
      action: PayloadAction<Partial<CalendarEvent> | null>
    ) => {
      state.eventModalOpen = true;
      state.eventFormData = action.payload;
    },

    // 이벤트 모달 닫기
    closeEventModal: (state) => {
      state.eventModalOpen = false;
      state.eventFormData = null;
    },

    // 이벤트 폼 데이터 업데이트
    updateEventFormData: (
      state,
      action: PayloadAction<Partial<CalendarEvent>>
    ) => {
      state.eventFormData = {
        ...state.eventFormData,
        ...action.payload,
      };
    },

    // 모바일 뷰 설정
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.mobileView = action.payload;

      // 모바일 뷰일 때는 사이드바를 자동으로 닫기
      if (action.payload) {
        state.sidebarOpen = false;
      }
    },

    setHeaderView: (state, action: PayloadAction<'calendar' | 'tasks'>) => {
      state.headerView = action.payload;
    },

    // 데이트 피커 토글
    toggleDatePicker: (state) => {
      state.showDatePicker = !state.showDatePicker;
    },

    // 데이트 피커 표시 상태 설정
    setShowDatePicker: (state, action: PayloadAction<boolean>) => {
      state.showDatePicker = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openEventModal,
  closeEventModal,
  updateEventFormData,
  setMobileView,
  setHeaderView,
  toggleDatePicker,
  setShowDatePicker,
} = uiSlice.actions;

export default uiSlice.reducer;
