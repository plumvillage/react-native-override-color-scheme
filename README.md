# `react-native-override-color-scheme`

React Native package to let users override the app's color scheme/theme

## Installation

```sh
npm install react-native-override-color-scheme
```

or

```sh
yarn add react-native-override-color-scheme
```

#### RN >= 0.60
If you are using RN >= 0.60, only run `npx pod-install`. Then rebuild your project.

#### iOS
##### Optional support for alerts on iOS
> :warning: By default, overriding the interface style (light or dark) using this package doesn't work for alerts on iOS. We use [method swizzling](https://medium.com/rocknnull/ios-to-swizzle-or-not-to-swizzle-f8b0ed4a1ce6) for the `viewWillAppear` method of `UIAlertController` class which might create problems in some cases (for example, if another package is also swizzling the same class method). That's why we have made this step optional.

To enable this, please follow the steps below:
1. Open your `/ios/{projectName}/AppDelegate.m` file
1. At the top of the file, import the OverrideColorScheme module: `#import <OverrideColorScheme.h>`
1. And then, within your existing `didFinishLaunchingWithOptions` method, add `[OverrideColorScheme enableAlertSupport];` to the top of the method (see below).

```Objective-C

#import <OverrideColorScheme.h> // <--- import

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [OverrideColorScheme enableAlertSupport]; // <--- and add this line
  //...
}
```

#### Android
No additional step is required.

## Usage

```js
import overrideColorScheme from 'react-native-override-color-scheme';

// ...

overrideColorScheme.setScheme('dark'); // or `light` or `undefined` for system default
```

See the [example](example) for advanced use cases.
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
