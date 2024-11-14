//
//  OCRHeader.h
//  PMPos
//
//  Created by 289124787@qq.com on 2018/7/30.
//  Copyright © 2018年 Vbill Payment Co., Ltd. All rights reserved.
//

#ifndef OCRHeader_h
#define OCRHeader_h
// Include any system framework and library headers here that should be included in all compilation units.
// You will also need to set the Prefix Header build setting of one or more of your targets to reference this file.

#define IS_IPAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

#define kFocalScale 1.0

//This development code and the authorization under this project is just used for demo
#define kDevcode @"6ZQP6KGM5LUY77Y"

#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
#define kScreenScale [UIScreen mainScreen].scale

#define kScale kScreenWidth * kScreenScale / 750.0

#define kSafeTopHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 44:0)
#define kSafeBottomHeight ((kScreenHeight==812.0&&kScreenWidth==375.0) ? 34:0)
#define kSafeLRX ((kScreenWidth==812.0&&kScreenHeight==375.0) ? 44:0)
#define kSafeBY ((kScreenWidth==812.0&&kScreenHeight==375.0) ? 21:0)
#define kSafeTopHasNavHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 88:30)
#define kSafeTopNoNavHeight ((kScreenHeight==812.0&&kScreenWidth==375.0)? 44:0)

#define kResolutionWidth 1280.0
#define kResolutionHeight 720.0

typedef NS_ENUM(NSUInteger, OCRRecogResultStatus) {
    OCRRecogResultStatus_cancell =0,
    OCRRecogResultStatus_recogFaild = 1,
    OCRRecogResultStatus_recogSucess =2,
    OCRRecogResultStatus_recogEdit   =3,//点击了编辑按钮
};

typedef void(^RecogResult)(OCRRecogResultStatus status,id result);

#endif /* OCRHeader_h */
