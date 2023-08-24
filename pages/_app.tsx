import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// import '@radix-ui/themes/styles.css'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { fantomTestnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { Chain } from 'wagmi/chains'
import { ContractProvider } from '../context/contractContext'
import Header from '../components/Header'
import { Theme } from '@radix-ui/themes'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

const hardhat: Chain = {
  id: 31337,
  name: 'Hardhat',
  network: 'Harthat at http://127.0.0.1:8545/',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'Eth',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545/'],
    },
    public: {
      http: ['http://127.0.0.1:8545/'],
    },
  },
  testnet: true,
}

const { chains, provider } = configureChains(
  [fantomTestnet, hardhat],
  [
    alchemyProvider({ apiKey: '' }),
    infuraProvider({ apiKey: '' }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'My app',
  chains,
  projectId: '7efb7e2035049ef7c54d5238a86b4dc4',
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  let [star, setStar] = useState([] as number[])
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      star.push(i)
    }
    setStar([...star])
  }, [])
  return (
    <ContractProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={lightTheme({
            accentColorForeground: 'black',
            overlayBlur: 'large',
            accentColor: 'white',
          })}
        >
          <Theme>
            <div className='relative h-full max-h-screen overflow-hidden text-white bg-black w-full'>
              <Header />
              <Component {...pageProps} />
              <Footer />
              <div id='scene' className='absolute left-0 top-0 w-auto z-[0]'>
                {star.map((x, y) => {
                  return <div className='star' key={`${x}-${y}`}></div>
                })}
              </div>
            </div>
          </Theme>
        </RainbowKitProvider>
      </WagmiConfig>
    </ContractProvider>
  )
}

export default MyApp
