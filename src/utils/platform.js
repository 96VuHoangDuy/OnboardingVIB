import { Platform as NativePlatform } from 'react-native';

const PLATFORM = NativePlatform.OS;
const isAndroid = PLATFORM === 'android';
const isIos = PLATFORM === 'ios';
const iosVersion = isIos ? NativePlatform.Version : 0;
const KeyboardEvent = {
  Show: isIos ? 'keyboardWillShow' : 'keyboardDidShow',
  Hide: isIos ? 'keyboardWillHide' : 'keyboardDidHide',
};
const androidAPILevel = isAndroid ? NativePlatform.Version : 0;
const ConnectionEvent = 'connectionChange';

const isDev = !!global.__DEV__;
const isProduction = !isDev;

const Platform = {
  ConnectionEvent,
  iosVersion,
  isAndroid,
  isDev,
  isIos,
  isProduction,
  KeyboardEvent,
  OS: PLATFORM,
  androidAPILevel,
};

export default Platform;
