//
//  CorporationAuthCameraVC.h
//  xin_quick_pay_app
//
//  Created by xs on 2023/7/25.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import "XQPBaseViewController.h"
#import "OCRHeader.h"

typedef NS_ENUM(NSInteger, RecogOrientations){
    RecogInHorizontalScreens    = 0,
    RecogInVerticalScreens      = 1,
};
// new orc add 
typedef NS_ENUM(NSInteger, IdCardScanType){
    IdCardScanTypeOnlyFront    = 0, // 只扫描身份证前面
    IdCardScanTypeOnlyBack     = 1, // 只扫描后面
    IdCardScanTypeContinuous   = 2, // 连续前后扫描
};

NS_ASSUME_NONNULL_BEGIN

@protocol CorporationAuthVCDelegate<NSObject>
// 正面背面连扫
- (void)getResultOfIdCardInfo:(NSDictionary *)frontResult backResult:(NSDictionary *)backResult scanType:(NSString *) scanType andResultType:(NSString *)type;
// 单独扫正面
- (void)getResultOfFrontInfomation:(NSDictionary *)frontResult scanType:(NSString *)scanType andResultType:(NSString *)type;
// 单独扫背面
- (void)getResultOfBackInfomation:(NSDictionary *)backResult scanType:(NSString *)scanType andResultType:(NSString *)type;

@end

@interface CorporationAuthCameraVC : XQPBaseViewController<AVCaptureVideoDataOutputSampleBufferDelegate>

@property (nonatomic, retain) CALayer *customLayer;

@property (nonatomic,assign) BOOL isProcessingImage;

@property (strong, nonatomic) AVCaptureSession *session;

@property (strong, nonatomic) AVCaptureDeviceInput *captureInput;

@property (strong, nonatomic) AVCaptureVideoPreviewLayer *preview;

@property (strong, nonatomic) AVCaptureConnection *videoConnection;

@property (assign, nonatomic) RecogOrientations recogOrientation;

@property (assign, nonatomic) IdCardScanType idCardScanType;



@property (assign, nonatomic) int mainID;
@property (assign, nonatomic) int subID;

@property (copy, nonatomic) NSString *typeName;

@property(nonatomic, weak) id<CorporationAuthVCDelegate> delegate;

//“0”- guide frame; “1”- automatic line detection
@property (assign, nonatomic) int cropType;



#pragma mark 客户端新增属性
@property (assign, nonatomic)BOOL isPush;//是否是导航栏过来的
@property (assign, nonatomic)BOOL isStartFormFront;//是否从正面开始
@property (assign, nonatomic)BOOL isTakePhone; // 是否只获取图片不识别

@property (copy, nonatomic) RecogResult recogResult;

- (void)noticeUserRcogStatusWith:(NSString *)massge
                        andFront:(BOOL)isFontOk
                  andIsOtherSize:(BOOL)isOtherSide;

//强制正面面扫描
- (void)beginRecogFromfront;
//强制反面扫描
- (void)beginRecogFromBack;
//从上次记录里开始扫描
- (void)beginRecogFromCurrent;

@end

NS_ASSUME_NONNULL_END
