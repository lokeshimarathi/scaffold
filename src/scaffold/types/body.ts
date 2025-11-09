import type { ViewStyle } from 'react-native';
import type React from 'react';

/**
 * Body section configuration for Scaffold
 * Provides complete control over the main content area
 */
export type BodyProps = {
  // -----------------------------------------------------------------------
  // LAYOUT & SPACING
  // -----------------------------------------------------------------------

  /**
   * Horizontal padding for the body
   * @default 0
   */
  paddingHorizontal?: number | string;

  /**
   * Vertical padding for the body
   * @default 0
   */
  paddingVertical?: number | string;

  /**
   * Top padding for the body
   * @default 0
   */
  paddingTop?: number | string;

  /**
   * Bottom padding for the body
   * @default 0
   */
  paddingBottom?: number | string;

  /**
   * Left padding for the body
   * @default 0
   */
  paddingLeft?: number | string;

  /**
   * Right padding for the body
   * @default 0
   */
  paddingRight?: number | string;

  /**
   * Margin for the entire body
   * @default 0
   */
  margin?: number | string;

  /**
   * Horizontal margin for the body
   * @default 0
   */
  marginHorizontal?: number | string;

  /**
   * Vertical margin for the body
   * @default 0
   */
  marginVertical?: number | string;

  // -----------------------------------------------------------------------
  // BACKGROUND & APPEARANCE
  // -----------------------------------------------------------------------

  /**
   * Background color of the body
   * @default '#ffffff'
   */
  backgroundColor?: string;

  /**
   * Custom background view/component
   * Useful for gradients, images, or complex backgrounds
   * Rendered behind the content
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
   * Border radius for the body
   * @default 0
   */
  borderRadius?: number;

  /**
   * Border color
   * @default undefined
   */
  borderColor?: string;

  /**
   * Border width
   * @default 0
   */
  borderWidth?: number;

  // -----------------------------------------------------------------------
  // SHADOW & ELEVATION
  // -----------------------------------------------------------------------

  /**
   * Whether to apply elevation/shadow
   * @default false
   */
  elevated?: boolean;

  /**
   * Elevation value (Android)
   * @default 0
   */
  elevation?: number;

  /**
   * Shadow configuration (iOS)
   * @default undefined
   */
  shadow?: {
    offsetHeight?: number;
    offsetWidth?: number;
    opacity?: number;
    radius?: number;
    color?: string;
  };

  // -----------------------------------------------------------------------
  // SCROLL & OVERFLOW
  // -----------------------------------------------------------------------

  /**
   * Whether to enable scrolling for the body
   * If true, wraps content in ScrollView
   * @default false
   */
  scrollEnabled?: boolean;

  /**
   * Scroll view config options
   */
  scrollConfig?: {
    bounces?: boolean;
    scrollEventThrottle?: number;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    horizontal?: boolean;
  };

  /**
   * Custom scroll indicator renderer
   * Allows developers to build their own scroll bar UI
   * Receives scroll position and content dimensions
   *
   * @example
   * ```tsx
   * renderCustomScrollIndicator={(props) => (
   *   <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 8 }}>
   *     <Animated.View
   *       style={{
   *         height: props.indicatorHeight,
   *         backgroundColor: '#007AFF',
   *         borderRadius: 4,
   *         transform: [{ translateY: props.scrollPosition }],
   *       }}
   *     />
   *   </View>
   * )}
   * ```
   */
  renderCustomScrollIndicator?: (props: {
    scrollPosition: any; // Animated.Value | Reanimated.SharedValue | number
    indicatorHeight: number;
    contentHeight: number;
    scrollViewHeight: number;
    scrollPercentage: number;
  }) => React.ReactNode;

  /**
   * Animated scroll value to connect with external animations
   * Useful for parallax effects, collapsible headers, etc.
   * Accepts Animated.Value or Reanimated SharedValue
   *
   * @example
   * ```tsx
   * const scrollAnim = useRef(new Animated.Value(0)).current;
   *
   * body={{
   *   scrollEnabled: true,
   *   animatedScrollValue: scrollAnim,
   *   view: <YourContent />,
   * }}
   * ```
   */
  animatedScrollValue?: any; // Animated.Value | Reanimated.SharedValue

  /**
   * Overflow behavior
   * @default 'hidden'
   */
  overflow?: 'hidden' | 'visible' | 'scroll';

  // -----------------------------------------------------------------------
  // LAYOUT & ALIGNMENT
  // -----------------------------------------------------------------------

  /**
   * Flex direction for body content
   * @default 'column'
   */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /**
   * Justify content alignment
   * @default 'flex-start'
   */
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  /**
   * Align items
   * @default 'stretch'
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

  /**
   * Gap/spacing between child elements
   * @default 0
   */
  gap?: number;

  // -----------------------------------------------------------------------
  // CONTENT
  // -----------------------------------------------------------------------

  /**
   * Main content to render in the body
   * This is your screen content
   *
   * @example
   * ```tsx
   * view={
   *   <FlatList
   *     data={items}
   *     renderItem={({ item }) => <ItemCard item={item} />}
   *     keyExtractor={(item) => item.id}
   *   />
   * }
   * ```
   */
  view?: React.ReactNode;

  /**
   * Custom body renderer for complete control
   * Replaces all default body rendering
   * Useful for complex layouts, animations, or specialized content
   *
   * When provided, this completely replaces the default body container.
   * All layout props (padding, margin, gap, etc.) are ignored.
   *
   * @example
   * ```tsx
   * renderCustomBody={(props) => (
   *   <Animated.View style={{
   *     flex: 1,
   *     backgroundColor: props.backgroundColor,
   *   }}>
   *     <CustomScrollIndicator scrollPosition={props.scrollPosition} />
   *     <MyComplexLayout />
   *   </Animated.View>
   * )}
   * ```
   */
  renderCustomBody?: (props: {
    backgroundColor?: string;
    scrollPosition?: any; // Animated.Value | Reanimated.SharedValue | number
    contentHeight?: number;
    viewportHeight?: number;
  }) => React.ReactNode;

  // -----------------------------------------------------------------------
  // STYLING & CUSTOMIZATION
  // -----------------------------------------------------------------------

  /**
   * Override styles for the entire body container
   * @default {}
   */
  containerStyle?: ViewStyle;

  /**
   * Opacity of the body
   * @default 1
   */
  opacity?: number;

  /**
   * Z-index for stacking
   * @default 0
   */
  zIndex?: number;

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
   * Minimum height for the body
   * @default undefined
   */
  minHeight?: number | string;

  /**
   * Maximum height for the body
   * @default undefined
   */
  maxHeight?: number | string;

  // -----------------------------------------------------------------------
  // CALLBACKS & EVENTS
  // -----------------------------------------------------------------------

  /**
   * Called when body layout changes
   */
  onLayout?: (event: any) => void;

  /**
   * Called on scroll (only if scrollEnabled is true)
   */
  onScroll?: (event: any) => void;

  /**
   * Called when scroll ends
   */
  onScrollEnd?: (event: any) => void;

  // -----------------------------------------------------------------------
  // ANIMATION & DYNAMICS
  // -----------------------------------------------------------------------

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

  // -----------------------------------------------------------------------
  // PLATFORM-SPECIFIC OVERRIDES
  // -----------------------------------------------------------------------

  /**
   * iOS-specific configuration overrides
   */
  ios?: Partial<Omit<BodyProps, 'ios' | 'android'>>;

  /**
   * Android-specific configuration overrides
   */
  android?: Partial<Omit<BodyProps, 'ios' | 'android'>>;
};

/**
 * Internal resolved configuration after merging platform-specific overrides
 * @internal
 */
export type ResolvedBodyProps = Required<
  Omit<
    BodyProps,
    | 'ios'
    | 'android'
    | 'shadow'
    | 'scrollConfig'
    | 'view'
    | 'backgroundView'
    | 'containerStyle'
    | 'onLayout'
    | 'onScroll'
    | 'onScrollEnd'
  >
>;
