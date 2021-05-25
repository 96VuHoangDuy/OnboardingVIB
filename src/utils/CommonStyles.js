import { StyleSheet } from 'react-native';
import Colors from 'utils/colors';

const CommonStyles = StyleSheet.create({
  flex1: { flex: 1 },

  container: {
    flex: 1,
    backgroundColor: Colors.morningWhite,
  },

  absolute: StyleSheet.absoluteFillObject,

  flex1Center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CommonStyles;
