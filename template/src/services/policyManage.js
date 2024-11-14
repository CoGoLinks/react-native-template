import { request } from '@/utils/request';

// 未配置政策代理
export async function agentNotConfiguredAgent(data) {
  return request({
    url: '/app/agent/notConfiguredAgent',
    method: 'post',
    data,
  });
}
// 已配置政策代理
export async function agentConfiguredAgent(data) {
  return request({
    url: '/app/agent/configuredAgent',
    method: 'post',
    data,
  });
}
// 代理商政策详情
export async function agentPolicyInfo(params) {
  return request({
    url: '/app/agentPolicy/policyInfo',
    method: 'get',
    params,
    errorToast: false,
  });
}
// 机构给代理商添加交易结算信息
export async function agentPolicyAddTranPolicyForchild(data) {
  return request({
    url: '/app/agentPolicy/addTranPolicyForchild',
    method: 'post',
    data,
    loading: true,
  });
}
// 查询该机构下代理商政策是否配置
export async function agentPolicyFindtConfigdPolicy(data) {
  return request({
    url: '/app/agentPolicy/findtConfigdPolicy',
    method: 'post',
    data,
  });
}
// 机构给代理商添加流量结算信息
export async function agentPolicyAddDataPolicyForchild(data) {
  return request({
    url: '/app/agentPolicy/addDataPolicyForchild',
    method: 'post',
    data,
    loading: true,
  });
}
// 查询代理商对应机构营销政策
export async function agentPolicyFindMarkInfo(params) {
  return request({
    url: '/app/agentPolicy/findMarkInfo',
    method: 'get',
    params,
  });
}
// 查询代理商已配置指定政策列表
export async function agentPolicyFindConfigedMarkInfo(key) {
  return request({
    url: `/app/agentPolicy/agent-policies/${key}`,
    method: 'get',
  });
}
// 上级代理商政策详情
export async function agentPolicySuperPolicyInfo(params) {
  return request({
    url: '/app/agentPolicy/superPolicyInfo',
    method: 'get',
    params,
  });
}
// 流量费详情
export async function agentPolicyDataPolicy(params) {
  return request({
    url: '/app/agentPolicy/dataPolicy',
    method: 'get',
    params,
  });
}
// 查询代理商交易结算包详情
export async function queryAgentTranPolicyPackDetail(data) {
  return request({
    url: '/app/agentPolicy/queryAgentTranPolicyPackDetail',
    method: 'post',
    data,
  });
}
// 查询代理商流量费详情
export async function queryAgentDataPolicyDetail(data) {
  return request({
    url: '/app/agentPolicy/queryAgentDataPolicyDetail',
    method: 'post',
    data,
  });
}
// 修改代理商流量费结算价
export async function updateAgentDataPolicyById(data) {
  return request({
    url: '/app/agentPolicy/updateAgentDataPolicyById',
    method: 'post',
    data,
  });
}
// 修改代理商刷卡费率结算价
export async function updateAgentTranPolicyById(data) {
  return request({
    url: '/app/agentPolicy/updateAgentTranPolicyById',
    method: 'post',
    data,
  });
}
