import { TaskType, UserInfo } from '@/interface/apiInterface/userinfo'
import { spellAxios } from './base'

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
