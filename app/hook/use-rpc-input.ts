import { providers } from 'ethers';
import { Web3Context } from '../web3-context';
import { useContext, useRef, useState } from 'react';

export function useRpcInput(currChainId: number) {
  const rpcInputRef = useRef<HTMLInputElement>(null);
  const { isCustomRpc, setCustomRpc, currentRpc } = useContext(Web3Context);

  const [showRpcInput, setShowRpcInput] = useState(false);
  const [customRpcValue, setCustomRpcValue] = useState(isCustomRpc ? currentRpc : '');

  function handleInputKeyDown(event: any) {
    if (event.key === 'Enter') {
      handleSaveRpc();
    }
  }

  function handleOnBlur() {
    if (!customRpcValue) setShowRpcInput(false);
  }

  async function handleSaveRpc() {
    if (!customRpcValue) {
      setShowRpcInput(false);
      return;
    }

    const rpcTestResult = await testRpc();
    if (rpcTestResult) {
      setCustomRpc(customRpcValue);
      setShowRpcInput(false);
    }
  }

  function showInputAction() {
    setShowRpcInput(true);
    setTimeout(() => {
      rpcInputRef.current?.focus();
    }, 1000);
  }

  async function testRpc() {
    console.log('test');
    try {
      if (!currChainId) return false;

      const provider = new providers.JsonRpcProvider(customRpcValue);
      const net = await provider.getNetwork();
      const chainId = Number(net.chainId);

      return chainId === currChainId;
    } catch (e) {
      return false;
    }
  }

  return {
    rpcInputRef,
    currentRpc,
    showRpcInput,
    customRpcValue,
    showInputAction,
    setCustomRpcValue,
    handleInputKeyDown,
    handleOnBlur,
    handleSaveRpc,
  };
}
