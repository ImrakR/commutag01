import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import { Dialog } from '@reach/dialog'
import { useUsersAddress } from '@pooltogether/hooks'

import { useTranslation } from 'react-i18next'
import { CUSTOM_CONTRACT_ADDRESSES } from 'lib/constants'
import { ButtonLink } from 'lib/components/ButtonLink'
import { useCoingeckoTokenInfoQuery } from 'lib/hooks/useCoingeckoTokenInfoQuery'
import { usePoolTokenData } from 'lib/hooks/usePoolTokenData'
import { useTotalClaimablePool } from 'lib/hooks/useTotalClaimablePool'
import { numberWithCommas } from 'lib/utils/numberWithCommas'
import { NETWORK } from 'lib/utils/networks'

import Squiggle from 'assets/images/squiggle.svg'
import PoolIcon from 'assets/images/pool-icon.svg'

export const NavPoolBalance = () => {
  const usersAddress = useUsersAddress()

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const { data: tokenData, isFetched } = usePoolTokenData(usersAddress)

  if (!isFetched || !tokenData) {
    return null
  }

  const { usersBalance } = tokenData

  return (
    <div>
      <div
        className='relative text-highlight-4 hover:text-white font-bold cursor-pointer pool-gradient-1 rounded-full px-3 xs:px-4 p-2 leading-none trans ml-2'
        onClick={openModal}
      >
        <span className='mr-1'>{numberWithCommas(usersBalance)}</span>
        POOL
      </div>
      <PoolBalanceModal isOpen={isOpen} closeModal={closeModal} tokenData={tokenData} />
    </div>
  )
}

const PoolBalanceModal = (props) => {
  const { t } = useTranslation()

  const { isOpen, closeModal, tokenData } = props
  const { usersBalance, totalSupply } = tokenData

  const usersAddress = useUsersAddress()
  const chainId = NETWORK.mainnet

  const { total: totalClaimablePool } = useTotalClaimablePool(usersAddress)

  const totalClaimablePoolFormatted = numberWithCommas(totalClaimablePool)
  const formattedBalance = numberWithCommas(usersBalance)
  const formattedTotalSupply = numberWithCommas(totalSupply)

  const tokenAddress = CUSTOM_CONTRACT_ADDRESSES[chainId]?.GovernanceToken
  const { data: tokenInfo } = useCoingeckoTokenInfoQuery(tokenAddress)
  const formattedInCirculation = numberWithCommas(tokenInfo?.market_data?.circulating_supply)

  const openClaimRewards = (e) => {
    closeModal()
  }

  return (
    <Dialog aria-label='POOL Token Details Modal' isOpen={isOpen} onDismiss={closeModal}>
      <div className='text-inverse p-4 bg-card h-full sm:h-auto rounded-none sm:rounded-lg sm:max-w-sm mx-auto flex flex-col'>
        <div className='flex'>
          <button
            className='my-auto ml-auto close-button trans text-inverse hover:opacity-30'
            onClick={closeModal}
          >
            <FeatherIcon icon='x' className='w-6 h-6' />
          </button>
        </div>

        <div className='flex mx-auto'>
          <img src={PoolIcon} className='shadow-xl rounded-full w-28 h-28 spinningCoin' />
          <div className='flex flex-col ml-8 justify-center mr-8 leading-none'>
            <h2>{numberWithCommas(usersBalance)}</h2>
            <span className='font-bold text-accent-1 mt-1'>POOL</span>
          </div>
        </div>

        <div className='bg-body p-4 rounded-lg mt-8'>
          <div className='flex justify-between'>
            <span className='text-accent-1'>{t('balance')}:</span>
            <span className='font-bold'>{formattedBalance}</span>
          </div>

          <div className='flex justify-between'>
            <span className='text-accent-1'>{t('unclaimed')}:</span>
            <span className='font-bold'>{totalClaimablePoolFormatted}</span>
          </div>

          <img src={Squiggle} className='mx-auto my-2' />

          <div className='flex justify-between'>
            <span className='text-accent-1'>{t('inCirculation')}:</span>
            <span className='font-bold'>{formattedInCirculation}</span>
          </div>

          <div className='flex justify-between'>
            <span className='text-accent-1'>{t('totalSupply')}:</span>
            <span className='font-bold'>{formattedTotalSupply}</span>
          </div>
        </div>

        <ButtonLink
          textSize='xxxs'
          onClick={openClaimRewards}
          href='/account#governance-claims'
          as='/account#governance-claims'
          width='w-full'
          className='mt-4'
        >
          {t('claimPool')}
        </ButtonLink>
        <ButtonLink
          textSize='xxxs'
          as='https://sybil.org/#/delegates/pool'
          href='https://sybil.org/#/delegates/pool'
          width='w-full'
          className='mt-4'
        >
          {t('activateVotingPower')}
        </ButtonLink>
      </div>
    </Dialog>
  )
}
