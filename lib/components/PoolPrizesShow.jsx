import React, { useContext } from 'react'
import { useRouter} from 'next/router'

import { BlankStateMessage } from 'lib/components/BlankStateMessage'
import { PoolDataContext } from 'lib/components/contextProviders/PoolDataContextProvider'
import { Button } from 'lib/components/Button'
import { Meta } from 'lib/components/Meta'
import { PoolPrizeListing } from 'lib/components/PoolPrizeListing'
import { PoolCurrencyIcon } from 'lib/components/PoolCurrencyIcon'
import { PrizesPageHeader } from 'lib/components/PrizesPageHeader'

export const PoolPrizesShow = (
  props,
) => {
  const router = useRouter()

  const poolData = useContext(PoolDataContext)
  const { pool, pools } = poolData

  const handleShowDeposit = (e) => {
    e.preventDefault()
    router.push(
      '/pools/[symbol]/deposit',
      `/pools/${pool?.symbol}/deposit`,
      { shallow: true }
    )
  }

  if (pool === null) {
    const querySymbol = router.query?.symbol
    return <BlankStateMessage>
      Could not find pool with symbol: ${querySymbol}
    </BlankStateMessage>
  }

  return <>
    <Meta title={`${pool?.name} Prizes`} />

    <PrizesPageHeader
      pool={pool}
    />

    <div className='flex justify-center text-left mt-10'>
      {pools.map(_pool => {
        return <Button
          key={`prize-pool-button-${_pool.id}`}
          outline
          wide
          selected={_pool.symbol === pool?.symbol}
          size='lg'
          href='/prizes/[symbol]'
          as={`/prizes/${_pool.symbol}`}
          className='flex items-center justify-center mr-4'
        >
          <PoolCurrencyIcon
            pool={_pool}
          /> {_pool.underlyingCollateralSymbol}
        </Button>
      })}
    </div>

    <div
      className='bg-default mt-6 mb-6 text-sm py-4 flex items-center justify-center'
    >
      <div className='flex flex-col items-center justify-center text-lg'>
        <PoolCurrencyIcon
          pool={pool}
        /> <div className='mt-1'>
          {pool?.name}
        </div>
      </div>

      <div className='mx-8 sm:mx-12 lg:mx-20 text-2xl text-center -mt-2 text-secondary'>
        $17,242
        <div className='text-xxs -mt-1'>
          Awarded so far
        </div>
      </div>

      <Button
        outline
        onClick={handleShowDeposit}
        wide
      >
        Get tickets
      </Button>
    </div>

    <PoolPrizeListing
      pool={pool}
    />

  </>
}