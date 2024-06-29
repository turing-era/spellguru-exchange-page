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
import { MessageDialog } from '@/components/MessageDialog'
import { LinkDialog } from '@/components/LinkDialog'

const iconClassNames = ['mr-[16px]', 'text-[24px]', 'md:mr-[30px]', 'md:text-[25px]', 'cursor-pointer'];
const contentDefaultClassNames = ['text-[16px]', 'leading-[19px]', 'md:text-[14px]', 'md:leading-[16px]', 'mb-[10px]', 'font-normal', 'text-[#cccccc]'];

export default function Home() {
  const [open, setOpen] = useState(true)
  const [isLinkDialogOpened, setIsLinkDialogOpened] = useState(false)
  const [isMessageDialogOpened, setIsMessageDialogOpened] = useState(false)
  const { userInfo } = useUserInfoContext()
  const isSmScreen = useMediaQuery('(min-width:640px)')

  const linkButtonStyle = isSmScreen
    ? {height: '26px', width: '68px', fontSize: '14px', borderRadius: '13px'}
    : {height: '30px', width: '76px' , fontSize: '14px', borderRadius: '15px'};

  useListenOnChainSwitch()

  return (
    <main
      style={{
        width: '100vw',
      }}
    >
      <div
        className="flex flex-row px-[20px] md:px-[50px] items-center justify-between h-[100px] w-[100vw]"
      >
        <div className="h-[25px] w-[22px] bg-[url('/logo_sm.png')] md:h-[33px] md:w-[184px] md:bg-[url('/logo.png')] bg-cover" title="SpellGuru">
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FaXTwitter
            className={iconClassNames.join(' ')}
            onClick={() => {
              window.open('https://twitter.com/GuruSpell', '_blank')
            }}
          />
          <FaDiscord
            className={iconClassNames.join(' ')}
            onClick={() => {
              window.open('https://discord.com/invite/cDZVCyz8ws', '_blank')
            }}
          />
          <SiGitbook
            className={[...iconClassNames, 'md:mr-[44px]'].join(' ')}
            onClick={() => {
              window.open('https://gitbook.spellguru.ai/', '_blank')
            }}
          />
          <div className={ userInfo ? "" : "custom-connect-btn"}>
            <ConnectButton chainStatus="name" showBalance={isSmScreen}></ConnectButton>
          </div>
        </div>
      </div>
      <div className="w-[100vw] px-[20px] md:w-[700px] md:m-auto md:px-0">
        <div className="py-[30px]">
          <h1 className="text-[24px] leading-[30px] mb-[10px] font-extrabold">SpellBox rewards exchange</h1>
          <p className={contentDefaultClassNames.join(' ')}>Now you can claim the rewards you received in the Genesis event.</p>
          <p className={[...contentDefaultClassNames].join(' ')}>
            <span className="leading-[30px] md:leading-[26px] pr-[10px]">Connect your SpellGuru wallet address</span>
            <Button style={linkButtonStyle} variant="contained" onClick={() => {setIsLinkDialogOpened(true)}}>Link</Button>
          </p>                       
          <p className={contentDefaultClassNames.join(' ')}>If you have not yet created a SpellGuru wallet, please register an account and create one at app.spellguru.ai.</p>
          <p className={contentDefaultClassNames.join(' ')}>The rewards and benefits you earned in the Genesis event are listed below for you to review and exchange:</p>
        </div>
        <div>
          <ExchangeCard type="vSGAI" title="xxx GAI+xxx 对战次数" value={0} exchangeFn={() => {setIsMessageDialogOpened(true)}}></ExchangeCard>
          <ExchangeCard type="SpellSlot" title="xxx 口头禅 + xxx 策略" value={0} exchangeFn={() => {}}></ExchangeCard>
          <ExchangeCard type="S-AIX" title="xxx AIX" value={0} disabled={true} exchangeFn={() => {}}></ExchangeCard>
        </div>
        <MessageDialog open={isMessageDialogOpened} type='error' onClose={() => {setIsMessageDialogOpened(false)}} />
        <LinkDialog open={isLinkDialogOpened} onClose={() => {setIsLinkDialogOpened(false)}} onConfirm={() => {}} />
      </div>
    </main>
  )
}
