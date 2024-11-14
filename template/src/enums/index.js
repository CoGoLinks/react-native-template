import React from 'react';
import { createEnum } from '@/utils/tools';
import { Modal, Text, View } from '@/components';

/**
 * 订单状态
 */
export const OrderStatusEnum = createEnum({
  WaitPay: { value: '0', label: '待付款' },
  Confirm: { value: '1', label: '付款待确认' },
  WaitShipped: { value: '2', label: '待发货' },
  Shipped: { value: '3', label: '已发货' },
  Invalid: { value: '4', label: '已失效' },
});
// 优惠券订单状态
export const CouponOrderStatusEnum = createEnum({
  WaitPay: { value: '0', label: '待付款' },
  Confirm: { value: '1', label: '付款待确认' },
  Shipped: { value: '3', label: '已完成' },
  Invalid: { value: '4', label: '已失效' },
});

/**
 * 配置政策
 */
export const PolicyStatusEnum = createEnum({
  UnConfigured: { value: 'un_configured', label: '待配置' },
  Configured: { value: 'configured', label: '已配置' },
});

/**
 * 代理商性质
 */
export const AgentBizModeStatusEnum = createEnum({
  IND: { value: 'IND', label: '个人' },
  ENT: { value: 'ENT', label: '企业' },
});

/**
 * 我的政策
 */
export const MyPolicyStatusEnum = createEnum({
  // SettlementPrice: { value: 'settlement_price', label: '结算价' },
  TrafficFee: { value: 'traffic_fee', label: '流量费' },
  MarketingPolicy: { value: 'marketing_policy', label: '营销政策' },
});

/**
 * 政策信息类型key
 */
export const PolicyInfoStatusEnum = createEnum({
  CardSwipeRate: {
    value: {
      start: { x: 0.0, y: 0.25 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.9],
      colors: ['#3d8dff20', '#3d8dff09'],
    },
    label: '刷卡费率',
  },
  PolicySharing: {
    value: {
      start: { x: 0.0, y: 0.25 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.9],
      colors: ['#07C16020', '#3D8DFF09'],
    },
    label: '政策分成',
  },
  Other: {
    value: {
      start: { x: 0.0, y: 0.25 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.9],
      colors: ['#FAAB0C20', '#FAAB0C09'],
    },
    label: '其他',
  },
  MarketingPolicy: {
    value: {
      start: { x: 0.0, y: 0.25 },
      end: { x: 0.9, y: 1 },
      locations: [0, 0.9],
      colors: ['#C1070720', '#C1070709'],
    },
    label: '营销政策',
  },
});

/**
 * 配置 费用项计算方式
 */
export const FeeCalModeStatusEnum = createEnum({
  FIXED: { value: 'FIXED', label: '元' },
  RATE: { value: 'RATE', label: '%' },
});

/**
 * 配置 配置政策
 */
export const PolicyConfigStatusEnum = createEnum({
  Config: { value: '01', label: '已配置' },
  UnConfig: { value: '00', label: '待配置' },
});

/**
 * 配置 配置政策 Icon
 */
export const PolicyConfigIconStatusEnum = createEnum({
  policy_config: { value: 'policy_config', label: '结算相关' },
  policy_flow: { value: 'policy_flow', label: '流量费' },
});

/**
 * 我的政策 是否默认配置
 */
export const DefaultItemStatusEnum = createEnum({
  T: { value: 'T', label: '默认' },
  F: { value: 'F', label: '不默认' },
});
/**
 * 设备划拨状态
 */
export const DeviceAssignStatusEnum = createEnum({
  UnAssign: { value: '00', label: '未划拨' },
  Assigned: { value: '01', label: '已划拨' },
});

/**
 * 物料类型
 */
