import { toFixedString, createEnum } from '@/utils/tools';
import dayjs from 'dayjs';

/**
 * 数据页面配置
 */
export const DataPageConfig = [
  {
    title: '直营收益',
    list: [
      {
        label: '交易收益',
        name: 'tranProfit',
        icon: 'money',
        routeName: 'TrandingEarning',
        params: { profitType: 'JY', range: '01' },
      },
      {
        label: '便捷到账收益',
        name: 'mdProfit',
        icon: 'ts',
        routeName: 'TsSecondsEarning',
        params: { profitType: 'MD', range: '01' },
      },
      {
        label: '流量费收益',
        name: 'llfProfit',
        icon: 'flow',
        routeName: 'FlowFeeEarning',
        params: { profitType: 'LLF', range: '01' },
      },
      {
        label: '激活奖励',
        name: 'activeProfit',
        icon: 'active',
        routeName: 'ActivateReward',
      },
      {
        label: '达标奖励',
        name: 'achieveProfit',
        icon: 'medal',
        routeName: 'StandardsReward',
      },
      {
        label: '交易补贴收益',
        name: 'tranSubsidy',
        icon: 'jybt',
        routeName: 'TransactionSubsidy',
        params: { profitType: 'JY', range: '01' },
      },
    ],
  },
  {
    title: '下级贡献收益',
    list: [
      {
        label: '交易量收益',
        name: 'tranProfit',
        icon: 'money',
        routeName: 'TrandingEarning',
        params: { profitType: 'JY', range: '00' },
      },
      {
        label: '便捷到账收益',
        name: 'mdProfit',
        icon: 'ts',
        routeName: 'TsSecondsEarning',
        params: { profitType: 'MD', range: '00' },
      },
      {
        label: '流量费收益',
        routeName: 'FlowFeeEarning',
        name: 'llfProfit',
        icon: 'flow',
        params: { profitType: 'LLF', range: '00' },
      },
      {
        label: '交易补贴收益',
        name: 'tranSubsidy',
        icon: 'jybt',
        routeName: 'TransactionSubsidy',
        params: { profitType: 'BENEFIT', range: '00' },
      },
    ],
  },
];

/**
 * 收益流水列表
 */
export const EarningListConfig = {
  FlowFeeEarning: {
    title: ['商户', '交易时间｜交易金额', '收益金额(元)'],
    list: [
      { name: 'merName' },
      { name: 'tranTime', type: 'month' },
      { name: 'tranAmt', type: 'money_w' },
      { name: 'profitAmt', type: 'plus' },
    ],
  },
  TrandingEarning: {
    title: ['商户', '交易时间｜交易金额', '收益金额(元)'],
    list: [
      { name: 'merName' },
      { name: 'tranTime', type: 'month' },
      { name: 'tranAmt', type: 'money_w' },
      { name: 'profitAmt', type: 'plus' },
    ],
  },
  TsSecondsEarning: {
    title: ['商户', '交易时间｜交易金额', '收益金额(元)'],
    list: [
      { name: 'merName' },
      { name: 'tranTime', type: 'month' },
      { name: 'tranAmt', type: 'money_w' },
      { name: 'profitAmt', type: 'plus' },
    ],
  },
  TransactionSubsidy: {
    title: ['商户', '交易时间｜交易金额', '收益金额(元)'],
    list: [
      { name: 'merName' },
      { name: 'tranTime', type: 'month' },
      { name: 'tranAmt', type: 'money_w' },
      { name: 'profitAmt', type: 'plus' },
    ],
  },
};

/**
 * 收益流水-交易详情
 */
export const EarningDetailConfig = {
  TrandingEarningDetail: {
    main: [
      { label: '商户：', name: 'merName' },
      { label: '交易成功', name: 'tranAmt', type: 'money' },
    ],
    trade: [
      { label: '交易信息', type: 'title' },
      {
        label: '卡类型',
        name: 'cardType',
        type: 'select',
        options: { '00': '贷记卡', '01': '借记卡' },
      },
      { label: '费率', name: 'rate', type: 'pct' },
      { label: '交易时间', name: 'tranTime' },
      { label: '便捷到账', name: 'mdFee', type: 'add' },
      { label: '归属代理', name: 'agentName' },
    ],
  },
  FlowFeeEarningDetail: {
    main: [
      { label: '商户：', name: 'merName' },
      { label: '交易成功', name: 'tranAmt', type: 'money' },
    ],
    trade: [
      { label: '交易信息', type: 'title' },
      { label: '支付时间', name: 'tranTime' },
      { label: '归属代理', name: 'agentName' },
    ],
  },
  TsSecondsEarningDetail: {
    main: [
      { label: '商户：', name: 'merName' },
      {
        label: '交易成功',
        name: 'tranAmt',
        type: 'money',
      },
    ],
    trade: [
      { label: '交易信息', type: 'title' },
      {
        label: '卡类型',
        name: 'cardType',
        type: 'select',
        options: { '00': '贷记卡', '01': '借记卡' },
      },
      { label: '费率', name: 'rate' },
      { label: '交易时间', name: 'tranTime' },
      { label: '便捷到账', name: 'mdFee', type: 'add' },
      { label: '归属代理', name: 'agentName' },
    ],
  },
  TransactionSubsidyDetail: {
    main: [
      { label: '商户：', name: 'merName' },
      {
        label: '交易成功',
        name: 'tranAmt',
        type: 'money',
      },
    ],
    trade: [
      { label: '交易信息', type: 'title' },
      { label: '交易时间', name: 'tranTime' },
    ],
  },
};

