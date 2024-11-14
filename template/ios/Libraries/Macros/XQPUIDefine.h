//
//  XQPUIDefine.h
//  xin_quick_pay_app
//
//  Created by fangyong on 2019/10/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef XQPUIDefine_h
#define XQPUIDefine_h

#define SCREENWIDTH [[UIScreen mainScreen] bounds].size.width
#define SCREENHEIGHT [[UIScreen mainScreen] bounds].size.height
#define SCREENBOUNDS [UIScreen mainScreen].bounds

#define HEXCOLOR(hexColor)  [UIColor colorWithRed:((float)((hexColor & 0xFF0000) >> 16))/255.0 green:((float)((hexColor & 0xFF00) >> 8))/255.0 blue:((float)(hexColor & 0xFF))/255.0 alpha:1]
#define HEXCOLORALPHA(hexColor,a)  [UIColor colorWithRed:((float)((hexColor & 0xFF0000) >> 16))/255.0 green:((float)((hexColor & 0xFF00) >> 8))/255.0 blue:((float)(hexColor & 0xFF))/255.0 alpha:a]


#define ApplicationDelegate                 ((AppDelegate *)[[UIApplication sharedApplication] delegate])
#define VIEWSAFEAREAINSETS(view) ({UIEdgeInsets i; if(@available(iOS 11.0, *)) {i = view.safeAreaInsets;} else {i = UIEdgeInsetsZero;} i;})
#define SAFE_AREA_TOP (VIEWSAFEAREAINSETS(ApplicationDelegate.window).top)
#define SAFE_AREA_BOTTOM (VIEWSAFEAREAINSETS(ApplicationDelegate.window).bottom)
#define WS(weakSelf)  __weak __typeof(&*self)weakSelf = self;

//状态栏高度
#define SAFE_AREA_STATUS  [[UIApplication sharedApplication] statusBarFrame].size.height
//导航栏高度
#define SAFE_AREA_NAVI 44
//状态栏加上导航栏的高度
#define SAFE_AREA_TOP_ORIGIN (SAFE_AREA_STATUS+SAFE_AREA_NAVI)
#endif /* XQPUIDefine_h */
