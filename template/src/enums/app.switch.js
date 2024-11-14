import { createEnum } from '@/utils/tools';

/**
 * App开关状态
 */
export const SwitchStatusEnum = createEnum({
  Open: { value: '01', label: '开' },
  Close: { value: '00', label: '关' },
  StayTuned: { value: '02', label: '敬请期待' },
});

/**
 * App开关
 */
export const AppSwitchEnum = createEnum({
  AppAuditSwitch: { value: 'appAuditSwitch', label: 'App审核开关' },
});
