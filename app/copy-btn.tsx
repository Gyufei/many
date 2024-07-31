import { useContext, useState } from 'react';
import { GlobalMsgContext } from './global-msg-context';

export function CopyBtn({ address }: { address: string }) {
  const { setGlobalMessage } = useContext(GlobalMsgContext);
  const [isHover, setIsHover] = useState(false);

  function handleCopy() {
    if (!address) {
      return;
    }

    navigator.clipboard.writeText(address);
    setGlobalMessage({ type: 'success', message: 'Copied!' });
  }

  return (
    <div
      className="div-block-11"
      style={{ cursor: 'pointer' }}
      onClick={handleCopy}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        style={{
          color: isHover ? '#111' : 'rgba(17, 17, 17, 0.5)',
        }}
        className="text-block-7"
      >
        COPY
      </div>
      <img
        style={{
          opacity: isHover ? '1' : '0.5',
        }}
        src="images/copy.svg"
        loading="lazy"
        alt=""
        className="image-9"
      />
    </div>
  );
}
