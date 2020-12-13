import { getContractAddresses } from 'lib/services/getContractAddresses'

export const getCurrentLootBox = (pool, chainId) => {
  const contractAddresses = getContractAddresses(chainId)
  const lootBoxAddress = contractAddresses?.lootBox

  const erc721 = pool?.prizeStrategy?.externalErc721Awards?.find(erc721 => erc721.address === lootBoxAddress)
  const tokenId = erc721?.tokenIds?.[0]

  return { 
    lootBoxAddress,
    tokenId
  }
}