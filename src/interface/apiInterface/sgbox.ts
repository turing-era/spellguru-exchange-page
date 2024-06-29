export enum SgBoxStatus {
  /** SGBOX_STATUS_CAN_OPEN - 可打开 */
  SGBOX_STATUS_CAN_OPEN = 0,
  /** SGBOX_STATUS_NO_SPELLKEY - 缺少key */
  SGBOX_STATUS_NO_SPELLKEY = 1,
  /** SGBOX_STATUS_OPENING - 打开中 */
  SGBOX_STATUS_OPENING = 2,
  /** SGBOX_STATUS_OPENED - 已打开 */
  SGBOX_STATUS_OPENED = 3,
  UNRECOGNIZED = -1,
}

export enum SignType {
  SIGN_TYPE_ALL = 0,
  SIGN_TYPE_SINGLE = 1,
  UNRECOGNIZED = -1,
}

export interface SgBoxResult {
  sgai: number
  sgslot: number
  saix: number
}

/** 盒子 */
export interface SgBox {
  boxid: number
  uid: number
  /** 获取任务类型 */
  receive_task_type: number
  /** 获取时间 */
  receive_ts: number
  /** 打开时间 */
  opened_ts: number
  /** 状态 */
  status: number
  /** 盒子结果 */
  box_result: SgBoxResult | undefined
}

export interface GetSignatureReq {
  sign_type: number
  /** single时使用 */
  boxid?: number
}

export interface GetSignatureRsp {
  quantity: number
  purchase_limit: number
  expire_timestamp: number
  amount: number
  signature: string
  /** 签名的盒子列表 */
  boxids: number[]
}

export interface GetSGBoxInfoReq {
  id: number
}

export interface GetSGBoxInfoRsp {
  image: string
  name: string
  description: string
  attributes: string[]
}

export interface GetContractInfoReq {}

export interface GetContractInfoRsp {
  image: string
  name: string
  description: string
  banner_image: string
  featured_image: string
  external_link: string
}

export interface CancelSignReq {
  /** 签名的盒子列表 */
  boxids: number[]
}

export interface CancelSignRsp {}

export interface SGBox {
  /** 生成box签名 */
  GetSignature(request: GetSignatureReq): Promise<GetSignatureRsp>
  /** 取消签名 */
  CancelSign(request: CancelSignReq): Promise<CancelSignRsp>
  /** 获取box信息 */
  GetSGBoxInfo(request: GetSGBoxInfoReq): Promise<GetSGBoxInfoRsp>
  /** 获取合约信息 */
  GetContractInfo(request: GetContractInfoReq): Promise<GetContractInfoRsp>
}
