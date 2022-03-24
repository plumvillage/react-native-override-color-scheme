import { ColorSchemeName, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-override-color-scheme' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const OverrideColorScheme = NativeModules.OverrideColorScheme
  ? NativeModules.OverrideColorScheme
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function setScheme(scheme: ColorSchemeName): Promise<null> {
  return OverrideColorScheme.setScheme(scheme);
}

const overrideColorScheme = {
  setScheme,
};

export default overrideColorScheme;
