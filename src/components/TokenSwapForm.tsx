
import React from 'react';
import { useForm } from 'react-hook-form';
import { PostSwapPayload } from '../apis/swap';
import useBalance from '../hooks/useBalance';
import { usePopup } from '../hooks/usePopup';
import usePrice from '../hooks/usePrice';
import useSwapMethod from '../hooks/useSwapMethod';
import { maxNumberFormat } from '../utils/numberFormat';
import BalanceItem from './BalanceItem';
import TokenButton from './TokenButton';
import { TokenSelectModal } from './TokenSelectModal';
import { Token } from '../types/token';

const TokenSwapForm: React.FC = () => {
  const { postSwap } = useSwapMethod();
  const { isOpen: paymentTokenPopupOpen, openPopup: openPaymentTokenPopup, closePopup: closePaymentTokenPopup } = usePopup();
  const { isOpen: swapTokenPopupOpen, openPopup: openSwapTokenPopup, closePopup: closeSwapTokenPopup } = usePopup();
  const { data: balance, isLoading: isBalanceLoading } = useBalance();
  const { data: price, isLoading: isPriceLoading } = usePrice();
  const {
    formState: { isSubmitting, isValid, errors },
    register,
    setValue,
    watch,
    handleSubmit,
    reset
  } = useForm<Omit<PostSwapPayload, 'receiveToken'> & { receiveToken: Token | null }>({
    defaultValues: {
      payAmount: "",
      payToken: "CTC",
      receiveAmount: "",
      receiveToken: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const payAmount = watch("payAmount");
  const payToken = watch("payToken");
  const receiveAmount = watch("receiveAmount");
  const receiveToken = watch("receiveToken");

  const disabledInput = isBalanceLoading || isPriceLoading || isSubmitting;
  const disabledSwap = !payAmount || !isValid || disabledInput;
  const disabledSubmit = !receiveAmount || disabledSwap;

  const swapToken = () => {
    if (!price || !payAmount || !payToken || !receiveToken) return;

    const payTokenPrice = price[payToken];
    const receiveTokenPrice = price[receiveToken];

    if (!payTokenPrice || !receiveTokenPrice) return;

    const receiveAmount = (Number(payAmount) * payTokenPrice) / receiveTokenPrice;

    setValue('receiveAmount', receiveAmount.toFixed(12));
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.receiveToken === null) return;

    try {
      await postSwap.mutateAsync(data as PostSwapPayload);
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <form noValidate onSubmit={onSubmit}>
        <div className="box-content">
          <div className="heading">
            <h2>Swap</h2>
          </div>

          <div className="swap-dashboard">
            <div className="swap-item active">
              <div className="title">
                <h3>You pay</h3>
              </div>

              <div className="amount-input">
                <div className="input">
                  <input
                    type="number"
                    autoFocus
                    disabled={disabledInput}
                    placeholder='0'
                    {...register('payAmount', {
                      validate: {
                        notZero: (value) => value !== '0' && !value.startsWith('0') || 'Amount cannot be zero',
                        minValue: (value) => Number(value) > 0 || 'Please enter a value greater than 0',
                        maxValue: (value) => Number(balance?.[payToken] ?? 0) >= Number(value) || `Amount cannot exceed your balance of ${balance?.[payToken]}`,
                      },
                    })}

                  />
                  {errors.payAmount && (
                    <span style={{ color: 'red', position: 'absolute', left: 40, fontSize: 11 }}>{errors.payAmount.message}</span>
                  )}
                </div>
                <TokenButton label={payToken} onClick={openPaymentTokenPopup} />
              </div>

              <BalanceItem amount={maxNumberFormat(balance?.[payToken]) ?? "0"} />
            </div>

            <button type="button" className="mark" disabled={disabledSwap} onClick={swapToken}>
              <i className="blind">swap</i>
            </button>

            <div className="swap-item">
              <div className="title">
                <h3>You receive</h3>
              </div>

              <div className="amount-input">
                <div className="input">
                  <input type="number" value={receiveAmount} placeholder='0' readOnly />
                </div>
                <TokenButton label={receiveToken} onClick={openSwapTokenPopup} />
              </div>

              <BalanceItem amount={maxNumberFormat(Number(receiveAmount)) ?? "0"} />
            </div>

            <div className="button-wrap">
              <button type="submit" className="normal" disabled={disabledSubmit}>
                Swap
              </button>
            </div>
          </div>
        </div>
      </form>

      <TokenSelectModal
        open={paymentTokenPopupOpen}
        onChange={(value) => setValue("payToken", value)}
        onClose={closePaymentTokenPopup}
      />
      <TokenSelectModal
        open={swapTokenPopupOpen}
        filteredToken={payToken}
        onChange={(value) => setValue("receiveToken", value)}
        onClose={closeSwapTokenPopup}
      />
    </>
  );
}

export default TokenSwapForm;
