import React from 'react';
import { useAppSelector } from '../../store/hooks';
import MonthView from '../views/MonthView';
import WeekView from '../views/WeekView';
import DayView from '../views/DayView';

const CalendarContent: React.FC = () => {
  const { view } = useAppSelector((state) => state.calendar);

  const renderView = () => {
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
    <main className="h-full flex flex-col w-full bg-white overflow-hidden rounded-[28px] mr-[56px]">
      {renderView()}
    </main>
  );
};

export default CalendarContent;
