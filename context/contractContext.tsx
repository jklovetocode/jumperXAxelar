import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import artifactContractNFT from '../artifacts/contracts/JUMPER.sol/JUMPER.json'
import { ContractNFT } from '../utils/contractAddress'
import { JUMPER } from '../typechain-types'
import {
  toEtherandFixFloatingPoint,
  toWei,
  toEther,
  toEtherFloatingPoint,
  toFixUnits,
} from '../utils/UnitInEther'
import { useAccount, useNetwork } from 'wagmi'
import { ChainIDAvalanchefuji, ChainIDFantomTestnet, ChainIDMumbai, FindRPCByChainID, findContractNFT,findGas } from '../utils/FindHelper'

interface IContract {
  sendTxMintNFT: () => Promise<string>
  sendTxBridgeNFT: (destinationChain: string, tokenID: number) => Promise<string>
  getDataNFTAvalanchefuji: () => Promise<void>
  getDataNFTFantom: () => Promise<void>
  getDataNFTPolygon: () => Promise<void>
  loadingNFTDataFantom: boolean
  loadingNFTDataPolygon: boolean
  loadingNFTDataAvalanchefuji: boolean
  userNFTAvalanchefuji: TypeNFT[]
  userNFTPolygon: TypeNFT[]
  userNFTFantom: TypeNFT[]
}

export const ContractContext = createContext<IContract>({
  sendTxMintNFT: async () => '',
  sendTxBridgeNFT: async () => '',
  getDataNFTAvalanchefuji: async () => {},
  getDataNFTFantom: async () => {},
  getDataNFTPolygon: async () => {},
  loadingNFTDataFantom: false,
  loadingNFTDataPolygon: false,
  loadingNFTDataAvalanchefuji: false,
  userNFTAvalanchefuji: [],
  userNFTPolygon: [],
  userNFTFantom: [],
})

interface ChildrenProps {
  children: React.ReactNode
}

