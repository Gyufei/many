import { Wallet } from 'ethers';
import { useContext, useMemo, useState } from 'react';
import { Web3Context } from './web3-context';

export default function NewWalletDialog() {
  const { addWallet, currentWalletInfo } = useContext(Web3Context);
  const [visible, setVisible] = useState(false);

  const [newWallet, setNewWallet] = useState<Wallet | null>(null);

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
          style={{
            width: '480px',
            background: '#fff',
            borderRadius: '24px',
            padding: '24px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '24px',
              lineHeight: '36px',
              color: '#111',
            }}
          >
            Add Existing Account
          </div>
          <div
            style={{
              marginTop: '16px',
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '22px',
              color: 'rgba(17, 17, 17, 0.5)',
            }}
          >
            Enter your12-word Recovery Phrase
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px 12px',
            }}
          >
            {phraseArray.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '136px',
                  height: '48px',
                  border: '1px solid #d3d4d6',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '24px',
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
      <div className="div-block-11" style={{ cursor: 'pointer' }} onClick={handleShow}>
        <div className="text-block-7">New</div>
        <img src="images/添加.svg" loading="lazy" alt="" className="image-8" />
      </div>
    </>
  );
}
