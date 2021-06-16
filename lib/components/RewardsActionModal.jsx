import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import PrizePoolAbi from '@pooltogether/pooltogether-contracts/abis/PrizePool'
import TokenFaucetAbi from '@pooltogether/pooltogether-contracts/abis/TokenFaucet'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { useTranslation } from 'react-i18next'
import { useOnboard } from '@pooltogether/hooks'

import { Button } from 'lib/components/Button'
import { ButtonDrawer } from 'lib/components/ButtonDrawer'
import { NetworkWarning } from 'lib/components/NetworkWarning'
import { TextInputGroup } from 'lib/components/TextInputGroup'
import { Tooltip } from 'lib/components/Tooltip'
import { TxStatus } from 'lib/components/TxStatus'
import { useSendTransaction } from 'lib/hooks/useSendTransaction'
import { useTransaction } from 'lib/hooks/useTransaction'
import { numberWithCommas } from 'lib/utils/numberWithCommas'

import { getNetworkNiceNameByChainId } from 'lib/utils/networks'

import WalletIcon from 'assets/images/icon-wallet.svg'

export const RewardsActionModal = (props) => {
  const { t } = useTranslation()

  const {
    isOpen,
    closeModal,
    action,
    maxAmount,
    maxAmountUnformatted,
    method,
    getParams,
    refetch,
    chainId,
    allowance,
    overMaxErrorMsg,
    underlyingToken,
    prizePoolAddress,
    usersAddress
  } = props

  const { register, handleSubmit, setValue, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  // console.log(underlyingToken)
  const decimals = underlyingToken.decimals
  const tickerUpcased = underlyingToken.symbol?.toUpperCase()

  const { isValid } = formState

  const { network: walletChainId } = useOnboard()
  const [txId, setTxId] = useState(0)
  const sendTx = useSendTransaction()
  const tx = useTransaction(txId)
  const txPending = (tx?.sent || tx?.inWallet) && !tx?.completed

  const walletOnWrongNetwork = walletChainId !== chainId

  const onSubmit = async (formData) => {
    const amount = formData[action]
    const txName = `${t(action.toLowerCase())}: ${amount} ${tickerUpcased}`

    const id = await sendTx(
      txName,
      PrizePoolAbi,
      prizePoolAddress,
      method,
      getParams(amount),
      refetch
    )

    setTxId(id)
  }

  const allowanceIsZero = allowance && allowance.isZero()

  let approveTooltipTip
  if (walletOnWrongNetwork) {
    approveTooltipTip = t('yourWalletIsOnTheWrongNetwork', {
      networkName: getNetworkNiceNameByChainId(chainId)
    })
  } else if (!allowanceIsZero) {
    approveTooltipTip = t('youHaveProvidedEnoughAllowance', {
      ticker: tickerUpcased
    })
  }

  let confirmTooltipTip
  if (walletOnWrongNetwork) {
    confirmTooltipTip = t('yourWalletIsOnTheWrongNetwork', {
      networkName: getNetworkNiceNameByChainId(chainId)
    })
  } else if (allowanceIsZero) {
    confirmTooltipTip = t('needToApproveTicker', {
      ticker: tickerUpcased
    })
  }

  const approveTooltipEnabled = walletOnWrongNetwork || !allowanceIsZero
  const approveButtonDisabled = approveTooltipEnabled

  const confirmTooltipEnabled = walletOnWrongNetwork || allowanceIsZero
  const confirmButtonDisabled = !isValid || confirmTooltipEnabled

  return (
    <Dialog
      aria-label={`${underlyingToken.symbol} Pool ${action} Modal`}
      isOpen={isOpen}
      onDismiss={closeModal}
    >
      <div className='relative text-inverse p-4 bg-modal h-full sm:h-auto rounded-none sm:rounded-sm sm:max-w-3xl mx-auto flex flex-col'>
        <div className='flex'>
          <button
            className='absolute r-4 t-4 close-button trans text-inverse opacity-40 hover:opacity-100'
            onClick={closeModal}
          >
            <FeatherIcon icon='x-circle' className='w-6 h-6 sm:w-8 sm:h-8' />
          </button>
        </div>

        <div className='flex flex-col justify-center h-5/6 sm:pb-8'>
          <div className='flex flex-col justify-center items-center mb-6 mt-10'>
            {props.tokenImage ?? null}
            <h5>
              {action} {underlyingToken.symbol}
            </h5>
          </div>

          <NetworkWarning walletOnWrongNetwork={walletOnWrongNetwork} chainId={chainId} />

          {txPending && (
            <div className='mx-auto text-center'>
              <TxStatus gradient='basic' tx={tx} />
            </div>
          )}

          {!txPending && (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:w-9/12 sm:mx-auto'>
              <TextInputGroup
                unsignedNumber
                autoFocus
                large
                id={`text-input-group-${action}`}
                name={action}
                register={register}
                label={t(`${action.toLowerCase()}Amount`)}
                required={t('amountRequired')}
                autoComplete='off'
                validate={{
                  greaterThanBalance: (value) => {
                    let amountUnformatted
                    try {
                      amountUnformatted = ethers.utils.parseUnits(value, decimals)
                    } catch (e) {
                      console.warn(e)
                    }
                    return amountUnformatted?.lte(maxAmountUnformatted) || overMaxErrorMsg
                  },
                  greaterThanZero: (value) => {
                    return (
                      Number(value) > 0 ||
                      t('greaterThanZeroMessage', 'please enter a value higher than 0')
                    )
                  }
                }}
                rightLabel={
                  usersAddress &&
                  tickerUpcased && (
                    <button
                      id='_setMaxDepositAmount'
                      type='button'
                      className='font-bold inline-flex items-center'
                      onClick={(e) => {
                        e.preventDefault()
                        setValue(action, maxAmount, { shouldValidate: true })
                      }}
                    >
                      <img src={WalletIcon} className='mr-2' style={{ maxHeight: 12 }} />{' '}
                      {numberWithCommas(maxAmount)} {tickerUpcased}
                    </button>
                  )
                }
              />

              <span className='h-6 w-full text-xs text-orange text-center'>
                {errors?.[action]?.message || null}
              </span>

              <ButtonDrawer>
                {allowance && (
                  <Tooltip
                    isEnabled={approveTooltipEnabled}
                    id={`rewards-modal-approve-${action}-${prizePoolAddress}-tooltip`}
                    tip={approveTooltipTip}
                    className='w-48-percent'
                  >
                    <ApproveButton
                      {...props}
                      tooltipEnabled={approveTooltipEnabled}
                      disabled={approveButtonDisabled}
                    >
                      {t('approveStepOne')}
                    </ApproveButton>
                  </Tooltip>
                )}

                <Tooltip
                  isEnabled={confirmTooltipEnabled}
                  id={`rewards-modal-confirm-${action}-${prizePoolAddress}-tooltip`}
                  tip={confirmTooltipTip}
                  className='w-48-percent'
                >
                  <Button
                    type='submit'
                    textSize='sm'
                    disabled={confirmButtonDisabled}
                    className={classnames('sm:ml-4 sm:mt-4', {
                      'w-48-percent': !confirmTooltipEnabled,
                      'w-full': confirmTooltipEnabled
                    })}
                  >
                    {t('confirmStepTwo')}
                  </Button>
                </Tooltip>
              </ButtonDrawer>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  )
}

const ApproveButton = (props) => {
  const { children, tooltipEnabled, disabled } = props

  return (
    <Button
      inverse
      textSize='sm'
      className={classnames('mx-auto sm:mt-4', {
        'w-48-percent': !tooltipEnabled,
        'w-full': tooltipEnabled
      })}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
