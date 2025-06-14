import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface DatePickerComponentProps {
  selectedDate: string;
  onDateSelect: (date: Date | undefined) => void;
  showDatePicker: boolean;
  onToggleDatePicker: () => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onDateSelect,
  showDatePicker,
  onToggleDatePicker,
}) => {
  // 날짜 포맷팅 (6월 17일 (화요일) 형식)
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const monthDisplay = date.getMonth() + 1;
    const dayDisplay = date.getDate();
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

    return `${monthDisplay}월 ${dayDisplay}일 (${weekday})`;
  };

  const getSelectedDateObject = () => {
    if (!selectedDate) return undefined;
    const [year, month, day] = selectedDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <div className="relative">
      {/* 날짜 버튼 */}
      <button
        type="button"
        className={`bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] transition-colors ${
          showDatePicker ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={onToggleDatePicker}
      >
        {selectedDate ? formatDateDisplay(selectedDate) : '날짜 선택'}
      </button>

      {/* 날짜 선택기 */}
      {showDatePicker && (
        <div className="absolute top-10 left-0 z-[100] bg-white rounded-[16px] shadow-2xl border border-gray-200 p-4">
          <DayPicker
            mode="single"
            selected={getSelectedDateObject()}
            onSelect={onDateSelect}
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
    </div>
  );
};

export default DatePickerComponent;
