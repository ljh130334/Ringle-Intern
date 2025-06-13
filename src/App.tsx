import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMobileView } from './store/slices/uiSlice';
import CalendarHeader from './components/layout/CalendarHeader';

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

      {/* 임시 상태 확인용 */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Redux 상태 확인
            </h2>

            <div className="space-y-2 text-sm">
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

            <div className="mt-6 text-gray-600">
              <p>헤더 구현 완료! 🎉</p>
              <p>다음 단계: 사이드바 및 메인 캘린더 영역</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
