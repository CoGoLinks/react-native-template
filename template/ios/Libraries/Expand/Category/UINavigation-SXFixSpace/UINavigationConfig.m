//
//  UINavigationConfig.m
//  UINavigation-SXFixSpace
//
//  Created by charles on 2018/4/20.
//  Copyright © 2018年 None. All rights reserved.
//

#import "UINavigationConfig.h"

@implementation UINavigationConfig

+(instancetype)shared {
    static UINavigationConfig *config;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        config = [[self alloc] init];
        if (@available(iOS 11.0, *)) {
            config.sx_defaultFixSpaceLeft = 5.0;
        }else {
            config.sx_defaultFixSpaceLeft = 10.0;
        }
        config.sx_defaultFixSpaceRight = 15.0;
    });
    return config;
}

@end
