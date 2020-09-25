import { ethers } from 'ethers'

export function calculateEstimatedPoolPrize(poolData) {
  const totalSupply = poolData.totalSupply || '0'
  const totalSponsorship = poolData.totalSponsorship || 0
  const supplyRatePerBlock = poolData.supplyRatePerBlock || 0
  const remainingBlocks = poolData.estimateRemainingBlocksToPrize || 0

  return ethers.utils.parseEther(totalSupply)
    .add(totalSponsorship)
    .mul(supplyRatePerBlock)
    .mul(remainingBlocks)
}