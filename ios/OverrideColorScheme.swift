import UIKit

@objc(OverrideColorScheme)
class OverrideColorScheme: NSObject {

  @objc(setScheme:withResolver:withRejecter:)
  func setScheme(colorScheme: NSString?,
                 resolve: @escaping RCTPromiseResolveBlock,
                 reject: @escaping RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      if #available(iOS 13.0, *) {
        UserDefaults.standard.set(colorScheme, forKey: "OverrideColorScheme:colorScheme")
        if let window = UIApplication.shared.delegate?.window! {
          switch colorScheme {
          case "dark":
            window.overrideUserInterfaceStyle = .dark
          case "light":
            window.overrideUserInterfaceStyle = .light;
          default:
            window.overrideUserInterfaceStyle = .unspecified;
          }
        }
      }
      resolve(nil)
    }
  }

  @objc
  static func enableAlertSupport() {
    UIAlertController.swizzle()
  }
}
