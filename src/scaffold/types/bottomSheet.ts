import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type BottomSheetProps = {
  // Custom Renderer
  customBottomSheet?: () => ReactNode;

  // Visibility
  visible?: boolean;
  onClose?: () => void;

  // Content
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;

  // Dimensions
  height?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;

  // Colors
  backgroundColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;

  // Padding & Margin
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;

  // Border
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderColor?: string;
  borderTopColor?: string;

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

  // Animation
  animationType?: 'none' | 'slide' | 'fade';
  animationDuration?: number;

  // Interaction
  closeOnOverlayPress?: boolean;
  closeOnSwipeDown?: boolean;
  enablePanDownToClose?: boolean;
  keyboardAvoidingViewEnabled?: boolean;

  // Container Style
  containerStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  contentStyle?: ViewStyle;

  // Safe Area
  useSafeArea?: boolean;
  safeAreaInsets?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };

  // Modal Props
  transparent?: boolean;
  statusBarTranslucent?: boolean;
  hardwareAccelerated?: boolean;
  onShow?: () => void;
  onDismiss?: () => void;
  onRequestClose?: () => void;

  // Theme
  adaptiveTheme?: boolean;
  autoDetectTheme?: boolean;

  // Platform Overrides
  ios?: Partial<Omit<BottomSheetProps, 'ios' | 'android'>>;
  android?: Partial<Omit<BottomSheetProps, 'ios' | 'android'>>;
};
