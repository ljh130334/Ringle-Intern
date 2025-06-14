import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { setMobileView } from './store/slices/uiSlice';
import CalendarHeader from './components/layout/CalendarHeader';
import SidebarLayout from './components/layout/SidebarLayout';
import MainLayout from './components/layout/MainLayout';
import FloatingCreateButton from './components/ui/FloatingCreateButton';

function App() {
  const dispatch = useAppDispatch();

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

  const handleCreateEvent = () => {
    console.log('플로팅 만들기 버튼 클릭됨');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader />

      <div className="flex h-[calc(100vh-64px)]">
        <SidebarLayout />
        <FloatingCreateButton onClick={handleCreateEvent} />
        <MainLayout />
      </div>
    </div>
  );
}

export default App;
