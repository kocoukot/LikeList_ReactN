import { Dimensions, Platform } from 'react-native';

const { height: D_HEIGHT, width: D_WIDTH } = (() => {
  const { width, height } = Dimensions.get('window');
  if (width === 0 && height === 0) {
    return Dimensions.get('screen');
  }
  return { width, height };
})();

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const IS_IPHONE_X = (() => {
  if (Platform.OS === 'web') {
    return false;
  }
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  );
})();

export const rnd = (max = 200) =>
 Math.floor (Math.random() * max);

  function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex() {
  return "#" + componentToHex(rnd()) + componentToHex(rnd()) + componentToHex(rnd());
}
export const generateColor = () =>
  `rgb(${rnd()},${rnd()},${rnd()})`;
