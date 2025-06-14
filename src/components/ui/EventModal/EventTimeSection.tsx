import React from 'react';
import DatePickerComponent from './DatePickerComponent';
import TimeSelector from './TimeSelector';

interface EventTimeSectionProps {
  formData: {
    date: string;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
    hasRepeat: boolean;
  };
  isTimeExpanded: boolean;
  showDatePicker: boolean;
  onToggleExpanded: () => void;
  onToggleDatePicker: () => void;
  onInputChange: (field: string, value: string | boolean) => void;
  onDateSelect: (date: Date | undefined) => void;
}

const EventTimeSection: React.FC<EventTimeSectionProps> = ({
  formData,
  isTimeExpanded,
  showDatePicker,
  onToggleExpanded,
  onToggleDatePicker,
  onInputChange,
  onDateSelect,
}) => {
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

  return (
    <div className="mb-4">
      {!isTimeExpanded ? (
        // 축소된 상태
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-[#DDE3E9] -mx-2 px-2 py-2 rounded-lg"
          onClick={onToggleExpanded}
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
            <div className="text-xs text-gray-500">시간대 • 반복 안함</div>
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
                {/* 날짜 선택기 */}
                <DatePickerComponent
                  selectedDate={formData.date}
                  onDateSelect={onDateSelect}
                  showDatePicker={showDatePicker}
                  onToggleDatePicker={onToggleDatePicker}
                />

                {/* 시작 시간 버튼 */}
                {!formData.isAllDay && (
                  <TimeSelector
                    value={formData.startTime}
                    onChange={(value) => onInputChange('startTime', value)}
                    label="시작 시간"
                  />
                )}

                {/* 구분자 */}
                {!formData.isAllDay && (
                  <span className="text-gray-600 self-center">-</span>
                )}

                {/* 종료 시간 버튼 */}
                {!formData.isAllDay && (
                  <TimeSelector
                    value={formData.endTime}
                    onChange={(value) => onInputChange('endTime', value)}
                    label="종료 시간"
                  />
                )}
              </div>

              {/* 종일 및 시간대 옵션 */}
              <div className="flex items-center space-x-6">
                {/* 종일 체크박스 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAllDay"
                    checked={formData.isAllDay}
                    onChange={(e) =>
                      onInputChange('isAllDay', e.target.checked)
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
                    onInputChange('hasRepeat', e.target.value !== 'none')
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
  );
};

export default EventTimeSection;
