import React from 'react';
import { useAppSelector } from '../../store/hooks';

const MainLayout: React.FC = () => {
  const { mobileView, sidebarOpen } = useAppSelector((state) => state.ui);
  const { currentDate, view } = useAppSelector((state) => state.calendar);

  return (
    <div
      className={`
        flex-1 bg-white transition-all duration-300 ease-out
        ${!sidebarOpen && !mobileView ? 'ml-0' : mobileView ? 'ml-0' : 'ml-0'}
      `}
    >
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
          <p className="text-green-700">✅ 사이드바 토글 기능 구현 완료!</p>
          <p className="text-green-700">✅ 플로팅 만들기 버튼 구현 완료!</p>
          <p className="text-green-700">✅ 컴포넌트 분리 완료!</p>
          <p className="text-blue-700">🔄 다음 단계: 주별 캘린더 뷰 구현</p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">테스트:</p>
          <p className="text-blue-700">
            1. 햄버거 메뉴 버튼을 클릭해서 사이드바를 닫아보세요!
          </p>
          <p className="text-blue-700">
            2. 사이드바가 닫히면 왼쪽에 작은 + 버튼이 나타납니다!
          </p>
          <p className="text-sm text-blue-600 mt-1">
            • 사이드바 열림: 일반 사이드바 표시
            <br />• 사이드바 닫힘: FloatingCreateButton 컴포넌트 표시
            <br />• 깔끔하게 분리된 컴포넌트 구조
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
