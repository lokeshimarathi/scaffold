import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

export type TopNavigationBarProps = {
  // Custom Renderer
  customTopNavigationBar?: () => ReactNode;

  // Visibility
  hidden?: boolean;

  // Content
  tabs?: Array<{
    id: string | number;
    label: string | ReactNode;
    icon?: ReactNode;
    onPress?: () => void;
  }>;
  activeTabId?: string | number;
  onTabChange?: (tabId: string | number) => void;

  // Dimensions
  height?: number;
  width?: number | string;

  // Colors
  backgroundColor?: string;
  activeTabColor?: string;
  inactiveTabColor?: string;
  indicatorColor?: string;

  // Padding & Margin
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;

  // Border
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
  borderColor?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';

  // Shadow (iOS)
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Elevation (Android)
  elevation?: number;

  // Layout
  flexDirection?: 'row' | 'row-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number;

  // Indicator
  showIndicator?: boolean;
  indicatorHeight?: number;
  indicatorWidth?: number | string;
  indicatorPosition?: 'top' | 'bottom';
  indicatorStyle?: ViewStyle;

  // Tab Styling
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabLabelStyle?: TextStyle;
  activeTabLabelStyle?: TextStyle;

  // Visual
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  zIndex?: number;

  // Position
  position?: 'absolute' | 'relative';
  top?: number;
  left?: number;
  right?: number;

  // Scrollable
  scrollable?: boolean;
  showsHorizontalScrollIndicator?: boolean;

  // Container Style
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;

  // Safe Area
  useSafeArea?: boolean;
  safeAreaInsets?: {
    top?: number;
    left?: number;
    right?: number;
  };

  // Theme
  adaptiveTheme?: boolean;
  autoDetectTheme?: boolean;

  // Platform Overrides
  ios?: Partial<Omit<TopNavigationBarProps, 'ios' | 'android'>>;
  android?: Partial<Omit<TopNavigationBarProps, 'ios' | 'android'>>;
};
