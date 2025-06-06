export const colors = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  danger: '#F44336',
  warning: '#FFC107',
  success: '#4CAF50',
  background: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E0E0E0',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  disabled: '#BDBDBD',
  primaryLight: '#E3F2FD',
  secondaryLight: '#E8F5E9',
  dangerLight: '#FFEBEE',
  warningLight: '#FFF8E1',
  successLight: '#E8F5E9',
  lightGray: '#F5F5F5',
  transparent: 'transparent',
} as const;

export type ColorType = keyof typeof colors; 