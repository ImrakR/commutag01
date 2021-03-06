import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentPool, useUserTicketsFormattedByPool } from '@pooltogether/hooks'
import { useOnboard } from '@pooltogether/bnc-onboard-hooks'
import { Tooltip } from '@pooltogether/react-components'
import { Trans, useTranslation } from 'react-i18next'

import { STRINGS } from 'lib/constants'
import { AccountTicket } from 'lib/components/AccountTicket'
import { PoolCurrencyIcon } from 'lib/components/PoolCurrencyIcon'
import { WithdrawTicketsForm } from 'lib/components/WithdrawTicketsForm'
import { findActiveSponsorshipFaucet } from 'lib/utils/findSponsorshipFaucet'
import { displayPercentage } from 'lib/utils/displayPercentage'

export function ManageTicketsForm (props) {
  const { nextStep } = props

  const { t } = useTranslation()

  const { address: usersAddress } = useOnboard()

  const [action] = useState(STRINGS.withdraw)

  const router = useRouter()
  const { data: pool } = useCurrentPool(router)
  const { data: playerTickets } = useUserTicketsFormattedByPool(usersAddress)

  if (!pool) return null

  const playerPoolDepositData = playerTickets?.find(
    (playerPoolDepositData) => playerPoolDepositData.poolAddress === pool.prizePool.address
  )

  const sponsorshipFaucet = findActiveSponsorshipFaucet(pool)

  return (
    <>
      {Boolean(sponsorshipFaucet) && (
        <SponsorshipIncentiveMessage pool={pool} tokenFaucet={sponsorshipFaucet} />
      )}

      <div className='pane-title -mt-6'>
        <div className={`leading-tight font-bold text-lg xs:text-3xl text-inverse mb-2`}>
          {t('manageYourTickets')}
        </div>
      </div>

      <div className='mx-auto mt-4 mb-2 w-full'>
        {playerPoolDepositData && (
          <AccountTicket
            noMargin
            cornerBgClassName='bg-darkened'
            key={`account-pool-row-${pool.prizePool.address}`}
            depositData={playerPoolDepositData.ticket}
            pool={playerPoolDepositData.pool}
          />
        )}
      </div>

      {/* <DropdownInputGroup
        id='manage-tickets-action-dropdown'
        label={t('whatWouldYouLikeToDoQuestion')}
        current={action}
        setCurrent={setAction}
        options={{
          [STRINGS.withdraw]: t('withdraw'),
          // [STRINGS.transfer]: t('transfer')
        }}
      /> */}

      {/* {action === STRINGS.transfer && <>
      <h6 className='mt-2 text-inverse'>Transfer feature coming soon ...</h6>
    </>} */}

      {action === STRINGS.withdraw && (
        <>
          {/* <h6 className='text-accent-1 mb-2'>{t('withdraw')}</h6> */}
          <WithdrawTicketsForm
            nextStep={nextStep}
            pool={pool}
            playerPoolDepositData={playerPoolDepositData}
          />
        </>
      )}
    </>
  )
}

export function SponsorshipIncentiveMessage (props) {
  const { t } = useTranslation()

  const { tokenFaucet, pool } = props

  const dripToken = tokenFaucet?.dripToken
  const dripTokenTickerUpcased = dripToken?.symbol.toUpperCase()

  const { apr } = tokenFaucet

  return (
    Boolean(tokenFaucet) && (
      <Link href='/rewards#sponsorship' as='/rewards#sponsorship'>
        <a className='py-3 absolute left-0 sm:left-auto r-0 b-0 mb-24 sm:m-10 z-10 bg-card hover:bg-card-selected sm:rounded-lg trans trans-faster w-full sm:w-1/2 lg:w-1/3'>
          <div className='flex items-center justify-center'>
            <div className='font-inter text-xxxs text-center bg-accent-grey-1 text-highlight-3 rounded-full px-2 uppercase mr-2 font-bold'>
              {t('new')}
            </div>
            <div className='text-base font-bold'>{t('depositSponsorship')}</div>{' '}
            <Tooltip
              isEnabled
              id={`manage-tickets-deposit-as-sponsorship-tooltip`}
              className='ml-2'
              tip={t('sponsorsAreNotEligibleToWinPrizes')}
            />
          </div>
          <p className='text-xxs px-2 sm:px-0'>
            <Trans
              i18nKey='earnAmountAprInTickerByHelpingGrowThePrizePool'
              defaults='Earn <flashy>{{amount}}% APR</flashy> in <tickerImage /> {{ticker}} by helping grow the prize pool'
              values={{
                amount: displayPercentage(apr),
                ticker: dripTokenTickerUpcased
              }}
              components={{
                flashy: <span className='text-flashy mx-1' />,
                tickerImage: (
                  <PoolCurrencyIcon
                    className='inline-block w-3 h-3 ml-1'
                    symbol={dripToken?.symbol}
                    address={dripToken?.address}
                  />
                )
              }}
            />
          </p>
        </a>
      </Link>
    )
  )
}
