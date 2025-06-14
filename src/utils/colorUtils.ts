// 이벤트에 사용할 색상 팔레트
export const EVENT_COLORS = [
  '#4285f4', // 구글 블루
  '#ea4335', // 구글 레드
  '#34a853', // 구글 그린
  '#fbbc04', // 구글 옐로우
  '#9c27b0', // 퍼플
  '#ff9800', // 오렌지
  '#795548', // 브라운
  '#607d8b', // 블루 그레이
  '#e91e63', // 핑크
  '#009688', // 틸
  '#673ab7', // 딥 퍼플
  '#3f51b5', // 인디고
  '#2196f3', // 블루
  '#00bcd4', // 사이안
  '#4caf50', // 라이트 그린
  '#8bc34a', // 라임
  '#cddc39', // 라임 그린
  '#ffc107', // 앰버
  '#ff5722', // 딥 오렌지
  '#f44336', // 레드
];

/**
 * 랜덤 색상 선택
 */
export const getRandomEventColor = (): string => {
  const randomIndex = Math.floor(Math.random() * EVENT_COLORS.length);
  return EVENT_COLORS[randomIndex];
};

/**
 * 시드를 기반으로 한 색상 선택 (같은 시드면 같은 색상)
 */
export const getSeededEventColor = (seed: string): string => {
  // 문자열 해시 생성
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % EVENT_COLORS.length;
  return EVENT_COLORS[index];
};

/**
 * 제목을 기반으로 한 색상 선택 (같은 제목이면 같은 색상)
 */
export const getColorByTitle = (title: string): string => {
  return getSeededEventColor(title);
};

/**
 * 사용자 정의 색상인지 확인
 */
export const isCustomColor = (color: string): boolean => {
  return !EVENT_COLORS.includes(color);
};

/**
 * 색상 밝기 계산 (0-255 범위)
 */
export const getColorBrightness = (hexColor: string): number => {
  // # 제거
  const color = hexColor.replace('#', '');

  // RGB 값 추출
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // 밝기 계산 (YIQ 공식)
  return (r * 299 + g * 587 + b * 114) / 1000;
};

/**
 * 색상에 따른 텍스트 색상 결정 (흰색 또는 검은색)
 */
export const getContrastTextColor = (backgroundColor: string): string => {
  const brightness = getColorBrightness(backgroundColor);
  return brightness > 128 ? '#000000' : '#ffffff';
};
