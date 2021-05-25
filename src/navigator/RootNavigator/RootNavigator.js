import React from 'react';
import { enableScreens } from 'react-native-screens';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeButtonTabStacks from 'navigator/MainStack/HomeButtonTabStacks';
import ModalAddPinCode from 'screen/ModalAddPinCode/ModalAddPinCode';

enableScreens();

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        stackPresentation: 'transparentModal',
        stackAnimation: 'fade',
        contentStyle: {
          backgroundColor: 'rgba(79, 79, 79, 0.9)',
        },
      }}
      containedTransparentModal
      initialRouteName="HomeButtonTabStacks"
    >
      <Stack.Screen name="HomeButtonTabStacks" component={HomeButtonTabStacks} />
      <Stack.Screen name="ModalAddPinCode" component={ModalAddPinCode} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
