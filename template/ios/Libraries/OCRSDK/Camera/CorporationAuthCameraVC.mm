//
//  CorporationAuthCameraVC.m
//  xin_quick_pay_app
//
//  Created by xs on 2023/7/25.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import "CorporationAuthCameraVC.h"
#import "IDCardOverView.h"
#import "IDCardSlideLine.h"
#import "CameraTimeView.h"
#import "StringDefine.h"
#import "SuperImage.h"
#import "CameraHandler.h"
#import "AppDelegate.h"
#import "XQPUIDefine.h"

#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
#import "IDCardOCR.h"
#endif


#define IDCardFront @"IDCardFront"
#define IDCardBack @"IDCardBack"
// 手持照片
#define IDCardHeaderImagePath @"IDCardHeaderImagePath"
// 身份证裁剪后的图
#define IDCardFrontImagePath @"IDCardFrontImagePath"
#define IDCardBackImagePath @"IDCardBackImagePath"

// 原图
#define IDCardFrontOrigPath @"IDCardFrontOrigPath"
#define IDCardBackOrigPath @"IDCardBackOrigPath"


#define SCAN_SECONDS 20

typedef enum : NSUInteger {
  IDCardRecogerStep_willBegin     =100,//将要开始
  IDCardRecogerStep_frontFaid     =101,//正面检测失败
  IDCardRecogerStep_frontSecsess  =102,//正面检测成功
  IDCardRecogerStep_SecondFaid    =103,//反面失败
} IDCardRecogerStep;

@interface CorporationAuthCameraVC ()<UIAlertViewDelegate,UIImagePickerControllerDelegate, UINavigationControllerDelegate>{
  
  NSTimer *_progressTime;//进度条的定时器
  NSInteger _lastTime;// 剩下的时间
  BOOL _isFrontOk;//正面是否成功
  BOOL _switchBack;
  IDCardOverView *_overView;
  BOOL _on;
  CAShapeLayer *_maskWithHole;
  AVCaptureDevice *_device;
  BOOL _isFoucePixel;
  int _sliderAllLine;
  int _confimCount;
  int _maxCount;
  int _pixelLensCount;
  float _isIOS8AndFoucePixelLensPosition;
  float _aLensPosition;
  UIButton *_lightspotSwitch;
  BOOL _lightspotOn;
  UILabel *_lightspotLabel;
  UILabel *_scanspotLabel;
  // 裁剪后的图
  NSString *_frontCropImagePath;
  NSString *_backCropImagePath;
  // 原图
  NSString *_frontOrigImagePath;
  NSString *_backOrigImagePath;
  NSString *_headImagePath;
  int _recogReuslt;
  //新增参数
  IDCardRecogerStep _recogerStep;
  
  int _errorCount; // 照片识别2次，显示提示
}

#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
@property (strong, nonatomic) IDCardOCR *cardRecog;
#endif
@property (nonatomic, strong) UIImagePickerController *imagePickerController;
@property (assign, nonatomic) BOOL adjustingFocus;
@property (nonatomic, strong) UIButton *photographButton; // 拍照按钮
@property (nonatomic, strong) UILabel *titleLabel; // 第一行标题
@property (nonatomic, strong) UILabel *detailLabel; // 子标题
@property (nonatomic, strong) UIImageView *frontOkView;
@property (nonatomic, strong) UIImageView *chinaPeopleView;
@property (nonatomic, strong) UIImageView *chinaIconView;
@property (nonatomic, strong) UIView *tipsView; //提示弹窗
@property (nonatomic, strong) UILabel *outTimeLabel;
@property (nonatomic, strong) UILabel *otherWaylabel; //其他方式label
@property (nonatomic, strong) UIButton *photoImageBtn;
@property (nonatomic, strong) UIButton *photoLabelBtn;
@property (nonatomic, strong) UIButton *backBtn;
@property (nonatomic, strong) UIButton *flashBtn;
@property (nonatomic, strong) UILabel *lightspotLabel;
@property (nonatomic, strong) CameraTimeView *progressView; // 计时器相关， 暂时不用
@property (strong, nonatomic) NSMutableDictionary *frontDictionary;
@property (strong, nonatomic) NSMutableDictionary *backDictionary;

-(void)readyToGetImageEx:(UIImage *)image isSelectedImage:(BOOL) isSelectedImage;

@end

@implementation CorporationAuthCameraVC

- (BOOL)isCheckFront{
  return ((_recogerStep == 100)||(_recogerStep == 101));
}

- (BOOL)isCheckBack{
  return ((_recogerStep == 102)||(_recogerStep == 103));
}

-(void)dealloc{
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
  //free the recognition core
  [_progressTime invalidate];
  _progressTime = nil;
  [_cardRecog recogFree];
#endif
}

// 拍照按键 默认不隐藏
- (UIButton *)photographButton {
  if (!_photographButton) {
    CGFloat overViewBottom = CGRectGetMaxY([self setOverViewSmallRect]);
    _photographButton = [[UIButton alloc]initWithFrame:CGRectMake((SCREENWIDTH-166)/2, overViewBottom + 70, 166, 42)];
    [_photographButton addTarget:self action:@selector(takePicture:) forControlEvents:UIControlEventTouchUpInside];
    [_photographButton setImage:[UIImage imageNamed:@"takePicture"] forState:UIControlStateNormal];
    _photographButton.hidden = NO;
    
    CABasicAnimation *pulseAnimation = [CABasicAnimation animationWithKeyPath:@"transform.scale"];
    pulseAnimation.duration = .7;
    pulseAnimation.toValue = [NSNumber numberWithFloat:1.15];
    pulseAnimation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    pulseAnimation.autoreverses = YES;
    pulseAnimation.repeatCount = 3;
    [_photographButton.layer addAnimation:pulseAnimation forKey:nil];
  }
  return _photographButton;
}
// 扫描框上面的提示框
- (UILabel *)titleLabel {
  if (!_titleLabel) {
    _titleLabel = [[UILabel alloc] init];
    CGRect overViewRect = [self setOverViewSmallRect];
    CGFloat overViewTop = CGRectGetMinY(overViewRect);
    _titleLabel.frame = CGRectMake(0, overViewTop-50, kScreenWidth, 30);
    _titleLabel.backgroundColor = [UIColor clearColor];
    _titleLabel.textColor = [UIColor whiteColor];
    _titleLabel.textAlignment = NSTextAlignmentCenter;
    _titleLabel.text = IDCARD_SCAN;
    _titleLabel.font = [UIFont systemFontOfSize:17];
  }
  return _titleLabel;
}
// 扫描框底下的提示框
- (UILabel *)detailLabel {
  if (!_detailLabel) {
    CGRect overViewRect = [self setOverViewSmallRect];
    CGFloat overViewBottom = CGRectGetMaxY(overViewRect);
    _detailLabel = [[UILabel alloc] init];
    _detailLabel.frame = CGRectMake(0, overViewBottom+12, kScreenWidth, 30);
    _detailLabel.backgroundColor = [UIColor clearColor];
    _detailLabel.textColor = [UIColor whiteColor];
    _detailLabel.textAlignment = NSTextAlignmentCenter;
    _detailLabel.font = [UIFont systemFontOfSize:13];
    _detailLabel.text = IDCARD_SCAN_TIPS;
  }
  return _detailLabel;
}
// 光斑提示label
- (UILabel *)lightspotLabel {
  if (!_lightspotLabel) {
    _lightspotLabel = [[UILabel alloc] init];
    CGRect overViewRect = [self setOverViewSmallRect];
    CGFloat overViewBottom = CGRectGetMaxY(overViewRect);
    _lightspotLabel.frame = CGRectMake(0, overViewBottom+33, kScreenWidth, 30);
    _lightspotLabel.backgroundColor = [UIColor clearColor];
    _lightspotLabel.textColor = [UIColor whiteColor];
    _lightspotLabel.text = FACULA_CHECKED;
    _lightspotLabel.font = [UIFont systemFontOfSize:13];
    _lightspotLabel.textAlignment = NSTextAlignmentCenter;
    _lightspotLabel.hidden = YES;
  }
  return _lightspotLabel;
}


