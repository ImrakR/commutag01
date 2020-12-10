import { ethers } from 'ethers'

import {
  QUERY_KEYS
} from 'lib/constants'

import { useUniswapTokensQuery } from 'lib/hooks/useUniswapTokensQuery'
import { calculateExternalAwardsValue } from 'lib/services/calculateExternalAwardsValue'
import { compileHistoricalErc20Awards } from 'lib/services/compileHistoricalErc20Awards'
import { compileHistoricalErc721Awards } from 'lib/services/compileHistoricalErc721Awards'
import { getControlledToken, getSponsorshipTokenAddress, getTicketTokenAddress } from 'lib/services/getPoolDataFromQueryResult'

// This gathers historical data for a pool and prize
//
// It uses the ERC20/721 balances pulled from the pooltogether subgraph as we want the balance
// at the time the prize was awarded, etc (called balanceAwarded)

export const compileHistoricalPool = (
  chainId,
  poolInfo,
  cache,
  graphPool,
  poolAddress,
  blockNumber,
  prize,
) => {
  const interestPrizeUSD = ethers.utils.bigNumberify(prize?.amount || 0)

  const poolObj = {
    ...poolInfo,
    ...graphPool,
  }

  
  // const erc20GraphData = prize?.awardedExternalErc20Tokens
  // const graphPool = graphPools?.find(_graphPool => _graphPool.id === poolAddress)
  const addresses = poolObj?.prizeStrategy?.singleRandomWinner?.externalErc20Awards?.map(award => award.address)

  const { status, data, error, isFetching } = useUniswapTokensQuery(
    blockNumber,
    addresses
  )
  const uniswapPriceData = data
  const externalErc20Awards = compileHistoricalErc20Awards(prize, uniswapPriceData)

  const ethErc721Awards = cache.getQueryData([
    QUERY_KEYS.ethereumErc721sQuery,
    chainId,
    poolAddress,
    blockNumber
  ])
  const externalErc721Awards = compileHistoricalErc721Awards(ethErc721Awards, prize)

  const externalAwardsUSD = calculateExternalAwardsValue(externalErc20Awards)

  const totalPrizeUSD = externalAwardsUSD ?
    interestPrizeUSD.add(ethers.utils.parseEther(
      externalAwardsUSD.toString()
    )) :
    interestPrizeUSD

  const sponsorshipTokenAddress = getSponsorshipTokenAddress(poolObj?.prizeStrategy)
  const ticketTokenAddress = getTicketTokenAddress(poolObj?.prizeStrategy)
  const sponsorshipToken = getControlledToken(poolObj?.controlledTokens, sponsorshipTokenAddress)
  const ticketToken = getControlledToken(poolObj?.controlledTokens, ticketTokenAddress)

  return {
    ...poolInfo,
    ...poolObj,
    poolAddress: poolAddress,
    prizeAmountUSD: totalPrizeUSD,
    playerCount: poolObj?.prizeStrategy?.singleRandomWinner?.ticket?.numberOfHolders,
    ticketSupply: poolObj?.prizeStrategy?.singleRandomWinner?.ticket?.totalSupply,
    interestPrizeUSD,
    externalAwardsUSD,
    // externalItemAwardsValue,
    externalErc20Awards,
    externalErc721Awards,
    ethErc721Awards,
    sponsorshipToken,
    ticketToken
  }
}
