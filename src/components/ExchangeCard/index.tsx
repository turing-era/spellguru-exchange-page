import React from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

const ICON_MAP = {
  'vSGAI': {
    src: '/vSGAI.png',
    width: 54,
    height: 59,
    className: 'mb-[16px] md:mb-[10px]',
  },
  'SpellSlot': {
    src: '/SpellSlot.png',
    width: 77,
    height: 45,
    className: 'mb-[16px] md:mb-[12px]',
  },
  'S-AIX': {
    src: '/S-AIX.png',
    width: 82,
    height: 33,
    className: 'mb-[20px] md:mb-[15px]',
  }, 
}

export const ExchangeCard = ({
  type,
  value,
  title,
  disabled,
  exchangeFn,
} : {
  type: 'vSGAI' | 'SpellSlot' | 'S-AIX',
  value: number,
  title: string,
  disabled?: boolean,
  exchangeFn: Function
}) => {
  const { src, width, height, className } = ICON_MAP[type]
  const isSmScreen = useMediaQuery('(min-width:640px)')
  const buttonText = ['S-AIX'].includes(type) ? 'Coming soon' : 'Exchange'
  const buttonStyle = isSmScreen
    ? {width: '180px', height: '56px', fontWeight: 'bold', fontSize: '20px'}
    : {width: '50vw', height: '36px', fontWeight: 'normal', fontSize: '16px'}

  return <div className="flex flex-row relative mb-[20px] md:mb-[10px]">
    <div className="w-[30vw] h-[156px] md:h-[134px] md:w-[158px] bg-[#1A1A1A] flex flex-col items-center justify-end rounded-[16px]">
      <Image
        src={src}
        width={width}
        height={height}
        alt={type}
        className={className}
      ></Image>
      <span className="text-[16px] leading-[19px] font-normal text-white">
        {type}
      </span>
      <span className="text-[16px] leading-[19px] mb-[10px] font-bold text-[#F8E256]">
        {value}
      </span>
    </div>
    <div className="w-[2vw] md:w-[10px] relative">
      <div className="absolute h-[36px] w-[36px] top-[60px] left-[-13px] md:left-[-25px] md:top-[37px] md:h-[60px] md:w-[60px] rounded-full bg-[#F8E256] flex flex-row items-center justify-center">
        <Image
          src={'/arrow.svg'}
          width={20}
          height={20}
          alt={'arrow'}
        ></Image>
      </div>
    </div>
    <div className="flex flex-col w-[60vw] h-[156px] items-center justify-start md:h-[134px] px-[20px] md:w-[496px] md:flex-row md:justify-between md:pl-[46px] bg-[#1A1A1A] rounded-[16px]">
      <span className="font-normal mb-[30px] mt-[50px] text-[16px] leading-[19px] md:font-bold md:my-0">{title}</span>
      <Button style={buttonStyle} variant="contained" disabled={disabled} onClick={() => exchangeFn()}>{buttonText}</Button>
    </div>
  </div>;
}