// 身份证人头图标
- (UIImageView *)chinaPeopleView {
  if (!_chinaPeopleView) {
    CGRect overViewRect = [self setOverViewSmallRect];
    CGPoint overViewCenter = CGPointMake(CGRectGetMidX(overViewRect), CGRectGetMidY(overViewRect));
    CGFloat overViewRight = CGRectGetMaxX(overViewRect);
    _chinaPeopleView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    _chinaPeopleView.frame = CGRectMake(overViewRight-130, overViewCenter.y-60, 112, 109);
    _chinaPeopleView.image = [SuperImage imageNamed:@"chinapeopleicon"];
    _chinaPeopleView.hidden = NO;
  }
  return _chinaPeopleView;
}
// 身份证国徽图标
- (UIImageView *)chinaIconView {
  if (!_chinaIconView) {
    CGRect overViewRect = [self setOverViewSmallRect];
    CGFloat overViewTop = CGRectGetMinY(overViewRect);
    CGFloat overViewLeft = CGRectGetMinX(overViewRect);
    _chinaIconView = [[UIImageView alloc] initWithFrame:CGRectMake(overViewLeft+20, overViewTop+20, 68, 77)];
    _chinaIconView.image = [SuperImage imageNamed:@"chinaPhoto"];
    _chinaIconView.hidden = NO;
  }
  return _chinaIconView;
}
// 提示
- (UIView *)tipsView {
  if (!_tipsView) {
    
    _tipsView = [[UIView alloc] initWithFrame:self.view.bounds];
    _tipsView.backgroundColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.3];
    
    CGRect overViewRect = [self setOverViewSmallRect];
    CGPoint overViewCenter = CGPointMake(CGRectGetMidX(overViewRect), CGRectGetMidY(overViewRect));
    UIImageView *tipsImaageView = [[UIImageView alloc] initWithFrame:CGRectMake(overViewCenter.x-277/2, overViewCenter.y-299/2, 277, 299)];
    tipsImaageView.image = [SuperImage imageNamed:@"scanTips"];
    [_tipsView addSubview:tipsImaageView];
    
    UIButton *cancelButton = [[UIButton alloc]initWithFrame:CGRectMake(tipsImaageView.frame.origin.x,tipsImaageView.frame.origin.y+tipsImaageView.frame.size.height-50, 140, 50)];
    [cancelButton addTarget:self action:@selector(cancelTipsView:) forControlEvents:UIControlEventTouchUpInside];
    [cancelButton setTitle:@"继续拍照" forState:UIControlStateNormal];
    cancelButton.font = [UIFont systemFontOfSize:16];
    [cancelButton setTitleColor:[UIColor colorWithRed:120/255.0 green:123/255.0 blue:128/255.0 alpha:1.0] forState:UIControlStateNormal];
    [_tipsView addSubview:cancelButton];
    [_tipsView bringSubviewToFront:cancelButton];
    
    UIButton *inputButton = [[UIButton alloc]initWithFrame:CGRectMake(tipsImaageView.frame.origin.x+140,tipsImaageView.frame.origin.y+tipsImaageView.frame.size.height-50, 140, 50)];
    [inputButton addTarget:self action:@selector(manualIdCardAction:) forControlEvents:UIControlEventTouchUpInside];
    [inputButton setTitle:@"手填信息" forState:UIControlStateNormal];
    inputButton.font = [UIFont systemFontOfSize:16];
    [inputButton setTitleColor:[UIColor colorWithRed:51/255.0 green:153/255.0 blue:255/255.0 alpha:1.0] forState:UIControlStateNormal];
    [_tipsView addSubview:inputButton];
    [_tipsView bringSubviewToFront:inputButton];
    _tipsView.hidden = YES;
    
  }
  return _tipsView;
}


// 这个应该是时间label
- (UILabel *)outTimeLabel {
  if (!_outTimeLabel) {
    _outTimeLabel = [[UILabel alloc] init];
    _outTimeLabel.frame = self.view.bounds;
    _outTimeLabel.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:.5];
    _outTimeLabel.textColor = [UIColor whiteColor];
    _outTimeLabel.textAlignment = NSTextAlignmentCenter;
    _outTimeLabel.font = [UIFont boldSystemFontOfSize:15];
    _outTimeLabel.text = @"";
    _outTimeLabel.hidden = YES;
    _outTimeLabel.numberOfLines = 0;
    _outTimeLabel.backgroundColor = [UIColor lightGrayColor];
  }
  return _outTimeLabel;
}

// 扫描框底下的提示框
- (UILabel *) otherWaylabel {
  if (!_otherWaylabel) {
    
    NSString *text = @"其他上传方式";
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:text];
    // 设置文本的属性
    [attributedString addAttribute:NSForegroundColorAttributeName value:[UIColor colorWithRed:100.0/255.0 green:100.0/255.0 blue:100.0/255.0 alpha:1.0] range:NSMakeRange(0, attributedString.length)];
    [attributedString addAttribute:NSFontAttributeName value:[UIFont systemFontOfSize:12]   range:NSMakeRange(0, attributedString.length)];
    
    // 创建NSParagraphStyle并设置对齐方式为居中
    NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
    paragraphStyle.alignment = NSTextAlignmentCenter;
    
    // 将NSParagraphStyle应用于整个字符串
    [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:NSMakeRange(0, attributedString.length)];
    
    _otherWaylabel = [[UILabel alloc] init];
    _otherWaylabel.frame = CGRectMake(0,(kScreenHeight-158-SAFE_AREA_BOTTOM),kScreenWidth, 30);
    _otherWaylabel.backgroundColor = [UIColor clearColor];
    _otherWaylabel.textColor = [UIColor colorWithRed:100.0/255.0 green:100.0/255.0 blue:100.0/255.0 alpha:1.0];
    _otherWaylabel.textAlignment = NSTextAlignmentCenter;
    _otherWaylabel.font = [UIFont systemFontOfSize:13];
    _otherWaylabel.attributedText = attributedString;
    
    UIFont *textFont = [UIFont systemFontOfSize:12]; // 设置UILabel的字体大小
    CGSize constraintSize = CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX); // 设置UILabel的最大尺寸
    
    NSDictionary *textAttributes = @{ NSFontAttributeName: textFont };
    CGRect textRect = [text boundingRectWithSize:constraintSize options:NSStringDrawingUsesLineFragmentOrigin attributes:textAttributes context:nil];
    
    CGFloat textWidth = ceil(CGRectGetWidth(textRect));
    
    // 添加左边线条
    CALayer *leftLine = [CALayer layer];
    leftLine.backgroundColor = [UIColor colorWithRed:100.0/255.0 green:100.0/255.0 blue:100.0/255.0 alpha:1.0].CGColor;
    leftLine.frame = CGRectMake(0, 15, (kScreenWidth-textWidth)/2-5, 0.5);
    [_otherWaylabel.layer addSublayer:leftLine];
    
    // 添加右边线条
    CALayer *rightLine = [CALayer layer];
    rightLine.backgroundColor = [UIColor colorWithRed:100.0/255.0 green:100.0/255.0 blue:100.0/255.0 alpha:1.0].CGColor;
    rightLine.frame = CGRectMake((kScreenWidth+textWidth)/2+5, 15, (kScreenWidth-textWidth)/2, 0.5);
    [_otherWaylabel.layer addSublayer:rightLine];
  }
  return _otherWaylabel;
}

// 从相册选择
- (UIButton *)photoImageBtn {
  if (!_photoImageBtn) {
    _photoImageBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    _photoImageBtn.frame = CGRectMake((SCREENWIDTH-55)/2,(kScreenHeight-114-SAFE_AREA_BOTTOM),55, 55);
    [_photoImageBtn setImage:[UIImage imageNamed:@"phoneAlbum"] forState:UIControlStateNormal];
    [_photoImageBtn addTarget:self action:@selector(openPhotoAlbumSelectPhoto) forControlEvents:UIControlEventTouchUpInside];
    [_photoImageBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateHighlighted];
  }
  return _photoImageBtn;
}
// 从相册选择
- (UIButton *)photoLabelBtn {
  if (!_photoLabelBtn) {
    _photoLabelBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    _photoLabelBtn.frame = CGRectMake(0,(kScreenHeight-66-SAFE_AREA_BOTTOM),kScreenWidth, 50);
    [_photoLabelBtn setTitle:@"相册" forState:UIControlStateNormal];
    _photoLabelBtn.font = [UIFont systemFontOfSize:14];
    [_photoLabelBtn addTarget:self action:@selector(openPhotoAlbumSelectPhoto) forControlEvents:UIControlEventTouchUpInside];
    [_photoLabelBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateHighlighted];
  }
  return _photoLabelBtn;
}
// 返回按钮
- (UIButton *)backBtn {
  if (!_backBtn) {
    CGFloat sTopHeight =SAFE_AREA_STATUS + 15;
    _backBtn = [[UIButton alloc]initWithFrame:CGRectMake(15+kSafeLRX,sTopHeight, 40, 40)];
    [_backBtn addTarget:self action:@selector(backAction) forControlEvents:UIControlEventTouchUpInside];
    [_backBtn setImage:[UIImage imageNamed:@"backIcon"] forState:UIControlStateNormal];
    _backBtn.titleLabel.textAlignment = NSTextAlignmentLeft;
  }
  return _backBtn;
}
// 闪光灯
- (UIButton *)flashBtn {
  if (!_flashBtn) {
    CGFloat sTopHeight =SAFE_AREA_STATUS + 15;
    _flashBtn = [[UIButton alloc]initWithFrame:CGRectMake(kScreenWidth-50-kSafeLRX,sTopHeight, 40, 40)];
    [_flashBtn setImage:[UIImage imageNamed:@"plusflashclose"] forState:UIControlStateNormal];
    [_flashBtn setImage:[UIImage imageNamed:@"plusflashopen"] forState:UIControlStateSelected];
    [_flashBtn addTarget:self action:@selector(flashBtn:) forControlEvents:UIControlEventTouchUpInside];
  }
  return _flashBtn;
}

- (UIImageView *)frontOkView {
  if (!_frontOkView) {
    _frontOkView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    _frontOkView.center = self.view.center;
    _frontOkView.image = [SuperImage imageNamed:@"authfrontsucess"];
    _frontOkView.hidden = YES;
  }
  return _frontOkView;
}


