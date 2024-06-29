import { SgBox } from './sgbox'
export enum TaskType {
  TASKTYPE_UNKNOWN = 0,
  TASKTYPE_T1 = 1,
  TASKTYPE_T2 = 2,
  TASKTYPE_T3 = 3,
  TASKTYPE_T4 = 4,
  TASKTYPE_T5 = 5,
  TASKTYPE_T6 = 6,
  TASKTYPE_T7 = 7,
  TASKTYPE_T8 = 8,
  TASKTYPE_T9 = 9,
  UNRECOGNIZED = -1,
}

export enum VerifyTaskRes {
  TASK_VERIFY_SUCC = 0,
  TASK_VERIFY_FAIL = 1,
  TASK_VERIFY_HAS_FINISHED = 2,
  UNRECOGNIZED = -1,
}

/** 用户信息 */
export interface UserInfo {
  uid: number
  /** 昵称 */
  nick: string
  /** 头像 */
  avatar: string
  /** 登录类型 auth.LoginType */
  login_type: number
  /** 平台账号 */
  platform_uid: string
  invited_code: string
  /** 邮箱 */
  email: string
  /** 邀请码 */
  refer_code: string
  /** 注册时间 */
  register_time: number
  /** 动态数据 */
  dynamic: UserDynamic | undefined
  /** 任务列表 */
  tasks: UserTask[]
  sgboxes: SgBox[]
}

/** 用户动态数据 */
export interface UserDynamic {
  sgbox_total: number
  sgbox_opened: number
  sgbox_available: number
  sgbox_opening: number
  sgkey_total: number
  sgkey_used: number
  sgkey_available: number
  sgai: number
  sgslot: number
  saix: number
}

export interface UserTask {
  /** 任务类型 TaskType */
  task_type: number
  /** 上次完成时间 */
  finish_ts: number
  /** 是否已完成 */
  has_completed: boolean
}

export interface GetUserInfoReq {}

export interface GetUserInfoRsp {
  user: UserInfo | undefined
}

export interface VerifyTaskReq {
  task_type: number
}

export interface VerifyTaskRsp {
  /** VerifyTaskRes */
  res: number
}

export interface Userinfo {
  /** 获取用户信息 */
  GetUserInfo(request: GetUserInfoReq): Promise<GetUserInfoRsp>
  /** 任务校验 */
  VerifyTask(request: VerifyTaskReq): Promise<VerifyTaskRsp>
}
