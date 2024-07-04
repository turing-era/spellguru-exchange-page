'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { USER_HAS_ENTER, Colors } from '@/utils/constants'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { FaXTwitter } from 'react-icons/fa6'
import { FaDiscord } from 'react-icons/fa'
import { SiGitbook } from 'react-icons/si'
import Image from 'next/image'
import { useListenOnChainSwitch } from '@/utils/chainSwich'
import { useUserInfoContext } from '@/providers/userInfoProvider'
import { ExchangeCard } from '@/components/ExchangeCard'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { MessageDialog, MessageDialogType } from '@/components/MessageDialog'
import { LinkDialog } from '@/components/LinkDialog'
import { isAddress } from 'ethers'
import { linkAddress, exchangeReward } from '@/api/userApi'
import { ExchangeType } from '@/interface/apiInterface/exchange'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import {SpellButton} from '@/components/SpellButton'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

const iconClassNames = ['mr-[16px]', 'text-[24px]', 'md:mr-[30px]', 'md:text-[25px]', 'cursor-pointer'];
const contentDefaultClassNames = ['text-[16px]', 'leading-[19px]', 'md:text-[14px]', 'md:leading-[16px]', 'mb-[10px]', 'font-normal', 'text-[#cccccc]'];

export default function Home() {
  const [open, setOpen] = useState(true)
  const [isLinkDialogOpened, setIsLinkDialogOpened] = useState(false)
  const [isMessageDialogOpened, setIsMessageDialogOpened] = useState(false)
  const [messageDialogType, setMessageDialogType] = useState<MessageDialogType>(MessageDialogType.Success)
  const [exchangeBtnDisabled, setExchangeBtnDisabled] = useState(false)
  const [exchangeType, setExchangeType] = useState<ExchangeType>(ExchangeType.TYPE_UNKNOWN);

  const { userInfo, rewardInfo, updateUserInfo, updateRewardInfo } = useUserInfoContext()

  const isSmScreen = useMediaQuery('(min-width:640px)')
  const linkButtonStyle = isSmScreen
    ? {height: '26px', width: '68px', fontSize: '14px', borderRadius: '13px'}
    : { height: '30px', width: '76px', fontSize: '14px', borderRadius: '15px'};

  useListenOnChainSwitch()

  const handleLinkAddres = async (address: string) => {
    if (!isAddress(address)) {
      toast.warn("Please enter a valid address.")
      return
    }

    try {
      const res = await linkAddress(address)
      if (res?.success) {
        toast.success("Link wallet successfully.")
        updateRewardInfo()
        setIsLinkDialogOpened(false)
      } else {
        toast.error("Link wallet failed, please try again later.")
      }
    } catch(error) {
      console.error('linkAddress error', error)
      toast.error("Link wallet failed, please try again later.")
    }
  }

  const handleExchangeReward = async (exchangeType: ExchangeType) => {
    setExchangeBtnDisabled(true)
    setExchangeType(exchangeType)
    try {
      const res = await exchangeReward(exchangeType)
      if (res?.success) {
        updateRewardInfo()
        updateUserInfo()
        setMessageDialogType(MessageDialogType.Success)
      } else {
        setMessageDialogType(MessageDialogType.Error)
      }
    } catch (error) {
      console.log('handleExchangeReward error', error)
      setMessageDialogType(MessageDialogType.Error)
    }
    setIsMessageDialogOpened(true)
    setExchangeBtnDisabled(false)
  }

  return (
    <main
      style={{
        width: '100vw',
      }}
    >
      <NavBar userInfo={userInfo} />
      <div className="w-[100vw] px-[20px] md:w-[700px] md:m-auto md:px-0">
        <div className="py-[30px]">
          <h1 className="text-[24px] leading-[30px] mb-[10px] font-extrabold">SpellBox rewards exchange</h1>
          <p className={contentDefaultClassNames.join(' ')}>Now you can claim the rewards you received in the Genesis event.</p>
          <p className={[...contentDefaultClassNames].join(' ')}>
            <span className="leading-[30px] md:leading-[26px] pr-[10px]">Connect your SpellGuru wallet address</span>
            <Button disabled={!userInfo} style={linkButtonStyle} variant="contained" onClick={() => {setIsLinkDialogOpened(true)}}>Link</Button>
          </p>                       
          <p className={contentDefaultClassNames.join(' ')}>
            <span className="leading-[30px] md:leading-[26px] pr-[10px]">If you have not yet created a SpellGuru wallet, please register and create one by</span>
            <SpellButton
              icon={
                <Box sx={{ width: 20, height: 20 }}>
                  <Image
                    src={'/chrome.png'}
                    alt='chrome'
                    width={20}
                    height={20}/>
                </Box>
              }
              isSmScreen={isSmScreen}
              label='Chrome'
              href='https://chromewebstore.google.com/detail/spellguru/jalkgjpnhfbmpcllnmonlikemjhfeiag'
            />
          </p>
          <p className={contentDefaultClassNames.join(' ')}>The rewards and benefits you earned in the Genesis event are listed below for you to review and exchange:</p>
        </div>
        <div>
          <ExchangeCard
            type={ExchangeType.TYPE_VSGAI}
            title={`GAI ${rewardInfo.gai} + Battle ${rewardInfo.pk_times} `}
            value={(userInfo?.dynamic?.sgai || 0) / 100}
            exchangedRecord={rewardInfo.exchanged_gai_ts
              ? `${dayjs(rewardInfo.exchanged_gai_ts * 1000).format('YYYY-MM-DD')}\n${rewardInfo.exchanged_vsgai / 100} vSGAI exhcanged ${rewardInfo.exchanged_gai_amount} GAI and ${rewardInfo.exchanged_pk_times} Battles`
              : ``}
            exchangeFn={() => {handleExchangeReward(ExchangeType.TYPE_VSGAI)}}
            disabled={exchangeBtnDisabled || !userInfo?.dynamic?.sgai}>
          </ExchangeCard>
          <ExchangeCard
            type={ExchangeType.TYPE_SPELLSLOT}
            title={`Catchphrase ${rewardInfo.phrases_slot_total} + Strategy ${rewardInfo.experience_slot_total}`}
            value={userInfo?.dynamic?.sgslot || 0}
            exchangeFn={() => { handleExchangeReward(ExchangeType.TYPE_SPELLSLOT) }}
            exchangedRecord={
              rewardInfo.exchanged_phrases_slot_ts
                ? `${dayjs(rewardInfo.exchanged_phrases_slot_ts * 1000).format('YYYY-MM-DD')}\n${rewardInfo.exchanged_spell_slot} SpellSlot exhcanged ${rewardInfo.exchanged_phrases_slot} Catchphrases and ${rewardInfo.exchanged_experience_slot} Strategies`
                : ''
            }
            disabled={exchangeBtnDisabled || !userInfo?.dynamic?.sgslot}>        
          </ExchangeCard>
          <ExchangeCard
            type={ExchangeType.TYPE_SAIX}
            title="AIX xxx"
            value={userInfo?.dynamic?.saix || 0}
            disabled={true}
            exchangedRecord=''
            exchangeFn={() => {}}>
          </ExchangeCard>
        </div>
        <MessageDialog
          open={isMessageDialogOpened}
          type={messageDialogType}
          exchangeType={exchangeType}
          onClose={() => {setIsMessageDialogOpened(false)}}
        />
        <LinkDialog
          address={rewardInfo.spellguru_address}
          userInfo={userInfo}
          open={isLinkDialogOpened}
          onClose={() => {setIsLinkDialogOpened(false)}}
          onConfirm={handleLinkAddres}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        theme="dark"
        transition={Slide}
        closeOnClick={false}
      />
    </main>
  )
}
