#import "AppDelegate.h"
#import "RNCConfig.h"
#import <React/RCTBundleURLProvider.h>
#import "RCTPushy.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"app";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // or just fetch the whole config
  NSDictionary *configENV = [RNCConfig env];
  NSLog(@"configENV==%@",configENV);
  NSLog(@"launchOptions---%@", launchOptions);
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// 没有热更新 自带方法
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
//}

// pusy 热更新方法
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  // 原先DEBUG这里的写法不作修改(所以DEBUG模式下不可热更新)
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [RCTPushy bundleURL];  // <--  把这里非DEBUG的情况替换为热更新bundle
#endif
}
 
+ (UIViewController *) getCurrentViewController {

  UIViewController *result = nil;
  UIViewController *rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  do {
    if ([rootVC isKindOfClass:[UINavigationController class]]) {
      UINavigationController *navi = (UINavigationController *)rootVC;
      UIViewController *vc = [navi.viewControllers lastObject];
      result = vc;
      rootVC = vc.presentedViewController;
      continue;
    } else if([rootVC isKindOfClass:[UITabBarController class]]) {
      UITabBarController *tab = (UITabBarController *)rootVC;
      result = tab;
      rootVC = [tab.viewControllers objectAtIndex:tab.selectedIndex];
      continue;
    } else if([rootVC isKindOfClass:[UIViewController class]]) {
      result = rootVC;
      rootVC = nil;
    }
  } while (rootVC != nil);

  return result;
}

@end

