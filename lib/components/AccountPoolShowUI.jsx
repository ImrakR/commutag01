import React, { useContext } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

import { BlankStateMessage } from 'lib/components/BlankStateMessage'
import { Button } from 'lib/components/Button'
import { IndexUILoader } from 'lib/components/IndexUILoader'
import { Odds } from 'lib/components/Odds'
import { PoolCountUp } from 'lib/components/PoolCountUp'
import { PoolCurrencyIcon } from 'lib/components/PoolCurrencyIcon'
import { PoolDataContext } from 'lib/components/contextProviders/PoolDataContextProvider'
import { PrizeAmount } from 'lib/components/PrizeAmount'
import { PrizePoolCountdown } from 'lib/components/PrizePoolCountdown'

export const AccountPoolShowUI = (props) => {
  const router = useRouter()

  const poolData = useContext(PoolDataContext)
  const { pool, dynamicPlayerData } = poolData

  const poolAddress = pool && pool.poolAddress
  const symbol = pool && pool.symbol
  const ticker = pool && pool.underlyingCollateralSymbol
  const underlyingCollateralDecimals = pool && pool.underlyingCollateralDecimals

  let playerData
  if (dynamicPlayerData) {
    playerData = dynamicPlayerData.find(data => data.prizePool.id === poolAddress)
  }

  let usersBalance = 0
  if (pool && playerData) {
    usersBalance = Number(ethers.utils.formatUnits(
      playerData.balance,
      underlyingCollateralDecimals
    ))
  }

  const showPoolIndex = (e) => {
    e.preventDefault()
    router.push('/', '/', { shallow: true })
  }

  const handleShowWithdraw = (e) => {
    e.preventDefault()
    router.push(
      '/account/pools/[symbol]/withdraw',
      `/account/pools/${symbol}/withdraw`,
      { shallow: true }
    )
  }

  const handleShowDeposit = (e) => {
    e.preventDefault()
    router.push(
      '/pools/[symbol]/deposit',
      `/pools/${symbol}/deposit`,
      { shallow: true }
    )
  }

  return <>
    <div
      className='px-2 py-4 sm:py-2 text-center'
    >
      <div
        className='text-xl text-inverse'
      >
        {ticker} Pool
      </div>

      {!dynamicPlayerData ? <>
        <IndexUILoader />
      </> :
        !playerData ? <>
          <BlankStateMessage>
            <div
              className='mb-4'
            >
              You currently have no tickets in this pool.<br />Deposit now to get tickets!
            </div>
            
            <Button
              outline
              onClick={showPoolIndex}
            >
              View pools
            </Button>
          </BlankStateMessage>
        </> : <>
          <div
            className='mt-4'
          >
            <PoolCurrencyIcon
              pool={pool}
              className='inline-block w-12 h-12'
            />
          </div>

          <div
            className='mt-4 text-xl'
          >
            Tickets: <PoolCountUp
              end={usersBalance}
              decimals={null}
            />
          </div>
          <div
            className='mt-1 text-sm'
          >
            <Odds
              pool={pool}
              usersBalance={usersBalance}
            />
          </div>

          <div
            className='my-10'
          >
            <PrizeAmount
              pool={pool}
            />
          </div>

          <div
            className='mt-6'
          >
            {pool.name}
          </div>

          <div
            className='mb-4'
          >
            <PrizePoolCountdown
              pool={pool}
            />
          </div>

          <div
            className='flex justify-center items-center w-full mt-10 mx-auto'
          >
            <div className='mr-2'>
              <Button
                outline
                onClick={handleShowWithdraw}
                wide
              >
                Withdraw
              </Button>              
            </div>
            
            <Button
              outline
              onClick={handleShowDeposit}
              wide
            >
              Get more tickets
            </Button>
          </div>
        </>
      }
    </div>
  </>
}