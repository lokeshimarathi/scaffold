import type { ReactNode } from 'react';
import type { ViewStyle, ColorValue } from 'react-native';

export type BottomNavigationBarProps = {
  hidden?: boolean;
  height?: number;
  width?: string | number;
  backgroundColor?: string;
  children?: ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingBottom?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingRight?: number;
  gap?: number;
  verticalAlignment?: 'flex-start' | 'center' | 'flex-end';
  horizontalJustification?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  elevated?: boolean;
  containerStyle?: ViewStyle;
  zIndex?: number;
  adaptiveTheme?: boolean;
  autoDetectTheme?: boolean;
  backgroundView?: ReactNode;
  rtl?: boolean;
  renderCustom?: (props: {
    height: number;
    backgroundColor?: string;
  }) => ReactNode;
  onLayoutChange?: (height: number) => void;

  // Border properties
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderColor?: ColorValue;
  borderTopColor?: ColorValue;
  borderBottomColor?: ColorValue;
  borderLeftColor?: ColorValue;
  borderRightColor?: ColorValue;
  borderStyle?: 'solid' | 'dotted' | 'dashed';

  // Shadow & Elevation (iOS)
  shadowColor?: ColorValue;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Elevation (Android)
  elevation?: number;

  // Position & Layout
  position?: 'absolute' | 'relative';
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;

  // Safe Area
  useSafeArea?: boolean;
  safeAreaInsets?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };

  // Visual Effects
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';

  // Blur Effect (iOS)
  blurEffect?: boolean;
  blurType?: 'light' | 'dark' | 'extraLight' | 'regular' | 'prominent';
  blurAmount?: number;

  // Transform
  transform?: ViewStyle['transform'];

  // Flex properties
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  // Margin
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;

  // Advanced styling
  backdropFilter?: string;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';

  ios?: Partial<BottomNavigationBarProps>;
  android?: Partial<BottomNavigationBarProps>;
};
