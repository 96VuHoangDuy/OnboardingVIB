/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CommonHeights from 'utils/CommonHeights';
import CommonWidths from 'utils/CommonWidths';
import styles from './styles';
import HeaderLoginSuccessScreen from './ChildComponent/HeaderLoginSuccessScreen';

const LoginSuccessScreen = ({ route, navigation }) => {
  const [isHelping, setIsHelping] = useState(false);

  const onCLoseHelping = () => {
    setIsHelping(false);
    navigation.setParams({ isHelping: 'of', isGoBack: false });
  };

  const onSetIsHelping = () => {
    setIsHelping(true);
    navigation.setParams({ isHelping: 'on', onCLoseHelping });
  };

  useEffect(() => {
    if (route?.params?.isGoBack) {
      onSetIsHelping();
    }
  }, [route?.params?.isGoBack]);

  return (
    <View style={styles.container}>
      {isHelping && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(79, 79, 79, 0.9)',
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                marginBottom: CommonHeights.res5,
              }}
            >
              Tùy chỉnh các tiện ích yêu thích trên
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                marginBottom: CommonHeights.res30,
              }}
            >
              Thanh điều hướng
            </Text>
            <Image
              source={require('../../asset/image/Up.png')}
              style={{
                marginLeft: 5,
                height: CommonWidths.res180,
                width: CommonWidths.res150,

                marginLeft: 100,
                marginBottom: CommonHeights.res25,
              }}
              resizeMode="contain"
            />
          </>
        </View>
      )}
      <ImageBackground
        resizeMethod="scale"
        resizeMode="cover"
        source={require('../../asset/image/dark-towering-buildings-dan-prat.jpg')}
        style={styles.imageBackground}
      >
        <HeaderLoginSuccessScreen />
        <ImageBackground
          resizeMode="stretch"
          source={require('../../asset/image/Spaceman.png')}
          style={styles.imageSpaceman}
        >
          <View
            style={{ position: 'absolute', bottom: CommonHeights.res50, right: CommonWidths.res15 }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ModalAddPinCode');
              }}
            >
              <View
                style={{
                  paddingVertical: CommonHeights.res10,
                  paddingHorizontal: CommonHeights.res24,
                  backgroundColor: 'orange',
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>Khám Phá Ngay</Text>
                <Image
                  source={require('../../asset/image/arrowRight.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonHeights.res13,
                    width: CommonHeights.res13,
                    tintColor: 'white',
                  }}
                  resizeMode="stretch"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default LoginSuccessScreen;
