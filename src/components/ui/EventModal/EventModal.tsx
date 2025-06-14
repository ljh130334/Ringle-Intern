import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { closeEventModal } from '../../../store/slices/uiSlice';
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../../store/slices/eventsSlice';
import { generateEventId } from '../../../utils/eventUtils';
import type { CalendarEvent } from '../../../types';
import EventFormHeader from './EventFormHeader';
import EventFormTabs from './EventFormTabs';
import EventTimeSection from './EventTimeSection';

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

  const handleDelete = () => {
    if (eventFormData?.id && window.confirm('이벤트를 삭제하시겠습니까?')) {
      dispatch(deleteEvent(eventFormData.id));
      handleClose();
    }
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

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      handleInputChange('date', dateString);
      setShowDatePicker(false);
    }
  };

  const handleToggleTimeExpanded = () => {
    setIsTimeExpanded(!isTimeExpanded);
  };

  if (!eventModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8">
      {/* 백드롭 */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* 모달 컨테이너 */}
      <div className="relative bg-[#F0F4F8] h-[600px] rounded-[28px] shadow-md w-full max-w-md mx-4">
        {/* 헤더 */}
        <EventFormHeader onClose={handleClose} />

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          {/* 제목 입력 */}
          <div className="mb-[17px]">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-[90%] text-[22px] bg-[#F0F4F8] placeholder-gray-600 border-0 border-b border-[#c4c7c5] focus:border-[#0b57d0] focus:outline-none pt-4 ml-8"
              placeholder="제목 추가"
              autoFocus
            />
          </div>

          {/* 탭 영역 */}
          <EventFormTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 시간/날짜 섹션 */}
          <EventTimeSection
            formData={formData}
            isTimeExpanded={isTimeExpanded}
            showDatePicker={showDatePicker}
            onToggleExpanded={handleToggleTimeExpanded}
            onToggleDatePicker={handleDateButtonClick}
            onInputChange={handleInputChange}
            onDateSelect={handleDateSelect}
          />

          {/* 버튼 영역 */}
          <div className="flex justify-between items-center pt-4">
            {/* 삭제 버튼 */}
            {eventFormData?.id && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 text-[14px] rounded-full hover:bg-red-50 transition-colors"
              >
                삭제
              </button>
            )}

            {!eventFormData?.id && <div></div>}

            {/* 저장 버튼 */}
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
