// import { ethers } from 'ethers'
// import { isEmpty } from 'lodash'

// import {
//   QUERY_KEYS
// } from 'lib/constants'

// import { useLootBox } from 'lib/hooks/useLootBox'
// // import { calculateEstimatedExternalItemAwardsValue } from 'lib/services/calculateEstimatedExternalItemAwardsValue'

// // this gathers the current data for a pool

// export const compilePool = (
//   chainId,
//   poolInfo,
//   poolAddress,
//   queryCache,
//   poolChainData,
//   poolGraphData,
//   uniswapPriceData,
//   blockNumber = -1
// ) => {
//   console.log(uniswapPriceData)

//   const poolObj = {
//     ...poolChainData,
//     ...poolGraphData,
//   }

//   const ethereumErc20Awards = queryCache.getQueryData([QUERY_KEYS.ethereumErc20sQuery, chainId, poolAddress, blockNumber])
//   const ethereumErc721Awards = queryCache.getQueryData([QUERY_KEYS.ethereumErc721sQuery, chainId, poolAddress, blockNumber])



//   // let { awards } = useLootBox(historical, pool, blockNumber)

//   // const blockNumber = historical ? parseInt(prize?.awardedBlock, 10) : -1
//   // const originalAwardsCount = awards.length
//   // awards = moreVisible ? awards : awards?.slice(0, 10)

//   // console.log(awards)

//   const compiledExternalErc20Awards = compileErc20Awards(ethereumErc20Awards, poolGraphData, uniswapPriceData)
//   console.log({ compiledExternalErc20Awards})

//   const compiledExternalErc721Awards = compileErc721Awards(ethereumErc721Awards, poolGraphData)
//   console.log({ compiledExternalErc721Awards })

//   const externalAwardsEstimateUSD = calculateEstimatedExternalAwardsValue(compiledExternalErc20Awards)

//   const interestPrizeEstimateUSD = calculateEstimatedPoolPrize(poolObj)

  
//   const numOfWinners = parseInt(poolObj.numberOfWinners || 1, 10)
//   const grandPrizeAmountUSD = externalAwardsEstimateUSD ?
//     interestPrizeEstimateUSD.div(numOfWinners).add(ethers.utils.parseEther(
//       externalAwardsEstimateUSD.toString()
//     )) :
//     interestPrizeEstimateUSD.div(numOfWinners)

//   const totalPrizeAmountUSD = externalAwardsEstimateUSD ?
//     interestPrizeEstimateUSD.add(ethers.utils.parseEther(
//       externalAwardsEstimateUSD.toString()
//     )) :
//     interestPrizeEstimateUSD

//   return {
//     ...poolInfo,
//     ...poolObj,
//     totalPrizeAmountUSD,
//     grandPrizeAmountUSD,
//     interestPrizeUSD: interestPrizeEstimateUSD,
//     externalAwardsUSD: externalAwardsEstimateUSD,
//     compiledExternalErc20Awards,
//     compiledExternalErc721Awards
//   }
// }
