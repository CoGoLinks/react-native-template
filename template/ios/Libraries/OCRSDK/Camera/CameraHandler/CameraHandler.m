//
//  CameraHandler.m
//  xin_quick_pay_app
//
//  Created by fangyong on 2019/10/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CameraHandler.h"
#import <AVFoundation/AVFoundation.h>
typedef void(^AlertBlock)(NSInteger index);

@implementation CameraHandler

/**检测摄像头权限，并且弹框提示*/
/**
 isTakePhoto : 是否是拍照
 */
+ (BOOL)appDeletateShouldCheckCameraJurisdictionWithBlcok:(viewGotoBlock)viewBlock;
{
    if (TARGET_IPHONE_SIMULATOR) return NO;
    
    NSString *cancel;
    NSString *Other;
    if (viewBlock) {
        cancel = @"选择手输";
        Other = @"前去设置";
    }else{
        cancel = nil;
        Other = @"前去设置";
    }
    //相机权限判断
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (authStatus == AVAuthorizationStatusRestricted || authStatus ==AVAuthorizationStatusDenied) {
        //无权限
//      UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"未获得授权使用摄像头" message:@"请在iOS '设置'-'隐私'-'相机'中打开" delegate:weakSelf cancelButtonTitle:cancelButton otherButtonTitles:otherButton, nil];
//      [alert show];
      UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"未获得授权使用摄像头" message:@"请在iOS '设置'-'隐私'-'相机'中打开" delegate:self cancelButtonTitle:@"选择手输" otherButtonTitles:@"前去设置", nil];
      [alert show];

//        [self viewModelAlertWith:nil andTitle:@"未获得授权使用摄像头" andMassge:@"请在iOS '设置'-'隐私'-'相机'中打开" andCompletion:^(NSInteger index) {
//            if (index == 0) {
//                if (cancel.length>0) {//手动填写
//                    viewBlock();
//                }else{//前往设置
//                    [self gotoSetting];
//                }
//            }else if (index == 1){//前往设置
//                [self gotoSetting];
//            }
//        } andCancleButton:cancel andOtherButtons:Other];
//        return NO;
        
    }
    return YES;
}




@end
