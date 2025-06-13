import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setMobileView } from './store/slices/uiSlice';

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

  // Redux 상태 연결 테스트
  useEffect(() => {
    console.log('Redux 상태 테스트:', {
      currentDate,
      view,
      mobileView,
      sidebarOpen,
    });
  }, [currentDate, view, mobileView, sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              구글 캘린더 클론
            </h1>

            {/* Redux 상태 확인용 임시 UI */}
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
              <p>Redux Store 연결 완료!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
