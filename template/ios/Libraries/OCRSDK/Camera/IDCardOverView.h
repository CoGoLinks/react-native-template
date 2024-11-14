//
//  OverView.h
//

#import <UIKit/UIKit.h>

@interface IDCardOverView : UIView

@property (assign, nonatomic) BOOL leftHidden;
@property (assign, nonatomic) BOOL rightHidden;
@property (assign, nonatomic) BOOL topHidden;
@property (assign, nonatomic) BOOL bottomHidden;

@property (assign, nonatomic) int isSucceed;

@property (assign, nonatomic) int cropType;

- (void) setFourePoints:(NSArray *)points;
@end
