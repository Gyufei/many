'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface IMsg {
  type: 'success' | 'warning' | 'error';
  message: string;
}

interface IGlobalMsgContext {
  globalMessage: IMsg | null;
  setGlobalMessage: (v: IMsg | null) => void;
}

export const GlobalMsgContext = createContext<IGlobalMsgContext>({} as any);

export const GlobalMsgProvider = ({ children }: { children: React.ReactNode }) => {
  const [msg, setMsg] = useState<IMsg | null>(null);

  return (
    <GlobalMsgContext.Provider
      value={{
        globalMessage: msg,
        setGlobalMessage: setMsg,
      }}
    >
      {children}
    </GlobalMsgContext.Provider>
  );
};
