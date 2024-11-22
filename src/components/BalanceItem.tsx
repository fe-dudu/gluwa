
import React from 'react';

interface Props {
  amount: string;
}
const BalanceItem: React.FC<Props> = ({ amount }) => {
  return (
    <div className="item-flex amount">
      <div className="rt">
        <div className="balance">
          <span>Balance: {amount}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceItem;
