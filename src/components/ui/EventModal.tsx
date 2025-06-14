import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeEventModal } from '../../store/slices/uiSlice';
import { addEvent, updateEvent } from '../../store/slices/eventsSlice';
import { generateEventId } from '../../utils/eventUtils';
import type { CalendarEvent } from '../../types';
import 'react-day-picker/dist/style.css';

const EventModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { eventModalOpen, eventFormData } = useAppSelector((state) => state.ui);

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    isAllDay: false,
    hasRepeat: false,
  });

  // UI 상태
  const [activeTab, setActiveTab] = useState('event');
  const [isTimeExpanded, setIsTimeExpanded] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 모달이 열릴 때 초기 데이터 설정
  useEffect(() => {
    if (eventModalOpen && eventFormData) {
      setFormData({
        title: eventFormData.title || '',
        date: eventFormData.date || '',
        startTime: eventFormData.startTime || '09:00',
        endTime: eventFormData.endTime || '10:00',
        isAllDay: eventFormData.isAllDay || false,
        hasRepeat: false,
      });
    }
  }, [eventModalOpen, eventFormData]);

  const handleClose = () => {
    dispatch(closeEventModal());
    setFormData({
      title: '',
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      isAllDay: false,
      hasRepeat: false,
    });
    setIsTimeExpanded(false);
    setShowDatePicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!formData.date) {
      alert('날짜를 선택해주세요.');
      return;
    }

    if (!formData.isAllDay && formData.startTime >= formData.endTime) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    const newEvent: CalendarEvent = {
      id: eventFormData?.id || generateEventId(),
      title: formData.title.trim(),
      description: '',
      date: formData.date,
      startTime: formData.isAllDay ? '00:00' : formData.startTime,
      endTime: formData.isAllDay ? '23:59' : formData.endTime,
      color: '#4285f4',
      isAllDay: formData.isAllDay,
      category: 'personal',
    };

    if (eventFormData?.id) {
      dispatch(updateEvent(newEvent));
    } else {
      dispatch(addEvent(newEvent));
    }

    handleClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 날짜 버튼 클릭 핸들러
  const handleDateButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // DayPicker에서 날짜 선택 핸들러
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      handleInputChange('date', dateString);
      setShowDatePicker(false);
    }
  };

  // 날짜 포맷팅 (6월 17일 (화요일) 형식)
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const weekday = weekdays[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
  };

  // 시간 포맷팅 (오전 4:30 형식)
  const formatTimeDisplay = (timeString: string) => {
    const [hour, minute] = timeString.split(':').map(Number);

    if (hour === 0) {
      return minute === 0
        ? '오전 12:00'
        : `오전 12:${minute.toString().padStart(2, '0')}`;
    } else if (hour < 12) {
      return minute === 0
        ? `오전 ${hour}:00`
        : `오전 ${hour}:${minute.toString().padStart(2, '0')}`;
    } else if (hour === 12) {
      return minute === 0
        ? '오후 12:00'
        : `오후 12:${minute.toString().padStart(2, '0')}`;
    } else {
      return minute === 0
        ? `오후 ${hour - 12}:00`
        : `오후 ${hour - 12}:${minute.toString().padStart(2, '0')}`;
    }
  };

  // 시간 옵션 생성 (30분 단위)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of ['00', '30']) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute}`;
        const displayTime = formatTimeDisplay(timeValue);
        options.push({ value: timeValue, label: displayTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  if (!eventModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8">
      {/* 백드롭 */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* 모달 컨테이너 */}
      <div className="relative bg-[#F0F4F8] h-[600px] rounded-[28px] shadow-md w-full max-w-md mx-4 overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-3 pt-2 pb-0">
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-[#E2E7EB] rounded-full">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[#E2E7EB] rounded-full"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          {/* 제목 입력 */}
          <div className="mb-[17px]">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full text-[22px] bg-[#F0F4F8] placeholder-gray-600 border-0 border-b border-[#c4c7c5] focus:border-[#0b57d0] focus:outline-none pt-4 ml-8"
              placeholder="제목 추가"
              autoFocus
            />
          </div>

          {/* 탭 영역 */}
          <div className="px-7 pb-4">
            <div className="flex space-x-1 rounded-lg p-1">
              <button
                type="button"
                className={`p-2 rounded-lg text-[14px] font-medium transition-colors ${
                  activeTab === 'event'
                    ? 'bg-[#c2e7ff] text-[#001d35]'
                    : 'text-[#444746] hover:bg-[#E2E7EB]'
                }`}
                onClick={() => setActiveTab('event')}
              >
                이벤트
              </button>
              <button
                type="button"
                className={`p-2 rounded-lg text-[14px] font-medium transition-colors ${
                  activeTab === 'task'
                    ? 'bg-[#c2e7ff] text-[#001d35]'
                    : 'text-[#444746] hover:bg-[#E2E7EB]'
                }`}
                onClick={() => setActiveTab('task')}
              >
                할 일
              </button>
              <button
                type="button"
                className={`p-2 rounded-lg text-[14px] font-medium transition-colors ${
                  activeTab === 'appointment'
                    ? 'bg-[#c2e7ff] text-[#001d35]'
                    : 'text-[#444746] hover:bg-[#E2E7EB]'
                }`}
                onClick={() => setActiveTab('appointment')}
              >
                약속 일정
              </button>
            </div>
          </div>

          {/* 시간/날짜 섹션 */}
          <div className="mb-4">
            {!isTimeExpanded ? (
              // 축소된 상태
              <div
                className="flex items-center space-x-3 cursor-pointer hover:bg-[#DDE3E9] -mx-2 px-2 py-2 rounded-lg"
                onClick={() => setIsTimeExpanded(true)}
              >
                <div className="mt-1">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-[400] text-[#1f1f1f]">
                    {formatDateDisplay(formData.date)}
                    {'    '}
                    {formData.isAllDay
                      ? ''
                      : `${formatTimeDisplay(formData.startTime)} - ${formatTimeDisplay(formData.endTime)}`}
                  </div>
                  <div className="text-xs text-gray-500">
                    시간대 • 반복 안함
                  </div>
                </div>
              </div>
            ) : (
              // 확장된 상태
              <div className="space-y-4">
                {/* 날짜와 시간 섹션 */}
                <div className="flex items-center space-x-3">
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-3 relative">
                    {/* 날짜, 시작시간, 종료시간 버튼들 */}
                    <div className="flex space-x-2">
                      {/* 날짜 버튼 */}
                      <button
                        type="button"
                        className={`bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] transition-colors ${
                          showDatePicker ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={handleDateButtonClick}
                      >
                        {formData.date
                          ? formatDateDisplay(formData.date)
                          : '날짜 선택'}
                      </button>

                      {/* 시작 시간 버튼 */}
                      {!formData.isAllDay && (
                        <select
                          value={formData.startTime}
                          onChange={(e) =>
                            handleInputChange('startTime', e.target.value)
                          }
                          className="bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                          {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* 구분자 */}
                      {!formData.isAllDay && (
                        <span className="text-gray-600 self-center">-</span>
                      )}

                      {/* 종료 시간 버튼 */}
                      {!formData.isAllDay && (
                        <select
                          value={formData.endTime}
                          onChange={(e) =>
                            handleInputChange('endTime', e.target.value)
                          }
                          className="bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                          {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {showDatePicker && (
                      <div className="absolute top-10 left-0 z-[100] bg-white rounded-[16px] shadow-2xl border border-gray-200 p-4">
                        <DayPicker
                          mode="single"
                          selected={
                            formData.date ? new Date(formData.date) : undefined
                          }
                          onSelect={handleDateSelect}
                          today={new Date()}
                          locale={ko}
                          formatters={{
                            formatCaption: (date) =>
                              format(date, 'yyyy년 M월', { locale: ko }),
                          }}
                          className="custom-day-picker"
                          showOutsideDays
                          fixedWeeks
                        />
                      </div>
                    )}

                    {/* 종일 및 시간대 옵션 */}
                    <div className="flex items-center space-x-6">
                      {/* 종일 체크박스 */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isAllDay"
                          checked={formData.isAllDay}
                          onChange={(e) =>
                            handleInputChange('isAllDay', e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isAllDay"
                          className="ml-2 text-[14px] text-[#1f1f1f]"
                        >
                          종일
                        </label>
                      </div>
                    </div>

                    {/* 반복 안함 드롭다운 */}
                    <div className="relative">
                      <select
                        value={formData.hasRepeat ? 'weekly' : 'none'}
                        onChange={(e) =>
                          handleInputChange(
                            'hasRepeat',
                            e.target.value !== 'none'
                          )
                        }
                        className="bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-8"
                      >
                        <option value="none">반복 안함</option>
                        <option value="daily">매일</option>
                        <option value="weekly">매주</option>
                        <option value="monthly">매월</option>
                        <option value="yearly">매년</option>
                      </select>
                      <svg
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-[14px] rounded-full hover:bg-blue-700 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>

      {showDatePicker && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default EventModal;
