/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import React, { Component, createRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CommonHeights from 'utils/CommonHeights';
import CommonWidths from 'utils/CommonWidths';

const typeModal = {
  verifyOtp: {
    title: 'Xác thực OTP',
    textContent: 'Nhập mã số OTP được gửi tới Số điện thoại của bạn (+84) 96 *** 312',
    error: 'Mã OTP chưa đúng. Bạn vui lòng kiểm tra lại',
  },
  createCodePin: {
    title: 'Tạo mã PIN',
    textContent: 'Tạo mã PIN cho MyVIB Smart OTP.',
  },
  verifyCodePin: {
    title: 'Xác nhận mã PIN',
    textContent: 'Xác nhận mã PIN cho MyVIB Smart OTP',
    error: 'Mã PIN chưa khớp. Bạn vui lòng thử lại',
  },
  verifyCodePinToFaceId: {
    title: 'Nhập mã PIN',
    textContent: 'Nhập mã PIN xác nhận sử dụng Khuôn mặt để đăng nhập ',
    error: 'Mã PIN chưa đúng. Bạn vui lòng thử lại',
  },
};

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
      },
    };
    this.elRefs = Array(6)
      .fill()
      .map(() => createRef());
  }

  componentDidMount = () => {
    const { setAutoFocus } = this.props;
    const that = this;

    setAutoFocus(this.autoFocus.bind(that));
  };

  componentDidUpdate = (nextProps) => {
    const { type } = this.props;
    if (nextProps.type !== type) {
      this.setState(
        {
          valueInput: {
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
          },
        },
        () => this.autoFocus()
      );
    }
  };

  autoFocus = () => {
    this.elRefs[0]?.current?.focus();
  };

  onblurInput = (index) => () => {
    this.elRefs[index]?.current?.blur();
  };

  checkValid = () => {
    const { onDoneInput, type } = this.props;
    const { valueInput } = this.state;
    let blurInput = null;

    if (type === 'verifyCodePinToFaceId' || type === 'verifyCodePin') {
      for (let index = 0; index < this.elRefs.length; index++) {
        const isFocus = this.elRefs[index]?.current?.isFocused();
        if (isFocus) {
          blurInput = this.onblurInput(index).bind(this);
        }
      }
    }
    onDoneInput && onDoneInput(valueInput, type, blurInput);
  };

  onChangeText = (value, index) => {
    const { valueInput } = this.state;
    if (value !== '') {
      this.setState(
        (state) => {
          return {
            valueInput: { ...state.valueInput, [`${index}`]: value },
          };
        },
        () => {
          if (!valueInput[index + 1]) {
            this.elRefs[index + 1] && this.elRefs[index + 1]?.current?.focus();
          }
          this.checkValid();
        }
      );
    }
    if (value === '') {
      this.setState(
        (state) => {
          return {
            valueInput: { ...state.valueInput, [`${index}`]: value },
          };
        },
        () => {
          if (!valueInput[index - 1]) {
            this.elRefs[index - 1] && this.elRefs[index - 1]?.current?.focus();
          }
        }
      );
    }
  };

  render() {
    const { valueInput } = this.state;
    const { type, navigation, error } = this.props;
    return (
      <>
        {type !== 'successScreen' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',

                paddingTop: CommonHeights.res25,
                paddingBottom: CommonHeights.res20,
                paddingHorizontal: CommonWidths.res20,
              }}
            >
              <View />
              <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{typeModal[type]?.title}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontWeight: 'bold', fontSize: 19 }}>X</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: CommonWidths.res50,
                textAlign: 'center',
                marginBottom: CommonHeights.res15,
              }}
            >
              {typeModal[type]?.textContent}
            </Text>
            <View style={{ paddingHorizontal: CommonWidths.res20, flexDirection: 'row' }}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <TextInput
                    value={valueInput[`${index}`]}
                    onChangeText={(text) => this.onChangeText(text, index)}
                    key={`${index}_input`}
                    ref={this.elRefs[index]}
                    keyboardType="numeric"
                    maxLength={1}
                    style={{
                      height: CommonWidths.res35,
                      width: CommonWidths.res35,
                      padding: 0,
                      backgroundColor: valueInput[`${index}`] ? '#E8E9EE' : 'white',
                      marginLeft: CommonWidths.res5,
                      borderRadius: 8,
                      textAlign: 'center',
                      fontSize: 20,
                      borderWidth: valueInput[`${index}`] ? 0 : 0.5,
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        !valueInput[`${index}`] &&
                        valueInput[`${index - 1}`]
                      ) {
                        this.elRefs[index - 1] && this.elRefs[index - 1]?.current?.focus();

                        this.setState((state) => {
                          return {
                            valueInput: { ...state.valueInput, [`${index - 1}`]: '' },
                          };
                        });
                      }
                    }}
                  />
                ))}
              {error && type !== 'createCodePin' && (
                <Text
                  style={{
                    color: 'red',
                    position: 'absolute',
                    bottom: -20,
                    left: type === 'verifyOtp' ? 0 : CommonWidths.res25,
                  }}
                >
                  {typeModal[type]?.error}
                </Text>
              )}
            </View>

            {type === 'verifyOtp' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',

                  paddingTop: CommonHeights.res35,
                  paddingBottom: CommonHeights.res20,
                  paddingHorizontal: CommonWidths.res50,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0066B3' }}>
                  Gửi lại OTP
                </Text>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                    OTP hết hạn sau <Text style={{ color: '#F7941D' }}>00:00</Text>
                  </Text>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={{ height: 250, width: 20 }} />
        )}
      </>
    );
  }
}

export default CustomModal;
