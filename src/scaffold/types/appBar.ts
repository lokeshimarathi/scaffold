import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Leading section configuration (left side of AppBar)
 * Fully customizable with backIcon, title, subtitle and layout options
 */
export type AppBarLeadingProps = {
  /**
   * Custom back/menu icon to display
   * @default undefined
   */
  backIcon?: React.ReactNode;

  /**
   * Main title text/component for leading section
   * @default undefined
   */
  title?: string | React.ReactNode;

  /**
   * Style for the title (if title is a string)
   * @default {}
   */
  titleStyle?: TextStyle;

  /**
   * Subtitle text/component for leading section
   * @default undefined
   */
  subTitle?: string | React.ReactNode;

  /**
   * Style for the subtitle (if subtitle is a string)
   * @default {}
   */
  subTitleStyle?: TextStyle;

  /**
   * Horizontal padding for leading section
   * @default 0
   */
  paddingHorizontal?: number;

  /**
   * Vertical padding for leading section
   * @default 0
   */
  paddingVertical?: number;

  /**
   * Gap/spacing between backIcon, title, and subtitle
   * @default 0
   */
  gap?: number;

  /**
   * Style overrides for the leading container
   * @default {}
   */
  style?: ViewStyle;

  /**
   * Callback when leading section is pressed
   */
  onPress?: () => void;
};

/**
 * Main AppBar configuration
 * Fully customizable and flexible for any design
 */
