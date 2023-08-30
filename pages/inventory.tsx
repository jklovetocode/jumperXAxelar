import Image from 'next/image'
import { Button, Dialog } from '@radix-ui/themes'
import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/contractContext'
import { FindBorn, convertChainName } from '../utils/FindHelper'
import { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit'
import { Toast } from '../utils/Toast'

export default function () {
  const { openChainModal } = useChainModal()
  const { chain } = useNetwork()
  const chainList = [
    { text: 'Avalanche Fuji', src: '/avax.png' },
    { text: 'Fantom Testnet', src: '/fantom.png' },
    { text: 'Polygon Mumbai', src: '/matic.png' },
  ]

  const {
    loadingNFTDataAvalanchefuji,
    loadingNFTDataFantom,
    loadingNFTDataPolygon,
    userNFTAvalanchefuji,
    userNFTFantom,
    userNFTPolygon,
    sendTxBridgeNFT,
  } = useContext(ContractContext)
  const router = useRouter()

  // current chain / selected chain state
  const [mychain, setMyChain] = useState('Avalanche Fuji')

  const [tabChain, setTabChain] = useState<string>('Fantom Testnet')

  const [dataNFT, setDataNFT] = useState<TypeNFT[]>(userNFTFantom)

  useEffect(() => {
    setDataNFT(userNFTFantom)
  }, [loadingNFTDataFantom])
  return (
    <div className=' h-full w-full flex items-center justify-center font-bold mt-[20px]'>
      <div
        className={`flex flex-row gap-2 mt-10 z-10 
      ${
        (loadingNFTDataAvalanchefuji ||
          loadingNFTDataFantom ||
          loadingNFTDataPolygon) &&
        'hidden'
      }
      `}
      >
        <Button
          className={`${tabChain == 'Fantom Testnet' && 'bg-white text-black'}`}
          onClick={() => {
            setTabChain('Fantom Testnet')
            setDataNFT(userNFTFantom)
          }}
        >
          <div>Fantom Testnet</div>
        </Button>
        <Button
          className={`${tabChain == 'Avalanche Fuji' && 'bg-white text-black'}`}
          onClick={() => {
            setTabChain('Avalanche Fuji')
            setDataNFT(userNFTAvalanchefuji)
          }}
        >
          Avalanche Fuji
        </Button>
        <Button
          className={`${tabChain == 'Polygon Mumbai' && 'bg-white text-black'}`}
          onClick={() => {
            setTabChain('Polygon Mumbai')
            setDataNFT(userNFTPolygon)
          }}
        >
          Polygon Mumbai
        </Button>
      </div>
      <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] grass rounded-xl grid grid-cols-3 overflow-y-scroll p-[10px] z-[10] items-center justify-center gap-y-[20px] mt-[20px]'>
        {loadingNFTDataAvalanchefuji ||
        loadingNFTDataFantom ||
        loadingNFTDataPolygon ? (
          <div className='flex flex-col gap-3 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='loader'></span>
            <span className=''>Loading...</span>
          </div>
        ) : (
          <>
            {dataNFT.length > 0 ? (
              dataNFT.map((x, y) => (
                <div
                  key={`${x.tokenID}-${y}`}
                  className=' w-full h-full flex justify-center items-center'
                >
                  <div className=' w-[240px] h-[420px] flex flex-col justify-center items-center gap-y-[5px] border border-white bg-purple-400/10 first-letter:0 rounded-lg'>
                    <div>Token ID #{x.tokenID}</div>
                    <Image
                      alt=''
                      src={`/${x.codePic}.png`}
                      width={160}
                      height={10}
                      style={{
                        width: 200,
                        aspectRatio: 'auto',
                      }}
                      priority={true}
                    />
                    <div> Level: {x.level}</div>
                    <div> Point: {x.point}</div>
                    <div> Born in: {FindBorn(x.born)}</div>
                    <div className='flex flex-row gap-2'>
                      <div>Fantom: {x.fantom} </div>
                      <div>Avax: {x.avax} </div>
                      <div>Matic: {x.matic} </div>
                    </div>
                    <div className=' flex gap-[10px] justify-center items-center'></div>
                    {tabChain == chain?.name ? (
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button>Bridge</Button>
                        </Dialog.Trigger>
                        <Dialog.Content
                          style={{ maxWidth: 300 }}
                          className=' z-[20] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white p-[10px] rounded-lg flex flex-col gap-[10px] border-[0.5px] border-white/60 w-full justify-center items-center'
                        >
                          <Dialog.Title>Bridges</Dialog.Title>
                          <Dialog.Description size='2' mb='4'>
                            Select Destination Chain.
                          </Dialog.Description>
                          <div className=' grid grid-cols-3 gap-[10px] w-full '>
                            {chainList.map((x, y) => (
                              <>
                                {x.text != chain?.name && (
                                  <div
                                    tabIndex={-1}
                                    key={`${x.text}-${y}`}
                                    className={[
                                      ' p-[5px] border border-white/30 rounded-lg w-full h-max flex justify-center items-center cursor-pointer hover:bg-white/20 ',
                                      x.text === mychain ? ' bg-white/30' : '',
                                    ].toString()}
                                    onClick={() => setMyChain(x.text)}
                                  >
                                    <Image
                                      alt=''
                                      src={x.src}
                                      width={60}
                                      height={60}
                                      style={{
                                        aspectRatio: 'auto',
                                      }}
                                    ></Image>
                                  </div>
                                )}
                              </>
                            ))}
                          </div>

                          <div className=' flex gap-[10px] justify-center'>
                            <Dialog.Close>
                              <Button>Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close
                              onClick={() => {
                                Toast(
                                  sendTxBridgeNFT(
                                    convertChainName(mychain),
                                    x.tokenID
                                  ),
                                  chain.id,
                                  true
                                )
                              }}
                            >
                              <Button>Bridge</Button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Root>
                    ) : (
                      <Button onClick={openChainModal}>switch network</Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col gap-3 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <span className=''>NFT Not Found </span>
                <span className=''>Click button below to mint page </span>
                <Button onClick={() => router.push('/')}>Mint</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
