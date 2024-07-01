import React from "react"
import Image from "next/image"
import { Button, Modal } from "@mui/material"

export enum MessageDialogType {
  Success = 'success',
  Error = 'error'
}

export const MessageDialog: React.FC<{
  open: boolean
  type: MessageDialogType
  onClose: () => void}>
  = ({ open, type, onClose }) => {
    const title = type === 'success' ? 'Exchange successful' : 'Exchange failed';
    const message = type === 'success'
      ? 'Exchange successful. Please go to the product to check.\n Note that L3/L4 level is required to use it.'
      : 'Exchange failed. Please exchange again.';
    const iconSrc = type === 'success' ? '/success.svg' : '/error.svg';
    
    return (
      <Modal
        open={open}
        onClose={onClose}
        style={{ background: 'rgba(0, 0, 0, 0.8)'}}
      >
        <div className="absolute flex flex-col items-center top-[50%] left-[50%] outline-0 rounded-[12px] bg-[#1A1A1A]
          w-[92vw] px-[14px] pt-[78px] pb-[25px] -translate-y-[70%]
          md:w-[664px] md:px-[30px] md:pt-[70px] md:pb-[40px] md:-translate-y-[50%] -translate-x-[50%]">
          <Image
            src='/close.svg'
            alt='close'
            width={14}
            height={14}
            style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}}
            onClick={onClose}
          />
          <Image
            src={iconSrc}
            alt={title}
            width={80}
            height={80}
            style={{ marginBottom: '24px'}}
          />
          <h1 className="text-[24px] leading-[28px] font-extrabold mb-[13px]">{title}</h1>
          <p className="text-center text-[16px] font-normal leading-[19px] mb-[27px] md:mb-[44px] whitespace-pre-wrap">{message}</p>
          <Button className="w-[86.4vw] h-[48px] md:h-[54px] md:w-[604px] font-bold" variant="contained" onClick={onClose}>Back</Button>
        </div>
      </Modal>
    )
  }