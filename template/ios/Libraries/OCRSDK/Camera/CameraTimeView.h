//
//  CameraTimeView.h
//  PMPos
//
//  Created by 289124787@qq.com on 2017/3/15.
//  Copyright © 2017年 Vbill Payment Co., Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CameraTimeView : UIView

@property(nonatomic,retain)UIColor *rectColor;//圆环颜色
@property(nonatomic,retain)UIColor *rectBGColor;//圆环暗色

@property(nonatomic,retain)UIColor *timeColor;//时间颜色
@property(nonatomic,assign)NSInteger timeStr;//时间

@property(nonatomic,assign)CGFloat prosess;//外圈反弧度


@end
