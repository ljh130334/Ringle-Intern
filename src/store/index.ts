import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';
import eventsReducer from './slices/eventsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'events/addEvent',
          'events/updateEvent',
          'ui/updateEventFormData',
        ],
        ignoredActionsPaths: ['payload.date', 'payload.timestamp'],
        ignoredPaths: ['events.events.date', 'ui.eventFormData'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
