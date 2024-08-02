import { Wallet } from 'ethers';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';

export default function NewWalletDialog() {
  const { addWallet, currentWalletInfo, wallets } = useContext(Web3Context);
  const [visible, setVisible] = useState(false);

  const [isHover, setIsHover] = useState(false);
  const [newWallet, setNewWallet] = useState<Wallet | null>(null);

  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  const initNew = useMemo(() => {
    return !wallets.length;
  }, [newWallet]);

  const phraseArray = useMemo(() => {
    if (!newWallet) {
      return [];
    }
    return newWallet.mnemonic.phrase.split(' ');
  }, [newWallet]);

  function handleShow() {
    handleNew();
    setVisible(true);
  }

  function handleNew() {
    const newWallet = Wallet.createRandom();
    console.log(newWallet);
    setNewWallet(newWallet);
  }

  useEffect(() => {
    function preventDefault(event: any) {
      event.preventDefault();
    }

    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [visible]);

  function handleCancel() {
    setVisible(false);
    setNewWallet(null);
  }

  function handleAdd() {
    if (!newWallet) return;

    addWallet({
      address: newWallet.address,
      privateKey: newWallet.privateKey,
    });

    setVisible(false);
  }

  if (!init) return null;

  return (
    <>
      <div
        className="wallet-new-dialog"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          background: 'rgba(45, 46, 51, 0.4)',
          display: visible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
        }}
      >
        <div
          className="wallet-new-dialog-content"
          style={{
            background: '#fff',
          }}
        >
          <div
            className="wallet-new-dialog-title"
            style={{
              textAlign: 'center',
              color: '#111',
            }}
          >
            Add Existing Account
          </div>
          <div
            className="wallet-new-dialog-subtitle"
            style={{
              textAlign: 'center',
              color: 'rgba(17, 17, 17, 0.5)',
            }}
          >
            Please back up your recovery phrase
          </div>
          <div
            className="wallet-new-dialog-phrase"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {phraseArray.map((item, index) => (
              <div
                className="wallet-new-dialog-phrase-item"
                key={index}
                style={{
                  border: '1px solid #d3d4d6',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="wallet-new-dialog-phrase-index">{index + 1}</div>
                <span className="wallet-new-dialog-phrase-text">{item}</span>
              </div>
            ))}
          </div>
          <div
            className="wallet-new-dialog-btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              className="add-dialog-btn"
              style={{
                border: '1px solid #F79218',
                backgroundColor: '#fff',
                color: '#F79218',
                cursor: 'pointer',
              }}
              onClick={handleCancel}
            >
              Cancel
            </div>
            <div
              className="add-dialog-btn"
              style={{
                color: '#fff',
                backgroundColor: '#F79218',
                cursor: 'pointer',
              }}
              onClick={handleAdd}
            >
              Add Account
            </div>
          </div>
        </div>
      </div>
      {initNew ? (
        <div className="div-block-10 div-block-new-w">
          <div className="div-block-new-con">
            <img src="images/create-account.svg" loading="lazy" alt="" className="image-new-w" />
            <div className="div-block-new-content">
              <div className="text-block-639">CREATE AN ACCOUNT</div>
              <div className="text-block-640">Before mining, you need to have an account</div>
            </div>
          </div>
          <div className="new-w-go" onClick={handleShow}>
            GO
          </div>
        </div>
      ) : (
        <div
          className="div-block-11"
          style={{ cursor: 'pointer' }}
          onClick={handleShow}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className="text-block-7"
            style={{
              color: isHover ? '#111' : 'rgba(17, 17, 17, 0.5)',
            }}
          >
            New
          </div>
          <img
            style={{
              opacity: isHover ? '1' : '0.5',
            }}
            src="images/add.svg"
            loading="lazy"
            alt=""
            className="image-8"
          />
        </div>
      )}
    </>
  );
}
