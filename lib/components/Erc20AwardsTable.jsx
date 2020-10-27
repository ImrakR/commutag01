import React, { Fragment, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { orderBy, sortBy } from 'lodash'

import { TOKEN_IMAGES } from 'lib/constants'
import { useTranslation } from 'lib/../i18n'
import { PoolDataContext } from 'lib/components/contextProviders/PoolDataContextProvider'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'
import { BlankStateMessage } from 'lib/components/BlankStateMessage'
import { PoolNumber } from 'lib/components/PoolNumber'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'
import { numberWithCommas } from 'lib/utils/numberWithCommas'

import GiftIcon from 'assets/images/icon-gift@2x.png'

const Erc20Image = (props) => {
  const src = TOKEN_IMAGES[props.address]

  return src ? <img
    src={src}
    className='inline-block mr-2 w-4 h-4 xs:w-6 xs:h-6 rounded-full'
  /> : <div
    className='inline-block mr-2 bg-black w-4 h-4 xs:w-6 xs:h-6 rounded-full'
  />
}

export const Erc20AwardsTable = (props) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [moreVisible, setMoreVisible] = useState(false)
  
  const { pool } = useContext(PoolDataContext)

  const handleShowMore = (e) => {
    e.preventDefault()

    setMoreVisible(true)

    router.push(
      `/pools/[symbol]#awards-table`,
      `/pools/${pool?.symbol}#awards-table`,
    )
  }



  if (!pool || pool?.externalErc20Awards === null) {
    return null
  }

  const externalAwards = pool?.externalErc20Awards || []
  // const sortedAwards = externalAwards ? sortBy(externalAwards, 'value').reverse() : []
  const sortedAwards = orderBy(externalAwards, ({ value }) => value || '', ['desc'])
  const awards = moreVisible ? sortedAwards : sortedAwards?.slice(0, 5)

  return <>
    <div
      className=''
    >
      {awards.length === 0 && <>
        <BlankStateMessage>
          {t('currentlyNoOtherPrizes')}
        </BlankStateMessage>
      </>}
      
      
      {awards.length > 0 && <>
        <div
          id='awards-table'
          className='non-interactable-card mt-2 sm:mt-10 py-4 sm:py-6 px-4 xs:px-10 bg-card rounded-lg card-min-height-desktop'
        >
          <div className='mt-1'>
            
            <div
              className='text-caption uppercase mb-3'
            >
              <img
                src={GiftIcon}
                className='inline-block mr-2 card-icon'
              /> {t('bonusPrizes')}
            </div>

            
            {pool?.externalAwardsEstimate && <>
              <h3
                className='mb-1'
              >
                ${numberWithCommas(pool?.externalAwardsEstimate)} Value
              </h3>
            </>} 

            <p
              className='mb-6 sm:text-sm'
            >
              {t('otherPrizesDescription')}
            </p>
            
            <div
              className='xs:bg-primary text-inverse flex flex-col justify-between rounded-lg p-0 xs:p-3 sm:p-8 mt-2'
            >
              <h6
                className='text-green text-left ml-2 -mb-2'
              >
                {t('amountTokens', {
                  amount: sortedAwards.length
                })}
              </h6>

              <table
                className='table-fixed w-full text-xxxs xs:text-xxs sm:text-sm mt-6 align-top'
              >
                <tbody>
                  {awards.map(award => {
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
                              award.balance, {
                                precision: 6,
                                decimals: award.decimals
                              }
                            )}
                          </PoolNumber> {award.symbol.length > 20 ? <span className='truncate'>{award.symbol.substr(0, 20)}</span> : award.symbol}
                        </td>
                        <td
                          className='py-2 text-right w-2/12 font-bold'
                        >
                          {award.value ? `$${numberWithCommas(award.value, { precision: 2 })}` : ''}
                        </td>
                      </tr>
                    </Fragment>
                  })}
                </tbody>
              </table>

              <div className='text-center'>
                <motion.button
                  border='none'
                  onClick={handleShowMore}
                  className='mt-6 mb-3 underline font-bold text-base sm:text-lg text-center'
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
            </div>


          </div>
        </div>
        

        
      </>}

    </div>
  </>
}