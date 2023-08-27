import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const Icon_Set = [
  { name: 'game-icons:house', path: '/' },
  { name: 'game-icons:backpack', path: '/inventory' },
  { name: 'game-icons:magic-portal', path: '/portal' },
  { name: 'game-icons:cardboard-box-closed', path: '/product' },
]
export default function () {
  const router = useRouter()
  const isCurrentRoute = router.pathname
  return (
    <div className=' h-[300px] fixed grass top-1/2 -translate-y-1/2 right-[20px] py-[20px]  px-[10px] flex flex-col items-center justify-around rounded-xl text-[25px] z-[10]'>
      {Icon_Set.map((x) => (
        <div
          key={x.path}
          onClick={() => router.push(x.path)}
          className={
            (isCurrentRoute === x.path
              ? ' p-1.5 bg-blue-500/40 rounded-full  '
              : '  ') + ' hover:scale-[115%] cursor-pointer '
          }
        >
          <Icon color='white' icon={x.name}></Icon>
        </div>
      ))}
    </div>
  )
}