- (void) viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  //hide navigationBar
  self.navigationController.navigationBarHidden = YES;
  //reset
  _pixelLensCount = 0;
  _confimCount = 0;
  _errorCount = 0;
  self.isProcessingImage = NO;
  [_overView setLeftHidden:NO];
  [_overView setRightHidden:NO];
  [_overView setBottomHidden:NO];
  [_overView setTopHidden:NO];
  
  AVCaptureDevice *camDevice =[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
  int flags = NSKeyValueObservingOptionNew;
  [camDevice addObserver:self forKeyPath:@"adjustingFocus" options:flags context:nil];
  if (_isFoucePixel) {
    [camDevice addObserver:self forKeyPath:@"lensPosition" options:flags context:nil];
  }
  //start session
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    [self->_session startRunning];
  });
  _lastTime = SCAN_SECONDS;
  // 这个按钮一直显示了, 就不启动定时器了
  if (_photographButton.hidden) {
    [self setTimer];
  }
  //    if (![CameraHandler appDeletateShouldCheckCameraJurisdictionWithBlcok:^{
  //        [self createPhoto];
  //    }])
  [self touchRecog];
}

- (void) viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  
  // remove NSNotification
  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
  AVCaptureDevice*camDevice =[AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
  [camDevice removeObserver:self forKeyPath:@"adjustingFocus"];
  if (_isFoucePixel) {
    [camDevice removeObserver:self forKeyPath:@"lensPosition"];
  }
  //stop session
  [self.session stopRunning];
  [_progressTime invalidate];
  _progressView.hidden = YES;
}
-(void)observeValueForKeyPath:(NSString*)keyPath ofObject:(id)object change:(NSDictionary*)change context:(void*)context {
  if([keyPath isEqualToString:@"adjustingFocus"]){
    self.adjustingFocus =[[change objectForKey:NSKeyValueChangeNewKey] isEqualToNumber:[NSNumber numberWithInt:1]];
  }
  if([keyPath isEqualToString:@"lensPosition"]){
    _isIOS8AndFoucePixelLensPosition =[[change objectForKey:NSKeyValueChangeNewKey] floatValue];
  }
}

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  self.view.backgroundColor = [UIColor blackColor];
  //set image path
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = paths[0];
  // 裁剪后的图
  _frontCropImagePath = [documentsDirectory stringByAppendingPathComponent:@"frontCropImg.jpg"];
  _backCropImagePath = [documentsDirectory stringByAppendingPathComponent:@"bankCropImg.jpg"];
  // 原图
  _frontOrigImagePath = [documentsDirectory stringByAppendingPathComponent:@"frontOrigImg.jpg"];
  _backOrigImagePath = [documentsDirectory stringByAppendingPathComponent:@"bankOrigImg.jpg"];
  // 手持身份证
  _headImagePath = [documentsDirectory stringByAppendingPathComponent:@"headImg.jpg"];
  _maxCount = 1;
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device
  // Initialize the camera
  [self initialize];
  
  // Initialize the recognition core
  [self initRecog];
  
#endif
  // Create widget of camera screen
  [self createCameraView];
  
  if (self.isStartFormFront) {
    _recogerStep = IDCardRecogerStep_willBegin;
  }else{
    [self beginRecogFromBack];
  }
}

- (void)noticeUserRcogStatusWith:(NSString *)massge
                        andFront:(BOOL)isFrontOk
                  andIsOtherSize:(BOOL)isOtherSide
{
  if (isFrontOk){
    _frontOkView.hidden = NO;
    _titleLabel.hidden = YES;
    _outTimeLabel.hidden = YES;
  }else if (isOtherSide){
    _frontOkView.hidden = YES;
    _titleLabel.hidden = NO;
    _outTimeLabel.hidden = NO;
    _outTimeLabel.text = massge;
  }else{
    _frontOkView.hidden = YES;
    _outTimeLabel.hidden = YES;
    _titleLabel.hidden = NO;
    _detailLabel.hidden = NO;
  }
}

#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device

- (void) initRecog{

  self.cardRecog = [[IDCardOCR alloc] init];
  
  /*Acquire system language, load Chinese templates under Chinese system environment, and load English templates under non-Chinese system environment.
   Under English template, the field name is in English. For example, for Chinese field name “姓名”, the responsible English template is “Name”*/
  NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
  NSArray * allLanguages = [defaults objectForKey:@"AppleLanguages"];
  int initLanguages;
  NSString * preferredLang = [allLanguages objectAtIndex:0];
  if ([preferredLang rangeOfString:@"zh"].length > 0) {
    initLanguages = 0;
  }else{
    initLanguages = 3;
  }
  
  /*Notice: This development code and the authorization under this project is just used for demo and please replace the  code and .lsc file under Copy Bundle Resources */
  int intRecog = [self.cardRecog InitIDCardWithDevcode:kDevcode recogLanguage:initLanguages];
  
  [self setRecongConfiguration];
  
  
}
- (void)setRecongConfiguration{
  
  //set recognition pattern
  if (self.mainID ==3000) { //Machine readable zone
    [self.cardRecog setIDCardIDWithMainID:1033 subID:0 subIDCount:1];
    [self.cardRecog addIDCardIDWithMainID:1034 subID:0 subIDCount:1];
    [self.cardRecog addIDCardIDWithMainID:1036 subID:0 subIDCount:1];
  }else if(self.mainID ==2) { //Chinese ID card
    [self.cardRecog setIDCardIDWithMainID:self.mainID subID:0 subIDCount:1];
    [self.cardRecog addIDCardIDWithMainID:3 subID:0 subIDCount:1];
  }else{
    [self.cardRecog setIDCardIDWithMainID:self.mainID subID:self.subID subIDCount:1];
  }
  
  //set video stream crop type
  [self.cardRecog setVideoStreamCropTypeExWithType:self.cropType];
  
  //set picture clear value
  [self.cardRecog setPictureClearValueEx:80];
  
  if (self.mainID == 3000) {
    //Machine readable zone
    [_cardRecog setParameterWithMode:1 CardType:1033];
  }else{
    [_cardRecog setParameterWithMode:1 CardType:self.mainID];
  }
  //Set up document type for Chinese ID card (0-both sides; 1-obverse side; 2-reverse side)
  [self.cardRecog SetDetectIDCardType:0];
  
  //set rejection
  [self.cardRecog setIDCardRejectType:self.mainID isSet:true];
  
  //set roi
  CGFloat sTop=0.0, sBottom=0.0, sLeft=0.0, sRight=0.0;
  CGRect rect = [self setOverViewSmallRect];
  UIDeviceOrientation currentDeviceOrientatin = [self orientationFormInterfaceOrientation];
  NSDictionary *roiInfo = [self setRoiForDeviceOrientation:currentDeviceOrientatin roiRect:rect];
  NSLog(@"setRoiForDeviceOrientation ==%@",roiInfo);
  sTop = [roiInfo[@"sTop"] floatValue];
  sBottom = [roiInfo[@"sBottom"] floatValue];
  sLeft = [roiInfo[@"sLeft"] floatValue];
  sRight = [roiInfo[@"sRight"] floatValue];
  [self.cardRecog setROIWithLeft:(int)sLeft Top:(int)sTop Right:(int)sRight Bottom:(int)sBottom];
  
  //set recognition orientation
  if (self.recogOrientation == RecogInHorizontalScreens) {
    [self.cardRecog setRecogRotateType:0];
  }else{
    [self.cardRecog setRecogRotateType:1];
  }
}
#endif

- (BOOL) isAuthorized {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
    // Judge camera authorization
    NSString *mediaType = AVMediaTypeVideo;
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:mediaType];
    if(authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){
      [self alertMessage];
      return NO;
    }
  }
  return YES;
}

// Initialize camera
- (void) initialize{
  if(![self isAuthorized]) {
    return;
  }
  
  //1. Create conversation layer
  self.session = [[AVCaptureSession alloc] init];
  // Set image quality, this resolution if the optimal for recognition, it is best not to change
  [self.session setSessionPreset:AVCaptureSessionPreset1280x720];
  
  //2. Create, configure input device
  NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
  
  for (AVCaptureDevice *device in devices){
    if (device.position == AVCaptureDevicePositionBack){
      _device = device;
      self.captureInput = [AVCaptureDeviceInput deviceInputWithDevice:device error:nil];
    }
  }
  if ([self.session canAddInput:self.captureInput]) {
    [self.session addInput:self.captureInput];
  }
  
  //3.Create and configure preview output device
  AVCaptureVideoDataOutput *captureOutput = [[AVCaptureVideoDataOutput alloc] init];
  captureOutput.alwaysDiscardsLateVideoFrames = YES;
  
  dispatch_queue_t queue;
  queue = dispatch_queue_create("cameraQueue", NULL);
  [captureOutput setSampleBufferDelegate:self queue:queue];
  
  NSString* key = (NSString*)kCVPixelBufferPixelFormatTypeKey;
  NSNumber* value = [NSNumber numberWithUnsignedInt:kCVPixelFormatType_32BGRA];
  NSDictionary* videoSettings = [NSDictionary dictionaryWithObject:value forKey:key];
  [captureOutput setVideoSettings:videoSettings];
  [self.session addOutput:captureOutput];
  
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
    AVCaptureDeviceFormat *deviceFormat = _device.activeFormat;
    if (deviceFormat.autoFocusSystem == AVCaptureAutoFocusSystemPhaseDetection){
      _isFoucePixel = YES;
      _maxCount = 1;
    }
  }
  
  //4.Preview setting
  self.preview = [AVCaptureVideoPreviewLayer layerWithSession: self.session];
  self.preview.frame = CGRectMake(0, 0, kScreenWidth, kScreenHeight);
  [self.preview setAffineTransform:CGAffineTransformMakeScale(kFocalScale, kFocalScale)];
  self.preview.videoGravity = AVLayerVideoGravityResizeAspectFill;
  [self.view.layer addSublayer:self.preview];
  
  for (AVCaptureConnection *connection in captureOutput.connections) {
    for (AVCaptureInputPort *port in [connection inputPorts]) {
      if ([[port mediaType] isEqual:AVMediaTypeVideo] ) {
        self.videoConnection = connection;
        break;
      }
    }
    if (self.videoConnection) { break; }
  }
  //set  orientation
  UIDeviceOrientation currentDeviceOrientatin = [self orientationFormInterfaceOrientation];
  AVCaptureVideoOrientation currentVideoOrientation = [self avOrientationForDeviceOrientation:currentDeviceOrientatin];
  //NSLog(@"%ld  %ld",(long)deviceOrientation,(long)currentDeviceOrientatin);
  self.videoConnection.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
  self.preview.connection.videoOrientation = currentVideoOrientation;
  //[self.videoConnection setPreferredVideoStabilizationMode:AVCaptureVideoStabilizationModeAuto];
}

