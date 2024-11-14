//
//  CameraHandler.h
//  xin_quick_pay_app
//
//  Created by fangyong on 2019/10/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef void(^viewGotoBlock)(void);


@interface CameraHandler : NSObject

+ (BOOL)appDeletateShouldCheckCameraJurisdictionWithBlcok:(viewGotoBlock)viewBlock;

@end

