import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { ContractContext } from '../context/contractContext'
import anime from 'animejs'
import NormButton from '../components/common/NormButton'
import { Toast } from '../utils/Toast'
import { useNetwork } from 'wagmi'

export default function () {
  const { sendTxMintNFT } = useContext(ContractContext)
  const { chain } = useNetwork()

  useEffect(() => {
    anime({
      targets: [document.getElementById('title_jxa')],
      opacity: [0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 0.6, 0.4, 1],
      easings: 'easeInOutExpo',
      duration: 750,
    })
    anime({
      targets: [document.getElementById('nft-minted')],
      innerHTML: ['1,111', '6,832', '49,251', '87,421', '125,421'],
      easings: 'easeInOutExpo',
      round: 1,
      duration: 1000,
      delay: 300,
    })
  }, [])
  return (
    <div className="relavtive h-full w-full max-h-full max-w-full overflow-hidden">
      <div className=" z-[5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-[30px]">
        <Image
          id="logo_jxa"
          alt=""
          src={'/logo.png'}
          width={120}
          height={120}
          style={{ height: 'auto', width: 'auto' }}
        />
        <Image
          id="title_jxa"
          alt=""
          src={'/jxa.png'}
          width={350}
          height={80}
          priority={true}
          style={{ height: 'auto', width: 'auto' }}
        />
        <div className=" flex gap-[10px] text-2xl font-semibold  ">
          <span id="nft-minted"></span>
          <span>NFT HAS MINTED.</span>
        </div>
        <div
          className=" flex gap-x-[20px] text-lg"
          onClick={() => Toast(sendTxMintNFT(), chain?.id,false)}
        >
          <NormButton label="MINT" />
        </div>
        <div className=" flex gap-x-[20px] justify-center items-center">
          <div>
            <Image
              alt=""
              src={'/cdao.png'}
              width={100}
              height={0}
              style={{ height: 'auto', width: 160 }}
              className="aspect-auto"
            />
          </div>
          <div>
            <Image
              alt=""
              src={'/axelar.png'}
              width={80}
              height={0}
              style={{ height: 'auto', width: 100 }}
              className=" bg-white/100  rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
