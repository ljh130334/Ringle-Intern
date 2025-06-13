import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMobileView } from './store/slices/uiSlice';
import CalendarHeader from './components/layout/CalendarHeader';
import CalendarSidebar from './components/layout/CalendarSidebar/CalendarSidebar';

function App() {
  const dispatch = useAppDispatch();
  const { mobileView, sidebarOpen } = useAppSelector((state) => state.ui);
  const { currentDate, view } = useAppSelector((state) => state.calendar);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      dispatch(setMobileView(window.innerWidth < 768));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader />

      <div className="flex h-[calc(100vh-64px)]">
        {/* 사이드바 */}
        {(!mobileView || sidebarOpen) && (
          <div className={`${mobileView ? 'absolute z-10' : ''} h-full`}>
            <CalendarSidebar />
          </div>
        )}

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 bg-white">
          {/* 임시 메인 컨텐츠 */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              메인 캘린더 영역
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>현재 날짜:</strong> {currentDate}
              </p>
              <p>
                <strong>현재 뷰:</strong> {view}
              </p>
              <p>
                <strong>모바일 뷰:</strong> {mobileView ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>사이드바 열림:</strong> {sidebarOpen ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ 헤더 구현 완료!</p>
              <p className="text-green-700">✅ 사이드바 구현 완료!</p>
              <p className="text-blue-700">🔄 다음 단계: 주별 캘린더 뷰 구현</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
