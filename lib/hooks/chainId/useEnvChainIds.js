import { useAppEnv } from 'lib/hooks/useAppEnv'
import { NETWORK } from 'lib/utils/networks'

export const CHAIN_IDS_BY_APP_ENV = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon],
  testnets: [NETWORK.rinkeby]
})

/**
 * Returns the list of chainIds relevant for the current app state
 * @returns
 */
export const useEnvChainIds = () => {
  const { appEnv } = useAppEnv()
  return CHAIN_IDS_BY_APP_ENV[appEnv] || CHAIN_IDS_BY_APP_ENV['mainnets']
}