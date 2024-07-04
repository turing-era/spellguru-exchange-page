// link 钱包接口
export interface LinkSpellguruWalletReq {
  address: string;
}
export interface LinkSpellguruWalletRsp {
  success: boolean;
}

// 预览奖励接口
export interface PreviewSpellguruRewardRsp {
  /** spellguru钱包地址 -- 根据他来看是否绑定 */
  spellguru_address: string;
  /** vSGAI----->GAI */
  gai: number;
  /** vSGAI----->对战次数 */
  pk_times: number;
  /** SpellSlot ----> 口头禅槽总数 */
  phrases_slot_total: number;
  /** SpellSlot ----> 对战策略槽总数 */
  experience_slot_total: number;
  /** 已兑换的GAI数量 */
  exchanged_gai_amount: number;
  /** 已兑换的GAI时间 */
  exchanged_gai_ts: number;
  /** 已兑换的对战次数 */
  exchanged_pk_times: number;
  /** 已兑换的对战次数时间 */
  exchanged_pk_ts: number;
  /** 已兑换的口头禅槽 */
  exchanged_phrases_slot: number;
  /** 已兑换的口头禅槽时间 */
  exchanged_phrases_slot_ts: number;
  /** 已兑换的对战策略槽 */
  exchanged_experience_slot: number;
  /** 已兑换的对战策略槽时间 */
  exchanged_experience_slot_ts: number;
  /** 已兑换的原始vSGAI数量 */
  exchanged_vsgai: number;
  /** 已兑换的原始SpellSlot数量 */
  exchanged_spell_slot: number;
  /** 已兑换的原始SAIX数量 -- coming soon */
  exchanged_saix: number;
}

// 兑换奖励接口
export enum ExchangeType {
  TYPE_UNKNOWN = 0,
  /** TYPE_VSGAI - 用vSGAI兑换 */
  TYPE_VSGAI = 1,
  /** TYPE_SPELLSLOT - 用SPELLSLOT兑换 */
  TYPE_SPELLSLOT = 2,
  /** TYPE_SAIX - 用SAIX兑换 -- coming soon */
  TYPE_SAIX = 3,
  UNRECOGNIZED = -1,
}
export interface ExchangeSpellguruReq {
  /** 兑换类型 */
  exchange_type: ExchangeType;
}
export interface ExchangeSpellguruRsp {
  success: boolean;
  error_msg: string;
}