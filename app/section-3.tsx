'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';
import { utils } from 'ethers';
import { formatDistanceToNow } from 'date-fns';
import { Paths } from './lib/PathMap';
import { formatEther } from 'ethers/lib/utils';
import { chainNameMap } from './lib/const';

export default function Section3() {
  const { currentChainInfo, currentWalletInfo, provider, readContract: contract } = useContext(Web3Context);

  const [currentTab, setCurrentTab] = useState<'mine' | 'global'>('mine');

  const [globalLogs, setGlobalLogs] = useState<any[]>([]);
  const [mineLogs, setMineLogs] = useState<any[]>([]);

  const [updateTimerId, setUpdateTimerId] = useState<number>();

  const displayLogs = useMemo(() => {
    let logs = currentTab === 'mine' ? mineLogs : globalLogs;
    const sortLogs = logs.sort((a, b) => b.block_number - a.block_number);
    return sortLogs;
  }, [currentWalletInfo, currentTab, globalLogs]);

  function handleMineClick() {
    setCurrentTab('mine');
  }

  function handleGlobalClick() {
    setCurrentTab('global');
  }

  async function fetchLog() {
    if (updateTimerId) {
      clearTimeout(updateTimerId);
    }

    const path = Paths.activities;
    const chainParams = `chain_name=${chainNameMap[currentChainInfo.name]}`;
    const addressParams = currentWalletInfo ? `account=${currentWalletInfo?.address || ''}` : '';
    const queryParams = `${chainParams}${addressParams ? '&' : ''}${addressParams}`;
    const queryPath = `${path}?${queryParams}`;

    try {
      const res = await fetch(queryPath);

      const jsonRes = await res.json();

      if (!jsonRes.status) {
        console.error(jsonRes);
        return;
      }
      const { global_mine_info, account_mine_info, last_block } = jsonRes.data;

      const gLogs = global_mine_info.map((log: any) => {
        return {
          ...log,
          create_at: log.create_at * 1000,
        };
      });

      const mLogs = account_mine_info.map((log: any) => {
        return {
          ...log,
          create_at: log.create_at * 1000,
        };
      });

      setMineLogs(mLogs);
      setGlobalLogs(gLogs);

      const lastEndBlock = last_block || (await provider.getBlockNumber());
      updateQuery(Number(lastEndBlock));
    } catch (error) {
      console.error('fetch log error', error);
      return;
    }
  }

  async function updateQuery(lastEndBlock: number) {
    const endBlock = await provider.getBlockNumber();
    if (lastEndBlock >= endBlock) return;

    const lgs = await queryAction(lastEndBlock, endBlock);
    if (lgs.length) {
      setGlobalLogs([...lgs, ...globalLogs]);
    }

    const id = setTimeout(() => {
      updateQuery(endBlock);
    }, 10000);

    setUpdateTimerId(id as any);
  }

  async function queryAction(fromBlock: number, toBlock: number) {
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
          create_at: timestamp * 1000,
          block_number: log.blockNumber,
          tx_hash: log.args.minedHash,
          miner: log.args.user,
          rewards: formatEther(log.args?.totalRewards?.toString()),
        };
      })
    );

    return parsedLogs;
  }

  useEffect(() => {
    setGlobalLogs([]);
    fetchLog();
  }, [currentChainInfo.id, currentWalletInfo?.address]);

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
        <div className="act-block">
          <video playsInline muted loop autoPlay className="video-4" src="images/activities.mov"></video>
          <div className="div-block-27">
            <div className="div-block-27-content trans-scroll-bar">
              {displayLogs.map((log) => (
                <div key={log.block_number} className="div-block-29">
                  <div className="div-block-30">
                    <div className="div-block-28">
                      <img src="images/mining.svg" loading="lazy" width="48" height="48" alt="" className="image-pla" />
                    </div>
                    <div className="div-block-31">
                      <div className="text-block-16">#{log.block_number}</div>
                      <div className="text-block-17">{formatDistanceToNow(log.create_at)}</div>
                    </div>
                  </div>
                  <div className="div-block-32">
                    <div>
                      <div className="div-block-33">
                        <div className="text-block-18">Miner</div>
                        <div className="text-block-19">{displayHash(log.miner)}</div>
                      </div>
                      <div className="div-block-34">
                        <div className="text-block-18">Hash</div>
                        <div>{displayHash(log.tx_hash)}</div>
                      </div>
                    </div>
                    <div className="div-block-35">
                      <div className="text-block-21">{Number(log.rewards)} MANY</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
