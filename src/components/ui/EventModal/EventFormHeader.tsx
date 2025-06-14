import React from 'react';

interface EventFormHeaderProps {
  onClose: () => void;
}

const EventFormHeader: React.FC<EventFormHeaderProps> = ({ onClose }) => {
  return (
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
      <button onClick={onClose} className="p-1 hover:bg-[#E2E7EB] rounded-full">
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
  );
};

export default EventFormHeader;
