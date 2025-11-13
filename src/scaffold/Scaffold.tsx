import React, {
  useState,
  useCallback,
  Fragment,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  useColorScheme,
  I18nManager,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import type { ScaffoldProps } from './types/scaffold';

/**
 * Scaffold Component
 *
 * The root layout wrapper for app screens.
 * Provides a unified API for configuring the StatusBar, AppBar, BottomNavigationBar, and Body.
 */
const Scaffold: React.FC<ScaffoldProps> = ({
  statusBar,
  appBar,
  body,
  bottomNavigationBar,
  floatingActionButton,
  bottomSheet,
  topNavigationBar,
}) => {
  const colorScheme = useColorScheme();
  const [statusBarHeight, setStatusBarHeight] = useState(
    RNStatusBar.currentHeight || 0
  );
  const [appBarHeight, setAppBarHeight] = useState(appBar?.height || 56);
  const [bottomNavHeight, setBottomNavHeight] = useState(
    bottomNavigationBar?.height || 56
  );

  // Get platform-specific config for StatusBar
  const getPlatformStatusBarConfig = useCallback(() => {
    const baseConfig = { ...statusBar };

    if (Platform.OS === 'ios' && statusBar?.ios) {
      return { ...baseConfig, ...statusBar.ios };
    } else if (Platform.OS === 'android' && statusBar?.android) {
      return { ...baseConfig, ...statusBar.android };
    }

    return baseConfig;
  }, [statusBar]);

  // Get platform-specific config for AppBar
  const getPlatformAppBarConfig = useCallback(() => {
    const baseConfig = { ...appBar };

    if (Platform.OS === 'ios' && appBar?.ios) {
      return { ...baseConfig, ...appBar.ios };
    } else if (Platform.OS === 'android' && appBar?.android) {
      return { ...baseConfig, ...appBar.android };
    }

    return baseConfig;
  }, [appBar]);

  // Get platform-specific config for Body
  const getPlatformBodyConfig = useCallback(() => {
    const baseConfig = { ...body };

    if (Platform.OS === 'ios' && body?.ios) {
      return { ...baseConfig, ...body.ios };
    } else if (Platform.OS === 'android' && body?.android) {
      return { ...baseConfig, ...body.android };
    }

    return baseConfig;
  }, [body]);

  // Get platform-specific config for BottomNavigationBar
  const getPlatformBottomNavConfig = useCallback(() => {
    if (!bottomNavigationBar) return {};

    const baseConfig = { ...bottomNavigationBar };

    if (Platform.OS === 'ios' && bottomNavigationBar?.ios) {
      return { ...baseConfig, ...bottomNavigationBar.ios };
    } else if (Platform.OS === 'android' && bottomNavigationBar?.android) {
      return { ...baseConfig, ...bottomNavigationBar.android };
    }

    return baseConfig;
  }, [bottomNavigationBar]);

  // Get platform-specific config for FloatingActionButton
  const getPlatformFABConfig = useCallback(() => {
    if (!floatingActionButton) return {};

    const baseConfig = { ...floatingActionButton };

    if (Platform.OS === 'ios' && floatingActionButton?.ios) {
      return { ...baseConfig, ...floatingActionButton.ios };
    } else if (Platform.OS === 'android' && floatingActionButton?.android) {
      return { ...baseConfig, ...floatingActionButton.android };
    }

    return baseConfig;
  }, [floatingActionButton]);

  // Get platform-specific config for BottomSheet
  const getPlatformBottomSheetConfig = useCallback(() => {
    if (!bottomSheet) return {};

    const baseConfig = { ...bottomSheet };

    if (Platform.OS === 'ios' && bottomSheet?.ios) {
      return { ...baseConfig, ...bottomSheet.ios };
    } else if (Platform.OS === 'android' && bottomSheet?.android) {
      return { ...baseConfig, ...bottomSheet.android };
    }

    return baseConfig;
  }, [bottomSheet]);

  // Get platform-specific config for TopNavigationBar
  const getPlatformTopNavConfig = useCallback(() => {
    if (!topNavigationBar) return {};

    const baseConfig = { ...topNavigationBar };

    if (Platform.OS === 'ios' && topNavigationBar?.ios) {
      return { ...baseConfig, ...topNavigationBar.ios };
    } else if (Platform.OS === 'android' && topNavigationBar?.android) {
      return { ...baseConfig, ...topNavigationBar.android };
    }

    return baseConfig;
  }, [topNavigationBar]);

  const platformStatusBarConfig = useMemo(
    () => getPlatformStatusBarConfig() || {},
    [getPlatformStatusBarConfig]
  );
  const platformAppBarConfig = useMemo(
    () => getPlatformAppBarConfig() || {},
    [getPlatformAppBarConfig]
  );
  const platformBodyConfig = useMemo(
    () => getPlatformBodyConfig() || {},
    [getPlatformBodyConfig]
  );
  const platformBottomNavConfig = useMemo(
    () => getPlatformBottomNavConfig() || {},
    [getPlatformBottomNavConfig]
  );
  const platformFABConfig = useMemo(
    () => getPlatformFABConfig() || {},
    [getPlatformFABConfig]
  );
  const platformBottomSheetConfig = useMemo(
    () => getPlatformBottomSheetConfig() || {},
    [getPlatformBottomSheetConfig]
  );
  const platformTopNavConfig = useMemo(
    () => getPlatformTopNavConfig() || {},
    [getPlatformTopNavConfig]
  );

  const slideAnimRef = useRef<Animated.Value>(new Animated.Value(1000));
  const prevVisible = useRef(false);

  useEffect(() => {
    if (!bottomSheet || !slideAnimRef.current) return;

    const isVisible = platformBottomSheetConfig.visible || false;
    if (isVisible && !prevVisible.current) {
      slideAnimRef.current.setValue(1000);
      Animated.timing(slideAnimRef.current, {
        toValue: 0,
        duration: platformBottomSheetConfig.animationDuration || 300,
        useNativeDriver: false,
      }).start();
    } else if (!isVisible && prevVisible.current) {
      Animated.timing(slideAnimRef.current, {
        toValue: 1000,
        duration: platformBottomSheetConfig.animationDuration || 300,
        useNativeDriver: false,
      }).start();
    }
    prevVisible.current = isVisible;
  }, [
    bottomSheet,
    platformBottomSheetConfig.visible,
    platformBottomSheetConfig.animationDuration,
  ]);

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

  // Handle theme adaptation for BottomNavigationBar
  const getAdaptiveBottomNavStyle = useCallback(() => {
    if (platformBottomNavConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBottomNavConfig.backgroundColor || '#1a1a1a'
            : platformBottomNavConfig.backgroundColor || '#ffffff',
      };
    }

    if (platformBottomNavConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBottomNavConfig.backgroundColor || '#1a1a1a'
            : platformBottomNavConfig.backgroundColor || '#ffffff',
      };
    }

    return {};
  }, [platformBottomNavConfig, colorScheme]);

  // Handle theme adaptation for FloatingActionButton
  const getAdaptiveFABStyle = useCallback(() => {
    if (platformFABConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformFABConfig.backgroundColor || '#007AFF'
            : platformFABConfig.backgroundColor || '#007AFF',
      };
    }

    if (platformFABConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformFABConfig.backgroundColor || '#007AFF'
            : platformFABConfig.backgroundColor || '#007AFF',
      };
    }

    return {};
  }, [platformFABConfig, colorScheme]);

  // Handle theme adaptation for BottomSheet
  const getAdaptiveBottomSheetStyle = useCallback(() => {
    if (platformBottomSheetConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBottomSheetConfig.backgroundColor || '#1a1a1a'
            : platformBottomSheetConfig.backgroundColor || '#ffffff',
      };
    }

    if (platformBottomSheetConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformBottomSheetConfig.backgroundColor || '#1a1a1a'
            : platformBottomSheetConfig.backgroundColor || '#ffffff',
      };
    }

    return {};
  }, [platformBottomSheetConfig, colorScheme]);

  // Handle theme adaptation for TopNavigationBar
  const getAdaptiveTopNavStyle = useCallback(() => {
    if (platformTopNavConfig.adaptiveTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformTopNavConfig.backgroundColor || '#1a1a1a'
            : platformTopNavConfig.backgroundColor || '#ffffff',
      };
    }

    if (platformTopNavConfig.autoDetectTheme && colorScheme) {
      return {
        backgroundColor:
          colorScheme === 'dark'
            ? platformTopNavConfig.backgroundColor || '#1a1a1a'
            : platformTopNavConfig.backgroundColor || '#ffffff',
      };
    }

    return {};
  }, [platformTopNavConfig, colorScheme]);

  const adaptiveStatusBarStyle = getAdaptiveStatusBarStyle();
  const adaptiveAppBarStyle = getAdaptiveAppBarStyle();
  const adaptiveBodyStyle = getAdaptiveBodyStyle();
  const adaptiveBottomNavStyle = getAdaptiveBottomNavStyle();
  const adaptiveFABStyle = getAdaptiveFABStyle();
  const adaptiveBottomSheetStyle = getAdaptiveBottomSheetStyle();
  const adaptiveTopNavStyle = getAdaptiveTopNavStyle();

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
  const finalBottomNavBgColor =
    adaptiveBottomNavStyle.backgroundColor ||
    platformBottomNavConfig.backgroundColor ||
    '#ffffff';
  const finalFABBgColor =
    adaptiveFABStyle.backgroundColor ||
    platformFABConfig.backgroundColor ||
    '#007AFF';
  const finalBottomSheetBgColor =
    adaptiveBottomSheetStyle.backgroundColor ||
    platformBottomSheetConfig.backgroundColor ||
    '#ffffff';
  const finalTopNavBgColor =
    adaptiveTopNavStyle.backgroundColor ||
    platformTopNavConfig.backgroundColor ||
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
      platformBodyConfig.onLayout?.(event);
    },
    [platformBodyConfig]
  );

  const handleBottomNavLayout = useCallback(
    (height: number) => {
      setBottomNavHeight(height);
      platformBottomNavConfig.onLayoutChange?.(height);
    },
    [platformBottomNavConfig]
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
            {
              height: statusBarHeightValue,
              zIndex: platformStatusBarConfig.zIndex || 100,
            },
            platformStatusBarConfig.containerStyle,
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
            zIndex: platformStatusBarConfig.zIndex || 100,
          },
          platformStatusBarConfig.elevated && styles.elevated,
          platformStatusBarConfig.containerStyle,
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
              <View>
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
            zIndex: platformAppBarConfig.zIndex || 1000,
          },
          platformAppBarConfig.elevated && styles.appBarElevated,
          platformAppBarConfig.containerStyle,
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
            styles.appBarContent,
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
          })}
        </View>
      );
    }

    // Body
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

  // Render BottomSheet
  const renderBottomSheet = () => {
    if (!bottomSheet || !platformBottomSheetConfig.visible) return null;

    if (platformBottomSheetConfig.customBottomSheet) {
      return platformBottomSheetConfig.customBottomSheet();
    }

    const safeAreaBottom = platformBottomSheetConfig.useSafeArea
      ? (platformBottomSheetConfig.safeAreaInsets?.bottom ?? 0)
      : 0;
    const safeAreaLeft = platformBottomSheetConfig.useSafeArea
      ? (platformBottomSheetConfig.safeAreaInsets?.left ?? 0)
      : 0;
    const safeAreaRight = platformBottomSheetConfig.useSafeArea
      ? (platformBottomSheetConfig.safeAreaInsets?.right ?? 0)
      : 0;

    return (
      <View style={styles.bottomSheetWrapper}>
        <TouchableWithoutFeedback
          onPress={
            platformBottomSheetConfig.closeOnOverlayPress
              ? platformBottomSheetConfig.onClose
              : undefined
          }
        >
          <View
            style={[
              styles.bottomSheetOverlay,
              {
                backgroundColor:
                  platformBottomSheetConfig.overlayColor || 'rgba(0,0,0,0.5)',
              },
              platformBottomSheetConfig.overlayStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              width: platformBottomSheetConfig.width || '100%',
              height: platformBottomSheetConfig.height,
              maxHeight: platformBottomSheetConfig.maxHeight,
              minHeight: platformBottomSheetConfig.minHeight,
              backgroundColor: finalBottomSheetBgColor,
              borderRadius: platformBottomSheetConfig.borderRadius,
              borderTopLeftRadius:
                platformBottomSheetConfig.borderTopLeftRadius ?? 20,
              borderTopRightRadius:
                platformBottomSheetConfig.borderTopRightRadius ?? 20,
              borderBottomLeftRadius:
                platformBottomSheetConfig.borderBottomLeftRadius,
              borderBottomRightRadius:
                platformBottomSheetConfig.borderBottomRightRadius,
              borderWidth: platformBottomSheetConfig.borderWidth,
              borderTopWidth: platformBottomSheetConfig.borderTopWidth,
              borderColor: platformBottomSheetConfig.borderColor,
              borderTopColor: platformBottomSheetConfig.borderTopColor,
              paddingBottom:
                (platformBottomSheetConfig.paddingBottom ?? 0) + safeAreaBottom,
              paddingLeft:
                (platformBottomSheetConfig.paddingLeft ?? 0) + safeAreaLeft,
              paddingRight:
                (platformBottomSheetConfig.paddingRight ?? 0) + safeAreaRight,
              shadowColor: platformBottomSheetConfig.shadowColor || '#000',
              shadowOffset: platformBottomSheetConfig.shadowOffset || {
                width: 0,
                height: -2,
              },
              shadowOpacity: platformBottomSheetConfig.shadowOpacity ?? 0.25,
              shadowRadius: platformBottomSheetConfig.shadowRadius ?? 8,
              elevation: platformBottomSheetConfig.elevation ?? 8,
              opacity: platformBottomSheetConfig.opacity,
              overflow: platformBottomSheetConfig.overflow,
              transform: [{ translateY: slideAnimRef.current }],
            },
            platformBottomSheetConfig.containerStyle,
          ]}
        >
          <View
            style={[
              styles.bottomSheetContent,
              {
                padding: platformBottomSheetConfig.padding,
                paddingHorizontal: platformBottomSheetConfig.paddingHorizontal,
                paddingVertical: platformBottomSheetConfig.paddingVertical,
                paddingTop: platformBottomSheetConfig.paddingTop,
                flexDirection: platformBottomSheetConfig.flexDirection,
                justifyContent: platformBottomSheetConfig.justifyContent,
                alignItems: platformBottomSheetConfig.alignItems,
                gap: platformBottomSheetConfig.gap,
              },
              platformBottomSheetConfig.contentStyle,
            ]}
          >
            {platformBottomSheetConfig.header}
            {platformBottomSheetConfig.children}
            {platformBottomSheetConfig.footer}
          </View>
        </Animated.View>
      </View>
    );
  };

  // Render FloatingActionButton
  const renderFloatingActionButton = () => {
    if (!floatingActionButton || platformFABConfig.hidden) return null;

    if (platformFABConfig.customFloatingActionButton) {
      return platformFABConfig.customFloatingActionButton();
    }

    const safeAreaBottom = platformFABConfig.useSafeArea
      ? (platformFABConfig.safeAreaInsets?.bottom ?? 0)
      : 0;
    const safeAreaLeft = platformFABConfig.useSafeArea
      ? (platformFABConfig.safeAreaInsets?.left ?? 0)
      : 0;
    const safeAreaRight = platformFABConfig.useSafeArea
      ? (platformFABConfig.safeAreaInsets?.right ?? 0)
      : 0;
    const safeAreaTop = platformFABConfig.useSafeArea
      ? (platformFABConfig.safeAreaInsets?.top ?? 0)
      : 0;

    const fabSize = platformFABConfig.size || 56;
    const transforms: any[] = [];
    if (platformFABConfig.rotation) {
      transforms.push({ rotate: `${platformFABConfig.rotation}deg` });
    }
    if (platformFABConfig.scale) {
      transforms.push({ scale: platformFABConfig.scale });
    }
    if (platformFABConfig.transform) {
      transforms.push(...platformFABConfig.transform);
    }

    return (
      <TouchableOpacity
        style={[
          styles.fabContainer,
          {
            width: platformFABConfig.width || fabSize,
            height: platformFABConfig.height || fabSize,
            minWidth: platformFABConfig.minWidth,
            minHeight: platformFABConfig.minHeight,
            maxWidth: platformFABConfig.maxWidth,
            maxHeight: platformFABConfig.maxHeight,
            backgroundColor: finalFABBgColor,
            borderRadius: platformFABConfig.borderRadius ?? fabSize / 2,
            borderTopLeftRadius: platformFABConfig.borderTopLeftRadius,
            borderTopRightRadius: platformFABConfig.borderTopRightRadius,
            borderBottomLeftRadius: platformFABConfig.borderBottomLeftRadius,
            borderBottomRightRadius: platformFABConfig.borderBottomRightRadius,
            borderWidth: platformFABConfig.borderWidth,
            borderTopWidth: platformFABConfig.borderTopWidth,
            borderBottomWidth: platformFABConfig.borderBottomWidth,
            borderLeftWidth: platformFABConfig.borderLeftWidth,
            borderRightWidth: platformFABConfig.borderRightWidth,
            borderColor: platformFABConfig.borderColor,
            borderTopColor: platformFABConfig.borderTopColor,
            borderBottomColor: platformFABConfig.borderBottomColor,
            borderLeftColor: platformFABConfig.borderLeftColor,
            borderRightColor: platformFABConfig.borderRightColor,
            borderStyle: platformFABConfig.borderStyle,
            position: platformFABConfig.position || 'absolute',
            bottom: (platformFABConfig.bottom ?? 16) + safeAreaBottom,
            right:
              platformFABConfig.right !== undefined
                ? platformFABConfig.right + safeAreaRight
                : 16 + safeAreaRight,
            left:
              platformFABConfig.left !== undefined
                ? platformFABConfig.left + safeAreaLeft
                : undefined,
            top:
              platformFABConfig.top !== undefined
                ? platformFABConfig.top + safeAreaTop
                : undefined,
            padding: platformFABConfig.padding,
            paddingHorizontal: platformFABConfig.paddingHorizontal,
            paddingVertical: platformFABConfig.paddingVertical,
            paddingTop: platformFABConfig.paddingTop,
            paddingBottom: platformFABConfig.paddingBottom,
            paddingLeft: platformFABConfig.paddingLeft,
            paddingRight: platformFABConfig.paddingRight,
            margin: platformFABConfig.margin,
            marginHorizontal: platformFABConfig.marginHorizontal,
            marginVertical: platformFABConfig.marginVertical,
            marginTop: platformFABConfig.marginTop,
            marginBottom: platformFABConfig.marginBottom,
            marginLeft: platformFABConfig.marginLeft,
            marginRight: platformFABConfig.marginRight,
            shadowColor: platformFABConfig.shadowColor || '#000',
            shadowOffset: platformFABConfig.shadowOffset || {
              width: 0,
              height: 4,
            },
            shadowOpacity: platformFABConfig.shadowOpacity ?? 0.3,
            shadowRadius: platformFABConfig.shadowRadius ?? 4,
            elevation: platformFABConfig.elevation ?? 6,
            flexDirection: platformFABConfig.flexDirection || 'row',
            justifyContent: platformFABConfig.justifyContent || 'center',
            alignItems: platformFABConfig.alignItems || 'center',
            gap: platformFABConfig.gap,
            opacity: platformFABConfig.opacity,
            overflow: platformFABConfig.overflow,
            zIndex: platformFABConfig.zIndex || 9999,
            transform: transforms.length > 0 ? transforms : undefined,
          },
          platformFABConfig.containerStyle,
        ]}
        onPress={platformFABConfig.onPress}
        onLongPress={platformFABConfig.onLongPress}
        onPressIn={platformFABConfig.onPressIn}
        onPressOut={platformFABConfig.onPressOut}
        disabled={platformFABConfig.disabled}
        activeOpacity={platformFABConfig.activeOpacity ?? 0.7}
        delayPressIn={platformFABConfig.delayPressIn}
        delayPressOut={platformFABConfig.delayPressOut}
        delayLongPress={platformFABConfig.delayLongPress}
        accessible={platformFABConfig.accessible}
        accessibilityLabel={platformFABConfig.accessibilityLabel}
        accessibilityHint={platformFABConfig.accessibilityHint}
        accessibilityRole={platformFABConfig.accessibilityRole || 'button'}
      >
        {platformFABConfig.backgroundView && (
          <View style={StyleSheet.absoluteFillObject}>
            {platformFABConfig.backgroundView}
          </View>
        )}
        {platformFABConfig.icon}
        {platformFABConfig.label &&
          (typeof platformFABConfig.label === 'string' ? (
            <Text style={[styles.fabLabel, platformFABConfig.labelStyle]}>
              {platformFABConfig.label}
            </Text>
          ) : (
            platformFABConfig.label
          ))}
      </TouchableOpacity>
    );
  };

  // Render BottomNavigationBar
  const renderBottomNavigationBar = () => {
    if (!bottomNavigationBar || platformBottomNavConfig.hidden) return null;

    // Custom renderer
    if (platformBottomNavConfig.renderCustom) {
      return (
        <View
          style={[
            styles.customBottomNavContainer,
            {
              height: bottomNavHeight,
              zIndex: platformBottomNavConfig.zIndex || 1000,
            },
            platformBottomNavConfig.containerStyle,
          ]}
          onLayout={(event) => {
            handleBottomNavLayout(event.nativeEvent.layout.height);
          }}
        >
          {platformBottomNavConfig.renderCustom({
            height: bottomNavHeight,
            backgroundColor: finalBottomNavBgColor,
          })}
        </View>
      );
    }

    const justifyMap = {
      'flex-start': 'flex-start' as const,
      'center': 'center' as const,
      'flex-end': 'flex-end' as const,
      'space-between': 'space-between' as const,
      'space-around': 'space-around' as const,
      'space-evenly': 'space-evenly' as const,
    };

    // Determine RTL/LTR
    const isRTL = platformBottomNavConfig.rtl ?? I18nManager.isRTL;
    const finalFlexDirection =
      platformBottomNavConfig.flexDirection || (isRTL ? 'row-reverse' : 'row');

    // Calculate safe area insets
    const safeAreaBottom = platformBottomNavConfig.useSafeArea
      ? (platformBottomNavConfig.safeAreaInsets?.bottom ?? 0)
      : 0;
    const safeAreaLeft = platformBottomNavConfig.useSafeArea
      ? (platformBottomNavConfig.safeAreaInsets?.left ?? 0)
      : 0;
    const safeAreaRight = platformBottomNavConfig.useSafeArea
      ? (platformBottomNavConfig.safeAreaInsets?.right ?? 0)
      : 0;

    return (
      <View
        style={[
          styles.defaultBottomNavContainer,
          {
            height: platformBottomNavConfig.height || 56,
            width: platformBottomNavConfig.width || '100%',
            backgroundColor: finalBottomNavBgColor,
            flexDirection: finalFlexDirection,
            flexWrap: platformBottomNavConfig.flexWrap,
            alignItems:
              platformBottomNavConfig.alignItems ||
              platformBottomNavConfig.verticalAlignment ||
              'center',
            alignContent: platformBottomNavConfig.alignContent,
            justifyContent:
              platformBottomNavConfig.justifyContent ||
              justifyMap[
                platformBottomNavConfig.horizontalJustification ||
                  'space-around'
              ] ||
              'space-around',

            // Padding
            paddingHorizontal: platformBottomNavConfig.paddingHorizontal,
            paddingVertical: platformBottomNavConfig.paddingVertical,
            paddingTop: platformBottomNavConfig.paddingTop,
            paddingBottom:
              (platformBottomNavConfig.paddingBottom ?? 0) + safeAreaBottom,
            paddingLeft:
              (platformBottomNavConfig.paddingLeft ?? 0) + safeAreaLeft,
            paddingRight:
              (platformBottomNavConfig.paddingRight ?? 0) + safeAreaRight,

            // Margin
            margin: platformBottomNavConfig.margin,
            marginHorizontal: platformBottomNavConfig.marginHorizontal,
            marginVertical: platformBottomNavConfig.marginVertical,
            marginTop: platformBottomNavConfig.marginTop,
            marginBottom: platformBottomNavConfig.marginBottom,
            marginLeft: platformBottomNavConfig.marginLeft,
            marginRight: platformBottomNavConfig.marginRight,

            gap: platformBottomNavConfig.gap || 0,

            // Border
            borderRadius: platformBottomNavConfig.borderRadius,
            borderTopLeftRadius: platformBottomNavConfig.borderTopLeftRadius,
            borderTopRightRadius: platformBottomNavConfig.borderTopRightRadius,
            borderBottomLeftRadius:
              platformBottomNavConfig.borderBottomLeftRadius,
            borderBottomRightRadius:
              platformBottomNavConfig.borderBottomRightRadius,
            borderWidth: platformBottomNavConfig.borderWidth,
            borderTopWidth: platformBottomNavConfig.borderTopWidth,
            borderBottomWidth: platformBottomNavConfig.borderBottomWidth,
            borderLeftWidth: platformBottomNavConfig.borderLeftWidth,
            borderRightWidth: platformBottomNavConfig.borderRightWidth,
            borderColor: platformBottomNavConfig.borderColor,
            borderTopColor: platformBottomNavConfig.borderTopColor,
            borderBottomColor: platformBottomNavConfig.borderBottomColor,
            borderLeftColor: platformBottomNavConfig.borderLeftColor,
            borderRightColor: platformBottomNavConfig.borderRightColor,
            borderStyle: platformBottomNavConfig.borderStyle,

            // Shadow (iOS)
            shadowColor: platformBottomNavConfig.shadowColor,
            shadowOffset: platformBottomNavConfig.shadowOffset,
            shadowOpacity: platformBottomNavConfig.shadowOpacity,
            shadowRadius: platformBottomNavConfig.shadowRadius,

            // Elevation (Android)
            elevation: platformBottomNavConfig.elevation,

            // Position
            position: platformBottomNavConfig.position,
            bottom: platformBottomNavConfig.bottom,
            left: platformBottomNavConfig.left,
            right: platformBottomNavConfig.right,
            top: platformBottomNavConfig.top,

            // Visual
            opacity: platformBottomNavConfig.opacity,
            overflow: platformBottomNavConfig.overflow as any,
            transform: platformBottomNavConfig.transform,

            zIndex: platformBottomNavConfig.zIndex || 1000,
          },
          platformBottomNavConfig.elevated && styles.bottomNavElevated,
          platformBottomNavConfig.containerStyle,
        ]}
        pointerEvents={platformBottomNavConfig.pointerEvents}
        onLayout={(event) => {
          handleBottomNavLayout(event.nativeEvent.layout.height);
        }}
      >
        {/* Background View (optional) */}
        {platformBottomNavConfig.backgroundView && (
          <View style={StyleSheet.absoluteFillObject}>
            {platformBottomNavConfig.backgroundView}
          </View>
        )}

        {/* BottomNav Content */}
        {platformBottomNavConfig.children}
      </View>
    );
  };

  // Render TopNavigationBar
  const renderTopNavigationBar = () => {
    if (!topNavigationBar || platformTopNavConfig.hidden) return null;

    if (platformTopNavConfig.customTopNavigationBar) {
      return platformTopNavConfig.customTopNavigationBar();
    }

    // Calculate safe area insets
    const safeAreaTop = platformTopNavConfig.useSafeArea
      ? (platformTopNavConfig.safeAreaInsets?.top ?? 0)
      : 0;
    const safeAreaLeft = platformTopNavConfig.useSafeArea
      ? (platformTopNavConfig.safeAreaInsets?.left ?? 0)
      : 0;
    const safeAreaRight = platformTopNavConfig.useSafeArea
      ? (platformTopNavConfig.safeAreaInsets?.right ?? 0)
      : 0;

    // Determine RTL/LTR
    const isRTL = I18nManager.isRTL;
    const flexDirection =
      platformTopNavConfig.flexDirection || (isRTL ? 'row-reverse' : 'row');

    const justifyMap = {
      'flex-start': 'flex-start' as const,
      'flex-end': 'flex-end' as const,
      'center': 'center' as const,
      'space-between': 'space-between' as const,
      'space-around': 'space-around' as const,
      'space-evenly': 'space-evenly' as const,
    };

    const containerStyle = [
      styles.topNavContainer,
      {
        height: platformTopNavConfig.height || 48,
        width: platformTopNavConfig.width || '100%',
        backgroundColor: finalTopNavBgColor,
        flexDirection: flexDirection,
        paddingHorizontal: platformTopNavConfig.paddingHorizontal,
        paddingVertical: platformTopNavConfig.paddingVertical,
        paddingTop: (platformTopNavConfig.paddingTop ?? 0) + safeAreaTop,
        paddingBottom: platformTopNavConfig.paddingBottom,
        paddingLeft: (platformTopNavConfig.paddingLeft ?? 0) + safeAreaLeft,
        paddingRight: (platformTopNavConfig.paddingRight ?? 0) + safeAreaRight,
        margin: platformTopNavConfig.margin,
        marginHorizontal: platformTopNavConfig.marginHorizontal,
        marginVertical: platformTopNavConfig.marginVertical,
        borderRadius: platformTopNavConfig.borderRadius,
        borderTopLeftRadius: platformTopNavConfig.borderTopLeftRadius,
        borderTopRightRadius: platformTopNavConfig.borderTopRightRadius,
        borderBottomLeftRadius: platformTopNavConfig.borderBottomLeftRadius,
        borderBottomRightRadius: platformTopNavConfig.borderBottomRightRadius,
        borderWidth: platformTopNavConfig.borderWidth,
        borderTopWidth: platformTopNavConfig.borderTopWidth,
        borderBottomWidth: platformTopNavConfig.borderBottomWidth,
        borderLeftWidth: platformTopNavConfig.borderLeftWidth,
        borderRightWidth: platformTopNavConfig.borderRightWidth,
        borderColor: platformTopNavConfig.borderColor,
        borderTopColor: platformTopNavConfig.borderTopColor,
        borderBottomColor: platformTopNavConfig.borderBottomColor,
        borderLeftColor: platformTopNavConfig.borderLeftColor,
        borderRightColor: platformTopNavConfig.borderRightColor,
        borderStyle: platformTopNavConfig.borderStyle,
        shadowColor: platformTopNavConfig.shadowColor,
        shadowOffset: platformTopNavConfig.shadowOffset,
        shadowOpacity: platformTopNavConfig.shadowOpacity,
        shadowRadius: platformTopNavConfig.shadowRadius,
        elevation: platformTopNavConfig.elevation,
        position: platformTopNavConfig.position,
        top: platformTopNavConfig.top,
        left: platformTopNavConfig.left,
        right: platformTopNavConfig.right,
        opacity: platformTopNavConfig.opacity,
        overflow: platformTopNavConfig.overflow as any,
        zIndex: platformTopNavConfig.zIndex || 1000,
      },
      platformTopNavConfig.containerStyle,
    ];

    const contentContainerStyle = [
      styles.topNavContent,
      {
        flexDirection: flexDirection,
        justifyContent:
          justifyMap[platformTopNavConfig.justifyContent || 'flex-start'] ||
          'flex-start',
        alignItems: platformTopNavConfig.alignItems || 'center',
        gap: platformTopNavConfig.gap,
      },
      platformTopNavConfig.contentContainerStyle,
    ];

    // Render tabs
    const renderTabs = () => {
      if (
        !platformTopNavConfig.tabs ||
        platformTopNavConfig.tabs.length === 0
      ) {
        return null;
      }

      return platformTopNavConfig.tabs.map((tab, index) => {
        // Compare with type coercion to handle string/number mismatches
        const isActive =
          String(tab.id) === String(platformTopNavConfig.activeTabId);
        const tabKey = `tab-${String(tab.id)}-${index}`;

        const handlePress = () => {
          // Always allow tab press, even if already active (for re-selection)
          // Call tab-specific onPress first (if provided)
          if (tab.onPress) {
            try {
              tab.onPress();
            } catch (error) {
              console.warn('Error in tab onPress handler:', error);
            }
          }
          // Then call the global onTabChange
          if (platformTopNavConfig.onTabChange) {
            try {
              platformTopNavConfig.onTabChange(tab.id);
            } catch (error) {
              console.warn('Error in onTabChange handler:', error);
            }
          }
        };

        const tabGap = tab.icon && tab.label ? 8 : 0;

        return (
          <TouchableOpacity
            key={tabKey}
            onPress={handlePress}
            style={[
              styles.topNavTab,
              { gap: tabGap },
              platformTopNavConfig.tabStyle,
              isActive && platformTopNavConfig.activeTabStyle,
            ]}
            activeOpacity={0.7}
          >
            {tab.icon && <View style={styles.topNavTabIcon}>{tab.icon}</View>}
            {typeof tab.label === 'string' ? (
              <Text
                style={[
                  styles.topNavTabLabel,
                  platformTopNavConfig.tabLabelStyle,
                  isActive && platformTopNavConfig.activeTabLabelStyle,
                  {
                    color: isActive
                      ? platformTopNavConfig.activeTabColor || '#007AFF'
                      : platformTopNavConfig.inactiveTabColor || '#666666',
                  },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            ) : (
              tab.label && <View>{tab.label}</View>
            )}
            {platformTopNavConfig.showIndicator && isActive && (
              <View
                style={[
                  platformTopNavConfig.indicatorPosition === 'top'
                    ? styles.topNavIndicatorTop
                    : styles.topNavIndicatorBottom,
                  {
                    height: platformTopNavConfig.indicatorHeight || 2,
                    width: platformTopNavConfig.indicatorWidth || '100%',
                    backgroundColor:
                      platformTopNavConfig.indicatorColor || '#007AFF',
                  },
                  platformTopNavConfig.indicatorStyle,
                ]}
              />
            )}
          </TouchableOpacity>
        );
      });
    };

    // Use ScrollView if scrollable, otherwise use View
    if (platformTopNavConfig.scrollable) {
      return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={
            platformTopNavConfig.showsHorizontalScrollIndicator ?? false
          }
          style={containerStyle}
          contentContainerStyle={contentContainerStyle}
          bounces={false}
        >
          {renderTabs()}
        </ScrollView>
      );
    }

    return (
      <View style={containerStyle} pointerEvents="box-none">
        <View style={contentContainerStyle} pointerEvents="box-none">
          {renderTabs()}
        </View>
      </View>
    );
  };

  // StatusBar hidden
  if (platformStatusBarConfig.hidden) {
    return (
      <Fragment>
        <SafeAreaView style={styles.topSafeAreaView} />
        <SafeAreaView style={[styles.fullFlex, styles.safeAreaView]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.fullFlex}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            <View style={styles.container}>
              <RNStatusBar hidden={true} />
              {renderAppBar()}
              {renderTopNavigationBar()}
              {renderBodyContent()}
              {renderBottomNavigationBar()}
              {renderFloatingActionButton()}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={[styles.fullFlex, styles.safeAreaView]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.fullFlex}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <View style={styles.container}>
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

            {/* Top Navigation Bar */}
            {renderTopNavigationBar()}

            {/* Body Content */}
            {renderBodyContent()}

            {/* Bottom Navigation Bar */}
            {renderBottomNavigationBar()}

            {/* Floating Action Button */}
            {renderFloatingActionButton()}

            {/* Bottom Sheet */}
            {renderBottomSheet()}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSafeAreaView: {
    flex: 0,
    backgroundColor: '#ffffff',
  },
  safeAreaView: {
    backgroundColor: '#ffffff',
  },
  fullFlex: {
    flex: 1,
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
  appBarContent: {
    flex: 1,
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
  // BottomNavigationBar Styles
  defaultBottomNavContainer: {
    width: '100%',
  },
  customBottomNavContainer: {
    width: '100%',
  },
  bottomNavElevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  // FloatingActionButton Styles
  fabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  // BottomSheet Styles
  bottomSheetWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContent: {
    width: '100%',
  },
  // TopNavigationBar Styles
  topNavContainer: {
    width: '100%',
  },
  topNavContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  topNavTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    minWidth: 60,
    flexDirection: 'row',
  },
  topNavTabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavTabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  topNavIndicatorBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topNavIndicatorTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default Scaffold;
