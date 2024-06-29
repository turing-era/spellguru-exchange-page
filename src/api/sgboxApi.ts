import { spellAxios } from './base'
import {
  CancelSignReq,
  GetSGBoxInfoRsp,
  GetSignatureRsp,
  SignType,
} from '@/interface/apiInterface/sgbox'

export const getSignature = async (
  singType: SignType,
  boxid?: string | number
): Promise<GetSignatureRsp> => {
  const res = await spellAxios.post('/api/SGBox/Signature', {
    sign_type: singType,
    boxid: boxid,
  })
  const data: GetSignatureRsp = res?.data
  return data
}

export const cancelSignature = async (
  req: CancelSignReq
): Promise<GetSGBoxInfoRsp> => {
  const res = await spellAxios.post('/api/SGBox/CancelSign', req)
  const data: GetSGBoxInfoRsp = res?.data
  return data
}
