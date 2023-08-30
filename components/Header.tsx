import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {}

function Header({}: Props) {
  return (
    <div className='fixed top-0 w-full z-[9999]'>
      <div className=' h-max p-[10px] flex justify-end'>
        <ConnectButton
          label='connect web3'
          accountStatus={'full'}
          chainStatus={'full'}
        />
      </div>
    </div>
  )
}

export default Header
