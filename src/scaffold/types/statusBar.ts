import type {
  StatusBarStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';
import type { Animated } from 'react-native';

/**
 * Comprehensive StatusBar configuration for the Scaffold framework.
 * 
 * Supports both native status bar styling AND fully custom status bar implementations.
 * Developers can use native-only props, custom-only props, or a combination of both.
 *
 * @example
 * ```tsx
 * // Native status bar only
 * <Scaffold statusBar={{ style: 'dark-content', backgroundColor: '#fff' }} />
 * 
 * // Custom status bar with gradient
 * <Scaffold
 *   statusBar={{
 *     renderCustomStatusBar: ({ height }) => (
 *       <LinearGradient colors={['#ff0000', '#0000ff']} style={{ height }} />
 *     ),
 *   }}
 * />
 * 
 * // Custom with content
 * <Scaffold
 *   statusBar={{
 *     content: <MyCustomStatusBarContent />,
 *     height: 56,
 *   }}
 * />
 * ```
 */
export type StatusBarProps = {
  // -----------------------------------------------------------------------
  // NATIVE STATUS BAR CONTROL
  // -----------------------------------------------------------------------

  /**
   * Hide or show the native status bar.
   * @default false
   */
  hidden?: boolean;

  /**
   * The background color behind the status bar.
   * Primarily affects Android; iOS uses SafeArea background instead.
   * @default 'transparent'
   */
  backgroundColor?: string;

  /**
   * The color theme for icons and text in the status bar.
   * @default 'default'
   */
  style?: StatusBarStyle; // 'default' | 'light-content' | 'dark-content'

  /**
   * Allows content to render under the status bar.
   * Useful for translucent/transparent effects.
   * @default false
   */
  translucent?: boolean;

  /**
   * Whether to automatically add SafeArea padding below the status bar.
   * @default true
   */
  applySafeArea?: boolean;

  /**
   * Optional height override — use for custom spacing or animations.
   * Can be a number (pixels) or string ('auto', '10%', etc.).
   * @default 'auto' (uses system height)
   */
  height?: number | string;

  // -----------------------------------------------------------------------
  // THEME & APPEARANCE
  // -----------------------------------------------------------------------

  /**
   * Whether the status bar should auto-adjust based on system theme (iOS 13+, Android 10+).
   * If true, automatically switches between light/dark when system theme changes.
   * @default false
   */
  autoDetectTheme?: boolean;

  /**
   * Whether to respond to system theme changes dynamically.
   * If enabled, `style` and `backgroundColor` adapt to system dark/light mode.
   * @default false
   */
  adaptiveTheme?: boolean;

  /**
   * Apply a blur effect behind the status bar (iOS only).
   * @default undefined
   */
  blurEffect?: 'light' | 'dark' | 'extraLight' | 'regular' | 'prominent';

  /**
   * Adds shadow or elevation below the status bar.
   * On Android, this adds elevation. On iOS, this adds a shadow.
   * @default false
   */
  elevated?: boolean;

  /**
   * Optional zIndex for stacking over other scaffold layers.
   * @default 100
   */
  zIndex?: number;

  // -----------------------------------------------------------------------
  // ANIMATION & DYNAMICS
  // -----------------------------------------------------------------------

  /**
   * Dynamically change status bar style/color based on scroll position or custom value.
   * Accepts React Native Animated.Value or Reanimated SharedValue.
   * Use with `animatedColorInterpolation` to define color mappings.
   * @default undefined
   */
  animatedValue?: Animated.Value | any; // any to support Reanimated

  /**
   * Interpolation config for animating colors with `animatedValue`.
   * Maps input ranges to color outputs for smooth transitions.
   *
   * @example
   * ```tsx
   * animatedColorInterpolation={{
   *   inputRange: [0, 100, 200],
   *   outputRange: ['#ffffff', '#f0f0f0', '#000000'],
   * }}
   * ```
   */
  animatedColorInterpolation?: {
    inputRange: number[];
    outputRange: string[];
  };

  /**
   * Control visibility or animation when hiding/showing.
   * If true, uses fade/slide transitions instead of instant changes.
   * @default false
   */
  animatedVisibility?: boolean;

  /**
   * Duration (in ms) for visibility animations.
   * @default 300
   */
  animationDuration?: number;

  // -----------------------------------------------------------------------
  // CUSTOM STATUS BAR RENDERING
  // -----------------------------------------------------------------------

  /**
   * Custom React node to render inside the status bar area.
   * Allows developers to place text, icons, buttons, or any UI elements
   * within the safe-area region of the status bar.
   * 
   * When provided, content is rendered inside the default background container.
   * For complete control over background, use `renderCustomStatusBar` instead.
   *
   * @example
   * ```tsx
   * content={
   *   <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
   *     <Text>Status</Text>
   *     <Icon name="bell" />
   *   </View>
   * }
   * ```
   */
  content?: React.ReactNode;

  /**
   * Optional text to display in the status bar.
   * Convenience prop for simple text-only displays.
   * If both `title` and `content` are provided, `content` takes precedence.
   *
   * @example
   * ```tsx
   * title="My App Status"
   * ```
   */
  title?: string | React.ReactNode;

  /**
   * Style for the `title` text.
   * @default {}
   */
  titleStyle?: TextStyle;

  /**
   * Control the layout direction and alignment of content inside the status bar.
   * Uses flexbox alignment values.
   *
   * @default 'space-between'
   */
  contentAlignment?: 'flex-start' | 'center' | 'flex-end' | 'space-between';

  /**
   * Custom renderer for complete control over the status bar background and layout.
   * If provided, this completely replaces the default background view.
   * Useful for gradients, images, complex effects, or fully custom designs.
   *
   * When `renderCustomStatusBar` is used, props like `backgroundColor`, `blurEffect`,
   * and `elevated` are ignored (since you control the entire background).
   *
   * @param props - The height and backgroundColor available to the custom renderer
   * @returns React component to render as the status bar background
   *
   * @example
   * ```tsx
   * renderCustomStatusBar={({ height }) => (
   *   <LinearGradient
   *     colors={['#ff0000', '#0000ff']}
   *     style={{ height, width: '100%' }}
   *   />
   * )}
   * ```
   *
   * @example
   * ```tsx
   * // With custom content overlay
   * renderCustomStatusBar={({ height }) => (
   *   <View style={{ height, justifyContent: 'center', paddingHorizontal: 16 }}>
   *     <Image source={require('./pattern.png')} style={{ ...StyleSheet.absoluteFillObject }} />
   *     <Text style={{ color: 'white', fontWeight: 'bold' }}>Custom Header</Text>
   *   </View>
   * )}
   * ```
   */
  renderCustomStatusBar?: (props: {
    height: number | string;
    backgroundColor?: string;
  }) => React.ReactNode;

  // -----------------------------------------------------------------------
  // STYLING & LAYOUT
  // -----------------------------------------------------------------------

  /**
   * Override styles for the wrapper view behind the status bar.
   * Applied to the container that holds the background and content.
   * @default {}
   */
  containerStyle?: ViewStyle;

  /**
   * Safe-area inset override — in case you want custom spacing instead of system insets.
   * Useful for non-standard layouts or specialized use cases.
   * @default undefined (uses system safe area)
   */
  safeAreaInset?: number;

  // -----------------------------------------------------------------------
  // CALLBACKS & EVENTS
  // -----------------------------------------------------------------------

  /**
   * Called when the status bar layout changes (e.g., height change on orientation).
   * Provides the new height value for responsive adjustments.
   *
   * @param height - The new height of the status bar area
   */
  onLayoutChange?: (height: number) => void;

  /**
   * Called when the status bar visibility changes (hide/show).
   *
   * @param hidden - Whether the status bar is now hidden
   */
  onVisibilityChange?: (hidden: boolean) => void;

  /**
   * Called when the theme changes (if autoDetectTheme or adaptiveTheme is enabled).
   *
   * @param theme - The new theme ('light' or 'dark')
   */
  onThemeChange?: (theme: 'light' | 'dark') => void;

  // -----------------------------------------------------------------------
  // PLATFORM-SPECIFIC OVERRIDES
  // -----------------------------------------------------------------------

  /**
   * iOS-specific configuration overrides.
   * Any prop set here will override the base config on iOS only.
   *
   * @example
   * ```tsx
   * ios={{ blurEffect: 'light', style: 'light-content', height: 44 }}
   * ```
   */
  ios?: Partial<Omit<StatusBarProps, 'ios' | 'android'>>;

  /**
   * Android-specific configuration overrides.
   * Any prop set here will override the base config on Android only.
   *
   * @example
   * ```tsx
   * android={{ backgroundColor: '#1a1a1a', elevated: true, height: 48 }}
   * ```
   */
  android?: Partial<Omit<StatusBarProps, 'ios' | 'android'>>;
};

/**
 * Internal resolved configuration after merging platform-specific overrides.
 * Used internally by the Scaffold component.
 * @internal
 */
export type ResolvedStatusBarProps = Required<
  Omit<StatusBarProps, 'ios' | 'android'>
>;