import { request } from '@/utils/request';

// 直签模式-查询机构已申请发票列表
export async function findOrganAppliedInvoiceList(params) {
  return request({
    url: '/app/finAgentSettle/findOrganAppliedInvoiceList',
    method: 'get',
    params,
  });
}

// 直签模式-机构申请发票
export async function saveOrganApplyInvoice(data) {
  return request({
    url: '/app/finAgentSettle/saveOrganApplyInvoice',
    method: 'post',
    data,
  });
}
// 查询发票'已申请'列表
export async function invoiceAppliedList(data) {
  return request({
    url: '/app/invoice/applied-list',
    method: 'post',
    data,
  });
}

// 直签模式-查询机构待申请发票列表
export async function findOrganWaitApplyInvoiceList() {
  return request({
    url: '/app/finAgentSettle/findOrganWaitApplyInvoiceList',
    method: 'get',
  });
}

// 查询发票'可申请'列表
export async function invoiceCanBeInvoicedList(data) {
  return request({
    url: '/app/invoice/can-be-invoiced-list',
    method: 'post',
    data,
  });
}
// 发票申请
// POST
export async function invoiceApplyData(data) {
  return request({
    url: '/app/invoice/invoice-apply-data',
    method: 'post',
    data,
  });
}
// 发票申请
export async function invoiceManageAddInvoice(data) {
  return request({
    url: '/app/invoice/apply-invoice',
    method: 'post',
    data,
  });
}

// GET
// 发票OCR-异步
// GET
export async function appInvoiceManageApplicationInvoiceOcrAsync(params) {
  return request({
    url: '/app/invoiceManage/applicationInvoiceOcrAsync',
    method: 'get',
    params,
  });
}
// /app/invoiceManage/queryResult
// 查询发票异步OCR结果
// post
export async function appInvoiceManageGetOCRResult(data = {}, token = '') {
  const requestParams = {
    url: '/app/xlmAsync/queryResult',
    method: 'post',
    data: data,
  };
  if (token) {
    requestParams.headers = {
      'SYT-AUTH-TOKEN': token,
    };
  }

  return request(requestParams);
}

// 发票管理汇总信息
// POST
export async function appInvoiceManageGetAggregateInfo(params) {
  return request({
    url: '/app/invoiceManage/getAggregateInfo',
    method: 'get',
    params,
  });
}
// 发票管理月开票汇总
// POST
export async function appInvoiceManageGetMonthInvoiceInfo(data) {
  return request({
    url: '/app/invoiceManage/getMonthInvoiceInfo',
    method: 'post',
    data,
  });
}

// /app/invoiceManage/getSubmitRecord
// 提交记录
// POST
export async function appInvoiceManageGetSubmitRecord(data) {
  return request({
    url: '/app/invoiceManage/getSubmitRecord',
    method: 'post',
    data,
  });
}
// /app/invoiceManage/invoiceAddAsync
// 发票管理提交发票-异步
// POST
export async function appInvoiceManageInvoiceAddAsync(data) {
  return request({
    url: '/app/invoiceManage/invoiceAddAsync',
    method: 'post',
    data,
  });
}

// /app/invoiceManage/uploadFile
// 上传文件
// post
export async function appInvoiceManageUploadFile(data) {
  return request({
    url: '/app/file/uploadFile',
    method: 'post',
    data,
  });
}
