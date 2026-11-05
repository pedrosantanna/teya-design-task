// The provider logos on the sign in buttons, as their owners publish them (the shapes are never redrawn).
// Facebook: the white f on its blue disc (brand resources, 2019 logo), in its own colours. Apple: the Apple logo outline from Apple's own SF font (U+F8FF), black or white with the label, as Apple's
// Human Interface Guidelines ask. Google: the four-colour G from Google's sign in branding assets, drawn in its own
// colours (tokens named for the brand), never recoloured. Both are decorative; the button's label names the provider.
import Svg, { Circle, Path } from 'react-native-svg';

const APPLE =
  'M1009 1165Q1031 1165 1084 1158Q1137 1151 1200.5 1118.5Q1264 1086 1316 1011Q1313 1008 1287 989.5Q1261 971 1229 935.5Q1197 900 1173 845.5Q1149 791 1149 716Q1149 630 1179.5 570Q1210 510 1250.5 473.5Q1291 437 1322.5 420Q1354 403 1356 402Q1355 398 1330.5 331Q1306 264 1250 182Q1201 111 1144.5 51Q1088 -9 1009 -9Q956 -9 922 6.5Q888 22 852 37.5Q816 53 755 53Q696 53 656.5 37Q617 21 581.5 5Q546 -11 498 -11Q425 -11 370 47Q315 105 257 186Q190 282 142.5 420.5Q95 559 95 700Q95 851 152 953.5Q209 1056 298.5 1108.5Q388 1161 484 1161Q535 1161 580 1144.5Q625 1128 664.5 1111Q704 1094 736 1094Q767 1094 808 1112Q849 1130 900 1147.5Q951 1165 1009 1165ZM954 1292Q915 1245 856 1213.5Q797 1182 744 1182Q733 1182 723 1184Q722 1187 721 1195Q720 1203 720 1212Q720 1272 746 1328.5Q772 1385 805 1422Q847 1472 911 1505Q975 1538 1033 1540Q1036 1527 1036 1509Q1036 1449 1013 1392.5Q990 1336 954 1292Z';

// The glyph's bounds in font units (y up): 1261 wide, 1551 high.
const APPLE_WIDTH = 1261 / 1551;

export function AppleLogo({ height, color }: { height: number; color: string }) {
  return (
    <Svg width={height * APPLE_WIDTH} height={height} viewBox="95 -1540 1261 1551" accessibilityElementsHidden>
      <Path d={APPLE} transform="scale(1 -1)" fill={color} />
    </Svg>
  );
}

export type GoogleLogoColors = { blue: string; red: string; yellow: string; green: string };

export function GoogleLogo({ size, colors }: { size: number; colors: GoogleLogoColors }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityElementsHidden>
      <Path
        fill={colors.red}
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill={colors.blue}
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill={colors.yellow}
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill={colors.green}
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  );
}

// Facebook's 2019 logo, as its brand resources publish it: the "f" in white on a #1877F2 disc, on a 1024 square.
const FACEBOOK_F =
  'M711.3 660L734 512H592V416C592 375.51 611.84 336 675.44 336H740V210S681.41 200 625.39 200C508.44 200 432 270.88 432 399.2V512H302V660H432V1017.78A517.4 517.4 0 0 0 592 1017.78V660Z';

export function FacebookLogo({ size, blue, f }: { size: number; blue: string; f: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" accessibilityElementsHidden>
      <Circle cx={512} cy={512} r={512} fill={blue} />
      <Path d={FACEBOOK_F} fill={f} />
    </Svg>
  );
}
