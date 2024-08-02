'use client';

import { useContext, useEffect } from 'react';
import { GlobalMsgContext } from './global-msg-context';

export default function GlobalActionTip() {
  const { globalMessage, setGlobalMessage } = useContext(GlobalMsgContext);
  const { type, message } = globalMessage || {};

  useEffect(() => {
    if (globalMessage) {
      const d = setTimeout(() => {
        setGlobalMessage(null);
      }, 5000);
      return () => clearTimeout(d);
    }
  }, [globalMessage, setGlobalMessage]);

  const colorMap = {
    success: {
      color: '#4CBF87',
    },
    warning: {
      color: '#F79218',
    },
    error: {
      color: '#FF6262',
    },
  };

  return (
    <>
      {message && type ? (
        <div
          className="tip-con fixed bottom-6 left-1/2 z-[1000] mt-4 flex -translate-x-1/2 items-center gap-x-2 rounded-md border px-5 py-3"
          style={{
            color: colorMap[type].color,
          }}
        >
          {((type) => {
            switch (type) {
              case 'success':
                return <img className="tip-icon" src="images/tip-success.svg" loading="lazy" alt="" />;
              case 'warning':
                return <img className="tip-icon" src="images/tip-info.svg" loading="lazy" alt="" />;
              case 'error':
                return <img className="tip-icon" src="images/tip.svg" loading="lazy" alt="" />;
              default:
                return null;
            }
          })(type)}
          <div className="tip-text">{message}</div>
        </div>
      ) : null}
    </>
  );
}
