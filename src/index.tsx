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