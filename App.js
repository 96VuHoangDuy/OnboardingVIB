/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, View, LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
// Ignore all log notifications

import CommonStyles from 'utils/CommonStyles';
import RootNavigator from 'navigator';
import type { Node } from 'react';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <View style={CommonStyles.flex1}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
};

export default App;
