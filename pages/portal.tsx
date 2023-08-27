import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function () {
  const [mode, setMode] = useState<'daily' | 'weekly'>('daily')
  const modeList = [
    { text: 'Daily Quest', mode: 'daily' as typeof mode },
    { text: 'Weekly Quest', mode: 'weekly' as typeof mode },
  ]
  const dailyQuest = [
    {
      name: 'Bridge together1!',
      info: 'Bridge NTFs to other chain 3 times',
      status: true,
    },
    {
      name: 'Bridge together2!',
      info: 'Bridge NTFs to other chain 5 times',
      status: false,
    },
    {
      name: 'Bridge together3!',
      info: 'Bridge NTFs to other chain 7 times',
      status: false,
    },
    {
      name: 'Bridge together4!',
      info: 'Bridge NTFs to other chain 9 times',
      status: false,
    },
    {
      name: 'Bridge together5!',
      info: 'Bridge NTFs to other chain 11 times',
      status: false,
    },
    {
      name: 'Bridge together6!',
      info: 'Bridge NTFs to other chain 13 times',
      status: false,
    },
    {
      name: 'Bridge together7!',
      info: 'Bridge NTFs to other chain 15 times',
      status: false,
    },
  ]
  const weeklyQuest = []
  return (
    <div className='h-full w-full'>
      <div className='absolute top-[50px] left-[50px]  z-[3] flex flex-col gap-y-[10px] p-[10px] w-[500px] rounded-2xl h-full max-h-[600px] bg-white/10'>
        <div className=' flex gap-[10px] sticky top-0'>
          {modeList.map((x, y) => (
            <div
              key={x.text}
              onClick={() => setMode(x.mode)}
              className={[
                ' cursor-pointer ',
                x.mode === mode ? ' border-b-2 border-white ' : '',
              ].toString()}
            >
              {x.text}
            </div>
          ))}
        </div>
        {mode === 'daily' ? (
          <div
            id='daily_quest_mode'
            className=' flex flex-col gap-[10px] h-full overflow-y-scroll'
          >
            {dailyQuest.length > 0 ? (
              dailyQuest.map((x, y) => (
                <div
                  key={`${x.name}-${y}`}
                  className=' p-[10px] border border-white/3 rounded-lg w-auto hover:bg-white/20 flex justify-between items-center gap-[20px]'
                >
                  <div className=' flex flex-col gap-y-[5px]'>
                    <div>{x.name}</div>
                    <div>{x.info}</div>
                  </div>
                  <Icon
                    icon={
                      x.status
                        ? 'icon-park-solid:correct'
                        : 'pajamas:status-waiting'
                    }
                    color={x.status ? 'green' : ' yellow'}
                    className=' text-[25px] '
                  ></Icon>
                </div>
              ))
            ) : (
              <div className=' flex h-full justify-center items-center'>
                No Quest Available.
              </div>
            )}
          </div>
        ) : (
          <div
            id='weekly_quest_mode'
            className=' flex flex-col gap-[10px] h-full'
          >
            {weeklyQuest.length > 0 ? (
              weeklyQuest.map((x, y) => (
                <div
                  key={`${x.name}-${y}`}
                  className=' p-[10px] border border-white/3 rounded-lg w-auto hover:bg-white/20 flex justify-between items-center gap-[20px]'
                >
                  <div className=' flex flex-col gap-y-[5px]'>
                    <div>{x.name}</div>
                    <div>{x.info}</div>
                  </div>
                  <Icon
                    icon={
                      x.status
                        ? 'icon-park-solid:correct'
                        : 'pajamas:status-waiting'
                    }
                    color={x.status ? 'green' : ' yellow'}
                    className=' text-[25px] '
                  ></Icon>
                </div>
              ))
            ) : (
              <div className=' flex h-full justify-center items-center'>
                No Quest Available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
