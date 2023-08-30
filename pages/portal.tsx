import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../context/contractContext';
import { checkConditionQuest, resultBridgeLevelNFT } from '../utils/FindHelper';

export default function () {
  const {
    userNFTAvalanchefuji,
    userNFTFantom,
    userNFTPolygon,
    loadingNFTDataAvalanchefuji,
    loadingNFTDataFantom,
    loadingNFTDataPolygon,
  } = useContext(ContractContext);

  const [totalBridge, setTotalBridge] = useState(
    resultBridgeLevelNFT(userNFTAvalanchefuji, userNFTFantom, userNFTPolygon)
      .totalBridge
  );
  const [nftLevel1, setNftLevel1] = useState(
    resultBridgeLevelNFT(userNFTAvalanchefuji, userNFTFantom, userNFTPolygon)
      .nftLevel1
  );
  const [nftLevel2, setNftLevel2] = useState(
    resultBridgeLevelNFT(userNFTAvalanchefuji, userNFTFantom, userNFTPolygon)
      .nftLevel2
  );

  useEffect(() => {
    const result = resultBridgeLevelNFT(
      userNFTAvalanchefuji,
      userNFTFantom,
      userNFTPolygon
    );
    setTotalBridge(result.totalBridge);
    setNftLevel1(result.nftLevel1);
    setNftLevel2(result.nftLevel2);
  }, [userNFTAvalanchefuji, userNFTFantom, userNFTPolygon]);

  const [mode, setMode] = useState<'daily' | 'weekly'>('daily');
  const modeList = [
    { text: 'Daily Quest', mode: 'daily' as typeof mode },
    { text: 'Weekly Quest', mode: 'weekly' as typeof mode },
  ];
  const dailyQuest = [
    {
      name: 'Bridge together I',
      info: 'Bridge NTFs to other chain 1 times',
      status: true,
    },
    {
      name: 'Bridge together II',
      info: 'Bridge NTFs to other chain 3 times',
      status: false,
    },
    {
      name: 'Bridge together III',
      info: 'Bridge NTFs to other chain 5 times',
      status: false,
    },
    {
      name: 'FTMer',
      info: 'Bridge NTFs from FTM chain 5 times',
      status: false,
    },
    {
      name: 'FTMer',
      info: 'Bridge NTFs from FTM chain 5 times',
      status: false,
    },
    {
      name: 'FTMer',
      info: 'Bridge NTFs from FTM chain 5 times',
      status: false,
    },
    {
      name: 'AVAXer',
      info: 'Bridge NTFs from AVAX chain 5 times',
      status: false,
    },
    {
      name: 'MATICer',
      info: 'Bridge NTFs from MATIC chain 5 times',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
  ];
  const weeklyQuest = [
    {
      name: 'Evolution  NFTs II',
      info: 'Evolution you NTFs to level 1',
      status: false,
    },
    {
      name: 'Evolution  NFTs II',
      info: 'Evolution you NTFs to level 2',
      status: false,
    },
    {
      name: 'X Jump',
      info: 'Share to X',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
    {
      name: '???',
      info: '???',
      status: false,
    },
  ];
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
        {loadingNFTDataAvalanchefuji ||
        loadingNFTDataFantom ||
        loadingNFTDataPolygon ? (
          <div className='flex flex-col gap-3 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='loader'></span>
            <span className=''>Loading...</span>
          </div>
        ) : (
          <>
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
                          checkConditionQuest(y + 1, true, totalBridge)
                            ? 'icon-park-solid:correct'
                            : 'pajamas:status-waiting'
                        }
                        color={
                          checkConditionQuest(y + 1, true, totalBridge)
                            ? 'green'
                            : ' yellow'
                        }
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
                          checkConditionQuest(
                            y + 1,
                            false,
                            y + 1 == 1 ? nftLevel1 : nftLevel2
                          )
                            ? 'icon-park-solid:correct'
                            : 'pajamas:status-waiting'
                        }
                        color={
                          checkConditionQuest(
                            y + 1,
                            false,
                            y + 1 == 1 ? nftLevel1 : nftLevel2
                          )
                            ? 'green'
                            : ' yellow'
                        }
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
          </>
        )}
      </div>
    </div>
  );
}
