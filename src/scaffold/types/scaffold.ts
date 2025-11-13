/**
 * ScaffoldProps
 *
 * Defines the top-level configuration options for the Scaffold component.
 *
 * The Scaffold is a comprehensive layout system for React Native that provides:
 * - `statusBar`: Fully customizable native or custom status bar with animations, gradients, and more
 * - `appBar`: Flexible application bar with leading, center, and trailing sections
 * - `body`: Main content area with scroll support, custom indicators, and animations
 *
 * All sections support:
 * - Platform-specific overrides (iOS/Android)
 * - Theme adaptation (dark/light mode)
 * - Custom rendering and animations
 * - Full TypeScript support
 */

import type { StatusBarProps } from './statusBar';
import type { AppBarProps } from './appBar';
import type { BodyProps } from './body';
import type { BottomNavigationBarProps } from './bottomNavigationBar';
import type { FloatingActionButtonProps } from './floatingActionButton';
import type { BottomSheetProps } from './bottomSheet';
import type { TopNavigationBarProps } from './topNavigationBar';

/**
 * Props for the Scaffold component.
 *
 * @example
 * ```tsx
 * import { Scaffold } from '@lokeshmarathi/scaffold';
 *
 * export default function App() {
 *   return (
 *     <Scaffold
 *       statusBar={{
 *         backgroundColor: '#007AFF',
 *         title: 'My App',
 *         style: 'light-content',
 *       }}
 *       appBar={{
 *         height: 56,
 *         backgroundColor: '#007AFF',
 *         leading: { backIcon: <Icon name="menu" /> },
 *         center: <Text>My App</Text>,
 *         trailing: <Icon name="search" />,
 *       }}
 *       body={{
 *         scrollEnabled: true,
 *         paddingHorizontal: 16,
 *         view: <YourContent />,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export type ScaffoldProps = {
  /**
   * Configuration for the status bar.
   *
   * The status bar is the top system bar displaying time, battery, and signal indicators.
   * With StatusBarProps, you can:
   * - Control native status bar styling (colors, icons, visibility)
   * - Build completely custom status bars with animations and gradients
   * - Render custom content inside the status bar area
   * - Support theme adaptation and platform-specific behavior
   * - Create animated effects on scroll
   *
   * Accepts all properties defined in `StatusBarProps`.
   *
   * @example
   * ```tsx
   * statusBar={{
   *   backgroundColor: '#ffffff',
   *   title: 'My App',
   *   titleStyle: { fontSize: 18, fontWeight: 'bold' },
   *   style: 'dark-content',
   *   elevated: true,
   *   renderCustomStatusBar: ({ height }) => (
   *     <LinearGradient colors={['#FF0000', '#0000FF']} style={{ height }} />
   *   ),
   * }}
   * ```
   *
   * @see {@link StatusBarProps} for all available options
   */
  statusBar?: StatusBarProps;

  /**
   * Configuration for the application bar (header).
   *
   * The app bar is the main header section below the status bar.
   * With AppBarProps, you can:
   * - Customize leading section (back button, menu, logo)
   * - Build center content (title, search, custom widgets)
   * - Add trailing section (actions, notifications, menus)
   * - Support full RTL/LTR layouts for internationalization
   * - Create custom backgrounds (gradients, images)
   * - Apply animations and dynamic styling
   * - Override on per-platform basis (iOS/Android)
   *
   * Accepts all properties defined in `AppBarProps`.
   *
   * @example
   * ```tsx
   * appBar={{
   *   height: 56,
   *   backgroundColor: '#007AFF',
   *   paddingHorizontal: 16,
   *   gap: 12,
   *   leading: {
   *     backIcon: <Icon name="back" />,
   *     title: 'Back',
   *     paddingHorizontal: 8,
   *     gap: 8,
   *   },
   *   center: <SearchBar />,
   *   trailing: (
   *     <View style={{ flexDirection: 'row', gap: 12 }}>
   *       <Icon name="search" />
   *       <Icon name="menu" />
   *     </View>
   *   ),
   *   rtl: false,
   *   elevated: true,
   * }}
   * ```
   *
   * @see {@link AppBarProps} for all available options
   */
  appBar?: AppBarProps;

  /**
   * Configuration for the body/content area.
   *
   * The body is the main content area rendered below the app bar.
   * With BodyProps, you can:
   * - Enable scrolling with full customization
   * - Build custom scroll indicators and bars
   * - Apply custom backgrounds (colors, gradients, images)
   * - Control spacing and layout (padding, margin, flex)
   * - Add shadows and elevation
   * - Connect animations to scroll events
   * - Override on per-platform basis (iOS/Android)
   * - Support theme adaptation (dark/light mode)
   *
   * Accepts all properties defined in `BodyProps`.
   *
   * @example
   * ```tsx
   * body={{
   *   scrollEnabled: true,
   *   paddingHorizontal: 16,
   *   paddingVertical: 12,
   *   backgroundColor: '#f5f5f5',
   *   gap: 12,
   *   renderCustomScrollIndicator: ({ scrollPosition, indicatorHeight }) => (
   *     <Animated.View
   *       style={{
   *         position: 'absolute',
   *         right: 4,
   *         width: 6,
   *         height: indicatorHeight,
   *         backgroundColor: '#007AFF',
   *         borderRadius: 3,
   *         transform: [{ translateY: scrollPosition }],
   *       }}
   *     />
   *   ),
   *   view: (
   *     <FlatList
   *       data={items}
   *       renderItem={({ item }) => <ItemCard item={item} />}
   *       keyExtractor={(item) => item.id}
   *     />
   *   ),
   * }}
   * ```
   *
   * @see {@link BodyProps} for all available options
   */
  body?: BodyProps;

  /**
   * Configuration for the bottom navigation bar.
   *
   * @see {@link BottomNavigationBarProps} for all available options
   */
  bottomNavigationBar?: BottomNavigationBarProps;

  /**
   * Configuration for the floating action button.
   *
   * @see {@link FloatingActionButtonProps} for all available options
   */
  floatingActionButton?: FloatingActionButtonProps;

  /**
   * Configuration for the bottom sheet.
   *
   * @see {@link BottomSheetProps} for all available options
   */
  bottomSheet?: BottomSheetProps;

  /**
   * Configuration for the top navigation bar.
   *
   * @see {@link TopNavigationBarProps} for all available options
   */
  topNavigationBar?: TopNavigationBarProps;
};
