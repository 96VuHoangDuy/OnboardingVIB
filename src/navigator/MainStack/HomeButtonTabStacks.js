/* eslint-disable react/jsx-props-no-spreading */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import LoginSuccessScreen from 'screen/LoginSuccessScreen';
import CustomHomeButtonTabs from './CustomHomeButtonTabStacks';

enableScreens();

const Stack = createBottomTabNavigator();

const HomeButtonTabStacks = () => {
  return (
    <Stack.Navigator
      tabBar={(props) => <CustomHomeButtonTabs {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginSuccessScreen2"
    >
      <Stack.Screen name="LoginSuccessScreen" component={LoginSuccessScreen} />
      <Stack.Screen name="LoginSuccessScreen2" component={LoginSuccessScreen} />
      <Stack.Screen name="LoginSuccessScreen3" component={LoginSuccessScreen} />
    </Stack.Navigator>
  );
};

export default HomeButtonTabStacks;
