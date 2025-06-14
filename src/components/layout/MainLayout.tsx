import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { WeekView, MonthView, DayView } from '../views';

const MainLayout: React.FC = () => {
  const { mobileView, sidebarOpen } = useAppSelector((state) => state.ui);
  const { view } = useAppSelector((state) => state.calendar);

  const renderCurrentView = () => {
    switch (view) {
      case 'month':
        return <MonthView />;
      case 'week':
        return <WeekView />;
      case 'day':
        return <DayView />;
      default:
        return <WeekView />;
    }
  };

  return (
    <div
      className={`
        flex-1 bg-white transition-all duration-300 ease-out
        ${!sidebarOpen && !mobileView ? 'ml-0' : mobileView ? 'ml-0' : 'ml-0'}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">{renderCurrentView()}</div>
      </div>
    </div>
  );
};

export default MainLayout;