export const ContractProvider = ({ children }: ChildrenProps) => {
 
  const { chain } = useNetwork()
  const { isDisconnected,address } = useAccount()
  
  const [initialLoading, setInitialLoading] = useState(true)
  let providerWindow: ethers.providers.Web3Provider
  let providerRPCAvalanchefuji = new ethers.providers.JsonRpcProvider(FindRPCByChainID(ChainIDAvalanchefuji))
  let providerRPCMumbai = new ethers.providers.JsonRpcProvider(FindRPCByChainID(ChainIDMumbai))
  let providerRPCFantomTestnet = new ethers.providers.JsonRpcProvider(FindRPCByChainID(ChainIDFantomTestnet))

  if (typeof window !== 'undefined') {
    try {
      providerWindow = new ethers.providers.Web3Provider(window.ethereum as any)
    } catch (error) {}
  }
  const getNFTContractAvalanchefuji  = new ethers.Contract(
      ContractNFT.Avalanche.contractAddress,
      artifactContractNFT.abi,
      providerRPCAvalanchefuji
    ) as JUMPER


  const getNFTContractPolygon = new ethers.Contract(
      ContractNFT.Polygon.contractAddress,
      artifactContractNFT.abi,
      providerRPCMumbai
    ) as JUMPER

  const getNFTContractFantomTestnet = new ethers.Contract(
      ContractNFT.Fantom.contractAddress,
      artifactContractNFT.abi,
      providerRPCFantomTestnet
    ) as JUMPER

  const [loadingNFTDataAvalanchefuji, setLoadingNFTDataAvalanchefuji] = useState(false)
  const [loadingNFTDataPolygon, setLoadingNFTDataPolygon] = useState(false)
  const [loadingNFTDataFantom, setLoadingNFTDataFantom] = useState(false)
  const [userNFTAvalanchefuji, setUserAvalanchefuji] = useState<TypeNFT[]>([])
  const [userNFTPolygon , setUserPolygon ] = useState<TypeNFT[]>([])
  const [userNFTFantom, setUserFantom] = useState<TypeNFT[]>([])

  useEffect(() => {
    setInitialLoading(false)
    addlistenerEvents()
    getDataNFTFantom()
    getDataNFTPolygon()
    getDataNFTAvalanchefuji()
  }, [])

  const sendTxMintNFT = async () => {
    try {
      if (isDisconnected || (chain?.id == undefined) || address == undefined) throw new Error('disconnect wallet')
      const signer = providerWindow.getSigner()
      const contractNFT = new ethers.Contract(
        findContractNFT(chain.id),
        artifactContractNFT.abi,
        signer
      ) as JUMPER
      const transactionHash = await contractNFT.safeMint(address)
      await transactionHash.wait()
      return transactionHash.hash
    } catch (error: any) {
       if (error.reason) {
        throw new Error(error.reason)
      } else if (error.data?.message) {
        throw new Error(error.data.message)
      } else {
        throw new Error(error)
      }
  }
}

  const sendTxBridgeNFT = async (destinationChain:string,tokenID:number) => {
    try {
      if (isDisconnected || chain?.id == undefined || address == undefined)
        throw new Error('disconnect wallet')
      const signer = providerWindow.getSigner()
      const contractNFT = new ethers.Contract(
        findContractNFT(chain.id),
        artifactContractNFT.abi,
        signer
      ) as JUMPER
      const transactionHash = await contractNFT.bridge(destinationChain,tokenID,{
        value: toWei(findGas(chain.id))
      })
      await transactionHash.wait()
      await Promise.all([
        getDataNFTFantom(),
        getDataNFTPolygon(),
        getDataNFTAvalanchefuji(),
      ])
      return transactionHash.hash
    } catch (error: any) {
      if (error.reason) {
        throw new Error(error.reason)
      } else if (error.data?.message) {
        throw new Error(error.data.message)
      } else {
        throw new Error(error)
      }
    }
  }

  const getDataNFTAvalanchefuji = async () => {
    try {
      if (isDisconnected || (chain?.id == undefined) || address == undefined) throw new Error('disconnect wallet')
      setLoadingNFTDataAvalanchefuji(true)
      setUserAvalanchefuji([])
      const ownerNFTAvalanchefuji=  await getNFTContractAvalanchefuji.walletOfOwner(address)
      
      let tempDataNFTAvalanchefuji: TypeNFT[] = []
      await Promise.all(
         ownerNFTAvalanchefuji.map(async (item) => {
          const dataNftStatus = await getNFTContractAvalanchefuji.nftStatus(
            item
          )
          const struct: TypeNFT = {
            tokenID: item.toNumber(),
            level: dataNftStatus.level.toNumber(),
            point: dataNftStatus.point.toNumber(),
            born: dataNftStatus.born.toNumber(),
            codePic: dataNftStatus.codePic.toNumber(),
            avax: dataNftStatus.avax.toNumber(),
            fantom: dataNftStatus.fantom.toNumber(),
            matic: dataNftStatus.matic.toNumber(),
          }
          tempDataNFTAvalanchefuji.push(struct)
        }))

      setUserAvalanchefuji(tempDataNFTAvalanchefuji)

      setLoadingNFTDataAvalanchefuji(false)
    } catch (error: any) {
      setLoadingNFTDataAvalanchefuji(false)
      console.log(error)
    }
  }
  const getDataNFTFantom = async () => {
    try {
      if (isDisconnected || (chain?.id == undefined) || address == undefined) throw new Error('disconnect wallet')
      setLoadingNFTDataFantom(true)
      setUserFantom([])
      const ownerNFTFantomTestnet=  await getNFTContractFantomTestnet.walletOfOwner(address)
      
      let tempDataNFTFantomTestnet: TypeNFT[] = []
      await Promise.all(
         ownerNFTFantomTestnet.map(async (item) => {
          const dataNftStatus = await getNFTContractFantomTestnet.nftStatus(
            item
          )
          const struct: TypeNFT = {
            tokenID: item.toNumber(),
            level: dataNftStatus.level.toNumber(),
            point: dataNftStatus.point.toNumber(),
            born: dataNftStatus.born.toNumber(),
            codePic: dataNftStatus.codePic.toNumber(),
            avax: dataNftStatus.avax.toNumber(),
            fantom: dataNftStatus.fantom.toNumber(),
            matic: dataNftStatus.matic.toNumber(),
          }
          tempDataNFTFantomTestnet.push(struct)
        }))

      setUserFantom(tempDataNFTFantomTestnet)

      setLoadingNFTDataFantom(false)
    } catch (error: any) {
      setLoadingNFTDataFantom(false)
      console.log(error)
    }
  }

  const getDataNFTPolygon = async () => {
    try {
      if (isDisconnected || (chain?.id == undefined) || address == undefined) throw new Error('disconnect wallet')
      setLoadingNFTDataPolygon(true)
      setUserPolygon([])
      const ownerNFTPolygon=  await getNFTContractPolygon.walletOfOwner(address)
      
      let tempDataNFTPolygon: TypeNFT[] = []
      await Promise.all(
         ownerNFTPolygon.map(async (item) => {
          const dataNftStatus = await getNFTContractPolygon.nftStatus(
            item
          )
          const struct: TypeNFT = {
            tokenID: item.toNumber(),
            level: dataNftStatus.level.toNumber(),
            point: dataNftStatus.point.toNumber(),
            born: dataNftStatus.born.toNumber(),
            codePic: dataNftStatus.codePic.toNumber(),
            avax: dataNftStatus.avax.toNumber(),
            fantom: dataNftStatus.fantom.toNumber(),
            matic: dataNftStatus.matic.toNumber(),
          }
          tempDataNFTPolygon.push(struct)
        }))

      setUserPolygon(tempDataNFTPolygon)

      setLoadingNFTDataPolygon(false)
    } catch (error: any) {
      setLoadingNFTDataPolygon(false)
      console.log(error)
    }
  }

 const addlistenerEvents = async () => {
   try {
     if (window.ethereum != undefined) {
       //@ts-ignore
       window.ethereum.on('accountsChanged', () => {
         window.location.reload()
       })
       interface ConnectInfo {
         chainId: string
       }

       //@ts-ignore
       window.ethereum.on('chainChanged', (_chainId) => {
         window.location.reload()
       })
     }
   } catch (error) {}
 }



  return (
    <ContractContext.Provider
      value={{
        sendTxMintNFT,
        sendTxBridgeNFT,
        getDataNFTAvalanchefuji,
        getDataNFTFantom,
        getDataNFTPolygon,
        loadingNFTDataAvalanchefuji,
        loadingNFTDataFantom,
        loadingNFTDataPolygon,
        userNFTFantom,
        userNFTAvalanchefuji,
        userNFTPolygon
      }}
    >
      {!initialLoading && children}
    </ContractContext.Provider>
  )
}
