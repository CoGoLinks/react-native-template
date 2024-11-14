//
//  XQPBaseViewController.h
//  xin_quick_pay_app
//
//  Created by fangyong on 2019/10/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface XQPBaseViewController : UIViewController
-(void)set_LeftBackButtonWith:(UIImage *)LeftBackImage;
-(void)set_RightBackButtonWith:(UIImage *)rightImage;
- (void)showToast:(NSString *)message;


@end

NS_ASSUME_NONNULL_END
