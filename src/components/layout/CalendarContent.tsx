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
        return <MonthView />;
    }
  };

  return <main className="calendar-content">{renderView()}</main>;
};

export default CalendarContent;
