import { providers } from 'ethers';
import { Web3Context } from '../web3-context';
import { useContext, useState } from 'react';

export function useRpcInput(currChainId: number) {
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
    if (!customRpcValue) return null;
    const rpcTestResult = await testRpc();
    if (rpcTestResult) {
      setCustomRpc(customRpcValue);
      setShowRpcInput(false);
    }
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
    currentRpc,
    showRpcInput,
    setShowRpcInput,
    customRpcValue,
    setCustomRpcValue,
    handleInputKeyDown,
    handleOnBlur,
    handleSaveRpc,
  };
}
