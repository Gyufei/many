'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';
import { utils } from 'ethers';
import { formatDistanceToNow } from 'date-fns';

let lastQueryBlock = 0;
let ClearInter: number;

export default function Section3() {
  const { currentChainInfo, currentWalletInfo, provider, readContract: contract } = useContext(Web3Context);

  const address = currentChainInfo?.contractAddress || '';

  const [currentTab, setCurrentTab] = useState<'mine' | 'global'>('mine');

  const [logs, setLogs] = useState<any[]>([]);

  const [stopPrevQueryCb, setStopPrevQueryCb] = useState<any>();

  const displayLogs = useMemo(() => {
    if (currentTab === 'mine') {
      const mineLogs = logs.filter((log) => log.sender === currentWalletInfo?.address);
      return mineLogs.slice(0, 8);
    }
    return logs.slice(0, 8);
  }, [currentWalletInfo, currentTab, logs]);

  function handleMineClick() {
    setCurrentTab('mine');
  }

  function handleGlobalClick() {
    setCurrentTab('global');
  }

  async function startQuery() {
    console.log('start query', stopPrevQueryCb);
    stopPrevQueryCb && stopPrevQueryCb();

    const beginBlock = currentChainInfo.addressBlock;
    const endBlock = await provider.getBlockNumber();
    lastQueryBlock = endBlock;

    const queryBlockArr = getQueryBlockArr(beginBlock, endBlock);

    if (!queryBlockArr.length) {
      return;
    }

    let runFlag = true;

    async function query() {
      for (const { from, to } of queryBlockArr) {
        console.log(from, to, 'query', runFlag);
        if (!runFlag) {
          return;
        }

        const lgs = await queryAction(from, to);

        console.log(lgs, 'lgs');
        setLogs([...lgs, ...logs]);
        const mineLogs = [...lgs, ...logs].filter((log) => log.sender === currentWalletInfo?.address);

        if (mineLogs.length > 8) {
          updateQuery();
          return;
        }
      }

      updateQuery();
    }

    query();

    setStopPrevQueryCb(() => {
      return () => {
        runFlag = false;
      };
    });
  }

  function getQueryBlockArr(startBlock: number, endBlock: number) {
    const blockSize = 3000;
    const arr = [];
    let fromBlock = endBlock - blockSize - 1;
    let toBlock = endBlock;

    arr.push({ from: fromBlock, to: toBlock });

    while (fromBlock > startBlock) {
      toBlock = fromBlock - 1;
      fromBlock = fromBlock - blockSize - 1;
      arr.push({ from: fromBlock, to: toBlock });
    }

    return arr;
  }

  async function queryAction(fromBlock: number, toBlock: number) {
    let startBlock = toBlock - 1001;
    const filter = contract.filters['Mine']();
    const events = await contract.queryFilter(filter, fromBlock, toBlock);
    if (events.length === 0) {
      return [];
    } else {
      const parsedLogs = await parsedLogAction(events);
      return parsedLogs;
    }
  }

  async function parsedLogAction(lgs: any[]) {
    const parsedLogs = await Promise.all(
      lgs.map(async (log: any) => {
        const block = await provider.getBlock(log.blockNumber);
        const timestamp = block!.timestamp;

        return {
          time: timestamp * 1000,
          blockNumber: log.blockNumber,
          minedHash: log.args.minedHash,
          sender: log.args.user,
          rewardRate: log.args.rewardRate.toString(),
        };
      })
    );

    return parsedLogs;
  }

  async function updateQuery() {
    clearInterval(ClearInter);
    const beginBlock = lastQueryBlock;
    const endBlock = await provider.getBlockNumber();
    if (beginBlock >= endBlock) return;
    lastQueryBlock = endBlock;

    ClearInter = setInterval(() => {
      queryAction(beginBlock, endBlock).then((lgs) => {
        if (lgs.length) {
          setLogs([...lgs, ...logs]);
        }
      });
    }, 10000) as any;

    return ClearInter;
  }

  useEffect(() => {
    lastQueryBlock = 0;
    setLogs([]);
    startQuery();
  }, [currentChainInfo.id]);

  function displayHash(hash: string) {
    return hash.slice(0, 10) + '...' + hash.slice(-8);
  }

  return (
    <section className="section-3">
      <div className="div-block-23">
        <div className="div-block-64">
          <div className="text-block-13">Activities</div>
          <div className="div-block-25">
            <div onClick={handleMineClick} className={`div-block-24 ${currentTab === 'mine' ? 'high-btn' : ''}`}>
              <div className="text-block-14">Mine</div>
            </div>
            <div onClick={handleGlobalClick} className={`div-block-26 ${currentTab === 'global' ? 'high-btn' : ''}`}>
              <div className="text-block-15">Global</div>
            </div>
          </div>
        </div>
        <div className="div-block-27" style={{ height: '680px' }}>
          {displayLogs.map((log) => (
            <div key={log.blockNumber} className="div-block-29">
              <div className="div-block-30">
                <div className="div-block-28"></div>
                <div className="div-block-31">
                  <div className="text-block-16">#{log.blockNumber}</div>
                  <div className="text-block-17">{formatDistanceToNow(log.time)}</div>
                </div>
              </div>
              <div className="div-block-32">
                <div>
                  <div className="div-block-33">
                    <div className="text-block-18">Miner</div>
                    <div className="text-block-19">{displayHash(log.sender)}</div>
                  </div>
                  <div className="div-block-34">
                    <div className="text-block-18">Hash</div>
                    <div>{displayHash(log.minedHash)}</div>
                  </div>
                </div>
                <div className="div-block-35">
                  <div className="text-block-21">{Number(log.rewardRate) / 10 ** 16} MANY</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
