import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  useColorScheme,
  I18nManager,
  ScrollView,
  Animated,
} from 'react-native';
import type { ScaffoldProps } from './types/scaffold';

/**
 * Scaffold Component
 *
 * The root layout wrapper for app screens.
 * Provides a unified API for configuring the StatusBar, AppBar, and Body.
 */
const Scaffold: React.FC<ScaffoldProps> = ({ statusBar, appBar, body }) => {
  const colorScheme = useColorScheme();
  const [statusBarHeight, setStatusBarHeight] = useState(
    RNStatusBar.currentHeight || 0
  );
  const [appBarHeight, setAppBarHeight] = useState(appBar?.height || 56);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  // Get platform-specific config for StatusBar
  const getPlatformStatusBarConfig = useCallback(() => {
    let config = { ...statusBar };

    if (Platform.OS === 'ios' && statusBar?.ios) {
      config = { ...config, ...statusBar.ios };
    } else if (Platform.OS === 'android' && statusBar?.android) {
      config = { ...config, ...statusBar.android };
    }

    return config;
  }, [statusBar]);

  // Get platform-specific config for AppBar
  const getPlatformAppBarConfig = useCallback(() => {
    let config = { ...appBar };

    if (Platform.OS === 'ios' && appBar?.ios) {
      config = { ...config, ...appBar.ios };
    } else if (Platform.OS === 'android' && appBar?.android) {
      config = { ...config, ...appBar.android };
    }

    return config;
  }, [appBar]);

  // Get platform-specific config for Body
  const getPlatformBodyConfig = useCallback(() => {
    let config = { ...body };

    if (Platform.OS === 'ios' && body?.ios) {
      config = { ...config, ...body.ios };
    } else if (Platform.OS === 'android' && body?.android) {
      config = { ...config, ...body.android };
    }

    return config;
  }, [body]);

  const platformStatusBarConfig = getPlatformStatusBarConfig();
  const platformAppBarConfig = getPlatformAppBarConfig();
  const platformBodyConfig = getPlatformBodyConfig();

  // Handle theme adaptation for StatusBar
  const getAdaptiveStatusBarStyle = useCallback(() => {
    if (platformStatusBarConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformStatusBarConfig.backgroundColor || '#1a1a1a'
            : platformStatusBarConfig.backgroundColor || '#ffffff',
        style: (colorScheme === 'dark' ? 'light-content' : 'dark-content') as
          | 'light-content'
          | 'dark-content',
      };
    }

    if (platformStatusBarConfig.autoDetectTheme && colorScheme) {
      return {
        style: (colorScheme === 'dark' ? 'light-content' : 'dark-content') as
          | 'light-content'
          | 'dark-content',
      };
    }

    return {};
  }, [platformStatusBarConfig, colorScheme]);

  // Handle theme adaptation for AppBar
  const getAdaptiveAppBarStyle = useCallback(() => {
    if (platformAppBarConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformAppBarConfig.backgroundColor || '#1a1a1a'
            : platformAppBarConfig.backgroundColor || '#ffffff',
      };
    }

    if (platformAppBarConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformAppBarConfig.backgroundColor || '#1a1a1a'
            : platformAppBarConfig.backgroundColor || '#ffffff',
      };
    }

    return {};
  }, [platformAppBarConfig, colorScheme]);

  // Handle theme adaptation for Body
  const getAdaptiveBodyStyle = useCallback(() => {
    if (platformBodyConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBodyConfig.backgroundColor || '#1a1a1a'
            : platformBodyConfig.backgroundColor || '#ffffff',
      };
    }

    if (platformBodyConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBodyConfig.backgroundColor || '#1a1a1a'
            : platformBodyConfig.backgroundColor || '#ffffff',
      };
    }

    return {};
  }, [platformBodyConfig, colorScheme]);

  const adaptiveStatusBarStyle = getAdaptiveStatusBarStyle();
  const adaptiveAppBarStyle = getAdaptiveAppBarStyle();
  const adaptiveBodyStyle = getAdaptiveBodyStyle();

  // Resolve final colors
  const finalStatusBarBgColor =
    adaptiveStatusBarStyle.backgroundColor ||
    platformStatusBarConfig.backgroundColor;
  const finalStatusBarStyle =
    adaptiveStatusBarStyle.style || platformStatusBarConfig.style;
  const finalAppBarBgColor =
    adaptiveAppBarStyle.backgroundColor ||
    platformAppBarConfig.backgroundColor ||
    '#ffffff';
  const finalBodyBgColor =
    adaptiveBodyStyle.backgroundColor ||
    platformBodyConfig.backgroundColor ||
    '#ffffff';

  // Calculate heights
  const statusBarHeightValue =
    typeof platformStatusBarConfig.height === 'number'
      ? platformStatusBarConfig.height
      : statusBarHeight;

  // Handle layout changes
  const handleStatusBarLayout = useCallback(
    (height: number) => {
      setStatusBarHeight(height);
      platformStatusBarConfig.onLayoutChange?.(height);
    },
    [platformStatusBarConfig]
  );

  const handleAppBarLayout = useCallback(
    (height: number) => {
      setAppBarHeight(height);
      platformAppBarConfig.onLayoutChange?.(height);
    },
    [platformAppBarConfig]
  );

  const handleBodyLayout = useCallback(
    (event: any) => {
      const height = event.nativeEvent.layout.height;
      setBodyHeight(height);
      platformBodyConfig.onLayout?.(event);
    },
    [platformBodyConfig]
  );

  const handleScrollEvent = useCallback(
    (event: any) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      const indicatorHeight =
        bodyHeight > 0 && contentHeight > 0
          ? (bodyHeight / contentHeight) * bodyHeight
          : 0;
      const maxScroll = Math.max(contentHeight - bodyHeight, 0);
      const scrollPercentage = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      const indicatorPosition =
        maxScroll > 0
          ? (scrollY / maxScroll) * (bodyHeight - indicatorHeight)
          : 0;

      // Update the scroll position state
      setScrollPosition(indicatorPosition);
      scrollAnim.setValue(indicatorPosition);

      platformBodyConfig.onScroll?.({
        ...event,
        scrollPercentage,
        indicatorHeight,
        indicatorPosition,
      });
    },
    [platformBodyConfig, bodyHeight, contentHeight, scrollAnim]
  );

  const handleScrollEndEvent = useCallback(
    (event: any) => {
      platformBodyConfig.onScrollEnd?.(event);
    },
    [platformBodyConfig]
  );

  // Render StatusBar title
  const renderStatusBarTitle = () => {
    if (!platformStatusBarConfig.title) return null;

    const isString = typeof platformStatusBarConfig.title === 'string';

    return isString ? (
      <Text
        style={[styles.titleText, platformStatusBarConfig.titleStyle]}
        numberOfLines={1}
      >
        {platformStatusBarConfig.title}
      </Text>
    ) : (
      platformStatusBarConfig.title
    );
  };

  // Render StatusBar content
  const renderStatusBarContent = () => {
    if (platformStatusBarConfig.content) {
      return platformStatusBarConfig.content;
    }

    if (platformStatusBarConfig.title) {
      return renderStatusBarTitle();
    }

    return null;
  };

  // Render StatusBar background
  const renderStatusBarBackground = () => {
    if (platformStatusBarConfig.renderCustomStatusBar) {
      return (
        <View
          style={[
            styles.customStatusBarContainer,
            { height: statusBarHeightValue },
            platformStatusBarConfig.containerStyle,
            { zIndex: platformStatusBarConfig.zIndex || 100 },
          ]}
          onLayout={(event) => {
            handleStatusBarLayout(event.nativeEvent.layout.height);
          }}
        >
          {platformStatusBarConfig.renderCustomStatusBar({
            height: statusBarHeightValue,
            backgroundColor: finalStatusBarBgColor,
          })}
        </View>
      );
    }

    const contentAlign = platformStatusBarConfig.contentAlignment || 'center';
    const alignMap = {
      'flex-start': 'flex-start' as const,
      'center': 'center' as const,
      'flex-end': 'flex-end' as const,
      'space-between': 'space-between' as const,
    };

    return (
      <View
        style={[
          styles.defaultStatusBarContainer,
          {
            height: statusBarHeightValue,
            backgroundColor: finalStatusBarBgColor,
            justifyContent: alignMap[contentAlign] || 'center',
          },
          platformStatusBarConfig.elevated && styles.elevated,
          platformStatusBarConfig.containerStyle,
          { zIndex: platformStatusBarConfig.zIndex || 100 },
        ]}
        onLayout={(event) => {
          handleStatusBarLayout(event.nativeEvent.layout.height);
        }}
      >
        {renderStatusBarContent()}
      </View>
    );
  };

  // Render AppBar leading section
  const renderAppBarLeading = () => {
    if (!platformAppBarConfig.leading) return null;

    const leading = platformAppBarConfig.leading;

    return (
      <View
        style={[
          styles.appBarLeadingContainer,
          {
            paddingHorizontal: leading.paddingHorizontal || 0,
            paddingVertical: leading.paddingVertical || 0,
            gap: leading.gap || 0,
          },
          leading.style,
        ]}
      >
        {leading.backIcon && (
          <View style={styles.appBarLeadingIcon}>{leading.backIcon}</View>
        )}

        {(leading.title || leading.subTitle) && (
          <View style={styles.appBarLeadingTextContainer}>
            {leading.title && (
              <View>
                {typeof leading.title === 'string' ? (
                  <Text
                    style={[styles.appBarLeadingTitle, leading.titleStyle]}
                    numberOfLines={1}
                  >
                    {leading.title}
                  </Text>
                ) : (
                  leading.title
                )}
              </View>
            )}

            {leading.subTitle && (
              <View style={styles.appBarSubtitleContainer}>
                {typeof leading.subTitle === 'string' ? (
                  <Text
                    style={[
                      styles.appBarLeadingSubtitle,
                      leading.subTitleStyle,
                    ]}
                    numberOfLines={1}
                  >
                    {leading.subTitle}
                  </Text>
                ) : (
                  leading.subTitle
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  // Render AppBar center section
  const renderAppBarCenter = () => {
    if (!platformAppBarConfig.center) return null;
    return platformAppBarConfig.center;
  };

  // Render AppBar trailing section
  const renderAppBarTrailing = () => {
    if (!platformAppBarConfig.trailing) return null;
    return platformAppBarConfig.trailing;
  };

  // Render AppBar
  const renderAppBar = () => {
    if (platformAppBarConfig.hidden) return null;

    if (platformAppBarConfig.renderCustomAppBar) {
      return (
        <View
          style={[
            styles.customAppBarContainer,
            {
              height: appBarHeight,
              zIndex: platformAppBarConfig.zIndex || 1000,
            },
            platformAppBarConfig.containerStyle,
          ]}
          onLayout={(event) => {
            handleAppBarLayout(event.nativeEvent.layout.height);
          }}
        >
          {platformAppBarConfig.renderCustomAppBar({
            height: appBarHeight,
            backgroundColor: finalAppBarBgColor,
            leading: renderAppBarLeading(),
            center: renderAppBarCenter(),
            trailing: renderAppBarTrailing(),
          })}
        </View>
      );
    }

    // Determine RTL/LTR
    const isRTL = platformAppBarConfig.rtl ?? I18nManager.isRTL;
    const flexDirection = isRTL ? 'row-reverse' : 'row';

    const justifyMap = {
      'flex-start': 'flex-start' as const,
      'center': 'center' as const,
      'flex-end': 'flex-end' as const,
      'space-between': 'space-between' as const,
      'space-around': 'space-around' as const,
      'space-evenly': 'space-evenly' as const,
    };

    return (
      <View
        style={[
          styles.defaultAppBarContainer,
          {
            height: platformAppBarConfig.height || 56,
            width: platformAppBarConfig.width || '100%',
            backgroundColor: platformAppBarConfig.backgroundColor || '#ffffff',
            flexDirection: flexDirection,
            paddingHorizontal: platformAppBarConfig.paddingHorizontal || 0,
            paddingVertical: platformAppBarConfig.paddingVertical || 0,
            gap: platformAppBarConfig.gap || 0,
            alignItems: platformAppBarConfig.verticalAlignment || 'center',
            justifyContent:
              justifyMap[
                platformAppBarConfig.horizontalJustification || 'space-between'
              ] || 'space-between',
          },
          platformAppBarConfig.elevated && styles.appBarElevated,
          platformAppBarConfig.containerStyle,
          { zIndex: platformAppBarConfig.zIndex || 1000 },
        ]}
        onLayout={(event) => {
          handleAppBarLayout(event.nativeEvent.layout.height);
        }}
      >
        {/* Background View (optional) */}
        {platformAppBarConfig.backgroundView && (
          <View style={StyleSheet.absoluteFillObject}>
            {platformAppBarConfig.backgroundView}
          </View>
        )}

        {/* AppBar Content */}
        <View
          style={[
            styles.appBarContentContainer,
            {
              flexDirection: flexDirection,
              gap: platformAppBarConfig.gap || 0,
              alignItems: platformAppBarConfig.verticalAlignment || 'center',
              justifyContent:
                justifyMap[
                  platformAppBarConfig.horizontalJustification ||
                    'space-between'
                ] || 'space-between',
            },
          ]}
        >
          {renderAppBarLeading()}
          {renderAppBarCenter()}
          {renderAppBarTrailing()}
        </View>
      </View>
    );
  };

  // Render Body content
  const renderBodyContent = () => {
    if (!platformBodyConfig) {
      return <View style={styles.bodyContainer} />;
    }

    // Custom body renderer
    if (platformBodyConfig.renderCustomBody) {
      return (
        <View style={styles.bodyContainer} onLayout={handleBodyLayout}>
          {platformBodyConfig.renderCustomBody({
            backgroundColor: finalBodyBgColor,
            scrollPosition: scrollAnim,
            contentHeight,
            viewportHeight: bodyHeight,
          })}
        </View>
      );
    }

    // Scrollable body
    if (platformBodyConfig.scrollEnabled) {
      return (
        <View
          style={[
            styles.bodyContainer,
            {
              backgroundColor: finalBodyBgColor,
              paddingHorizontal: platformBodyConfig.paddingHorizontal,
              paddingVertical: platformBodyConfig.paddingVertical,
              paddingTop: platformBodyConfig.paddingTop,
              paddingBottom: platformBodyConfig.paddingBottom,
              paddingLeft: platformBodyConfig.paddingLeft,
              paddingRight: platformBodyConfig.paddingRight,
              margin: platformBodyConfig.margin,
              marginHorizontal: platformBodyConfig.marginHorizontal,
              marginVertical: platformBodyConfig.marginVertical,
              borderRadius: platformBodyConfig.borderRadius,
              borderColor: platformBodyConfig.borderColor,
              borderWidth: platformBodyConfig.borderWidth,
              overflow: platformBodyConfig.overflow as any,
              opacity: platformBodyConfig.opacity,
              zIndex: platformBodyConfig.zIndex,
            },
            platformBodyConfig.elevated && styles.bodyElevated,
            platformBodyConfig.containerStyle,
          ]}
          onLayout={handleBodyLayout}
        >
          {platformBodyConfig.backgroundView && (
            <View style={StyleSheet.absoluteFillObject}>
              {platformBodyConfig.backgroundView}
            </View>
          )}

          <ScrollView
            scrollEnabled={platformBodyConfig.scrollEnabled}
            bounces={platformBodyConfig.scrollConfig?.bounces}
            scrollEventThrottle={
              platformBodyConfig.scrollConfig?.scrollEventThrottle || 16
            }
            showsVerticalScrollIndicator={
              platformBodyConfig.scrollConfig?.showsVerticalScrollIndicator !==
              false
            }
            showsHorizontalScrollIndicator={
              platformBodyConfig.scrollConfig?.showsHorizontalScrollIndicator
            }
            horizontal={platformBodyConfig.scrollConfig?.horizontal}
            onScroll={
              platformBodyConfig.animatedScrollValue
                ? Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            y: platformBodyConfig.animatedScrollValue,
                          },
                        },
                      },
                    ],
                    {
                      useNativeDriver: false,
                      listener: handleScrollEvent,
                    }
                  )
                : handleScrollEvent
            }
            onScrollEndDrag={handleScrollEndEvent}
            onContentSizeChange={(_w, h) => setContentHeight(h)}
            style={[
              styles.scrollViewContainer,
              {
                flexDirection: platformBodyConfig.flexDirection,
                gap: platformBodyConfig.gap,
              },
            ]}
            contentContainerStyle={{
              justifyContent: platformBodyConfig.justifyContent,
              alignItems: platformBodyConfig.alignItems,
            }}
          >
            {platformBodyConfig.view}
          </ScrollView>

          {/* Custom scroll indicator */}
          {platformBodyConfig.renderCustomScrollIndicator &&
            bodyHeight > 0 &&
            contentHeight > 0 && (
              <View style={styles.customScrollIndicatorContainer}>
                {platformBodyConfig.renderCustomScrollIndicator({
                  scrollPosition: scrollPosition,
                  indicatorHeight: Math.max(
                    (bodyHeight / contentHeight) * bodyHeight,
                    20
                  ),
                  contentHeight,
                  scrollViewHeight: bodyHeight,
                  scrollPercentage: 0,
                })}
              </View>
            )}
        </View>
      );
    }

    // Non-scrollable body
    return (
      <View
        style={[
          styles.bodyContainer,
          {
            backgroundColor: finalBodyBgColor,
            paddingHorizontal: platformBodyConfig.paddingHorizontal,
            paddingVertical: platformBodyConfig.paddingVertical,
            paddingTop: platformBodyConfig.paddingTop,
            paddingBottom: platformBodyConfig.paddingBottom,
            paddingLeft: platformBodyConfig.paddingLeft,
            paddingRight: platformBodyConfig.paddingRight,
            margin: platformBodyConfig.margin,
            marginHorizontal: platformBodyConfig.marginHorizontal,
            marginVertical: platformBodyConfig.marginVertical,
            borderRadius: platformBodyConfig.borderRadius,
            borderColor: platformBodyConfig.borderColor,
            borderWidth: platformBodyConfig.borderWidth,
            overflow: platformBodyConfig.overflow as any,
            opacity: platformBodyConfig.opacity,
            zIndex: platformBodyConfig.zIndex,
            flexDirection: platformBodyConfig.flexDirection,
            justifyContent: platformBodyConfig.justifyContent,
            alignItems: platformBodyConfig.alignItems,
            gap: platformBodyConfig.gap,
          },
          platformBodyConfig.elevated && styles.bodyElevated,
          platformBodyConfig.containerStyle,
        ]}
        onLayout={handleBodyLayout}
      >
        {platformBodyConfig.backgroundView && (
          <View style={StyleSheet.absoluteFillObject}>
            {platformBodyConfig.backgroundView}
          </View>
        )}

        {platformBodyConfig.view}
      </View>
    );
  };

  // StatusBar hidden
  if (platformStatusBarConfig.hidden) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <RNStatusBar hidden={true} />
        {renderAppBar()}
        {renderBodyContent()}
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.flexContainer]}>
      {/* Native Status Bar Configuration */}
      <RNStatusBar
        hidden={false}
        translucent={platformStatusBarConfig.translucent || false}
        backgroundColor={
          platformStatusBarConfig.translucent
            ? 'transparent'
            : finalStatusBarBgColor
        }
        barStyle={finalStatusBarStyle}
        animated={platformStatusBarConfig.animatedVisibility || false}
      />

      {/* Custom Status Bar Background & Content */}
      {renderStatusBarBackground()}

      {/* App Bar */}
      {renderAppBar()}

      {/* Body Content */}
      {renderBodyContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  defaultStatusBarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  customStatusBarContainer: {
    width: '100%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  // AppBar Styles
  defaultAppBarContainer: {
    width: '100%',
  },
  customAppBarContainer: {
    width: '100%',
  },
  appBarLeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarLeadingIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarLeadingTextContainer: {
    justifyContent: 'center',
  },
  appBarLeadingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  appBarLeadingSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    marginTop: 2,
  },
  appBarElevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  // Body Styles
  bodyContainer: {
    flex: 1,
    width: '100%',
  },
  customScrollIndicatorContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    pointerEvents: 'none',
  },
  bodyElevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  flexContainer: {
    flex: 1,
  },
  appBarSubtitleContainer: {
    marginTop: 0,
  },
  appBarContentContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default Scaffold;
