import { gql } from 'graphql-request'

import { CUSTOM_CONTRACT_ADDRESSES } from 'lib/constants'
import { getUniswapSubgraphClient } from 'lib/hooks/useSubgraphClients'

const QUERY_TEMPLATE = `__alias__: tokens(where: { id_in: __addresses__ } __blockFilter__) {
  id
  derivedETH
  decimals
}`

/**
 * Fetches token prices from the graph using the latest block
 * @param {*} chainId
 * @param {*} addresses
 * @returns
 */
export const getTokenPriceData = async (chainId, addresses) => {
  const tokenPrices = await getTokenPrices(chainId, { '-1': addresses })
  return tokenPrices?.['-1']
}

/**
 * Fetches token price data paired with USDt on Uniswap or the provided networks equivalent
 * @param {*} chainId
 * @param {object} addresses arrays of addresses keyed by a block number
 * @returns
 */
export const getTokenPrices = async (chainId, addresses) => {
  // Only supported on mainnet
  if (![1, 4].includes(chainId)) return null

  const graphQLClient = getUniswapSubgraphClient(chainId)

  // We'll use this stablecoin to measure the price of ETH off of
  const stablecoinAddress = CUSTOM_CONTRACT_ADDRESSES[chainId]?.['Usdt']

  // Build a query selection set from all the token addresses and block numbers
  let query = ``
  const blockNumbers = Object.keys(addresses)
  blockNumbers.forEach((blockNumber) => {
    const tokenAddresses = addresses[blockNumber]

    // TODO: What if the stablecoin was created AFTER the block number?
    const selection = QUERY_TEMPLATE.replace('__alias__', getQueryAliasFromBlockNumber(blockNumber))
      .replace('__addresses__', _getTokenAddressesFilter([stablecoinAddress, ...tokenAddresses]))
      .replace('__blockFilter__', _getBlockFilter(blockNumber))

    query = `${query}\n${selection}`
  })

  const response = await graphQLClient.request(gql`
    query tokenPriceData {
      ${query}
    }
  `)

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
      usd: _calculateUsd(stablecoin)
    }

    tokenPriceData[blockNumber] = {}
    tokens.forEach((token) => {
      tokenPriceData[blockNumber][token.id] = {
        derivedETH: token.derivedETH,
        address: token.id,
        usd: ether.usd * parseFloat(token.derivedETH),
        decimals: token.decimals
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

const _calculateUsd = (token) => {
  let derivedETH = token?.derivedETH

  if (!derivedETH || derivedETH === '0') {
    derivedETH = 0.2 // 1 ETH is $5 USD, used for Rinkeby, etc
  }

  return 1 / derivedETH
}