#pragma mark --------------------AVCaptureSession delegate----------------------------
#if TARGET_IPHONE_SIMULATOR//simulator
#elif TARGET_OS_IPHONE//device

- (void)captureOutput:(AVCaptureOutput *)captureOutput
didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
       fromConnection:(AVCaptureConnection *)connection{
  
  if (self.isProcessingImage) {
    self.isProcessingImage = NO;
    AudioServicesPlaySystemSound(1108);
    UIImage *tempImage = [self imageFromSampleBuffer:sampleBuffer];
    [self readyToGetImageEx:tempImage isSelectedImage:NO];
    return;
  }
}


- (UIImage *) croppedImageWithFrame:(UIImage *) originalImage {
  
  CGSize rotatedSize = CGSizeMake(originalImage.size.height, originalImage.size.width);
  UIGraphicsBeginImageContext(rotatedSize);
  CGContextRef context = UIGraphicsGetCurrentContext();
  CGContextTranslateCTM(context, rotatedSize.width/2, rotatedSize.height/2);
  CGContextRotateCTM(context, M_PI_2);
  [originalImage drawInRect:CGRectMake(-originalImage.size.width/2, -originalImage.size.height/2, originalImage.size.width, originalImage.size.height)];
  UIImage *rotatedImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  CGFloat screenWidth = originalImage.size.width; // 照片的宽度
  CGFloat screenScale = screenWidth/ 750.0;

  CGRect frame = CGRectZero;
  
  if (kScreenWidth <= 375 && kScreenHeight <= 667) {
      NSLog(@"当前设备分辨率为750x1134");
      // 在这里执行相应操作
    frame = CGRectMake(10*kScale, 320*kScale, 680*kScale, 470*kScale); // 自定义裁剪区域
  } else {
      NSLog(@"当前设备分辨率不是750x1134");
    frame = CGRectMake(45*kScale, 205*kScale, 372*kScale, 282*kScale); // 自定义裁剪区域
  }
  // 裁剪图片
  CGImageRef imageRef = CGImageCreateWithImageInRect([rotatedImage CGImage], frame);
  UIImage *croppedImage = [UIImage imageWithCGImage:imageRef];
  // 释放资源
  CGImageRelease(imageRef);
  return croppedImage;
}

-(void)readyToGetImageEx:(UIImage *)image isSelectedImage:(BOOL) isSelectedImage{
  
  // 只获取图片
  if (self.isTakePhone) {
    if ([self isCheckFront]) {//正在检测正面
      // 如果是选择的图片不做裁剪
      UIImage *croppedImage = isSelectedImage ? image : [self croppedImageWithFrame:image];
      [UIImageJPEGRepresentation(croppedImage, 1.0f) writeToFile:_frontCropImagePath atomically:YES];
      [UIImageJPEGRepresentation(image, 1.0f) writeToFile:_frontOrigImagePath atomically:YES];
      _frontDictionary = [NSMutableDictionary dictionary];
      [_frontDictionary setObject:@{@"front":_frontCropImagePath}  forKey:IDCardFrontImagePath];
      [_frontDictionary setObject:@{@"frontOrig":_frontOrigImagePath}  forKey:IDCardFrontOrigPath];
      if(_idCardScanType == IdCardScanTypeOnlyFront) {
        if ([self.delegate respondsToSelector:@selector(getResultOfFrontInfomation:scanType:andResultType:)]) {
          [self.delegate getResultOfFrontInfomation:[_frontDictionary copy] scanType:@"0" andResultType:@"SUCCESS"];
        }
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.navigationController dismissViewControllerAnimated:YES completion:nil];
        });
      }
    }else if([self isCheckBack]){ //正在检测反面
      // 如果是选择的图片不做裁剪
      UIImage *croppedImage = isSelectedImage ? image : [self croppedImageWithFrame:image];
      // 裁剪后的图
      [UIImageJPEGRepresentation(croppedImage, 1.0f) writeToFile:_backCropImagePath atomically:YES];
      // 原图
      [UIImageJPEGRepresentation(image, 1.0f) writeToFile:_backOrigImagePath atomically:YES];
      _backDictionary = [NSMutableDictionary dictionary];
      // 裁剪后的图
      [_backDictionary setValue:@{@"back":_backCropImagePath} forKey:IDCardBackImagePath];//反面
      // 原图
      [_backDictionary setValue:@{@"backOrig":_backOrigImagePath} forKey:IDCardBackOrigPath];//反面
      if(_idCardScanType == IdCardScanTypeOnlyBack) {
        if ([self.delegate respondsToSelector:@selector(getResultOfBackInfomation:scanType:andResultType:)]) {
          [self.delegate getResultOfBackInfomation:[_backDictionary copy] scanType:@"0" andResultType:@"SUCCESS"];
        }
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.navigationController dismissViewControllerAnimated:YES completion:nil];
        });
      }
    }
  }else {
    //save original image
    [UIImageJPEGRepresentation(image, 1.0f) writeToFile:_backCropImagePath atomically:YES];
    [self.cardRecog setIDCardRejectType:self.mainID isSet:true];
    //set Parameter and recog type
    [self.cardRecog setParameterWithMode:0 CardType:self.mainID];
    //set image preproccess
    [self.cardRecog processImageWithProcessType:7 setType:1];
    //load image
    int loadImage = [self.cardRecog LoadImageToMemoryWithFileName:_backCropImagePath Type:0];
    
    int recog=-1;
    if (self.mainID != 3000) {
      if (self.mainID == 2) {
        // determine the reverse and obverse sides of Chinese second-generation ID card
        recog = [self.cardRecog autoRecogChineseID];
        
      }else{
        // recognize documents without MRZ
        recog = [self.cardRecog recogIDCardWithMainID:self.mainID];
        
      }
    }
    // 图片内没有身份证信息
    if (recog==-6) {
      
      [self setRecongConfiguration];
      self.isProcessingImage = NO;
      _errorCount ++;
      
      if(_errorCount>=2) {
        dispatch_async(dispatch_get_main_queue(), ^{
          self->_tipsView.hidden = NO;
        });
        return;
      }else {
        if(_isFrontOk) {
          [self showToast:@"身份证国徽识别有误，请重新上传"];
        }else {
          [self showToast:@"身份证人像面识别有误，请重新上传"];
        }
        return;
      }
    }
    //stop session
    [_session stopRunning];
    //get recognition result
    dispatch_async(dispatch_get_main_queue(), ^{
      [self getRecogResult];
    });
    //reset the recognition core
    [self setRecongConfiguration];
    
    self.isProcessingImage = NO;
  }
}
// OCR 自动识别代码。 现在不用了， 2023年09月18日19:57:44
-(void)readyToRecog{
  
  _recogReuslt = -6;
  
  if (self.mainID == 3000) {
    // recognize MRZ
    _recogReuslt = [self.cardRecog recogIDCardWithMainID:_sliderAllLine subID:self.subID];//
  }else if(self.mainID == 2){
    // determine the reverse and obverse sides of Chinese second-generation ID card
    _recogReuslt = [self.cardRecog autoRecogChineseID];
  }else{
    // recognize documents without MRZ
    _recogReuslt = [self.cardRecog recogIDCardWithMainID:self.mainID subID:self.subID];//[self.cardRecog recogIDCardWithMainID:self.mainID];
  }
  
  if (_recogReuslt>0) {
    //stop session
    [_session stopRunning];
    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
    dispatch_sync(dispatch_get_main_queue(), ^{
      [self getRecogResult];
    });
  }
}
- (void)getRecogResult{
  
  [_progressTime setFireDate:[NSDate distantFuture]];
  NSString *allResult = @"";
  BOOL hasHead = NO;
  if (self.mainID != 3000) {
    // save the cut image to headImagePath
    int save =[self.cardRecog saveHeaderImage:_headImagePath];
    hasHead = (save == 0);
    for (int i = 1; i < 30; i++) {
      // acquire fields value
      NSString *field = [self.cardRecog GetFieldNameWithIndex:i];
      if (!field) {break;}
      // acquire fields result
      NSString *result = [self.cardRecog GetRecogResultWithIndex:i];
      if (field!=nil && result!=nil) {
        allResult = [allResult stringByAppendingString:[NSString stringWithFormat:@"%@:%@\n", field, result]];
      }
    }
  }
  // 通过判断是否具有头像来判断正反面
  //  [self cameraViewShouldChangeChinaIconWith:NO andPeopleIcon:NO];
  if (![allResult isEqualToString:@""]) {
    if ([self isCheckFront]) {//正在检测正面
      if (hasHead) {//确认此时正在检测正面
        [self.cardRecog saveImage:_frontCropImagePath];
        _recogerStep = IDCardRecogerStep_frontSecsess;
        //        [self noticeUserRcogStatusWith:IDCARD_FRONT_SCAN_SUCCESS andFront:YES andIsOtherSize:YES];
        
        _frontDictionary = [NSMutableDictionary dictionary];
        [_frontDictionary setObject:[self dicFromString:allResult] forKey:IDCardFront];
        [_frontDictionary setObject:@{@"header":_headImagePath} forKey:IDCardHeaderImagePath];
        [_frontDictionary setObject:@{@"front":_frontCropImagePath}  forKey:IDCardFrontImagePath];
        //      姓名:苏婷婷
        //      性别:女
        //      民族:汉
        //      出生:1998-06-10
        //      住址:黑龙江省绥化市北林区连岗乡永合村2组81号
        //      公民身份号码:123456
        
        NSDictionary *dic = [_frontDictionary objectForKey:IDCardFront];
        
        if (![dic[@"姓名"] isEqualToString:@""] && ![dic[@"性别"] isEqualToString:@""] && ![dic[@"公民身份号码"] isEqualToString:@""] ) {
          _isFrontOk = YES;
          _switchBack = YES;
          // new ocr add
          // 单独拍正面
          if(_idCardScanType == IdCardScanTypeOnlyFront) {
            if ([self.delegate respondsToSelector:@selector(getResultOfFrontInfomation:scanType:andResultType:)]) {
              [self.delegate getResultOfFrontInfomation:[_frontDictionary copy] scanType:@"0" andResultType:@"SUCCESS"];
            }
            dispatch_async(dispatch_get_main_queue(), ^{
              [self.navigationController dismissViewControllerAnimated:YES completion:nil];
            });
          }else if (_idCardScanType == IdCardScanTypeContinuous) {
            // 开始检测后面身份证 new ocr add
            // 正面拍完拍反面
            [self beginRecogFromBack];
          }
          [self showToast:@"人像面 上传成功"];
        } else {
          _recogerStep = IDCardRecogerStep_frontFaid;
          [self showToast:@"请将身份证人像面放于屏幕中间重新扫描"];
          if (!_session.isRunning) {//如果正在扫描，则不做处理
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
              [self->_session startRunning];
            });
          }
        }
      }else{
        //提示用户正面检测
        _recogerStep = IDCardRecogerStep_frontFaid;
        [self showToast:@"请将身份证人像面放于屏幕中间重新扫描"];
        if (!_session.isRunning) {//如果正在扫描，则不做处理
          dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            [self->_session startRunning];
          });
        }
        // OCR升级， 下面代码不执行
        if (_photographButton.hidden) {
          [_progressTime setFireDate:[NSDate date]];
        }
      }
    }else if([self isCheckBack]){ //正在检测反面
      if (!hasHead) {//确认此时正在检测反面
        [self.cardRecog saveImage:_backCropImagePath];
        //        [self noticeUserRcogStatusWith:IDCARD_BEHIND_CENTER_RESCAN andFront:NO andIsOtherSize:YES];
        //      签发机关:绥化市公安局北林分局
        //      有效期限:20180219-20280219
        //      签发日期:2018-02-19
        //      有效期至:2028-02-19
        
        _backDictionary = [NSMutableDictionary dictionary];
        [_backDictionary setValue:[self dicFromString:allResult] forKey:IDCardBack];
        [_backDictionary setValue:@{@"back":_backCropImagePath} forKey:IDCardBackImagePath];//反面
        
        NSDictionary *dic = [_backDictionary objectForKey:IDCardBack];
        
        if (![dic[@"签发日期"] isEqualToString:@""] && ![dic[@"有效期至"] isEqualToString:@""] ) {
          // new ocr add
          // 单独拍正面
          if(_idCardScanType == IdCardScanTypeOnlyBack) {
            if ([self.delegate respondsToSelector:@selector(getResultOfBackInfomation:scanType:andResultType:)]) {
              [self.delegate getResultOfBackInfomation:[_backDictionary copy] scanType:@"0" andResultType:@"SUCCESS"];
            }
            
          }else if (_idCardScanType == IdCardScanTypeContinuous) {
            if ([self.delegate respondsToSelector:@selector(getResultOfIdCardInfo:backResult:scanType:andResultType:)]) {
              [self.delegate getResultOfIdCardInfo:[_frontDictionary copy] backResult:[_backDictionary copy]  scanType:@"0" andResultType:@"SUCCESS"];
            }
          }
          [self showToast:@"国徽面 上传成功"];
          dispatch_async(dispatch_get_main_queue(), ^{
            [self.navigationController dismissViewControllerAnimated:YES completion:nil];
          });
        } else {
          _recogerStep = IDCardRecogerStep_SecondFaid;
          [self showToast:@"请将身份证国徽面放于屏幕中间重新扫描"];
          if (!_session.isRunning) {//如果正在扫描，则不做处理
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
              [self->_session startRunning];
            });
          }
        }
      }else{//提示用户反面检测
        _recogerStep = IDCardRecogerStep_SecondFaid;
        [self showToast:@"请将身份证国徽面放于屏幕中间重新扫描"];
        if (!_session.isRunning) {//如果正在扫描，则不做处理
          dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            [self->_session startRunning];
          });
        }
      }
    }else{
      dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [self->_session startRunning];
      });
    }
  }else{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      [self->_session startRunning];
    });
  }
}

