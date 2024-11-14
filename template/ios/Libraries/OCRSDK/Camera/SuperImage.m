//
//  SuperImage.m
//  PMPos
//
//  Created by 289124787@qq.com on 2017/8/31.
//  Copyright © 2017年 Vbill Payment Co., Ltd. All rights reserved.
//

#import "SuperImage.h"

@implementation SuperImage


+ (nullable SuperImage *)imageNamed:(NSString *)name
{
    return (SuperImage *)[super imageNamed:name];
}

//创建一个透明的图片
+ (UIImage *)getAlphalImage
{
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(36, 36), NO, 0.0);
    UIImage *blank = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return blank;
}
@end
