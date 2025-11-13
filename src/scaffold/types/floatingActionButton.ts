import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';

export type FloatingActionButtonProps = {
  // Custom Renderer
  customFloatingActionButton?: () => ReactNode;

  // Visibility
  hidden?: boolean;

  // Content
  icon?: ReactNode;
  label?: string | ReactNode;
  labelStyle?: TextStyle;

  // Dimensions
  size?: number;
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  // Position
  position?: 'absolute' | 'relative';
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;

  // Colors
  backgroundColor?: string;
  iconColor?: string;

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
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number;

  // Visual
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  zIndex?: number;

  // Transform
  transform?: ViewStyle['transform'];
  rotation?: number;
  scale?: number;

  // Interaction
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  activeOpacity?: number;
  delayPressIn?: number;
  delayPressOut?: number;
  delayLongPress?: number;

  // Accessibility
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'none';

  // Background
  backgroundView?: ReactNode;

  // Container Style
  containerStyle?: ViewStyle;

  // Safe Area
  useSafeArea?: boolean;
  safeAreaInsets?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };

  // Theme
  adaptiveTheme?: boolean;
  autoDetectTheme?: boolean;

  // Platform Overrides
  ios?: Partial<Omit<FloatingActionButtonProps, 'ios' | 'android'>>;
  android?: Partial<Omit<FloatingActionButtonProps, 'ios' | 'android'>>;
};
