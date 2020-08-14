import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { MAINNET_POLLING_INTERVAL } from 'lib/constants'
import { BlankStateMessage } from 'lib/components/BlankStateMessage'
import { ButtonLink } from 'lib/components/ButtonLink'
import { GeneralContext } from 'lib/components/contextProviders/GeneralContextProvider'
import { IndexUILoader } from 'lib/components/IndexUILoader'
import { PrizesTable } from 'lib/components/PrizesTable'
import { poolPrizesQuery } from 'lib/queries/poolPrizesQuery'

export const PoolPrizeListing = (
  props,
) => {
  const { pool } = props

  const generalContext = useContext(GeneralContext)
  const { paused } = generalContext

  const { loading, error, data } = useQuery(poolPrizesQuery, {
    variables: {
      prizeStrategyAddress: pool?.prizeStrategyAddress
    },
    skip: !pool?.prizeStrategyAddress,
    fetchPolicy: 'network-only',
    pollInterval: paused ? 0 : MAINNET_POLLING_INTERVAL,
  })

  if (error) {
    console.error(error)
  }

  let prizes = data?.prizeStrategy?.prizes
  // need to stash in new array due to strict mode / read only error
  let reversedPrizes = prizes && [...prizes]
  if (reversedPrizes) {
    reversedPrizes = reversedPrizes.reverse()
  }

  if (loading) {
    return <div
      className='mt-10'
    >
      <IndexUILoader />
    </div>
  }

  return <>
    <div
      className='flex flex-col items-center text-center mt-8'
    >
      {!prizes || loading && <>
        <IndexUILoader />
      </>}

      {error && <>
        There was an issue loading data from The Graph:
        {error}
      </>}

      {prizes?.length === 0 && <>
        <BlankStateMessage>
          <div
            className='mb-4'
          >
            There are no prizes for this pool yet.
          </div>
          <ButtonLink
            href='/pools/[symbol]/manage'
            as={`/pools/${pool?.symbol}/manage`}
          >
            Manage pool
          </ButtonLink>
        </BlankStateMessage>
      </>}

      <PrizesTable
        pool={pool}
        prizes={reversedPrizes} 
      />
    </div>

  </>
}