- (NSDictionary *)dicFromString:(NSString *)dataStr
{
  NSArray *dataArr = [dataStr componentsSeparatedByString:@"\n"];
  NSMutableDictionary *dic = [NSMutableDictionary new];
  for (NSString *item in dataArr) {
    NSArray *subItem = [item componentsSeparatedByString:@":"];
    if (subItem.count>=2) {
      [dic setObject:subItem[1] forKey:subItem[0]];
    }
  }
  return [NSDictionary dictionaryWithDictionary:dic];
}


#pragma mark 每次保存图像数据时，清除以往的文件
- (BOOL)clearDiskImageWithPath:(NSString *)imagePath
{
  NSError *error;
  if ([[NSFileManager defaultManager] fileExistsAtPath:imagePath]) {
    BOOL sesess =[[NSFileManager defaultManager] removeItemAtPath:imagePath error:&error];
    return sesess;
  }
  return YES;
}
#endif

//Get image from sampleBuffer
- (UIImage *) imageFromSampleBuffer:(CMSampleBufferRef) sampleBuffer{
  CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
  CVPixelBufferLockBaseAddress(imageBuffer, 0);
  void *baseAddress = CVPixelBufferGetBaseAddress(imageBuffer);
  size_t bytesPerRow = CVPixelBufferGetBytesPerRow(imageBuffer);
  size_t width = CVPixelBufferGetWidth(imageBuffer);
  size_t height = CVPixelBufferGetHeight(imageBuffer);
  CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
  CGContextRef context = CGBitmapContextCreate(baseAddress, width, height, 8,
                                               bytesPerRow, colorSpace, kCGBitmapByteOrder32Little | kCGImageAlphaPremultipliedFirst);
  CGImageRef quartzImage = CGBitmapContextCreateImage(context);
  CVPixelBufferUnlockBaseAddress(imageBuffer,0);
  CGContextRelease(context);
  CGColorSpaceRelease(colorSpace);
  UIImage *image = [UIImage imageWithCGImage:quartzImage scale:1.0f orientation:UIImageOrientationUp];
  CGImageRelease(quartzImage);
  
  //裁切预览时检边框区域图片
  CGRect tempRect = [self setOverViewSmallRect];
  CGFloat tWidth = (kFocalScale-1)*kScreenWidth*0.5;
  CGFloat tHeight = (kFocalScale-1)*kScreenHeight*0.5;
  //previewLayer上点坐标
  CGPoint pLTopPoint = CGPointMake((CGRectGetMinX(tempRect)+tWidth)/kFocalScale, (CGRectGetMinY(tempRect)+tHeight)/kFocalScale);
  CGPoint pRDownPoint = CGPointMake((CGRectGetMaxX(tempRect)+tWidth)/kFocalScale, (CGRectGetMaxY(tempRect)+tHeight)/kFocalScale);
  CGPoint pRTopPoint = CGPointMake((CGRectGetMaxX(tempRect)+tWidth)/kFocalScale, (CGRectGetMinY(tempRect)+tHeight)/kFocalScale);
  //CGPoint pLDownPoint = CGPointMake((CGRectGetMinX(tempRect)+tWidth)/kFocalScale, (CGRectGetMaxY(tempRect)+tHeight)/kFocalScale);
  
  //真实图片点坐标
  CGPoint iLTopPoint = [_preview captureDevicePointOfInterestForPoint:pRTopPoint];
  CGPoint iLDownPoint = [_preview captureDevicePointOfInterestForPoint:pLTopPoint];
  CGPoint iRTopPoint = [_preview captureDevicePointOfInterestForPoint:pRDownPoint];
  //CGPoint iRDownPoint = [_preview captureDevicePointOfInterestForPoint:pLDownPoint];
  
  CGFloat y = iLTopPoint.y*kResolutionHeight;
  CGFloat x = iLTopPoint.x*kResolutionWidth;
  CGFloat w = (iRTopPoint.x-iLTopPoint.x)*kResolutionWidth;
  CGFloat h = (iLDownPoint.y-iLTopPoint.y)*kResolutionHeight;
  CGRect rect = CGRectMake(x, y, w, h);
  
  CGImageRef imageRef = image.CGImage;
  CGImageRef subImageRef = CGImageCreateWithImageInRect(imageRef, rect);
  UIGraphicsBeginImageContext(rect.size);
  CGContextRef context1 = UIGraphicsGetCurrentContext();
  CGContextDrawImage(context1, rect, subImageRef);
  //UIImage *image1 = [UIImage imageWithCGImage:subImageRef];
  UIGraphicsEndImageContext();
  CGImageRelease(subImageRef);
  return (image);
}
// Create camera screen
- (void)createCameraView{
  CGRect rect = [self setOverViewSmallRect];
  NSArray *points = [self getFourPoints:rect];
  _overView = [[IDCardOverView alloc] initWithFrame:self.view.bounds];
  _overView.cropType = self.cropType;
  [_overView setFourePoints:points];
  _overView.backgroundColor = [UIColor clearColor];
  _overView.center = self.view.center;
  [self.view addSubview:_overView];
  if (self.cropType==0) {
    [self drawShapeLayerWithSmallFrame:points];
  }
  [self creatButtons:rect];
}
- (void)creatButtons:(CGRect) rect{
  
  [self.view addSubview:self.progressView];
  [self.view addSubview:self.titleLabel];
  [self.view addSubview:self.detailLabel];
  [self.view addSubview:self.photographButton];
  [self.view addSubview:self.chinaPeopleView];
  [self.view addSubview:self.chinaIconView];
  [self.view addSubview:self.outTimeLabel];
  [self.view addSubview:self.otherWaylabel];
  [self.view addSubview:self.photoImageBtn];
  [self.view addSubview:self.photoLabelBtn];
  [self.view addSubview:self.backBtn];
  [self.view addSubview:self.flashBtn];
  [self.view addSubview:self.lightspotLabel];
  [self.view addSubview:self.tipsView];
  [self.view bringSubviewToFront:self.tipsView];
  [self cameraViewShouldChangeChinaIconWith:NO andPeopleIcon:YES];
}