export const MaterialStatusEnum = createEnum({
  Device: { value: '0', label: '机具' },
  Coupon: {
    value: '1',
    label: '优惠券',
    iconName: 'info',
    iconColor: '#E8B355',
    iconSize: 36,
    iconClick: () => {
      const alert = Modal.alert({
        title: '优惠券购买说明',
        message: (
          <View>
            <Text className="mb-[15rpx]">1. 优惠券发放有效期：无限制</Text>
            <Text className="mb-[15rpx]">
              2. 优惠券发放范围：仅可向激活时间小于等于30天用户进行发放
            </Text>
            <Text className="mb-[15rpx]">3. 退款说明：</Text>
            <Text className="mb-[15rpx]">
              ①如优惠券发放至用户账户后，优惠券到期用户未使用，则在优惠券到期次月自动退款，退款金额原路返回
            </Text>
            <Text className="mb-[15rpx]">
              ②如优惠券发放至用户账户之前申请退款，需线上提交，审批过后退款金额原路返回
            </Text>
            <Text className="mb-[15rpx]">
              4. 优惠券使用有效期：以券面展示为准，从发放至用户账户之日起生效
            </Text>
            <Text className="mb-[15rpx]">5. 优惠券使用门槛，减免金额以券面展示为准</Text>
            <Text className="mb-[15rpx]">6. 优惠券支持刷卡、手机闪付、二维码交易使用</Text>
          </View>
        ),
        cancelText: null,
        okText: '我知道了',
        onOk: () => {
          alert.close();
        },
      });
    },
  },
});

/**
 * 设备划拨状态
 */
export const DeviceActiveStatusEnum = createEnum({
  UnActive: { value: '00', label: '未激活' },
  Actived: { value: '01', label: '已激活' },
});

/**
 * 设备活动 是否划拨
 */
export const assignFlagStatusEnum = createEnum({
  No_transfer: { value: '00', label: '未划拨' },
  Transfer: { value: '01', label: '划拨中' },
});

/**
 * 设备活动 查询代理商已配置指定政策列表
 * MARKET-营销政策；TRANS-费率政策
 */
export const AgentSearchStatusEnum = createEnum({
  MARKET: { value: 'MARKET', label: '营销政策' },
  TRANS: { value: 'TRANS', label: '费率政策' },
});

/**
 * 订单发票申请
 */
export const InvoiceStatusEnum = createEnum({
  Wait: { value: '00', label: '可申请' },
  Apply: { value: '01', label: '已申请' },
});

/**
 * 订单类型
 */
// 发票类型（04=电子发票(普通发票),05=电子发票(增值税专用发票)
export const InvoiceTypeEnum = createEnum({
  Normal: { value: '04', label: '电子普通发票' },
  VAT: { value: '05', label: '电子增值税专用发票' },
});

/**
 * 发票状态
 */
// 审核状态（W0-初登记、W1-提交审核中、S1-审核通过、F1-审核拒绝
export const AuditedStsEnum = createEnum({
  W1: { value: 'W1', label: '审核中' },
  S1: { value: 'S1', label: '已通过' },
  F1: { value: 'F1', label: '已驳回' },
});
/**
 * 发票状态-描述
 */
export const AuditedStsDescEnum = createEnum({
  W1: { value: 'W1', label: '请耐心等待审核结果' },
  S1: { value: 'S1', label: '请及时关注您的邮箱' },
});

/**
 * 结算明细类型
 */
export const SettlementDetailTypeEnum = createEnum({
  SettlementPrice: { value: 'JY', label: '交易收益' },
  Convenience: { value: 'MD', label: '便捷到账' },
  TrafficFee: { value: 'LLF', label: '流量费' },
  ActivationReward: { value: 'activation_reward', label: '激活奖励' },
});

/**
 * 提现审核状态
 */
export const WithdrawAuditStatusEnum = createEnum({
  Pending: { value: '1', label: '待处理' },
  Paying: { value: '2', label: '付款中' },
  Success: { value: '3', label: '付款成功' },
  Fail: { value: '4', label: '付款失败' },
  Reject: { value: '5', label: '审核驳回' },
});

/**
 * 提现审核状态
 */
export const WithdrawAuditStatusTextEnum = createEnum({
  Pending: { value: '0', label: '待审核' },
  WaitPay: { value: '1', label: '待付款' },
  Paying: { value: '2', label: '付款中' },
  Success: { value: '3', label: '付款成功' },
  Fail: { value: '4', label: '付款失败' },
  Reject: { value: '5', label: '审核驳回' },
  TaxFail: { value: '6', label: '付款失败' },
});

/**
 * 收支账簿
 */
