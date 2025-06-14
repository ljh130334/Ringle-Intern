import React from 'react';

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onChange,
  label,
}) => {
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

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#dde3ea] hover:bg-[#CED3DA] text-[#1f1f1f] px-4 py-2 rounded-md text-[14px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
      aria-label={label}
    >
      {timeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TimeSelector;
