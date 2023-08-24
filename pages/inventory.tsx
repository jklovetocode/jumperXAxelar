import Image from 'next/image'
import NormButton from '../components/common/NormButton'

export default function () {
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
              <div className=' flex gap-[10px] justify-center items-center'>
                <NormButton label='Bridge' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
