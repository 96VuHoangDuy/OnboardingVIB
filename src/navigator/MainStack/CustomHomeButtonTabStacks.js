/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  PanResponder,
  Animated,
  Text,
} from 'react-native';
import CommonHeights from 'utils/CommonHeights';
import CommonWidths from 'utils/CommonWidths';

const CustomHomeButtonTabs = ({ state, descriptors, navigation }) => {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {},
    onPanResponderMove: (e, g) => {
      if (
        g.dy < 0 &&
        g.dy > -CommonHeights.res70 &&
        (pan._offset === CommonHeights.res70 || pan._offset === 0)
      ) {
        return Animated.event([null, { dy: pan }])(e, g);
      }
      if (g.dy > 0 && g.dy < CommonHeights.res70 && pan._offset === -CommonHeights.res70) {
        return Animated.event([null, { dy: pan }])(e, g);
      }
    },

    onPanResponderRelease: (e, { dy }) => {
      if (dy < 0 && (pan._offset === CommonHeights.res70 || pan._offset === 0)) {
        Animated.timing(pan, {
          toValue: -CommonHeights.res70,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          pan.extractOffset();
        });
      }
      if (dy > 0 && pan._offset === -CommonHeights.res70) {
        Animated.timing(pan, {
          toValue: CommonHeights.res70,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          pan.extractOffset();
        });
      }
    },
  });

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: Animated.subtract(pan, -CommonHeights.res50),
              },
            ],
          },
        ]}
      >
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <TouchableOpacity>
            <View style={[styles.buttonNavigateInTop, { marginRight: 20, marginBottom: 5 }]}>
              <Image
                source={require('../../asset/image/Transfers.png')}
                style={{
                  marginLeft: 5,
                  height: CommonWidths.res40,
                  width: CommonWidths.res40,
                  tintColor: 'white',
                }}
                resizeMode="contain"
              />
              <Text style={styles.textButtonNavigate}>Chuyển tiền</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonNavigateInTop}>
              <Image
                source={require('../../asset/image/Profile.png')}
                style={{
                  marginLeft: 5,
                  height: CommonWidths.res35,
                  width: CommonWidths.res35,
                  tintColor: 'white',
                  marginBottom: 8,
                }}
                resizeMode="contain"
              />
              <Text style={styles.textButtonNavigate}>Tài khoản</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <TouchableOpacity>
            <View style={[styles.buttonNavigateInTop, { marginRight: 20, marginBottom: 5 }]}>
              <Image
                source={require('../../asset/image/NapTien.png')}
                style={{
                  marginLeft: 5,
                  height: CommonWidths.res35,
                  width: CommonWidths.res25,
                  tintColor: 'white',
                  marginBottom: 8,
                }}
                resizeMode="contain"
              />
              <Text style={styles.textButtonNavigate}>Nạp tiền</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonNavigateInTop}>
              <Image
                source={require('../../asset/image/QR.png')}
                style={{
                  marginLeft: 5,
                  height: CommonWidths.res35,
                  width: CommonWidths.res35,
                  tintColor: 'white',
                  marginBottom: 8,
                }}
                resizeMode="contain"
              />
              <Text style={styles.textButtonNavigate}>Thanh toán QR</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View
            style={{
              marginTop: CommonHeights.res15,
              marginBottom: CommonHeights.res20,
              width: CommonWidths.res230,
              height: CommonHeights.res50,
              borderRadius: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderWidth: 2,
              borderColor: '#F7941D',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../asset/image/Setting.png')}
              style={{
                marginRight: 5,
                height: CommonWidths.res24,
                width: CommonWidths.res24,
                tintColor: '#F7941D',
              }}
              resizeMode="contain"
            />
            <Text style={{ color: '#F7941D', fontSize: 16 }}>Tuỳ chỉnh</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute',
          bottom: 0,
          height: CommonHeights.res83,
          width: '100%',
        }}
      >
        {state?.routes[1]?.params?.isHelping === 'on' && (
          <TouchableOpacity
            onPress={() => {
              state?.routes[1]?.params?.onCLoseHelping();
            }}
            activeOpacity={1}
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'rgba(79, 79, 79, 0.9)',
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: 'orange', fontSize: 18, fontWeight: '700' }}>Hoàn Thành</Text>
          </TouchableOpacity>
        )}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const imageIcon = {
            LoginSuccessScreen: require('../../asset/image/Digi.png'),
            LoginSuccessScreen2: require('../../asset/image/VIB_Icon.png'),
            LoginSuccessScreen3: require('../../asset/image/notifications.png'),
          };

          const styleIcon = {
            LoginSuccessScreen: { height: 40, width: 40, marginTop: -10 },
            LoginSuccessScreen2: { height: 28, width: 32 },
            LoginSuccessScreen3: { height: 28, width: 24 },
          };

          const title = {
            LoginSuccessScreen: 'Digi',
            LoginSuccessScreen2: 'Trang chủ',
            LoginSuccessScreen3: 'Thông báo',
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                // paddingHorizontal: CommonWidths.res15,
                padding: CommonHeights.res15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image resizeMode="cover" source={imageIcon[label]} style={styleIcon[label]} />
              <Text style={{ color: isFocused ? '#F7941D' : '#222', textAlign: 'center' }}>
                {title[label]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomHomeButtonTabs;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommonHeights.res20,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: CommonHeights.res60,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNavigateInTop: {
    width: CommonWidths.res180,
    height: CommonHeights.res83,
    borderRadius: 14,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonNavigate: {
    color: 'white',
  },
});
