import React, { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  label: string | null;
}

const TokenButton: React.FC<Props> = ({ label, ...props }) => {
  return (
    <button type="button" className={`currency-label ${!label ? 'select' : ''}`} {...props}>
      {label && <div className={`token ${label}`} data-token-size="28"></div>}
      <strong className="name">{label ?? 'Select token'}</strong>
    </button>
  );
};

export default TokenButton;
