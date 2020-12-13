import React, { Fragment, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { orderBy } from 'lodash'

import { useTranslation } from 'lib/../i18n'
import { ContributeToLootBoxDropdown } from 'lib/components/ContributeToLootBoxDropdown'
import { AuthControllerContext } from 'lib/components/contextProviders/AuthControllerContextProvider'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'
import { PoolNumber } from 'lib/components/PoolNumber'
import { Erc20Image } from 'lib/components/Erc20Image'
import { LootBoxValue } from 'lib/components/LootBoxValue'
import { useUniswapTokensQuery } from 'lib/hooks/useUniswapTokensQuery'
import { useGraphLootBoxQuery } from 'lib/hooks/useGraphLootBoxQuery'
import { compileLootBoxErc20s } from 'lib/services/compileLootBoxErc20s'
import { getCurrentLootBox } from 'lib/services/getCurrentLootBox'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'
import { numberWithCommas } from 'lib/utils/numberWithCommas'

import GiftIcon from 'assets/images/icon-gift@2x.png'

export const LootBoxTable = (props) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { basePath, historical, pool, prize } = props
  
  const { chainId } = useContext(AuthControllerContext)

  const [moreVisible, setMoreVisible] = useState(false)

  const blockNumber = prize?.awardedBlock ? parseInt(prize?.awardedBlock, 10) : -1
  
  let lootBox,
    lootBoxAddress,
    tokenId
  if (historical) {
    let erc721Awards = pool?.compiledExternalErc721Awards || {}
    erc721Awards = Object.keys(erc721Awards)
      .map(key => erc721Awards[key])
      
    const awardedLootBox = erc721Awards?.find(award => award.name === 'PTLootBox')
    
    lootBoxAddress = awardedLootBox?.address
    tokenId = awardedLootBox?.tokenIds?.[0]
  } else {
    const result = getCurrentLootBox(pool, chainId)
    lootBoxAddress = result.lootBoxAddress
    tokenId = result.tokenId
  }

  const { data: graphLootBoxData } = useGraphLootBoxQuery(lootBoxAddress, tokenId, blockNumber)
  // console.log(graphLootBoxData)
  lootBox = graphLootBoxData?.lootBoxes?.[0]
  

  const balanceProperty = 'balance'
  // const balanceProperty = historical ? 'balanceAwardedBN' : 'balance'

  // const { erc20s } = props
  let erc20Balances = lootBox?.erc20Balances || {}
  erc20Balances = Object.keys(erc20Balances)
    .map(key => erc20Balances[key])
    .filter(award => Number(award?.[balanceProperty]) > 0)

  const addresses = erc20Balances ?
    erc20Balances
      .map(erc20Balance => erc20Balance.erc20Entity.id) :
    []

  const { data, isFetching } = useUniswapTokensQuery(
    addresses,
    blockNumber
  )
  const uniswapPriceData = data

  const compiledErc20s = compileLootBoxErc20s(erc20Balances, uniswapPriceData)

  if (!lootBox) {
    return null
  }

  const sortedAwards = orderBy(compiledErc20s, ({ value }) => value || '', ['desc'])
  const awards = moreVisible ? sortedAwards : sortedAwards?.slice(0, 5)


  const handleShowMore = (e) => {
    e.preventDefault()

    setMoreVisible(true)

    router.push(
      `${basePath}#loot-box-table`,
    )
  }

  return <>
    <div
      id='loot-box-table'
      className='non-interactable-card mt-2 sm:mt-10 py-4 sm:py-6 px-4 xs:px-4 sm:px-10 bg-card rounded-lg card-min-height-desktop'
    >
      <div
        className='text-caption uppercase mb-3'
      >
        <img
          src={GiftIcon}
          className='inline-block mr-2 card-icon'
        /> {t('lootBox')}
      </div>

      <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
        <div>
          {awards.length === 0 ? <>
            {historical ? t('noOtherPrizesAwarded') : t('currentlyNoOtherPrizes')}
          </> : <>
            <LootBoxValue
              compiledErc20s={compiledErc20s}
            />
          </>}
        </div>

        <div>
          {!historical && <>
            <ContributeToLootBoxDropdown
              pool={pool}
            />
          </>}
        </div>
      </div> 
      
      {awards.length > 0 && <>
        <div
          className='xs:bg-primary theme-light--no-padding text-inverse flex flex-col justify-between rounded-lg p-0 xs:p-3 sm:px-8 mt-4'
        >
          <table
            className='table-fixed w-full text-xxxs xs:text-xxs sm:text-sm align-top'
          >
            <thead>
              <tr
                style={{ background: 'none' }}
              >
                <th
                  className='w-6/12'
                >
                  <h6
                    className='text-green text-left'
                  >
                    {t('amountTokens', {
                      amount: sortedAwards.length
                    })}
                  </h6>
                </th>
                <th
                  className='w-4/12'
                ></th>
                <th
                  className='w-2/12 sm:w-1/12'
                ></th>
              </tr>
            </thead>
            <tbody>
              {awards.map(award => {
                if (!award.name) {
                  return
                }

                return <Fragment
                  key={award.address}
                >
                  <tr>
                    <td
                      className='flex items-center py-2 text-left font-bold'
                    >
                      <Erc20Image
                        address={award.address}
                      /> <EtherscanAddressLink
                        address={award.address}
                        className='text-inverse'
                      >
                        {award.name.length > 20 ? <span className='truncate'>{award.name.substr(0, 20)}</span> : award.name}
                      </EtherscanAddressLink>
                    </td>
                    <td
                      className='px-2 sm:px-3 py-2 text-left text-accent-1 truncate'
                    >
                      <PoolNumber>
                        {displayAmountInEther(
                          award[balanceProperty], {
                            precision: 6,
                            decimals: award.decimals
                          }
                        )}
                      </PoolNumber> {award.symbol.length > 20 ? <span className='truncate'>{award.symbol.substr(0, 20)}</span> : award.symbol}
                    </td>
                    <td
                      className='py-2 font-bold'
                    >
                      {award.value ? `$${numberWithCommas(award.value, { precision: 2 })}` : ''}
                    </td>
                  </tr>
                </Fragment>
              })}
            </tbody>
          </table>

          {erc20Balances.length > 5 && <>
            <div className='text-center'>
              <motion.button
                border='none'
                onClick={handleShowMore}
                className='mt-6 mb-3 underline font-bold text-xxs xs:text-base sm:text-lg text-center'
                animate={moreVisible ? 'exit' : 'enter'}
                initial='enter'
                variants={{
                  enter: {
                    opacity: 1,
                    y: 0,
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                  }
                }}
              >
                {t('showMore')}
              </motion.button>
            </div>
          </>}
        </div>


      </>}

    </div>
  </>
}