/**
 * 奖励明细
 */
export const RewardListConfig = {
  StandardsReward: {
    main: [
      { label: '', name: 'factSn', type: 'sn' },
      { label: '', name: 'merchantName', type: 'logo' },
    ],
    list: [
      { label: '达标阶段', name: 'phase' },
      { label: '达标时间', name: 'completeTime' },
      { label: '激活时间', name: 'activeTime' },
      { label: '激活活动', name: 'actName' },
      {
        label: '奖励金额',
        name: 'returnAmt',
        type: 'money_plus',
        other: 'orange',
      },
    ],
  },
  ActivateReward: {
    main: [
      { label: '', name: 'factSn', type: 'sn' },
      { label: '', name: 'merchantName', type: 'logo' },
    ],
    list: [
      { label: '激活活动', name: 'actName' },
      { label: '激活时间', name: 'completeTime' },
      {
        label: '奖励金额',
        name: 'returnAmt',
        type: 'plus',
        other: 'orange',
      },
    ],
  },
};

export const handleFormat = ({ value, type, options }) => {
  let result = value;

  if (!value) {
    return result;
  }
  switch (type) {
    case 'date':
      result = dayjs(value).format('YYY/MM/DD HH:mm');
      break;
    case 'month':
      result = dayjs(value).format('MM/DD HH:mm');
      break;
    case 'money_w':
      result = `${toFixedString(value)}`;
      break;
    case 'money':
      result = `¥${toFixedString(value)}`;
      break;
    case 'add':
      result = value === '+' ? '3' : value === '-' ? '0' : value;
      break;
    case 'plus':
      if (value > 0) {
        result = '+' + toFixedString(value);
      } else {
        result = `¥${toFixedString(value)}`;
      }
      break;
    case 'select':
      result = value ? options[value] : '';
      break;
    case 'pct':
      result = value ? value + '%' : '';
      break;
    default:
      result = value;
  }
  return result;
};

/**
 * 收支账户-收益
 */
export const IncomeConfig = [
  {
    label: '交易收益',
    code: 'JY',
    icon: 'money',
  },
  {
    label: '便捷到账收益',
    code: 'MD',
    icon: 'ts',
  },
  {
    label: '流量费收益',
    code: 'LLF',
    icon: 'flow',
  },
  {
    label: '激活奖励',
    code: 'ACT',
    icon: 'active',
  },
];

/**
 * 收支账户-收益
 */
export const ExpenditureConfig = [
  {
    label: '支出-下级交易收益',
    code: 'JY',
    icon: 'money',
  },
  {
    label: '支出-下级便捷到账收益',
    code: 'MD',
    icon: 'ts',
  },
  {
    label: '支出-下级流量费收益',
    code: 'LLF',
    icon: 'flow',
  },
  {
    label: '支出-下级激活奖励',
    code: 'ACT',
    icon: 'active',
  },
  {
    label: '支出-下级交易补贴',
    code: 'BENEFIT',
    icon: 'jybt',
  },
  {
    label: '支出-下级达标奖励',
    code: 'REACH_STD',
    icon: 'medal',
  },
];
/**
 * 收支账户-收益明细tab
 */
export const TransactionDetailsConfig = createEnum({
  JY: {
    label: '交易收益',
    code: 'JY',
    icon: 'money',
    value: 'JY',
    lowerLevelLabel: '下级交易收益',
  },
  MD: {
    label: '便捷到账',
    code: 'MD',
    icon: 'ts',
    value: 'MD',
    lowerLevelLabel: '下级便捷到账收益',
  },
  LLF: {
    label: '流量费',
    code: 'LLF',
    icon: 'flow',
    value: 'LLF',
    lowerLevelLabel: '下级流量费收益',
  },
  ACT: {
    label: '激活奖励',
    code: 'ACT',
    icon: 'active',
    value: 'ACT',
    lowerLevelLabel: '下级激活奖励',
  },
  REACH_STD: {
    label: '达标奖励',
    code: 'REACH_STD',
    icon: 'medal',
    value: 'REACH_STD',
    lowerLevelLabel: '下级达标奖励',
  },
  BENEFIT: {
    label: '交易补贴',
    code: 'BENEFIT',
    icon: 'jybt',
    value: 'BENEFIT',
  },
});

export const TypePageEnum = createEnum({
  Level: {
    value: 'level',
    label: '收益',
  },
  LowerLevel: {
    value: 'lowerLevel',
    label: '支出',
  },
});
