//
//  CameraTimeView.m
//  PMPos
//
//  Created by 289124787@qq.com on 2017/3/15.
//  Copyright © 2017年 Vbill Payment Co., Ltd. All rights reserved.
//

#import "CameraTimeView.h"
//弧度转角度
#define RADIANS_TO_DEGREES(radians) ((radians) * (180.0 / M_PI))
#define HEXCOLOR(hexColor)  [UIColor colorWithRed:((float)((hexColor & 0xFF0000) >> 16))/255.0 green:((float)((hexColor & 0xFF00) >> 8))/255.0 blue:((float)(hexColor & 0xFF))/255.0 alpha:1]
#define HEXCOLORALPHA(hexColor,a)  [UIColor colorWithRed:((float)((hexColor & 0xFF0000) >> 16))/255.0 green:((float)((hexColor & 0xFF00) >> 8))/255.0 blue:((float)(hexColor & 0xFF))/255.0 alpha:a]


//角度转弧度
#define DEGREES_TO_RADIANS(angle) ((angle) / 180.0 * M_PI)
@implementation CameraTimeView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        /**初始化基本属性*/
        self.backgroundColor = [UIColor clearColor];
        self.rectColor = HEXCOLOR(0x34a2ff);
        self.rectBGColor = HEXCOLORALPHA(0x34a2ff, .3);
        self.timeColor = HEXCOLOR(0x34a2ff);
        self.prosess = 1;
    }
    return self;
}

- (void)drawRect:(CGRect)rect
{
    // Drawing code.
    //获得处理的上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    /*画圆*/
    //边框圆--背景
    CGColorRef colorRef = self.rectBGColor.CGColor;
    CGContextSetStrokeColorWithColor(context, colorRef);
    CGContextSetLineWidth(context, 1.5);//线的宽度
    //void CGContextAddArc(CGContextRef c,CGFloat x, CGFloat y,CGFloat radius,CGFloat startAngle,CGFloat endAngle, int clockwise)1弧度＝180°/π （≈57.3°） 度＝弧度×180°/π 360°＝360×π/180 ＝2π 弧度
    // x,y为圆点坐标，radius半径，startAngle为开始的弧度，endAngle为 结束的弧度，clockwise 0为顺时针，1为逆时针。
    CGContextAddArc(context, CGRectGetMidX(rect), CGRectGetMidY(rect), CGRectGetWidth(rect)/2.0f-1.5,0, 2*M_PI, 1); //添加一个圆
    CGContextDrawPath(context, kCGPathStroke); //绘制路径
    CGContextStrokePath(context);
    
    //边框圆--进度
    CGColorRef colorR = self.rectColor.CGColor;
    CGContextSetStrokeColorWithColor(context, colorR);
    CGContextSetLineWidth(context, 1.5);//线的宽度
    //void CGContextAddArc(CGContextRef c,CGFloat x, CGFloat y,CGFloat radius,CGFloat startAngle,CGFloat endAngle, int clockwise)1弧度＝180°/π （≈57.3°） 度＝弧度×180°/π 360°＝360×π/180 ＝2π 弧度
    // x,y为圆点坐标，radius半径，startAngle为开始的弧度，endAngle为 结束的弧度，clockwise 0为顺时针，1为逆时针。
    CGContextAddArc(context, CGRectGetMidX(rect), CGRectGetMidY(rect), CGRectGetWidth(rect)/2.0f-1.5,-M_PI_2, 2*M_PI*_prosess-M_PI_2, 0); //添加一个圆
    CGContextDrawPath(context, kCGPathStroke); //绘制路径
    CGContextStrokePath(context);
    
    /*写文字*/
    UIFont  *font = [UIFont fontWithName:@"HelveticaNeue" size:25.0f];//定义默认字体
    NSString *string = [NSString stringWithFormat:@"%ld",(long)self.timeStr];
    if (YES) {
        NSMutableParagraphStyle* paragraphStyle = [[NSParagraphStyle defaultParagraphStyle] mutableCopy];
        paragraphStyle.lineBreakMode = NSLineBreakByCharWrapping;
        paragraphStyle.alignment=NSTextAlignmentCenter;//文字居中：发现只能水平居中，而无法垂直居中
        NSDictionary* attribute = @{
                                    NSForegroundColorAttributeName:self.timeColor,//设置文字颜色
                                    NSFontAttributeName:font,//设置文字的字体
                                    NSParagraphStyleAttributeName:paragraphStyle,//设置文字的样式
                                    };
        
        //计算文字的宽度和高度：支持多行显示
        CGSize sizeText = [string boundingRectWithSize:rect.size
                                              options:NSStringDrawingUsesLineFragmentOrigin
                                           attributes:@{
                                                        NSFontAttributeName:font//设置文字的字体
                                                        }
                                              context:nil].size;
        CGFloat width = rect.size.width;
        CGFloat height = rect.size.height;
        //为了能够垂直居中，需要计算显示起点坐标x,y
        CGRect rect = CGRectMake((width-sizeText.width)/2, (height-sizeText.height)/2, sizeText.width, sizeText.height);
        [string drawInRect:rect withAttributes:attribute];
    }else{
    }
}

@end
