/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image } from 'react-native';
import CommonStyles from 'utils/CommonStyles';
import CommonFonts from 'utils/CommonFonts';
import styles from '../styles';

const HeaderLoginSuccessScreen = () => {
  return (
    <View style={styles.containerHeaderLoginSuccess}>
      <View style={styles.contentHeaderLoginSuccess}>
        <View style={styles.viewDrawer}>
          <Image
            resizeMode="cover"
            source={require('../../../asset/image/drawer_icon.png')}
            style={styles.imageDrawer}
          />
        </View>
        <View style={styles.viewLogoVIB}>
          <Image
            resizeMode="contain"
            source={require('../../../asset/image/VIB_Text_Logo.png')}
            style={styles.imageTextVIB}
          />
          <Image
            resizeMode="contain"
            source={require('../../../asset/image/VIB_Icon.png')}
            style={styles.imageIconVIB}
          />
        </View>
        <View style={CommonStyles.flex1}>
          <View style={styles.viewLocale}>
            <Image source={require('../../../asset/image/Global.png')} style={styles.imageGlobal} />
            <Text style={styles.textLocale}>English</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewTitle}>
        <Text style={styles.textTitle}>
          Chào mừng <Text style={{ fontWeight: CommonFonts.weight.maxBold }}>KIEU ANH NGUYEN</Text>
        </Text>
        <Text style={styles.textTitle}>
          đến với <Text style={{ fontWeight: CommonFonts.weight.maxBold }}>MyVIB </Text>!
        </Text>
      </View>
    </View>
  );
};

export default HeaderLoginSuccessScreen;
