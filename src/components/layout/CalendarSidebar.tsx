import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openEventModal } from '../../store/slices/uiSlice';
import DatePicker from 'react-datepicker';
import { setSelectedDate } from '../../store/slices/calendarSlice';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.calendar);
  const { mobileView } = useAppSelector((state) => state.ui);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      dispatch(setSelectedDate(date.toISOString().split('T')[0]));
    }
  };

  const handleCreateEvent = () => {
    dispatch(
      openEventModal({
        date: selectedDate,
        startTime: '09:00',
        endTime: '10:00',
        isAllDay: false,
      })
    );
  };

  return (
    <aside
      className={`calendar-sidebar ${mobileView ? 'fixed inset-0 z-40 bg-white' : ''}`}
    >
      <div className="space-y-6">
        <button
          onClick={handleCreateEvent}
          className="w-full flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          일정 만들기
        </button>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">날짜 선택</h3>
          <div className="border border-gray-200 rounded-lg p-2">
            <DatePicker
              selected={new Date(selectedDate)}
              onChange={handleDateChange}
              inline
              locale="ko"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">내 캘린더</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">개인</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">업무</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">가족</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CalendarSidebar;
