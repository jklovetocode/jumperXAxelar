import Image from 'next/image'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'

export default function () {
  const chain = [
    { text: 'AVALANCHE', src: '/avax.png' },
    { text: 'FANTOM', src: '/fantom.png' },
    { text: 'POLYGON', src: '/matic.png' },
  ]
  const nfts = [
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
    {
      src: '/2110.png',
      attr: {
        level: 2,
        point: 1999,
      },
    },
  ]
  return (
    <div className=' h-full w-full '>
      <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] grass rounded-xl grid grid-cols-3 overflow-y-scroll p-[10px] z-[10] items-center justify-center gap-y-[20px]'>
        {nfts.map((x, y) => (
          <div
            key={`${x.src}-${y}`}
            className=' w-full h-full flex justify-center items-center'
          >
            <div className=' w-[240px] h-[360px] flex flex-col justify-center items-center gap-y-[5px] border border-white bg-purple-400/10 first-letter:0 rounded-lg'>
              <Image
                alt=''
                src={x.src}
                width={160}
                height={10}
                style={{
                  width: 200,
                  aspectRatio: 'auto',
                }}
              />
              <div> Level: {x.attr.level}</div>
              <div> Point: {x.attr.point}</div>
              <div className=' flex gap-[10px] justify-center items-center'></div>
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
                    {chain.map((x, y) => (
                      <div className=' p-[5px] border border-white/30 rounded-lg w-full h-max flex justify-center items-center cursor-pointer hover:bg-white/20'>
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
                    ))}
                  </div>

                  <div className=' flex gap-[10px] justify-center'>
                    <Dialog.Close>
                      <Button>Cancel</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button>Bridge</Button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
