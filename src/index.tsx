/**
 * @packageDocumentation
 * Entry point for the Scaffold package.
 *
 * This module exports:
 *  - The `Scaffold` component — a flexible layout wrapper designed for screen scaffolding.
 *  - The `StatusBarProps` type — a powerful, platform-aware configuration type for building
 *    fully customizable status bars within the Scaffold system.
 *  - The `AppBarProps` type — a comprehensive configuration type for building fully customizable
 *    app bars with leading, center, and trailing sections.
 */

export { default as Scaffold } from './scaffold/Scaffold';

/**
 * Type definition for configuring the StatusBar within the Scaffold.
 *
 * Allows developers to customize the native status bar or build completely custom status bars
 * with animations, gradients, images, and more.
 *
 * @example
 * ```tsx
 * import { type StatusBarProps } from '@lokeshmarathi/scaffold';
 *
 * const statusBarConfig: StatusBarProps = {
 *   backgroundColor: 'transparent',
 *   style: 'light-content',
 *   translucent: true,
 *   title: 'My App',
 * };
 * ```
 */
export type { StatusBarProps } from './scaffold/types/statusBar';

/**
 * Type definition for configuring the AppBar within the Scaffold.
 *
 * Provides a highly flexible and unrestricted way to build app bars with:
 * - Leading section (left side) with backIcon, title, and subtitle
 * - Center section (custom content)
 * - Trailing section (right side) with custom content
 * - Full RTL/LTR support for internationalization
 * - Custom backgrounds, animations, theming, and platform-specific overrides
 *
 * @example
 * ```tsx
 * import { type AppBarProps } from '@lokeshmarathi/scaffold';
 *
 * const appBarConfig: AppBarProps = {
 *   height: 56,
 *   backgroundColor: '#007AFF',
 *   leading: {
 *     backIcon: <Icon name="back" />,
 *     title: 'Back',
 *   },
 *   center: <Text>My Title</Text>,
 *   trailing: <Icon name="menu" />,
 *   rtl: false,
 * };
 * ```
 */
export type { AppBarProps } from './scaffold/types/appBar';

/**
 * Type definition for configuring the Body (main content area) within the Scaffold.
 *
 * Provides complete control over the body/content area with:
 * - Scrollable or non-scrollable layouts
 * - Custom scroll indicators and animations
 * - Custom backgrounds (colors, gradients, images)
 * - Full layout control (padding, margin, flex, gap)
 * - Shadows, elevation, and borders
 * - Theme adaptation (dark/light mode)
 * - Custom body renderers for complete control
 * - Platform-specific overrides (iOS/Android)
 *
 * @example
 * ```tsx
 * import { type BodyProps } from '@lokeshmarathi/scaffold';
 *
 * const bodyConfig: BodyProps = {
 *   paddingHorizontal: 16,
 *   paddingVertical: 12,
 *   backgroundColor: '#f5f5f5',
 *   view: <YourContent />,
 * };
 * ```
 */
export type { BodyProps } from './scaffold/types/body';

/**
 * Type definition for configuring the BottomNavigationBar within the Scaffold.
 *
 * Provides complete control over the bottom navigation bar with:
 * - Visibility control and height customization
 * - Custom backgrounds and elevation
 * - Flexible layout (padding, gap, alignment)
 * - Theme adaptation (dark/light mode)
 * - Custom renderers for complete control
 * - Platform-specific overrides (iOS/Android)
 *
 * @example
 * ```tsx
 * import { type BottomNavigationBarProps } from '@lokeshmarathi/scaffold';
 *
 * const bottomNavConfig: BottomNavigationBarProps = {
 *   height: 60,
 *   backgroundColor: '#ffffff',
 *   elevated: true,
 *   children: <NavigationButtons />,
 * };
 * ```
 */
export type { BottomNavigationBarProps } from './scaffold/types/bottomNavigationBar';

/**
 * Type definition for configuring the FloatingActionButton within the Scaffold.
 *
 * @example
 * ```tsx
 * import { type FloatingActionButtonProps } from '@lokeshmarathi/scaffold';
 *
 * const fabConfig: FloatingActionButtonProps = {
 *   icon: <Icon name="add" />,
 *   backgroundColor: '#007AFF',
 *   onPress: () => console.log('FAB pressed'),
 * };
 * ```
 */
export type { FloatingActionButtonProps } from './scaffold/types/floatingActionButton';

/**
 * Type definition for configuring the BottomSheet within the Scaffold.
 *
 * @example
 * ```tsx
 * import { type BottomSheetProps } from '@lokeshmarathi/scaffold';
 *
 * const bottomSheetConfig: BottomSheetProps = {
 *   visible: true,
 *   onClose: () => setVisible(false),
 *   children: <YourContent />,
 * };
 * ```
 */
export type { BottomSheetProps } from './scaffold/types/bottomSheet';

/**
 * Type definition for configuring the TopNavigationBar within the Scaffold.
 *
 * @example
 * ```tsx
 * import { type TopNavigationBarProps } from '@lokeshmarathi/scaffold';
 *
 * const topNavConfig: TopNavigationBarProps = {
 *   tabs: [{ id: 1, label: 'Home' }, { id: 2, label: 'Profile' }],
 *   activeTabId: 1,
 * };
 * ```
 */
export type { TopNavigationBarProps } from './scaffold/types/topNavigationBar';