#pragma mark 控制国徽和人物的显示和隐藏
- (void)cameraViewShouldChangeChinaIconWith:(BOOL)showChinaIcon
                              andPeopleIcon:(BOOL)showChinaPeopleIcon
{
  _chinaIconView.hidden = !showChinaIcon;
  _chinaPeopleView.hidden = !showChinaPeopleIcon;
}
#pragma mark 点击屏幕重新识别
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
  [super touchesBegan:touches withEvent:event];
  if (_isFrontOk && _switchBack) {
    _switchBack = NO;
    _photographButton.hidden = NO;
    // 一直显示拍照按钮
    //        [self setTimer];
  }
  if (_session.isRunning) {//如果正在扫描，则不做处理
    return;
  }
  [self touchRecog];
}

#pragma mark 重新识别
- (void)touchRecog
{
  if (_photographButton.hidden ) {
    _lastTime = SCAN_SECONDS;
    [_progressTime setFireDate:[NSDate date]];
  }
  if ([self isCheckFront]) {//正在检测正面
    if (_photographButton.hidden) {
      _titleLabel.text = IDCARD_SCAN;
      [self noticeUserRcogStatusWith:SET_IDCARD_FRONT_DARKVIEW andFront:NO andIsOtherSize:NO];
    }else {
      _titleLabel.text = IDCARD_FRONT_TAKEPIC;
      [self noticeUserRcogStatusWith:SET_IDCARD_FRONT_CENTER andFront:NO andIsOtherSize:NO];
    }
    [self cameraViewShouldChangeChinaIconWith:NO andPeopleIcon:YES];
  }else if ([self isCheckBack]){//在检测反面
    if (_photographButton.hidden) {
      _titleLabel.text = IDCARD_SCAN;
      [self noticeUserRcogStatusWith:SET_IDCARD_BEHIND_DARKVIEW andFront:NO andIsOtherSize:NO];
    }else {
      _titleLabel.text = IDCARD_BACK_TAKEPIC;
      [self noticeUserRcogStatusWith:SET_IDCARD_BEHIND_CENTER andFront:NO andIsOtherSize:NO];
    }
    [self cameraViewShouldChangeChinaIconWith:YES andPeopleIcon:NO];
  }
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    [self->_session startRunning];
  });
}

- (CGPoint)realImageTranslateToScreenCoordinate:(CGPoint)point{
  
  CGFloat tWidth = (kFocalScale-1)*kScreenWidth*0.5;
  CGFloat tHeight = (kFocalScale-1)*kScreenHeight*0.5;
  CGPoint tempPoint = CGPointMake(point.x/kResolutionWidth, point.y/kResolutionHeight);
  CGPoint previewPoint = [self.preview pointForCaptureDevicePointOfInterest:tempPoint];
  previewPoint = CGPointMake((previewPoint.x-tWidth)*kFocalScale+tWidth, (previewPoint.y-tHeight)*kFocalScale+tHeight);
  
  return previewPoint;
}

- (NSArray *)getSmallRectConnersWithConners:(NSDictionary *)conners{
  
  CGPoint point1= CGPointMake(0, 0);
  CGPoint point2= CGPointMake(0, kScreenHeight);
  CGPoint point3= CGPointMake(kScreenWidth, kScreenHeight);
  CGPoint point4= CGPointMake(kScreenWidth,0);
  
  int isS = [conners[@"isSucceed"] intValue];
  if (isS==1) {
    point1 = [self realImageTranslateToScreenCoordinate:CGPointFromString([conners objectForKey:@"point1"])];
    point2 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point2"])];
    point3 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point3"])];
    point4 = [self realImageTranslateToScreenCoordinate: CGPointFromString([conners objectForKey:@"point4"])];
  }
  NSArray *points = @[NSStringFromCGPoint(point1),NSStringFromCGPoint(point2),NSStringFromCGPoint(point3),NSStringFromCGPoint(point4)];
  
  return points;
}

- (void) drawShapeLayerWithSmallFrame:(NSArray *)points{
  
  CGPoint point1 = CGPointFromString(points[0]);
  CGPoint point2 = CGPointFromString(points[1]);
  CGPoint point3 = CGPointFromString(points[2]);
  CGPoint point4 = CGPointFromString(points[3]);
  
  if (!_maskWithHole) {
    _maskWithHole = [CAShapeLayer layer];
    [self.view.layer addSublayer:_maskWithHole];
    [self.view.layer setMasksToBounds:YES];
  }
  // Both frames are defined in the same coordinate system
  CGRect biggerRect = CGRectMake(0, 0, kScreenWidth, kScreenHeight);//self.view.bounds;
  CGFloat offset = 1.0f;
  if ([[UIScreen mainScreen] scale] >= 2) {
    offset = 0.5;
  }
  //CGRect smallerRect = CGRectInset(smallFrame, -offset, -offset) ;
  UIBezierPath *maskPath = [UIBezierPath bezierPath];
  [maskPath moveToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMinY(biggerRect))];
  [maskPath addLineToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMaxY(biggerRect))];
  [maskPath addLineToPoint:CGPointMake(CGRectGetMaxX(biggerRect), CGRectGetMaxY(biggerRect))];
  [maskPath addLineToPoint:CGPointMake(CGRectGetMaxX(biggerRect), CGRectGetMinY(biggerRect))];
  [maskPath addLineToPoint:CGPointMake(CGRectGetMinX(biggerRect), CGRectGetMinY(biggerRect))];
  
  [maskPath moveToPoint:point1];
  [maskPath addLineToPoint:point2];
  [maskPath addLineToPoint:point3];
  [maskPath addLineToPoint:point4];
  [maskPath addLineToPoint:point1];
  [_maskWithHole setPath:[maskPath CGPath]];
  [_maskWithHole setFillRule:kCAFillRuleEvenOdd];
  if (self.cropType==0) {
    [_maskWithHole setFillColor:[[UIColor blackColor]colorWithAlphaComponent:.8].CGColor];
    
  }else{
    [_maskWithHole setFillColor:[[UIColor colorWithWhite:0.5 alpha:0.5] CGColor]];
  }
}

#pragma mark --------------------ButtonAction----------------------------
- (void)backAction{
  if(_idCardScanType == IdCardScanTypeOnlyFront){
    if ([self.delegate respondsToSelector:@selector(getResultOfFrontInfomation:scanType:andResultType:)]) {
      [self.delegate getResultOfFrontInfomation:@{} scanType:@"0" andResultType:@"CANCEL"];
    }
  }else if(_idCardScanType == IdCardScanTypeOnlyBack){
    if ([self.delegate respondsToSelector:@selector(getResultOfBackInfomation:scanType:andResultType:)]) {
      [self.delegate getResultOfBackInfomation:@{} scanType:@"0" andResultType:@"CANCEL"];
    }
  }else if(_idCardScanType == IdCardScanTypeContinuous){
    if ([self.delegate respondsToSelector:@selector(getResultOfIdCardInfo:backResult:scanType:andResultType:)]) {
      [self.delegate getResultOfIdCardInfo:@{} backResult:@{} scanType:@"0" andResultType:@"CANCEL"];
    }
  }
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
  });
}
// 隐藏提示信息
- (void)cancelTipsView:(UIButton *)sender{
  _errorCount = 0;
  _tipsView.hidden = YES;
}

