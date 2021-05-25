import { StyleSheet } from 'react-native';
import CommonHeights from 'utils/CommonHeights';
import Screen from 'utils/screen';
import CommonFonts from 'utils/CommonFonts';
import CommonWidths from 'utils/CommonWidths';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  imageSpaceman: {
    height: CommonHeights.res300,
    width: Screen.width + 2,
  },
  containerHeaderLoginSuccess: {
    paddingTop: Screen.safeTopPadding,

    alignItems: 'center',
  },
  contentHeaderLoginSuccess: {
    flexDirection: 'row',
    paddingHorizontal: CommonWidths.res20,
    paddingTop: 10,
  },
  viewTitle: {
    width: '100%',
    marginTop: CommonHeights.res50,
    marginBottom: CommonHeights.res60,

    justifyContent: 'center',
    alignContent: 'center',

    paddingHorizontal: CommonWidths.res20,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: CommonFonts.size.res18,
    flexWrap: 'wrap',

    fontWeight: '400',
    color: 'white',

    justifyContent: 'center',
  },

  viewDrawer: { flex: 1, paddingTop: CommonHeights.res8 },

  imageDrawer: { height: CommonHeights.res15, width: CommonHeights.res24 },

  viewLogoVIB: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  imageTextVIB: { height: CommonHeights.res43, width: CommonWidths.res95 },
  imageIconVIB: {
    height: CommonHeights.res39,
    width: CommonWidths.res45,
    marginTop: -CommonHeights.res30,
  },

  viewLocale: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -CommonHeights.res10,
    height: CommonHeights.res50,
  },

  imageGlobal: {
    height: CommonHeights.res20,
    width: CommonHeights.res20,
    marginRight: CommonWidths.res5,
  },

  textLocale: { color: 'white', fontSize: CommonFonts.size.res14 },
});
