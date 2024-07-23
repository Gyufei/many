'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';
import { utils } from 'ethers';
const { formatDistanceToNow } = require('date-fns');

export default function Section3() {
  const { currentChainInfo, currentWalletInfo, getProvider, getWallet, getReadContract } = useContext(Web3Context);

  const address = currentChainInfo?.contractAddress || '';

  const [currentTab, setCurrentTab] = useState<'mine' | 'global'>('mine');

  const [logs, setLogs] = useState<any[]>([]);

  const displayLogs = useMemo(() => {
    if (currentTab === 'mine') {
      const mineLogs = logs.filter((log) => log.sender === currentWalletInfo?.address);
      return mineLogs;
    }
    return logs;
  }, [currentWalletInfo, currentTab, logs]);

  function handleMineClick() {
    setCurrentTab('mine');
  }

  function handleGlobalClick() {
    setCurrentTab('global');
  }

  const [lastQueryBlock, setLastQueryBlock] = useState<number>(0);

  function queryLogs(fromBlock: number, toBlock: number) {
    const provider = getProvider();
    const contract = getReadContract();
    const filter = contract.filters['Mine']();

    const batchLimit = 3000;

    // 计算查询次数
    const numQueries = Math.ceil((toBlock - fromBlock + 1) / batchLimit);

    // 创建一个数组来存储每次查询的 Promise
    const queryPromises = [];

    for (let i = 0; i < numQueries; i++) {
      const startBlock = fromBlock + i * batchLimit;
      const endBlock = Math.min(fromBlock + (i + 1) * batchLimit - 1, toBlock);

      // 创建一个 Promise 用于查询指定区块范围的日志
      const promise = new Promise(async (resolve, reject) => {
        try {
          const events = await contract.queryFilter(filter, startBlock, endBlock);
          const parsedLogs = await parsedLogAction(events);
          resolve(parsedLogs);
        } catch (error) {
          reject(error);
        }
      });

      queryPromises.push(promise);
    }

    return Promise.all(queryPromises)
      .then((results) => results.flat())
      .catch((error) => {
        console.error('Error querying logs:', error);
        throw error;
      });
  }

  async function parsedLogAction(logs: any[]) {
    const provider = getProvider();
    const contract = getReadContract();

    const parsedLogs = await Promise.all(
      logs.map(async (log: any) => {
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

  async function queryLogsRecursive(fromBlock: number, toBlock: number, logs: any[]) {
    const provider = getProvider();
    const batchLimit = 3000;

    const nowLogs = await queryLogs(fromBlock, toBlock);
    logs = logs.concat(nowLogs);
    if (nowLogs.length) {
      setLogs(logs);
    }

    const mineLogs = logs.filter((log) => log.sender === currentWalletInfo?.address);
    const remainingBlocks = fromBlock - batchLimit;

    if (remainingBlocks <= currentChainInfo.addressBlock || mineLogs.length > 8) {
      return logs;
    }

    return queryLogsRecursive(remainingBlocks, fromBlock - 1, logs); // 递归调用进行下一次查询
  }

  async function updateLogs(initLastBlock: number) {
    const provider = getProvider();
    const contract = getReadContract();

    contract.on('Mine', async (minedHash, user, rewardRate) => {
      const timestamp = new Date().getTime();
      const blockNumber = await provider.getBlockNumber();

      const log = {
        time: timestamp * 1000,
        blockNumber: blockNumber,
        minedHash: minedHash,
        sender: user,
        rewardRate: rewardRate,
      };

      setLogs([...logs, log]);
    });
  }

  useEffect(() => {
    async function initGet() {
      const provider = getProvider();
      const lastBlock = await provider.getBlockNumber();
      setLastQueryBlock(lastBlock);

      const logs: any[] = [];
      await queryLogsRecursive(lastBlock - 1001, lastBlock, logs);

      return lastBlock;
    }

    let timer = 0;
    initGet().then((lastBlock) => {
      timer = setInterval(() => {
        updateLogs(lastBlock);
      }, 10000) as any;
    });

    return () => clearInterval(timer);
  }, []);

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
