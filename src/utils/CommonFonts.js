import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'utils/screen';
import colors from './colors';

const type = { base: 'Roboto-Regular' };

const size = {
  res1: responsiveFontSize(1),
  res2: responsiveFontSize(2),
  res3: responsiveFontSize(3),
  res4: responsiveFontSize(4),
  res5: responsiveFontSize(5),
  res6: responsiveFontSize(6),
  res7: responsiveFontSize(7),
  res8: responsiveFontSize(8),
  res9: responsiveFontSize(9),
  res10: responsiveFontSize(10),
  res11: responsiveFontSize(11),
  res12: responsiveFontSize(12),
  res13: responsiveFontSize(13),
  res14: responsiveFontSize(14),
  res15: responsiveFontSize(15),
  res16: responsiveFontSize(16),
  res17: responsiveFontSize(17),
  res18: responsiveFontSize(18),
  res19: responsiveFontSize(19),
  res20: responsiveFontSize(20),
  res21: responsiveFontSize(21),
  res22: responsiveFontSize(22),
  res23: responsiveFontSize(23),
  res24: responsiveFontSize(24),
  res25: responsiveFontSize(25),
  res26: responsiveFontSize(26),
  res27: responsiveFontSize(27),
  res28: responsiveFontSize(28),
  res29: responsiveFontSize(29),
  res30: responsiveFontSize(30),
  header: responsiveFontSize(24),
  title: responsiveFontSize(21),
  subtitle: responsiveFontSize(15),
  regular: responsiveFontSize(14),
  medium: responsiveFontSize(13),
  small: responsiveFontSize(12),
  tiny: responsiveFontSize(10),
};

const weight = {
  regular: '400',
  madium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  maxBold: 'bold',
};

const style = StyleSheet.create({
  header: {
    fontSize: size.res18,
    // fontWeight: weight.bold,
    // color: colors.headerFont,
  },
  title: {
    fontSize: size.title,
    fontWeight: weight.semiBold,
    color: colors.fontTitle,
  },

  subtitle: {
    fontSize: size.res16,
    fontWeight: weight.semiBold,
  },
  subtitleGray: {
    fontSize: size.res16,
    fontWeight: weight.semiBold,
    color: '#686868',
  },
  subtitleBold: {
    fontSize: size.res16,
    fontWeight: weight.maxBold,
  },

  textNormal: {
    fontSize: size.res15,
    fontWeight: weight.regular,
  },
  textNormalGray: {
    fontSize: size.res15,
    fontWeight: weight.regular,
    color: colors.basicText,
  },
  textNormalBold: {
    fontSize: size.res15,
    fontWeight: weight.maxBold,
  },

  text: {
    fontSize: size.res15,
    fontWeight: weight.regular,
  },

  textTitleTiny: {
    fontSize: size.res13,
    fontWeight: weight.regular,
  },
  textTitleTinyGray: {
    fontSize: size.res13,
    fontWeight: weight.regular,
    color: '#686868',
  },

  error: {
    fontSize: size.tiny,
    color: colors.error,
  },
  mainTextTitle: {
    fontSize: size.regular,
    fontWeight: weight.maxBold,
    color: 'gray',
  },
});

export default {
  type,
  size,
  weight,
  style,
};