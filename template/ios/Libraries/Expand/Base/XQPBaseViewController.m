//
//  XQPBaseViewController.m
//  xin_quick_pay_app
//
//  Created by fangyong on 2019/10/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "XQPBaseViewController.h"
#import "UIBarButtonItem+SXCreate.h"
#import "UIView+Toast.h"

@interface XQPBaseViewController ()

@end

@implementation XQPBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
}


-(void)set_LeftBackButtonWith:(UIImage *)LeftBackImage {
    
    if (!LeftBackImage) {
        
        self.navigationItem.leftBarButtonItems = nil;
        return;
    }
    if (self.navigationController.viewControllers.count > 1) {
        
        self.navigationItem.leftBarButtonItem = [UIBarButtonItem itemWithTarget:self action:@selector(navigationLeftButtonAction:) image:LeftBackImage];
    }else {
        self.navigationItem.leftBarButtonItem = [UIBarButtonItem itemWithTarget:self action:nil image:nil];
    }
}

-(void)set_RightBackButtonWith:(UIImage *)rightImage {
    
    if (!rightImage) {
        self.navigationItem.rightBarButtonItems = nil;
        return;
    }
    CGRect rect = CGRectMake(0, 0, 40, 44);
    UIView *baseView = [[UIView alloc]initWithFrame:rect];
    baseView.backgroundColor = [UIColor clearColor];
    UIButton *rightButton = [UIButton buttonWithType:UIButtonTypeCustom];
    rightButton.frame = rect;
    rightButton.tag = 1001;//区别图标按钮和标题按钮
    [rightButton addTarget:self action:@selector(navigationRightButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    [rightButton setImage:rightImage forState:UIControlStateNormal];
    [baseView addSubview:rightButton];
    UIBarButtonItem *bar =[[UIBarButtonItem alloc] initWithCustomView:baseView];
    self.navigationItem.rightBarButtonItem = bar;
}

- (void)navigationRightButtonAction:(UIButton *)sender{
    
}

- (void)navigationLeftButtonAction:(UIButton *)sender {
  
}


- (void)showToast:(NSString *)message
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.view makeToast:message duration:2.0f position:[NSValue valueWithCGPoint:self.view.center]];
    });
}
@end