export type AppBarProps = {
  // -----------------------------------------------------------------------
  // BASIC LAYOUT CONFIGURATION
  // -----------------------------------------------------------------------

  /**
   * Hide or show the AppBar
   * @default false
   */
  hidden?: boolean;

  /**
   * Height of the AppBar
   * @default 56
   */
  height?: number;

  /**
   * Width of the AppBar
   * @default '100%'
   */
  width?: number | string;

  /**
   * Horizontal padding for the entire AppBar
   * @default 0
   */
  paddingHorizontal?: number;

  /**
   * Vertical padding for the entire AppBar
   * @default 0
   */
  paddingVertical?: number;

  /**
   * Gap/spacing between leading, center, and trailing sections
   * @default 0
   */
  gap?: number;

  // -----------------------------------------------------------------------
  // BACKGROUND & APPEARANCE
  // -----------------------------------------------------------------------

  /**
   * Background color of the AppBar
   * @default '#ffffff'
   */
  backgroundColor?: string;

  /**
   * Custom background React node
   * Replaces the default background color
   * Useful for gradients, images, or complex backgrounds
   *
   * @example
   * ```tsx
   * backgroundView={
   *   <LinearGradient colors={['#FF0000', '#0000FF']} style={{ flex: 1 }} />
   * }
   * ```
   */
  backgroundView?: React.ReactNode;

  /**
   * Whether to apply elevation/shadow below AppBar
   * @default false
   */
  elevated?: boolean;

  /**
   * Elevation/shadow value (Android)
   * @default 4
   */
  elevation?: number;

  /**
   * Shadow configuration (iOS)
   * @default { offsetHeight: 2, opacity: 0.1, radius: 3 }
   */
  shadow?: {
    offsetHeight?: number;
    opacity?: number;
    radius?: number;
  };

  /**
   * Optional zIndex for stacking
   * @default 1000
   */
  zIndex?: number;

  /**
   * Whether to apply SafeArea padding (top)
   * @default false
   */
  applySafeArea?: boolean;

  /**
   * Custom safe area inset override
   * @default undefined
   */
  safeAreaInset?: number;

  // -----------------------------------------------------------------------
  // LEADING SECTION (Left Side)
  // -----------------------------------------------------------------------

  /**
   * Leading section configuration
   * Fully customizable with backIcon, title, subtitle, spacing, and styling
   */
  leading?: AppBarLeadingProps;

  // -----------------------------------------------------------------------
  // CENTER SECTION (Custom Content)
  // -----------------------------------------------------------------------

  /**
   * Custom content to render in the center of AppBar
   * Fully flexible - can be any React component
   *
   * @example
   * ```tsx
   * center={
   *   <View style={{ flex: 1, justifyContent: 'center' }}>
   *     <Text>My Title</Text>
   *     <SearchBar />
   *   </View>
   * }
   * ```
   */
  center?: React.ReactNode;

  // -----------------------------------------------------------------------
  // TRAILING SECTION (Right Side)
  // -----------------------------------------------------------------------

  /**
   * Custom content to render on the right side of AppBar
   * Can be single item or array of items
   * Fully flexible for any design
   *
   * @example
   * ```tsx
   * trailing={
   *   <View style={{ flexDirection: 'row', gap: 8 }}>
   *     <Icon name="search" />
   *     <Icon name="menu" />
   *   </View>
   * }
   * ```
   */
  trailing?: React.ReactNode | React.ReactNode[];

  // -----------------------------------------------------------------------
  // STYLING & LAYOUT OVERRIDES
  // -----------------------------------------------------------------------

  /**
   * Override styles for the entire AppBar container
   * @default {}
   */
  containerStyle?: ViewStyle;

  /**
   * Vertical alignment of sections
   * @default 'center'
   */
  verticalAlignment?: 'flex-start' | 'center' | 'flex-end';

  /**
   * Horizontal justification for sections
   * @default 'space-between'
   */
  horizontalJustification?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

  // -----------------------------------------------------------------------
  // THEME & APPEARANCE
  // -----------------------------------------------------------------------

  /**
   * Whether to auto-detect system theme
   * @default false
   */
  autoDetectTheme?: boolean;

  /**
   * Whether to adapt to system dark/light mode
   * @default false
   */
  adaptiveTheme?: boolean;

  /**
   * Apply blur effect (iOS only)
   * @default undefined
   */
  blurEffect?: 'light' | 'dark' | 'extraLight' | 'regular' | 'prominent';

  // -----------------------------------------------------------------------
  // ANIMATION & DYNAMICS
  // -----------------------------------------------------------------------

  /**
   * Animated value for dynamic changes
   * @default undefined
   */
  animatedValue?: any; // Animated.Value | Reanimated.SharedValue

  /**
   * Whether to animate visibility changes
   * @default false
   */
  animatedVisibility?: boolean;

  /**
   * Duration for visibility animations (ms)
   * @default 300
   */
  animationDuration?: number;

  /**
   * Whether to collapse/expand on scroll
   * When true, AppBar collapses as you scroll down
   * @default false
   */
  collapsible?: boolean;

  /**
   * Custom renderer for complete control
   * Replaces all default rendering
   *
   * @example
   * ```tsx
   * renderCustomAppBar={(props) => (
   *   <View style={{ ...props }}>
   *     Custom AppBar Content
   *   </View>
   * )}
   * ```
   */
  renderCustomAppBar?: (props: {
    height: number;
    backgroundColor?: string;
    leading?: React.ReactNode;
    center?: React.ReactNode;
    trailing?: React.ReactNode;
  }) => React.ReactNode;

  // -----------------------------------------------------------------------
  // RTL/LTR SUPPORT
  // -----------------------------------------------------------------------

  /**
   * Enable Right-to-Left layout (RTL)
   * When true, leading becomes right side, trailing becomes left side
   * Automatically reverses flex direction
   * @default false
   */
  rtl?: boolean;

  /**
   * Enable Left-to-Right layout (LTR)
   * Standard left-to-right layout
   * @default true
   */
  ltr?: boolean;

  // -----------------------------------------------------------------------
  // CALLBACKS & EVENTS
  // -----------------------------------------------------------------------

  /**
   * Called when AppBar layout changes
   */
  onLayoutChange?: (height: number) => void;

  /**
   * Called when AppBar visibility changes
   */
  onVisibilityChange?: (hidden: boolean) => void;

  /**
   * Called when theme changes
   */
  onThemeChange?: (theme: 'light' | 'dark') => void;

  // -----------------------------------------------------------------------
  // PLATFORM-SPECIFIC OVERRIDES
  // -----------------------------------------------------------------------

  /**
   * iOS-specific configuration overrides
   */
  ios?: Partial<Omit<AppBarProps, 'ios' | 'android'>>;

  /**
   * Android-specific configuration overrides
   */
  android?: Partial<Omit<AppBarProps, 'ios' | 'android'>>;
};

/**
 * Internal resolved configuration after merging platform-specific overrides
 * @internal
 */
export type ResolvedAppBarProps = Required<
  Omit<AppBarProps, 'ios' | 'android' | 'shadow' | 'leading' | 'center' | 'trailing' | 'backgroundView'>
>;