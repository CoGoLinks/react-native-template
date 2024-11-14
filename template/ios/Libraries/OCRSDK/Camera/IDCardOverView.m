//
//  OverView.m
//
#import "IDCardOverView.h"
#import <CoreText/CoreText.h>

#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
#define IS_IPAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

@implementation IDCardOverView{
    
    CGPoint ldown;
    CGPoint rdown;
    CGPoint lup;
    CGPoint rup;
    
    /*Four points*/
    CGPoint point1;
    CGPoint point4;
    CGPoint point2;
    CGPoint point3; 
    
}

- (id) initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
    }
    return self;
}

- (void) setFourePoints:(NSArray *)points{
    point1 = CGPointFromString(points[0]);
    point2 = CGPointFromString(points[1]);
    point3 = CGPointFromString(points[2]);
    point4 = CGPointFromString(points[3]);
    
    [self setNeedsDisplay];
    
}
- (void) drawRect:(CGRect)rect
{
    [super drawRect:rect];
    
    [[UIColor orangeColor] set];
    CGContextRef currentContext = UIGraphicsGetCurrentContext();
    CGContextSetLineWidth(currentContext, 2.0f);
    if (self.cropType==1) {
        if (_isSucceed != 1) {
            CGContextSetLineWidth(currentContext, 2.0f);
            CGContextMoveToPoint(currentContext, 0, 0);
            CGFloat arr1[] = {3,1};
            CGContextSetLineDash(currentContext, 0, arr1, 2);
        }
        CGContextMoveToPoint(currentContext, point1.x, point1.y);
        CGContextAddLineToPoint(currentContext, point2.x, point2.y);
        CGContextAddLineToPoint(currentContext, point3.x, point3.y);
        CGContextAddLineToPoint(currentContext, point4.x, point4.y);
        CGContextAddLineToPoint(currentContext, point1.x, point1.y);
        
    }else{
        int s = 25;
        CGContextMoveToPoint(currentContext,point1.x, point1.y+s);
        CGContextAddLineToPoint(currentContext, point1.x, point1.y);
        CGContextAddLineToPoint(currentContext, point1.x+s, point1.y);
        
        CGContextMoveToPoint(currentContext, point4.x,point4.y-s);
        CGContextAddLineToPoint(currentContext, point4.x,point4.y);
        CGContextAddLineToPoint(currentContext, point4.x+s,point4.y);
        
        CGContextMoveToPoint(currentContext, point2.x-s,point2.y);
        CGContextAddLineToPoint(currentContext, point2.x,point2.y);
        CGContextAddLineToPoint(currentContext, point2.x,point2.y+s);
        
        CGContextMoveToPoint(currentContext, point3.x, point3.y-s);
        CGContextAddLineToPoint(currentContext, point3.x, point3.y);
        CGContextAddLineToPoint(currentContext, point3.x-s, point3.y);
        
        if (_leftHidden) {
            CGContextMoveToPoint(currentContext, point1.x+s, point1.y);
            CGContextAddLineToPoint(currentContext, point2.x-s,point2.y);
        }
        if (_rightHidden) {
            CGContextMoveToPoint(currentContext, point4.x+s,point4.y);
            CGContextAddLineToPoint(currentContext, point3.x-s, point3.y);
        }
        
        if (_topHidden) {
            CGContextMoveToPoint(currentContext, point2.x,point2.y+s);
            CGContextAddLineToPoint(currentContext, point3.x, point3.y-s);
        }
        if (_bottomHidden) {
            CGContextMoveToPoint(currentContext, point1.x, point1.y+s);
            CGContextAddLineToPoint(currentContext, point4.x,point4.y-s);
        }
        
    }
    CGContextStrokePath(currentContext);
}

- (void) setTopHidden:(BOOL)topHidden
{
    if (_topHidden == topHidden) {
        return;
    }
    _topHidden = topHidden;
    [self setNeedsDisplay];
}

- (void) setLeftHidden:(BOOL)leftHidden
{
    if (_leftHidden == leftHidden) {
        return;
    }
    _leftHidden = leftHidden;
    [self setNeedsDisplay];
}

- (void) setBottomHidden:(BOOL)bottomHidden
{
    if (_bottomHidden == bottomHidden) {
        return;
    }
    _bottomHidden = bottomHidden;
    [self setNeedsDisplay];
}

- (void) setRightHidden:(BOOL)rightHidden
{
    if (_rightHidden == rightHidden) {
        return;
    }
    _rightHidden = rightHidden;
    [self setNeedsDisplay];
}

/*
 // Only override drawRect: if you perform custom drawing.
 // An empty implementation adversely affects performance during animation.
 - (void)drawRect:(CGRect)rect {
 // Drawing code
 }
 */

@end

