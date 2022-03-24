//
//  UIAlertController+OverrideUserInterfaceStyle.swift
//  OverrideColorScheme
//
//  Created by Rajendra Bhochalya on 21/03/22.
//
//  Based on following article by Aruna Kumari Yarra on Method Swizzling
//  https://www.innominds.com/blog/method-swizzling-in-ios-development
//

import Foundation

extension UIAlertController {
  @objc
  dynamic func _overrideUserInterfaceStyle_viewWillAppear(_ animated: Bool) {
    if #available(iOS 13.0, *) {
      if let colorScheme = UserDefaults.standard.string(forKey: "OverrideColorScheme:colorScheme") {
        switch colorScheme {
        case "dark":
          overrideUserInterfaceStyle = .dark
        case "light":
          overrideUserInterfaceStyle = .light;
        default:
          overrideUserInterfaceStyle = .unspecified;
        }
      }
    }
    _overrideUserInterfaceStyle_viewWillAppear(animated)
  }

  @objc
  static func swizzle() {
    // Make sure this isn't a subclass of UIAlertController
    if self != UIAlertController.self {
      return
    }

    let _: () = {
      let originalSelector = #selector(UIAlertController.viewWillAppear(_:))
      let swizzledSelector = #selector(UIAlertController._overrideUserInterfaceStyle_viewWillAppear(_:))
      let originalMethod = class_getInstanceMethod(self, originalSelector)
      let swizzledMethod = class_getInstanceMethod(self, swizzledSelector)
      method_exchangeImplementations(originalMethod!, swizzledMethod!);
    }()
  }
}
