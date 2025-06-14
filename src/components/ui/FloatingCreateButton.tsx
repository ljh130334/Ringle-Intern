import React from 'react';
import { useAppSelector } from '../../store/hooks';

interface FloatingCreateButtonProps {
  onClick?: () => void;
  className?: string;
}

const FloatingCreateButton: React.FC<FloatingCreateButtonProps> = ({
  onClick,
  className = '',
}) => {
  const { mobileView, sidebarOpen } = useAppSelector((state) => state.ui);

  if (mobileView || sidebarOpen) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`fixed left-4 top-[76px] z-40 ${className}`}>
      <button
        onClick={handleClick}
        className="w-14 h-14 bg-white rounded-[16px] shadow-lg hover:shadow-xl 
                   border border-gray-200 flex items-center justify-center
                   transition-all duration-300 ease-out hover:bg-[#EDF1FC]
                   group"
        aria-label="새 이벤트 만들기"
        title="새 이벤트 만들기"
      >
        <img src="/icons/plus.svg" alt="추가" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingCreateButton;
