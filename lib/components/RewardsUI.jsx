import React from 'react'
import Link from 'next/link'
import { useOnboard } from '@pooltogether/bnc-onboard-hooks'
import { useTranslation } from 'react-i18next'
import { PageTitleAndBreadcrumbs } from '@pooltogether/react-components'

import { DeprecatedRewards } from 'lib/components/DeprecatedRewards'
import { RewardsSponsorship, RewardsGovernance } from 'lib/components/RewardsPools'
import { RewardsLPStaking } from 'lib/components/RewardsLPStaking'
import { Meta } from 'lib/components/Meta'

export const RewardsUI = () => {
  const { t } = useTranslation()

  const { address: usersAddress, connectWallet } = useOnboard()

  return (
    <>
      <Meta title={t('rewards')} />

      <PageTitleAndBreadcrumbs Link={Link} title={t('rewards')} breadcrumbs={[]} />

      {!usersAddress && (
        <button
          className='text-green underline mb-8'
          onClick={(e) => {
            e.preventDefault()
            connectWallet(() => {})
          }}
        >
          {t('connectYourWalletToDeposit', 'Connect your wallet to deposit')}
        </button>
      )}

      <RewardsLPStaking />

      <RewardsGovernance />

      <RewardsSponsorship />

      <DeprecatedRewards />
    </>
  )
}
