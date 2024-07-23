import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChainMap, TypeChain } from '../lib/const';

const StorageKey = 'CustomRpc';

export function useRpc(currentChain: TypeChain) {
  const currentChainInfo = ChainMap[currentChain];

  const [customRpcMap, setCustomRpcMap] = useState<Record<TypeChain, string>>({
    Mantle: '',
    Eth: '',
  });

  const isCustomRpc = useMemo(() => {
    return !!customRpcMap[currentChain];
  }, [customRpcMap, currentChain]);

  const currentRpc = useMemo(() => {
    const custom = customRpcMap[currentChain];
    if (!custom) return currentChainInfo?.rpcUrls?.http;

    return customRpcMap[currentChain];
  }, [customRpcMap, currentChain]);

  const setCustomRpc = useCallback((rpc: string) => {
    setCustomRpcMap({
      ...customRpcMap,
      [currentChain]: rpc,
    });
  }, []);

  useEffect(() => {
    // 在组件挂载时，从 localStorage 恢复值
    const savedValue = localStorage.getItem(StorageKey);
    if (savedValue) {
      const rpcs = JSON.parse(savedValue);
      setCustomRpcMap(rpcs);
    }
  }, []);

  useEffect(() => {
    if (customRpcMap.Mantle || customRpcMap.Eth) {
      const serializedValue = JSON.stringify(customRpcMap);
      localStorage.setItem(StorageKey, serializedValue);
    }
  }, [customRpcMap]);

  return {
    currentRpc,
    setCustomRpc,
    isCustomRpc,
  };
}
