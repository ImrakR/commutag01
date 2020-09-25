import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import PrizePoolAbi from '@pooltogether/pooltogether-contracts/abis/PrizePool'

import { useTranslation } from 'lib/../i18n'
import { AuthControllerContext } from 'lib/components/contextProviders/AuthControllerContextProvider'
import { PoolDataContext } from 'lib/components/contextProviders/PoolDataContextProvider'
import { FormattedFutureDateCountdown } from 'lib/components/FormattedFutureDateCountdown'
import { PaneTitle } from 'lib/components/PaneTitle'
import { TransactionsTakeTimeMessage } from 'lib/components/TransactionsTakeTimeMessage'
import { transactionsQuery } from 'lib/queries/transactionQueries'
import { useSendTransaction } from 'lib/hooks/useSendTransaction'

export const ExecuteWithdrawScheduledOrInstantWithFee = (props) => {
  const { t } = useTranslation()

  const { nextStep, previousStep } = props

  const router = useRouter()
  const withdrawType = router.query.withdrawType

  const [txExecuted, setTxExecuted] = useState(false)

  const quantity = router.query.quantity
  const timelockDuration = router.query.timelockDuration
  const fee = router.query.fee
  const net = router.query.net
  const scheduledWithdrawal = withdrawType && withdrawType === 'scheduled'

  let formattedFutureDate
  if (timelockDuration) {
    formattedFutureDate = <FormattedFutureDateCountdown
      futureDate={Number(timelockDuration)}
    />
  }

  const authControllerContext = useContext(AuthControllerContext)
  const { usersAddress, provider } = authControllerContext

  const poolData = useContext(PoolDataContext)
  const { pool, refetchPlayerQuery } = poolData

  const ticker = pool?.underlyingCollateralSymbol
  const decimals = pool?.underlyingCollateralDecimals
  const poolAddress = pool?.poolAddress
  const controlledTokenAddress = pool?.ticket?.id

  const tickerUpcased = ticker?.toUpperCase()




  const [txId, setTxId] = useState()

  let method = 'withdrawInstantlyFrom'
  if (scheduledWithdrawal) {
    method = 'withdrawWithTimelockFrom'
  }

  let txName = `Withdraw ${quantity} tickets instantly (fairness fee: $${quantity} ${ticker})`
  if (scheduledWithdrawal) {
    txName = `Schedule withdrawal of ${quantity} tickets ($${quantity} ${ticker})`
  }

  const [sendTx] = useSendTransaction(txName, refetchPlayerQuery)

  const transactionsQueryResult = useQuery(transactionsQuery)
  const transactions = transactionsQueryResult?.data?.transactions
  const tx = transactions?.find((tx) => tx.id === txId)

  const txInWallet = tx?.inWallet && !tx?.sent
  const txSent = tx?.sent && !tx?.completed
  const txCompleted = tx?.completed
  const txError = tx?.error

  useEffect(() => {
    const runTx = () => {
      setTxExecuted(true)

      const params = [
        usersAddress,
        ethers.utils.parseUnits(
          quantity,  
          Number(decimals)
        ),
        controlledTokenAddress,
      ]

      if (!scheduledWithdrawal) {
        const maxExitFee = '0.01'
        params.push(
          ethers.utils.parseEther(maxExitFee)
        )
      }
      
      params.push({
        gasLimit: 500000
      })
      console.log({params})

      const id = sendTx(
        t,
        provider,
        usersAddress,
        PrizePoolAbi,
        poolAddress,
        method,
        params,
      )

      setTxId(id)
    }

    if (!txExecuted && quantity) {
      runTx()
    }
  }, [quantity])

  useEffect(() => {
    if (tx?.cancelled || tx?.error) {
      previousStep()
    } else if (tx?.completed) {
      nextStep()
    }
  }, [tx])

  const formattedWithdrawType = scheduledWithdrawal ? 'Schedule' : 'Instant'
  // yes this string is different:
  const formattedWithdrawTypePastTense = scheduledWithdrawal ? 'Scheduled' : 'Instant'

  return <>
    <PaneTitle small>
      {txInWallet && `Withdraw ${quantity} tickets`}
    </PaneTitle>

    <PaneTitle>
      {txInWallet && `Confirm ${formattedWithdrawTypePastTense} withdrawal`}
      {txSent && `${formattedWithdrawType} Withdrawal confirming...`}
    </PaneTitle>

    <div className='text-white bg-yellow py-4 sm:py-6 px-5 sm:px-8 rounded-xl w-full sm:w-2/3 mx-auto'>
      <h6
        className='mb-2'
        style={{
          color: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        Note:
      </h6>
      <h5>
        {scheduledWithdrawal ? <>
          You are scheduling to receive <span className='font-bold'>${quantity} DAI</span> and your funds will be ready for withdrawal in: <br />
          <span className='font-bold'>{formattedFutureDate}</span>
        </> : <>
          You are withdrawing <span className='font-bold'>${net} {tickerUpcased}</span> of your funds right now, less the <span className='font-bold'>${fee} {tickerUpcased}</span> fairness fee
        </>}
      </h5>
    </div>

    {txSent && !txCompleted && <>
      <TransactionsTakeTimeMessage
        tx={tx}
      />
    </>}
    
  </>
}
