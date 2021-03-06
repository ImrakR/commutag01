import { NETWORK } from '@pooltogether/utilities'
import { gql } from 'graphql-request'

import { CUSTOM_CONTRACT_ADDRESSES } from 'lib/constants'
import { getUniswapSubgraphClient } from 'lib/utils/getSubgraphClients'

const KNOWN_STABLECOIN_ADDRESSES = {
  137: [
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  ],
  42220: [
    '0x765de816845861e75a25fca122bb6898b8b1282a',
    '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73'
  ]
}

/**
 * BSC Subgraphs use `derivedBNB` rather than `derivedETH`
 * @param {*} chainId
 * @returns
 */
const getUnderlyingKey = (chainId) => {
  switch (chainId) {
    case NETWORK.bsc:
      return 'derivedBNB'
    default:
      return 'derivedETH'
  }
}

const getQueryTemplate = (
  chainId
) => `__alias__: tokens(where: { id_in: __addresses__ } __blockFilter__) {
  id
  ${getUnderlyingKey(chainId)}
  decimals
}`

/**
 * Fetches token price data paired with USDt on Uniswap or the provided networks equivalent
 * @param {*} chainId
 * @param {object} addresses arrays of addresses keyed by a block number
 * @returns
 */
export const getTokenPrices = async (chainId, addresses) => {
  const graphQLClient = getUniswapSubgraphClient(chainId)

  if (!graphQLClient) return null

  const knownStablecoinAddresses = KNOWN_STABLECOIN_ADDRESSES?.[chainId] || []

  // We'll use this stablecoin to measure the price of ETH off of
  const stablecoinAddress = CUSTOM_CONTRACT_ADDRESSES[chainId]?.['Stablecoin']

  // Build a query selection set from all the token addresses and block numbers
  const stablecoinsToMockByQueryAlias = {}
  let query = ``
  const blockNumbers = Object.keys(addresses)

  blockNumbers.forEach((blockNumber) => {
    const tokenAddresses = addresses[blockNumber].map((address) => address.toLowerCase())

    const stablecoinAddresses = tokenAddresses.filter((address) =>
      knownStablecoinAddresses.includes(address.toLowerCase())
    )
    const filteredAddresses = tokenAddresses.filter(
      (address) => !knownStablecoinAddresses.includes(address.toLowerCase())
    )

    stablecoinsToMockByQueryAlias[getQueryAliasFromBlockNumber(blockNumber)] = stablecoinAddresses

    // TODO: What if the stablecoin was created AFTER the block number?
    if (filteredAddresses.length > 0) {
      const queryTemplate = getQueryTemplate(chainId)

      const selection = queryTemplate
        .replace('__alias__', getQueryAliasFromBlockNumber(blockNumber))
        .replace(
          '__addresses__',
          _getTokenAddressesFilter([stablecoinAddress, ...filteredAddresses])
        )
        .replace('__blockFilter__', _getBlockFilter(blockNumber))

      query = `${query}\n${selection}`
    }
  })

  let response
  try {
    response = query
      ? await graphQLClient.request(gql`
      query tokenPriceData {
        ${query}
      }
    `)
      : {}
  } catch (e) {
    console.log(e.message)
    response = {}
  }

  // Format the data into a useful object
  // calculate and cache the price of eth in the data object
  const tokenPriceData = {}
  Object.keys(response).forEach((alias) => {
    const tokens = response[alias]
    const stablecoin = tokens.find((token) => token.id === stablecoinAddress)
    const blockNumber = getBlockNumberFromQueryAlias(alias)

    const ether = {
      derivedETH: '1',
      id: 'eth',
      usd: _calculateUsd(stablecoin, getUnderlyingKey(chainId))
    }

    tokenPriceData[blockNumber] = {}
    tokens.forEach((token) => {
      tokenPriceData[blockNumber][token.id] = {
        derivedETH: token[getUnderlyingKey(chainId)],
        address: token.id,
        usd: ether.usd * parseFloat(token[getUnderlyingKey(chainId)]),
        decimals: token.decimals
      }
    })
  })

  Object.keys(stablecoinsToMockByQueryAlias).forEach((alias) => {
    const stablecoinsToMock = stablecoinsToMockByQueryAlias[alias]
    const blockNumber = getBlockNumberFromQueryAlias(alias)

    stablecoinsToMock.forEach((tokenAddress) => {
      if (tokenPriceData[blockNumber]) {
        tokenPriceData[blockNumber][tokenAddress] = {
          derivedETH: null,
          address: tokenAddress,
          usd: 1,
          decimals: null
        }
      } else {
        tokenPriceData[blockNumber] = {
          [tokenAddress]: {
            derivedETH: null,
            address: tokenAddress,
            usd: 1,
            decimals: null
          }
        }
      }
    })
  })

  return tokenPriceData
}

// Utils

const getQueryAliasFromBlockNumber = (blockNumber) =>
  blockNumber > 0 ? `tokens_${blockNumber}` : 'tokens'
const getBlockNumberFromQueryAlias = (alias) => (alias === 'tokens' ? '-1' : alias.split('_')[1])

const _getBlockFilter = (blockNumber) => {
  let blockFilter = ''

  if (Number(blockNumber) > 0) {
    blockFilter = `, block: { number: ${blockNumber} }`
  }

  return blockFilter
}

const _getTokenAddressesFilter = (addresses) =>
  addresses.length > 0 ? `["${addresses.join('","')}"]` : '[]'

const _calculateUsd = (token, underlyingKey) => {
  let derivedETH = token?.[underlyingKey]

  if (!derivedETH || derivedETH === '0') {
    derivedETH = 1 // 1 ETH is $1 USD, used for Rinkeby, etc
  }

  return 1 / derivedETH
}