- (void)manualIdCardAction:(UIButton *)sender{
  
  if(_idCardScanType == IdCardScanTypeOnlyFront){
    if ([self.delegate respondsToSelector:@selector(getResultOfFrontInfomation:scanType:andResultType:)]) {
      [self.delegate getResultOfFrontInfomation:@{} scanType:@"0" andResultType:@"MANUAL"];
    }
  }else if(_idCardScanType == IdCardScanTypeOnlyBack){
    if ([self.delegate respondsToSelector:@selector(getResultOfBackInfomation:scanType:andResultType:)]) {
      [self.delegate getResultOfBackInfomation:@{} scanType:@"0" andResultType:@"MANUAL"];
    }
  }else if(_idCardScanType == IdCardScanTypeContinuous){
    if ([self.delegate respondsToSelector:@selector(getResultOfIdCardInfo:backResult:scanType:andResultType:)]) {
      [self.delegate getResultOfIdCardInfo:@{} backResult:@{} scanType:@"0" andResultType:@"MANUAL"];
    }
  }
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
  });
}

- (void)flashBtn:(UIButton *)sender{
  NSLog(@"闪光灯");
  AVCaptureDevice *device = [self cameraWithPosition:AVCaptureDevicePositionBack];
  if (![device hasTorch]) {
    //        NSLog(@"no torch");
  }else{
    [device lockForConfiguration:nil];
    if (!_on) {
      [device setTorchMode: AVCaptureTorchModeOn];
      _on = YES;
    }else{
      [device setTorchMode: AVCaptureTorchModeOff];
      _on = NO;
    }
    sender.selected = _on;
    [device unlockForConfiguration];
  }
}

- (void)takePicture:(UIButton *)sender {
  if(![self isAuthorized]) {
    return;
  }
  self.isProcessingImage = YES;
}

- (void)openPhotoAlbum{
  NSLog(@"openPhotoAlbum");
  //  __block typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.navigationController dismissViewControllerAnimated:YES completion:^{
      if(self->_idCardScanType == IdCardScanTypeOnlyFront){
        if ([self.delegate respondsToSelector:@selector(getResultOfFrontInfomation:scanType:andResultType:)]) {
          [self.delegate getResultOfFrontInfomation:@{} scanType:@"1" andResultType:@"SUCCESS"];
        }
      }else if(self->_idCardScanType == IdCardScanTypeOnlyBack){
        if ([self.delegate respondsToSelector:@selector(getResultOfBackInfomation:scanType:andResultType:)]) {
          [self.delegate getResultOfBackInfomation:@{} scanType:@"1" andResultType:@"SUCCESS"];
        }
      }else if(self->_idCardScanType == IdCardScanTypeContinuous){
        if ([self.delegate respondsToSelector:@selector(getResultOfIdCardInfo:backResult:scanType:andResultType:)]) {
          [self.delegate getResultOfIdCardInfo:@{} backResult:@{} scanType:@"1" andResultType:@"SUCCESS"];
        }
      }
    }];
  });
}

// 打开相册选择照片
- (void)openPhotoAlbumSelectPhoto{
  if([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypePhotoLibrary]) {
    if (!self.imagePickerController) {
      self.imagePickerController = [[UIImagePickerController alloc] init];
      self.imagePickerController.delegate = self;
    }
    
    self.imagePickerController.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    [self presentViewController:self.imagePickerController animated:YES completion:nil];
  }else {
    [self alertMessage];
  }
}

- (void) alertMessage {
  //创建对象
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"提示" message:@"没有权限访问您的相册，请在设置中开启相册访问权限。" preferredStyle:UIAlertControllerStyleAlert];
  //添加取消类型按钮
  [alertController addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    NSLog(@"点击取消");
  }]];
  //添加常规类型按钮
  [alertController addAction:[UIAlertAction actionWithTitle:@"去设置" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    NSLog(@"点击确认");
    NSURL *settingsURL = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
    if ([[UIApplication sharedApplication] canOpenURL:settingsURL]) {
      [[UIApplication sharedApplication] openURL:settingsURL];
    }
  }]];
  //显示
  [self presentViewController:alertController animated:YES completion:nil];
}

// UIImagePickerControllerDelegate方法 - 用户选择了照片
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<UIImagePickerControllerInfoKey,id> *)info {
  UIImage *selectedImage = info[UIImagePickerControllerOriginalImage];
  // 在这里处理选择的照片
  // 可以将其设置为ImageView的image等等
  [self readyToGetImageEx:selectedImage isSelectedImage:YES];
  [self dismissViewControllerAnimated:YES completion:nil];
}

// UIImagePickerControllerDelegate方法 - 用户取消选择照片
- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)OpenLightspotSwich{
  _lightspotLabel.hidden = YES;
  _lightspotSwitch.selected = !_lightspotSwitch.selected;
  _lightspotOn = _lightspotSwitch.selected;
}

- (void)showLightspotLabel{
  if (_sliderAllLine==-145) {
    _scanspotLabel.text = NSLocalizedString(@"The document is too far away", nil);
    _scanspotLabel.hidden = NO;
  }else if (_recogReuslt==-6 ||_sliderAllLine==-139){
    _scanspotLabel.text = [NSString stringWithFormat:@"%@ %@",NSLocalizedString(@"Please recognize", nil),NSLocalizedString(self.typeName, nil)];
    _scanspotLabel.hidden = NO;
  }else if (_sliderAllLine==-202){
  }else{
    _scanspotLabel.hidden = YES;
  }
}


#pragma mark -------------------—-NSNotification---------------------------

//reset frame
- (void)resetUIFrame:(UIDeviceOrientation)currentDeviceOrientatin{
  
  CGPoint center = CGPointMake(kScreenWidth*0.5, kScreenHeight*0.5);
  CGFloat sTopHeight =kSafeTopHeight + 15;
  _backBtn.frame =CGRectMake(15+kSafeLRX,sTopHeight, 35, 35);
  _flashBtn.frame = CGRectMake(kScreenWidth-50-kSafeLRX,sTopHeight, 35, 35);
  _photoImageBtn.center = CGPointMake(kScreenWidth*0.5, kScreenHeight-30-kSafeBottomHeight-kSafeBY);
  _lightspotSwitch.frame = CGRectMake(kSafeLRX, kScreenHeight-30-kSafeBottomHeight-kSafeBY, 100, 30);
  switch (currentDeviceOrientatin) {
    case UIDeviceOrientationPortraitUpsideDown:
    case UIDeviceOrientationPortrait:
      if (self.recogOrientation == RecogInHorizontalScreens) {
        _lightspotLabel.transform = CGAffineTransformMakeRotation(M_PI_2);
        _scanspotLabel.transform = CGAffineTransformMakeRotation(M_PI_2);
        _lightspotLabel.center = CGPointMake(center.x+30, center.y);
        _scanspotLabel.center = CGPointMake(center.x+70, center.y);
      }else{
        _lightspotLabel.transform = CGAffineTransformMakeRotation(0);
        _scanspotLabel.transform = CGAffineTransformMakeRotation(0);
        _lightspotLabel.center = CGPointMake(center.x, center.y+70);
        _scanspotLabel.center = CGPointMake(center.x, center.y+30);
      }
      break;
    case UIDeviceOrientationLandscapeLeft:
    case UIDeviceOrientationLandscapeRight:
      if (self.recogOrientation == RecogInHorizontalScreens) {
        _lightspotLabel.transform = CGAffineTransformMakeRotation(0);
        _scanspotLabel.transform = CGAffineTransformMakeRotation(0);
        _lightspotLabel.center = CGPointMake(center.x, center.y+70);
        _scanspotLabel.center = CGPointMake(center.x, center.y+30);
      }else{
        _lightspotLabel.transform = CGAffineTransformMakeRotation(-M_PI_2);
        _scanspotLabel.transform = CGAffineTransformMakeRotation(-M_PI_2);
        _lightspotLabel.center = CGPointMake(center.x+30, center.y);
        _scanspotLabel.center = CGPointMake(center.x+70, center.y);
      }
      break;
    default:
      break;
  }
}

//get device orientation
- (UIDeviceOrientation)orientationFormInterfaceOrientation{
  
  UIDeviceOrientation tempDeviceOrientation = UIDeviceOrientationUnknown;
  UIInterfaceOrientation tempInterfaceOrientation = [[UIApplication sharedApplication] statusBarOrientation];
  switch (tempInterfaceOrientation) {
    case UIInterfaceOrientationPortrait:
      tempDeviceOrientation = UIDeviceOrientationPortrait;
      NSLog(@"home down");
      break;
    case UIInterfaceOrientationPortraitUpsideDown:
      tempDeviceOrientation = UIDeviceOrientationPortraitUpsideDown;
      NSLog(@"home up");
      break;
    case UIInterfaceOrientationLandscapeLeft:
      tempDeviceOrientation = UIDeviceOrientationLandscapeRight;
      NSLog(@"home left");
      break;
    case UIInterfaceOrientationLandscapeRight:
      tempDeviceOrientation = UIDeviceOrientationLandscapeLeft;
      NSLog(@"home right");
      break;
      
    default:
      break;
  }
  return tempDeviceOrientation;
  
}
//get video orientation
- (AVCaptureVideoOrientation)avOrientationForDeviceOrientation:(UIDeviceOrientation)deviceOrientation
{
  AVCaptureVideoOrientation result = AVCaptureVideoOrientationLandscapeRight;
  switch (deviceOrientation) {
    case UIDeviceOrientationLandscapeRight:
      result = AVCaptureVideoOrientationLandscapeLeft;
      break;
    case UIDeviceOrientationLandscapeLeft:
      result = AVCaptureVideoOrientationLandscapeRight;
      break;
    case UIDeviceOrientationPortrait:
      result = AVCaptureVideoOrientationPortrait;
      break;
    case UIDeviceOrientationPortraitUpsideDown:
      result = AVCaptureVideoOrientationPortraitUpsideDown;
      break;
    default:
      break;
  }
  return result;
}