export const RevenueExpenditureEnum = createEnum({
  Income: { value: '0', label: '收益' },
  Expenditure: { value: '1', label: '支出' },
});

/**
 * 页面类型
 */
export const PageTypeEnum = createEnum({
  Modify: { value: 'Modify', label: '修改' },
  Increase: { value: 'Increase', label: '新增' },
});

/**
 * 政策配置角色
 */
export const RoleAuthorityEnum = createEnum({
  OrgConfig: { value: '00', label: '机构配置' },
  AgentConfig: { value: '01', label: '代理商配置' },
});

/**
 * 配置结算价 下标
 */
export const ConfigSetPrice = createEnum({
  // 刷卡费率
  CardRate: { value: 0, label: '', mate: { desc: '刷卡费率模块 | 政策分成' } },
  // 其他
  OtherRate: { value: 1, label: '', mate: { desc: '其他模块' } },
});

/*
 * 身份类型 00-机构 01-代理商
 */
export const IdentityTypeEnum = createEnum({
  Org: { value: '00', label: '机构' },
  Agent: { value: '01', label: '代理商' },
});

/**
 * 签约方式 1：与机构签约，2：与平台签约
 */
export const ContractTypeStatusEnum = createEnum({
  Org: { value: 0, label: '机构', mate: { desc: '机构身份' } }, // 身份是机构出现的
  Agent: { value: 1, label: '代理商', mate: { desc: '与机构签约-个人代理商' } }, // 代理商
  DirectSign: { value: 2, label: '签', mate: { desc: '与平台签约-直签代理商' } }, // 直签
});

/**
 * 鉴权key
 */
export const VerifyTypeStatusEnum = createEnum({
  // 身份鉴权
  NameCardTwo: { value: '00', label: '', mate: { desc: '姓名+ 身份证号两要素鉴权' } },
  NameBackTwo: { value: '01', label: '', mate: { desc: '姓名+银行卡号两要素鉴权' } },
  CardPhotoTwo: { value: '11', label: '', mate: { desc: '身份证号+头像两要素鉴权' } },
  CardBankTwo: { value: '12', label: '', mate: { desc: '身份证号+银行卡号两要素鉴权' } },
  BankPhoneTwo: { value: '02', label: '', mate: { desc: '银行卡号+手机号两要素鉴权' } },
  NameCardBankThree: {
    value: '03',
    label: '',
    mate: { desc: '姓名 + 身份证号 +银行卡号三要素鉴权' },
  },
  NameCardBankPhoneFour: {
    value: '04',
    label: '',
    mate: { desc: '姓名 + 身份证号+银行卡号 +手机号四要素鉴权' },
  },
  // 工商鉴权
  RegNoAuth: { value: '05', label: '', mate: { desc: '“注册登记号一要素鉴权' } },
  EntNameAuth: { value: '06', label: '', mate: { desc: '注册登记名称一要素鉴权' } },
  // 营业执照法人鉴权
  EntNameLegalAuth: {
    value: '07',
    label: '',
    mate: { desc: '用注册名称 +法人证件号码 +法人姓名三要素鉴权' },
  },
  RegNoLegalAuth: {
    value: '08',
    label: '',
    mate: { desc: '用注册登记号 +法人证件号码 + 法人姓名三要素鉴权' },
  },
  UsciLegalAuth: {
    value: '09',
    label: '',
    mate: { desc: '用统一社会信用代码 +法人证件号码 +法人姓名三要素鉴权' },
  },
  EntFullLegalAuth: {
    value: '13',
    label: '',
    mate: { desc: '用注册名称 +注册地址 +法人证件号码 + 法人姓名四要素鉴权' },
  },
});
/**
 * 倒挂开关
 */
export const InvertedSwitchEnum = createEnum({
  Open: { value: '01', label: '开' },
  Close: { value: '00', label: '关' },
});
/**
 * 采购合作协议type
 */
export const AgreementTypeEnum = createEnum({
  ProcureCooperate: {
    value: '01',
    label: '采购合作协议',
  },
});
/**
 * 签约协议 状态
 */
export const AgreementStatusEnum = createEnum({
  ProgressCoplete: {
    value: 'COMPLETE',
    label: '成功',
  },
  ProgressError: {
    value: 'ERROR',
    label: '失败',
  },
});
