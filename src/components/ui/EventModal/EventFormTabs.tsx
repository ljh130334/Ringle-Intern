import React from 'react';

interface EventFormTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const EventFormTabs: React.FC<EventFormTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'event', label: '이벤트' },
    { id: 'task', label: '할 일' },
    { id: 'appointment', label: '약속 일정' },
  ];

  return (
    <div className="px-7 pb-4">
      <div className="flex space-x-1 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`p-2 rounded-lg text-[14px] font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#c2e7ff] text-[#001d35]'
                : 'text-[#444746] hover:bg-[#E2E7EB]'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFormTabs;
