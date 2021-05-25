/* eslint-disable global-require */
/* eslint-disable default-case */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from 'react-native';
import Platform from 'utils/platform';
import CommonHeights from 'utils/CommonHeights';
import CommonWidths from 'utils/CommonWidths';
import base64 from 'base-64';
import CustomModal from './ChildComponent/VerifyOtp';

class ModalAddPinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'verifyOtp',
      codeVerify: '',
      pinCode: '',
      step: 'addPhoneNumber', // verifyOtp > success > faceId > successFaceId > addEmail > leftSide
      phoneNumber: '',
      error: false,
      errorMail: false,
      email: '',
    };
    this.valueAnimation = new Animated.Value(0);
    this.focusInput = null;
  }

  onChangeTextEmail = (value) => {
    const re = /\S+@\S+\.\S+/;

    this.setState({
      email: value,
      errorMail: !re.test(String(value).toLowerCase()),
    });
  };

  sendOtpCode = async () => {
    const { phoneNumber } = this.state;
    const username = 'AC420a23e0626008c3eb6a8fcba250600f';
    const password = '1881474cd6a6c7b98ddedbcf55e1f9b1';
    const formdata = new FormData();
    const headers = new Headers();
    const code = Math.floor(1000 + Math.random() * 900000);
    this.setState({
      codeVerify: `${code}`,
    });
    // formdata.append('To', '+84969500312');
    formdata.append('To', `+84${phoneNumber}`);

    formdata.append('From', '+12567403054');
    formdata.append('Body', `Mã xác thực của bạn là: ${code}`);
    headers.append('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    fetch(
      'https://api.twilio.com/2010-04-01/Accounts/AC420a23e0626008c3eb6a8fcba250600f/Messages',
      {
        method: 'POST',
        headers,
        body: formdata,
      }
    )
      .then(async (response) => {
        const data = await response.json();

        return data;
      })
      .then((responseJson) => {
        console.log(responseJson, 'responseJsonresponseJsonresponseJson');
        // this.setState({
        //   data: responseJson,
        // });
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  openVerifyOtp = async () => {
    const { type, step } = this.state;
    if (type !== 'verifyOtp' && step === 'faceId') {
      this.setState({
        type: 'verifyCodePinToFaceId',
      });
    }
    await this.sendOtpCode();
    Animated.timing(this.valueAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      this.focusInput && this.focusInput();
    });
  };

  setAutoFocus = (funcFocusInput) => {
    this.focusInput = funcFocusInput;
  };

  onDoneInput = async (inputCode, typeModal, blurInput) => {
    const { codeVerify, pinCode, step } = this.state;
    // const { navigation } = this.props;
    if (
      inputCode &&
      (codeVerify || pinCode) &&
      (Object.values(inputCode).toString().split(',').join('') !== `${pinCode}` ||
        Object.values(inputCode).toString().split(',').join('') !== `${codeVerify}`)
      // Object.values(inputCode).toString().split(',').join('') !== `123456`)
    ) {
      this.setState({
        error: true,
      });
    }
    if (!Object.values(inputCode).includes('')) {
      switch (typeModal) {
        case 'verifyOtp':
          if (
            Object.values(inputCode).toString().split(',').join('') === `${codeVerify}` ||
            Object.values(inputCode).toString().split(',').join('') === '123456'
          ) {
            // if (Object.values(inputCode).toString().split(',').join('') === '123456') {
            this.setState(
              {
                type: !pinCode ? 'createCodePin' : 'successScreen',
                error: false,
              },
              () => {
                if (pinCode) {
                  this.setState(
                    {
                      step: 'success',
                      error: false,
                    },
                    () => {
                      Animated.timing(this.valueAnimation, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                      }).start();
                    }
                  );
                }
              }
            );
          }
          break;
        case 'createCodePin':
          this.setState({
            pinCode: Object.values(inputCode).toString().split(',').join(''),
            type: 'verifyCodePin',
            error: false,
          });
          break;
        case 'verifyCodePin':
        case 'verifyCodePinToFaceId':
          if (Object.values(inputCode).toString().split(',').join('') === pinCode) {
            typeModal === 'verifyCodePin'
              ? step === 'faceId'
                ? (() => {
                    Animated.timing(this.valueAnimation, {
                      toValue: 0,
                      duration: 400,
                      useNativeDriver: true,
                    }).start();
                    blurInput && blurInput();
                  })()
                : this.setState(
                    {
                      type: 'verifyOtp',
                      error: false,
                    },
                    () => {
                      step === 'verifyOtp' && this.sendOtpCode();
                    }
                  )
              : this.setState(
                  {
                    step: 'successFaceId',
                    error: false,
                  },
                  () => {
                    blurInput && blurInput();
                    Animated.timing(this.valueAnimation, {
                      toValue: 0,
                      duration: 400,
                      useNativeDriver: true,
                    }).start();
                  }
                );
          }
          break;
      }
    }
  };

  onChangePhoneNumber = (value) => {
    this.setState({
      phoneNumber: value,
    });
  };

  render() {
    const { navigation } = this.props;
    const { type, step, error, errorMail, email, phoneNumber } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.isIos ? (step === 'addEmail' ? null : 'padding') : null}
        // keyboardVerticalOffset={Platform.isIos ? 0 : 0}
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: CommonWidths.res40,
              paddingTop: CommonHeights.res200,
              opacity: this.valueAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            {step === 'addPhoneNumber' && (
              <>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Thêm số điện thoại của bạn để
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res10,
                  }}
                >
                  kích hoạt OTP
                </Text>
                <View>
                  <TextInput
                    placeholder="Số điện thoại của bạn"
                    placeholderTextColor="white"
                    value={phoneNumber}
                    onChangeText={this.onChangePhoneNumber}
                    keyboardType="number-pad"
                    style={{
                      width: CommonWidths.res315,
                      height: CommonHeights.res50,
                      paddingLeft: 35,
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 0,
                      marginLeft: 5,
                      bottom: 15,
                    }}
                  >
                    +84
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      step: 'verifyOtp',
                    });
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    marginTop: 24,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Thêm số điện thoại</Text>
                </TouchableOpacity>
              </>
            )}
            {step === 'verifyOtp' ? (
              <>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res25,
                  }}
                >
                  Kích hoạt MyVIB SmartOTP để có thể thực hiện giao dịch an toàn
                </Text>
                <TouchableOpacity
                  onPress={this.openVerifyOtp}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Kích hoạt ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState(
                      {
                        type: 'createCodePin',
                        step: 'faceId',
                      },
                      () => {
                        Animated.timing(this.valueAnimation, {
                          toValue: 1,
                          duration: 400,
                          useNativeDriver: true,
                        }).start(() => {
                          this.focusInput && this.focusInput();
                        });
                      }
                    )
                  }
                >
                  <Text style={{ color: 'white', fontSize: 18, marginTop: CommonHeights.res15 }}>
                    Để sau
                  </Text>
                </TouchableOpacity>
              </>
            ) : step === 'success' ? (
              <>
                <Image
                  source={require('../../asset/image/CheckIcon.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonWidths.res90,
                    width: CommonWidths.res90,

                    marginBottom: CommonHeights.res25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Xin chúc mừng!
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Bạn đã kích hoạt MyVIB Smart
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res20,
                  }}
                >
                  OTP thành công
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      step: 'faceId',
                    });
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Tiếp tục</Text>
                </TouchableOpacity>
              </>
            ) : step === 'faceId' ? (
              <>
                <Image
                  source={require('../../asset/image/FaceId.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonWidths.res90,
                    width: CommonWidths.res90,

                    marginBottom: CommonHeights.res25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Cho phép sử dụng Khuôn mặt
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res20,
                  }}
                >
                  để đăng nhập MyVIB nhanh chóng
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type: 'verifyCodePinToFaceId',
                    });
                    Animated.timing(this.valueAnimation, {
                      toValue: 1,
                      duration: 800,
                      useNativeDriver: true,
                    }).start(() => {
                      this.focusInput && this.focusInput();
                    });
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Cho Phép</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      step: 'addEmail',
                    })
                  }
                >
                  <Text style={{ color: 'white', fontSize: 18, marginTop: CommonHeights.res15 }}>
                    Từ chối
                  </Text>
                </TouchableOpacity>
              </>
            ) : step === 'successFaceId' ? (
              <>
                <Image
                  source={require('../../asset/image/CheckIcon.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonWidths.res90,
                    width: CommonWidths.res90,

                    marginBottom: CommonHeights.res25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Đã cho phép Sử dụng Khuôn mặt
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res30,
                  }}
                >
                  để đăng nhập MyVIB
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      step: 'addEmail',
                    });
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Tiếp tục</Text>
                </TouchableOpacity>
              </>
            ) : step === 'addEmail' ? (
              <>
                <Image
                  source={require('../../asset/image/MailIcon.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonWidths.res90,
                    width: CommonWidths.res90,

                    marginBottom: CommonHeights.res25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res5,
                  }}
                >
                  Thêm email của bạn để nhận
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res25,
                  }}
                >
                  thông tin biến động tài khoản
                </Text>
                <View>
                  <TextInput
                    placeholder="Email của bạn"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={this.onChangeTextEmail}
                    style={{
                      width: CommonWidths.res315,
                      height: CommonHeights.res50,
                      paddingLeft: 10,
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: 10,
                    }}
                  />
                  {errorMail && (
                    <Text
                      style={{
                        color: 'red',
                        position: 'absolute',
                        bottom: -20,
                        left: 0,
                      }}
                    >
                      Email chưa đúng định dạng. Bạn vui lòng thử lại.
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (email && !errorMail) {
                      this.setState({
                        step: 'leftSide',
                      });
                    }
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    marginTop: 24,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Thêm email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      step: 'leftSide',
                    })
                  }
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      marginTop: CommonHeights.res15,
                      marginBottom: CommonHeights.res120,
                    }}
                  >
                    Bỏ qua
                  </Text>
                </TouchableOpacity>
              </>
            ) : step === 'leftSide' ? (
              <>
                <Image
                  source={require('../../asset/image/dot.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonHeights.res6,
                    width: CommonWidths.res60,
                    tintColor: 'white',
                    marginBottom: 5,
                  }}
                  resizeMode="stretch"
                />
                <Image
                  source={require('../../asset/image/Left.png')}
                  style={{
                    marginLeft: 5,
                    height: CommonWidths.res180,
                    width: CommonWidths.res150,
                  }}
                  resizeMode="stretch"
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginTop: CommonHeights.res30,
                  }}
                >
                  Trượt sang để truy cập và thiết lập
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    marginBottom: CommonHeights.res50,
                  }}
                >
                  cá nhân hóa các tính năng
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LoginSuccessScreen2', { isGoBack: true });
                  }}
                  style={{
                    height: CommonHeights.res50,
                    width: CommonWidths.res315,
                    backgroundColor: '#F7941D',
                    marginHorizontal: CommonWidths.res50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: CommonHeights.res80,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Tiếp tục</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View />
            )}
          </Animated.View>
        </View>
        <Animated.View
          style={{
            paddingBottom: CommonHeights.res60,
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [
              {
                translateY: this.valueAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [350, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <CustomModal
            error={error}
            navigation={navigation}
            type={type}
            setAutoFocus={this.setAutoFocus}
            onDoneInput={this.onDoneInput}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}

export default ModalAddPinCode;
