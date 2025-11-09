/**
 * ScaffoldProps
 * 
 * Defines the top-level configuration options for the Scaffold component.
 * 
 * Supports:
 * - `statusBar`: Customizing the native or custom status bar
 * - `appBar`: Customizing the application bar (header) with leading, center, trailing sections
 * - `body`: Main content area
 */

import type { StatusBarProps } from './statusBar';
import type { AppBarProps } from './appBar';

/**
 * Props for the Scaffold component.
 */
export type ScaffoldProps = {
  /**
   * Configuration for the status bar.
   * Accepts all properties defined in `StatusBarProps`, allowing
   * developers to fully customize the appearance, animation,
   * and platform-specific behavior of the status bar.
   * 
   * @example
   * ```tsx
   * <Scaffold
   *   statusBar={{
   *     backgroundColor: '#ffffff',
   *     title: 'My App',
   *     style: 'dark-content',
   *   }}
   * />
   * ```
   */
  statusBar?: StatusBarProps;

  /**
   * Configuration for the application bar (header).
   * Accepts all properties defined in `AppBarProps`, allowing
   * developers to customize the AppBar with:
   * - Leading section (left side) - menu, back button, logo
   * - Center section - title, subtitle, custom content
   * - Trailing section (right side) - actions, notifications, icons
   * - Full RTL/LTR support
   * - Animations, theming, and platform-specific overrides
   * 
   * @example
   * ```tsx
   * <Scaffold
   *   appBar={{
   *     height: 56,
   *     backgroundColor: '#007AFF',
   *     leading: {
   *       content: <Icon name="menu" />,
   *     },
   *     center: {
   *       title: 'My App',
   *       titleStyle: { color: 'white' },
   *     },
   *     trailing: {
   *       content: <Icon name="search" />,
   *     },
   *     rtl: false,
   *     ltr: true,
   *   }}
   * />
   * ```
   */
  appBar?: AppBarProps;


};