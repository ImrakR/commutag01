import { useRouter } from 'next/router'

import { PLAYER_PAGE_SIZE } from 'lib/constants'
import { useControlledTokenBalanceQuery } from 'lib/hooks/useControlledTokenBalanceQuery'

export function PrizePlayersQuery(props) {
  const {
    children,
    pool,
    prize
  } = props

  const router = useRouter()
  const page = router?.query?.page ?
    parseInt(router.query.page, 10) :
    1
  const skip = (page - 1) * PLAYER_PAGE_SIZE

  const blockNumber = prize?.awardedBlock ? 
    prize?.awardedBlock - 1 :
    undefined

  const { data, error, isFetching } = useControlledTokenBalanceQuery(pool, blockNumber, page, skip)

  if (error) {
    console.warn(error)
  }

  return children({ error, data, isFetching })
}

