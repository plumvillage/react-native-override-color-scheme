#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OverrideColorScheme, NSObject)

RCT_EXTERN_METHOD(setScheme:(NSString)colorScheme
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
