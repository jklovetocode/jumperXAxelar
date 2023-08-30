import { ContractNFT } from "./contractAddress"

export const ChainIDAvalanchefuji = 43113
export const ChainIDMumbai = 80001
export const ChainIDFantomTestnet = 4002

export function findExplorer(chainID: number | undefined) {
  switch (chainID) {
    case ChainIDAvalanchefuji:
      return 'https://testnet.snowtrace.io'
    case ChainIDMumbai:
      return 'https://mumbai.polygonscan.com'
    case ChainIDFantomTestnet:
      return 'https://testnet.ftmscan.com'
    default:
      return 'error'
  }
}

export function findContractNFT(chainID: number | undefined) {
  switch (chainID) {
    case ChainIDAvalanchefuji:
      return ContractNFT.Avalanche.contractAddress
    case ChainIDMumbai:
      return ContractNFT.Polygon.contractAddress
    case ChainIDFantomTestnet:
      return ContractNFT.Fantom.contractAddress
    default:
      return 'error'
  }
}

export function FindRPCByChainID(chainID: number): string {
  let rpc = ''
  switch (chainID) {
    case ChainIDAvalanchefuji:
      rpc = 'https://avalanche-fuji-c-chain.publicnode.com'
      break
    case ChainIDMumbai:
      rpc = 'https://polygon-mumbai-bor.publicnode.com'
      break
    case ChainIDFantomTestnet:
      rpc = 'https://endpoints.omniatech.io/v1/fantom/testnet/public'
      break
    default:
      rpc = 'https://avalanche-fuji-c-chain.publicnode.com'
      break
  }

  return rpc


}

 export function findGas(
   chainID: number | undefined,
 ) {
   switch (chainID) {
     case ChainIDAvalanchefuji:
       return '1'
     case ChainIDMumbai:
       return '1'
     case ChainIDFantomTestnet:
       return '2'
     default:
       return '0'
   }
 }
 

 export function convertChainName(
   chainName:  string,
 ) {
   switch (chainName) {
     case 'Avalanche Fuji' :
       return 'Avalanche'
     case 'Fantom Testnet':
       return 'Fantom'
     case 'Polygon Mumbai':
       return 'Polygon'
     default:
       return '-'
   }
 }
 

export function FindBorn(bornNumber: number): string {
  let born = ''
  switch (bornNumber) {
    case 1:
      born = 'Avalanche'
      break
    case 2:
      born = 'Fantom'
      break
    case 3:
      born = 'Polygon'
      break
    default:
      born = '-'
      break
  }

  return born
}



export const shortenAddress = (address: string | undefined) => {
  try {
    if (address == undefined || address == '' ) {
      return '-'
    } else {
      return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
    }
  } catch (error) {
    
  }
}


export function resultBridgeLevelNFT(nftAvalanche:TypeNFT[], nftFantom:TypeNFT[], nftPolygon:TypeNFT[]) {
  let totalBridge = 0
  let nftLevel1 = 0
  let nftLevel2 = 0
  nftAvalanche.map((item)=>{
      totalBridge += item.avax + item.matic + item.fantom
      if(item.level > 0){
        nftLevel1 +=1
      }
      if(item.level >= 2){
        nftLevel2 +=1
      }
  })
  nftFantom.map((item) => {
    totalBridge += item.avax + item.matic + item.fantom
    if (item.level > 0) {
      nftLevel1 += 1
    }
    if (item.level >= 2) {
      nftLevel2 += 1
    }
  })
  nftPolygon.map((item) => {
    totalBridge += item.avax + item.matic + item.fantom
    if (item.level > 0) {
      nftLevel1 += 1
    }
    if (item.level >= 2) {
      nftLevel2 += 1
    }
  })
  return {
    totalBridge,
    nftLevel1,
    nftLevel2,
  }
}

export function checkConditionQuest(numberQuest:number,isDaliy:boolean,value:number) {
  switch (isDaliy) {
    case true:
      switch (numberQuest) {
        case 1:
          if (value>= 1) return true
          break
        case 2:
          if (value >= 3) return true
          break
        case 3:
          if (value >= 5) return true
          break
        default:
          break
      }
      break
    case false:
      switch (numberQuest) {
        case 1:
          if (value >= 1) return true
          break
        case 2:
          if (value >= 1) return true
          break
        default:
          break
      }
      break
    default:
      break
  }
  return false
  
}