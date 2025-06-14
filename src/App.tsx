import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMobileView } from './store/slices/uiSlice';
import { setEvents } from './store/slices/eventsSlice';
import CalendarHeader from './components/layout/CalendarHeader';
import SidebarLayout from './components/layout/SidebarLayout';
import CalendarContent from './components/layout/CalendarContent';
import FloatingCreateButton from './components/ui/FloatingCreateButton';
import { initializeSampleEvents } from './utils/sampleEvents';

function App() {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { events } = useAppSelector((state) => state.events);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      dispatch(setMobileView(window.innerWidth < 768));
    };

    // 초기 설정
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  // 샘플 이벤트 데이터 초기화
  useEffect(() => {
    // 이벤트가 없을 때만 샘플 데이터 추가
    if (events.length === 0) {
      const sampleEvents = initializeSampleEvents(new Date(currentDate));
      dispatch(setEvents(sampleEvents));
    }
  }, [dispatch, currentDate, events.length]);

  const handleCreateEvent = () => {
    console.log('플로팅 만들기 버튼 클릭됨');
    // TODO: 이벤트 생성 모달 열기
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader />

      <div className="flex h-[calc(100vh-64px)]">
        <SidebarLayout />
        <FloatingCreateButton onClick={handleCreateEvent} />
        <CalendarContent />
      </div>
    </div>
  );
}

export default App;
