import { useBalanceDisplay } from './hook/use-balance-display';

export function BalanceDisplay() {
  const { balance, balanceSymbol, rewardBalance } = useBalanceDisplay();

  return (
    <div className="div-block-16">
      <div className="text-block-9">balance</div>
      <div className="div-block-161">
        <div className="text-block-10">
          <span className="text-block-101">{rewardBalance}</span>
          <span className="text-block-102">MANY</span>
        </div>
        <div className="text-block-10">
          <span className="text-block-101">{balance}</span>
          <span className="text-block-102">{balanceSymbol}</span>
        </div>
      </div>
    </div>
  );
}
