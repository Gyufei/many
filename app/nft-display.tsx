'use client';
import { useContext, useState } from 'react';
import { NFTContext } from './nft-context';
import { Paths } from './lib/PathMap';
import { Web3Context } from './web3-context';
import { GlobalMsgContext } from './global-msg-context';
import { useBalanceDisplay } from './hook/use-balance-display';

export default function NFTDisplay() {
  const { setGlobalMessage } = useContext(GlobalMsgContext);
  const { currentChainInfo, currentWalletInfo, contract } = useContext(Web3Context);
  const { mineNFTIds: MineNFTIds, marketPlaceContract, queryNFTNums } = useContext(NFTContext);

  const { balance } = useBalanceDisplay();

  const [selectedNFTId, setSelectedNFTId] = useState<number>();

  const nftImg: Record<string, any> = {
    '1': {
      src: 'images/14x.png',
      srcSet: 'images/14x-p-500.png 500w, images/14x.png 720w',
    },
    '2': {
      src: 'images/24x.png',
      srcSet: 'images/24x-p-500.png 500w, images/24x.png 720w',
    },
    '3': {
      src: 'images/image1x-61copy4x.png',
      srcSet: 'images/image1x-61copy4x-p-500.png 500w, images/34x.png 720w',
    },
  };

  function handleSelectNFT(nftId: number) {
    setSelectedNFTId(nftId);
  }

  async function fetchBuySignature() {
    const path = Paths.buyNFT;
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet: currentWalletInfo.address,
      }),
    });

    const jsonRes = await res.json();
    return jsonRes.status ? jsonRes.data : {};
  }

  async function handleBuyNFT() {
    if (currentWalletInfo) {
      setGlobalMessage({ type: 'warning', message: 'No Account!' });
      return;
    }

    if (Number(balance) <= 0) {
      setGlobalMessage({ type: 'warning', message: 'Insufficient Gas!' });
      return;
    }

    try {
      const { signature, orderId, merkleProof } = await fetchBuySignature();

      const serialId = selectedNFTId || 1;
      const serialIdPrice = await marketPlaceContract.serialIdPriceMap(serialId);
      const gasLimit = await (marketPlaceContract.estimateGas as any)['buyMineNFT'](serialId, orderId, merkleProof, signature, {
        value: serialIdPrice,
      });

      const res = await marketPlaceContract.buyMineNFT(serialId, orderId, merkleProof, signature, {
        value: serialIdPrice,
        gasLimit: gasLimit.toString(),
      });

      setGlobalMessage({ type: 'success', message: 'Successful Buy!' });

      await queryNFTNums();
    } catch (e) {
      setGlobalMessage({ type: 'error', message: 'Failed Buy!' });
    }
  }

  return (
    <>
      <div
        className="div-block-47"
        style={{
          zIndex: 101,
          position: 'relative',
        }}
      >
        {MineNFTIds.map((nftId) => {
          return (
            <div key={nftId} className="div-block-393" onClick={() => handleSelectNFT(nftId)}>
              {selectedNFTId === nftId && (
                <div className="small-light-bg">
                  <video className="video-3" playsInline muted loop autoPlay src="images/small-light.mp4"></video>
                </div>
              )}
              <div className="div-block-48">
                <img
                  src={nftImg[nftId].src}
                  loading="lazy"
                  sizes="(max-width: 479px) 96px, 180px"
                  srcSet={nftImg[nftId].srcSet}
                  alt="nft-img"
                  className="image-14"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="div-block-478"
        style={{
          position: 'relative',
          zIndex: 100,
        }}
      >
        <div className="light-bg">
          <video className="video-2" style={{}} playsInline muted loop autoPlay src="images/light.mp4"></video>
        </div>
        <div
          className="div-block-49"
          style={{
            position: 'relative',
            zIndex: 100,
          }}
        >
          <div className="div-block-50">
            <div className="div-block-51">
              <div className="text-block-34">3X</div>
            </div>
            <div className="text-block-35">3 MNT</div>
          </div>
          <img
            src={nftImg[selectedNFTId || 1].src}
            loading="lazy"
            width="560"
            height="560"
            alt=""
            srcSet={nftImg[selectedNFTId || 1].src}
            sizes="(max-width: 479px) 180px, 560px"
            className="image-15"
          />
          <div className="div-block-53" onClick={() => handleBuyNFT()}>
            <div className="div-block-52">
              <img src="images/buy.svg" loading="lazy" width="56" height="56" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="div-block-54">
        <div className="div-block-65">
          <div className="text-block-36">duration</div>
          <div className="text-block-37">12 blocks</div>
        </div>
        <div className="div-block-66">
          <div className="text-block-36">guard level</div>
          <div className="text-block-37">diamond</div>
        </div>
        <div className="div-block-67">
          <div className="text-block-36">holders</div>
          <div className="text-block-37">500K</div>
        </div>
        <div className="div-block-55">
          <div className="radius-block-1"></div>
          <div className="radius-block-2"></div>
        </div>
        <div className="div-block-55 top-circle">
          <div className="radius-block-1"></div>
          <div className="radius-block-2"></div>
        </div>
      </div>
    </>
  );
}
