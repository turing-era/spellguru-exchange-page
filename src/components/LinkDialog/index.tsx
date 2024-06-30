import React, { useEffect } from "react"
import Image from "next/image"
import { Button, Modal, Input } from "@mui/material"
import { UserInfo } from "@/interface/apiInterface/userinfo"

export const LinkDialog: React.FC<{
  address: string
  open: boolean
  userInfo: UserInfo | undefined
  onClose: () => void
  onConfirm: (value: string) => void
}>
  = ({ address, open, userInfo, onClose, onConfirm }) => {
    const [value, setValue] = React.useState(address)
    const title = 'Link SpellGuru Wallet';
    const message = 'After the link is successful, it cannot be modified. Please handle it carefully.';

    useEffect(() => {
      setValue(address)
    }, [address])

    return (
      <Modal
        open={open}
        onClose={onClose}
        style={{ background: 'rgba(0, 0, 0, 0.8)'}}
      >
        <div className="absolute flex flex-col items-center top-[50%] left-[50%] outline-0 rounded-[12px] bg-[#1A1A1A]
          w-[92vw] px-[14px] pb-[25px] -translate-y-[70%]
          md:w-[664px] md:px-[30px] md:pb-[40px] md:-translate-y-[50%] pt-[77px] -translate-x-[50%]">
          <Image
            src='/close.svg'
            alt='close'
            width={14}
            height={14}
            style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}}
            onClick={onClose}
          />
          <h1 className="text-[24px] leading-[28px] font-extrabold mb-[13px]">{title}</h1>
          <p className="text-center text-[16px] font-normal leading-[19px] mb-[40px] text-[#FF0000] whitespace-pre-wrap">{message}</p>
          <Input
            className="w-[86.4vw] md:w-[604px] mb-[80px] h-[36px]]"
            sx={{border: '2px solid #F8E256', textAlign: 'center'}}
            value={value} required placeholder='Please input'
            onChange={(e) => setValue(e.target.value)}
            disableUnderline={true}
            disabled={!!address}
            />
          <Button
            className="w-[86.4vw] h-[48px] md:h-[54px] md:w-[604px] font-bold"
            variant="contained"
            disabled={!!address || !userInfo}
            onClick={() => onConfirm(value)}
          >Confirm</Button>
        </div>
      </Modal>
    )
  }