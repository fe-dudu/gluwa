import React from 'react';
import { Token } from '../types/token';

interface Props {
  open: boolean;
  filteredToken?: Token;
  onChange: (value: Token) => void
  onClose: () => void;
}

const tokens: { name: string, token: Token }[] = [
  { name: 'Creditcoin', token: 'CTC' },
  { name: 'USDCoin', token: 'USDC' },
  { name: 'Tether USD', token: 'USDT' },
  { name: 'Wrapped CTC', token: 'WCTC' },
];

export const TokenSelectModal: React.FC<Props> = ({ open, filteredToken, onChange, onClose }) => {
  if (!open) {
    return null
  }

  return (
    <section className="layer-wrap">
      <div className="dimmed" onClick={onClose}></div>
      <div className="layer-container">
        <header className="layer-header">
          <div className="inner">
            <h3>Select a token</h3>
            <button type="button" className="button-close" onClick={onClose}>
              <i className="blind">Close</i>
            </button>
          </div>
        </header>

        <div className="layer-content">
          <div className="inner">
            <div className="select-token-wrap">
              <div className="currency-list-wrap">
                <div className="lists">
                  {tokens.filter((item) => item.token !== filteredToken).map((item) => (
                    <button
                      key={item.token}
                      type="button"
                      className="currency-label"
                      onClick={() => {
                        onChange(item.token)
                        onClose();
                      }}
                    >
                      <div className={`token ${item.token}`} data-token-size="36"></div>
                      <div className="name">
                        <div className="full">{item.name}</div>
                        <span>{item.token}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
