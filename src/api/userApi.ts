import { TaskType, UserInfo } from '@/interface/apiInterface/userinfo'
import { spellAxios } from './base'
import { PreviewSpellguruRewardRsp, LinkSpellguruWalletRsp, ExchangeSpellguruRsp, ExchangeSpellguruReq, ExchangeType } from '@/interface/apiInterface/exchange'

export const getUserInfo = async (): Promise<UserInfo | undefined> => {
  const res = await spellAxios.post('/api/userinfo/GetUserInfo')
  return res.data.user
}

export const verifyTask = async (task_type: TaskType) => {
  try {
    await spellAxios.post('/api/userinfo/VerifyTask', {
      task_type,
    })
  } catch (e) {
    return
  }
}

export const linkAddress = async (address: string): Promise<LinkSpellguruWalletRsp | undefined> => {
  const res = await spellAxios.post('/api/userinfo/LinkSpellguruWallet', {
    address,
  })
  return res.data
}

export const previewReward = async (): Promise<PreviewSpellguruRewardRsp | undefined> => {
  const res = await spellAxios.post('/api/userinfo/PreviewSpellguruReward')
  return res.data
}

export const exchangeReward = async (exchangeType: ExchangeType): Promise<ExchangeSpellguruRsp | undefined> => {
  const res = await spellAxios.post('/api/userinfo/ExchangeSpellguruReward', {
    exchange_type: exchangeType
  })
  return res.data
}