//reset roi
- (NSMutableDictionary *)setRoiForDeviceOrientation:(UIDeviceOrientation)deviceOrientation roiRect:(CGRect)rect{
  NSMutableDictionary *result = [NSMutableDictionary dictionary];
  CGFloat tWidth = (kFocalScale-1)*kScreenWidth*0.5;
  CGFloat tHeight = (kFocalScale-1)*kScreenHeight*0.5;
  CGPoint pLTopPoint = CGPointMake((CGRectGetMinX(rect)+tWidth)/kFocalScale, (CGRectGetMinY(rect)+tHeight)/kFocalScale);
  CGPoint pLDownPoint = CGPointMake((CGRectGetMinX(rect)+tWidth)/kFocalScale, (CGRectGetMaxY(rect)+tHeight)/kFocalScale);
  CGPoint pRTopPoint = CGPointMake((CGRectGetMaxX(rect)+tWidth)/kFocalScale, (CGRectGetMinY(rect)+tHeight)/kFocalScale);
  CGPoint pRDownPoint = CGPointMake((CGRectGetMaxX(rect)+tWidth)/kFocalScale, (CGRectGetMaxY(rect)+tHeight)/kFocalScale);
  
  CGFloat sTop = 0.0, sBottom = 0.0, sLeft = 0.0, sRight = 0.0;
  CGPoint iLTopPoint,iLDownPoint,iRTopPoint,iRDownPoint;
  switch (deviceOrientation) {
    case UIDeviceOrientationLandscapeRight:
      iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
      iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
      iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
      iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
      break;
    case UIDeviceOrientationLandscapeLeft:
      iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
      iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
      iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
      iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
      break;
    case UIDeviceOrientationPortrait:
      iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
      iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
      iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
      iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
      break;
    case UIDeviceOrientationPortraitUpsideDown:
      iLTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLDownPoint];
      iLDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRDownPoint];
      iRTopPoint = [self.preview captureDevicePointOfInterestForPoint:pLTopPoint];
      iRDownPoint = [self.preview captureDevicePointOfInterestForPoint:pRTopPoint];
      break;
    default:
      break;
  }
  if (self.recogOrientation == RecogInHorizontalScreens) {
    sTop = iLTopPoint.y*kResolutionHeight;
    sBottom = iLDownPoint.y*kResolutionHeight;
    sLeft = iLTopPoint.x*kResolutionWidth;
    sRight = iRTopPoint.x*kResolutionWidth;
  }else{
    sTop = iLTopPoint.x*kResolutionWidth;
    sBottom = iRTopPoint.x*kResolutionWidth;
    sLeft = (1-iLDownPoint.y)*kResolutionHeight;
    sRight = (1-iLTopPoint.y)*kResolutionHeight;
  }
  [result setObject:[NSNumber numberWithFloat:sTop] forKey:@"sTop"];
  [result setObject:[NSNumber numberWithFloat:sBottom] forKey:@"sBottom"];
  [result setObject:[NSNumber numberWithFloat:sLeft] forKey:@"sLeft"];
  [result setObject:[NSNumber numberWithFloat:sRight] forKey:@"sRight"];
  return result;
}
- (AVCaptureDevice *)cameraWithPosition:(AVCaptureDevicePosition)position{
  NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
  for (AVCaptureDevice *device in devices){
    if (device.position == position){
      return device;
    }
  }
  return nil;
}

- (void)fouceMode{
  NSError *error;
  AVCaptureDevice *device = [self cameraWithPosition:AVCaptureDevicePositionBack];
  if ([device isFocusModeSupported:AVCaptureFocusModeAutoFocus]){
    if ([device lockForConfiguration:&error]) {
      CGPoint cameraPoint = [self.preview captureDevicePointOfInterestForPoint:self.view.center];
      [device setFocusPointOfInterest:cameraPoint];
      [device setFocusMode:AVCaptureFocusModeAutoFocus];
      [device unlockForConfiguration];
    }else{
      NSLog(@"Error: %@", error);
    }
  }
}

- (CGRect )setOverViewSmallRect{
  CGRect sRect;
  CGFloat cardScale = 1.58;
  if (self.mainID == 3000) {
    cardScale = 4;
  }
  CGFloat tempWidth;
  CGFloat tempHeight;
  CGFloat tempScale;
  
  if (self.recogOrientation == RecogInHorizontalScreens) {
    if (self.mainID == 3000) {
      tempScale = 0.3;
      if (IS_IPAD) {
        tempScale = 0.2;
      }
    }else{
      tempScale = 0.7;
      if (IS_IPAD) {
        tempScale = 0.6;
      }
    }
    if (kScreenWidth < kScreenHeight) {
      tempWidth = kScreenWidth*tempScale;
      tempHeight = kScreenWidth*tempScale*cardScale;
    }else{
      tempWidth = kScreenHeight*tempScale*cardScale;
      tempHeight = kScreenHeight*tempScale;
    }
  }else{
    tempScale = 0.9;
    if (IS_IPAD) {
      tempScale = 0.8;
    }
    if (kScreenWidth < kScreenHeight) {
      tempWidth = kScreenWidth*tempScale;
      tempHeight = kScreenWidth*tempScale/cardScale;
    }else{
      tempWidth = kScreenHeight*tempScale/cardScale;
      tempHeight = kScreenHeight*tempScale;
    }
  }
  sRect = CGRectMake((kScreenWidth-tempWidth)*0.5, (kScreenHeight-tempHeight)*0.4, tempWidth,tempHeight);
  return sRect;
}

- (NSArray *)getFourPoints:(CGRect)sRect{
  CGPoint point1= CGPointMake(CGRectGetMinX(sRect), CGRectGetMinY(sRect));
  CGPoint point4= CGPointMake(CGRectGetMinX(sRect), CGRectGetMaxY(sRect));
  CGPoint point2= CGPointMake(CGRectGetMaxX(sRect), CGRectGetMinY(sRect));
  CGPoint point3= CGPointMake(CGRectGetMaxX(sRect), CGRectGetMaxY(sRect));
  NSArray *array = @[NSStringFromCGPoint(point1),NSStringFromCGPoint(point2),NSStringFromCGPoint(point3),NSStringFromCGPoint(point4)];
  return array;
}

- (UIStatusBarStyle)preferredStatusBarStyle{
  return UIStatusBarStyleDefault;
}

- (BOOL)prefersStatusBarHidden{
  return YES;
}

//强制正面面扫描
- (void)beginRecogFromfront
{
  _isFrontOk = NO;
  _recogerStep = IDCardRecogerStep_frontFaid;
  [self touchRecog];
  [self cameraViewShouldChangeChinaIconWith:NO andPeopleIcon:YES];
}
//强制反面扫描
- (void)beginRecogFromBack
{
  _isFrontOk = YES;
  _recogerStep = IDCardRecogerStep_SecondFaid;
  [self touchRecog];
  [self cameraViewShouldChangeChinaIconWith:YES andPeopleIcon:NO];
}
//从上次记录里开始扫描
- (void)beginRecogFromCurrent
{
  if (_isFrontOk) {
    [self beginRecogFromBack];
  }else{
    [self beginRecogFromfront];
  }
}


#pragma mark - 定时器倒计时 2023-09-17 18:12:30 定时器现在不让使用
- (void)setTimer {
  _progressTime = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(freshTimeShowView) userInfo:nil repeats:YES];
}

- (CameraTimeView *)progressView {
  if (!_progressView) {
    CGRect overViewRect = [self setOverViewSmallRect];
    CGFloat overViewBottom = CGRectGetMaxY(overViewRect);
    _progressView = [[CameraTimeView alloc] initWithFrame:CGRectZero];
    _progressView.frame = CGRectMake((SCREENWIDTH-55)/2, overViewBottom+60, 55, 55);
    _progressView.hidden = YES;
  }
  return _progressView;
}

- (void)freshTimeShowView
{
  if (_lastTime>5) {
    _progressView.hidden = YES;
    _photographButton.hidden = YES;
    _lastTime--;
  }else if (_lastTime<=5 &&_lastTime>0){
    _progressView.hidden = NO;
    _progressView.rectColor = [UIColor whiteColor];
    _progressView.rectBGColor = [UIColor whiteColor];
    _progressView.timeColor = [UIColor whiteColor];
    _progressView.timeStr = _lastTime;
    _progressView.prosess = _lastTime/8.0f;
    [_progressView setNeedsDisplay];
    _lastTime--;
  }else if (_lastTime == 0){
    [_progressTime setFireDate:[NSDate distantFuture]];
    _progressView.hidden = YES;
    _photographButton.hidden = NO;
    if ([self isCheckFront]) {
      _titleLabel.text = IDCARD_FRONT_TAKEPIC;
      [self noticeUserRcogStatusWith:SET_IDCARD_FRONT_CENTER andFront:NO andIsOtherSize:NO];
    }else {
      _titleLabel.text = IDCARD_BACK_TAKEPIC;
      [self noticeUserRcogStatusWith:SET_IDCARD_BEHIND_CENTER andFront:NO andIsOtherSize:NO];
    }
    _progressView.timeStr = _lastTime;
    _progressView.prosess = _lastTime/8.0f;
    [_progressView setNeedsDisplay];
    //提示
    if ([self isCheckFront]) {//在检测正面
      _isFrontOk = NO;
    }else{
      _isFrontOk = YES;
    }
  }
}

@end
