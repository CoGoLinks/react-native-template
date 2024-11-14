import { createEnum } from '@/utils/tools';

/**
 * 账户类型
 */
export const AccountTypeEnum = createEnum({
  Withdraw: { value: '1', label: '自有户' },
  Change: { value: '2', label: '营销户' },
});
