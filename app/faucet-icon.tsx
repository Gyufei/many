import { useContext, useState } from 'react';
import { GlobalMsgContext } from './global-msg-context';
import { Web3Context } from './web3-context';
import { Paths } from './lib/PathMap';

export default function FaucetIcon({ onSuccess }: { onSuccess: () => void }) {
  const { currentWalletInfo, provider } = useContext(Web3Context);
  const { setGlobalMessage } = useContext(GlobalMsgContext);

  const address = currentWalletInfo?.address;

  const [isHover, setIsHover] = useState(false);

  function setCookie(name: string, value: number, hours: number) {
    var expires = '';
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function getCookie(name: string) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  async function checkTxStatus(tx: string) {
    const receipt = await provider.getTransactionReceipt(tx);

    if (receipt?.status === 1) {
      return true;
    } else if (receipt?.status === 0) {
      return false;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          const res = checkTxStatus(tx);
          resolve(res);
        }, 500);
      });
    }
  }

  async function handleFaucet() {
    const key = 'lastClaimTime' + '-' + address;
    var lastClaimTime = getCookie(key);
    var currentTime = new Date().getTime();

    if (!lastClaimTime || currentTime - Number(lastClaimTime) >= 3600000) {
      try {
        const res = await claimAction();

        if (res.transaction) {
          const txStatus = await checkTxStatus(res.transaction);
          console.log(txStatus);
          if (txStatus) {
            setCookie(key, currentTime, 1);
            setGlobalMessage({ type: 'success', message: 'Drop Successfully' });
            onSuccess();
          } else {
            throw new Error('drop failed');
          }
        }
      } catch (e) {
        console.error(e);
        setGlobalMessage({ type: 'error', message: 'Drop Failed' });
      }
    } else {
      setGlobalMessage({ type: 'error', message: 'Collected Once An Hour!' });
    }
  }

  async function claimAction() {
    if (!currentWalletInfo) return;

    const path = Paths.faucet;
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: currentWalletInfo.address,
      }),
    });

    const jsonRes = await res.json();
    return jsonRes.status ? jsonRes.data : {};
  }

  return (
    <div className="faucet-con" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <img
        onClick={() => handleFaucet()}
        src={isHover ? 'images/faucet.svg' : 'images/faucet-gray.svg'}
        style={{
          cursor: 'pointer',
        }}
        loading="lazy"
        alt=""
        className="image-12"
      />
    </div>
  );
}
