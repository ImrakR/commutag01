import React from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import FeatherIcon from 'feather-icons-react'
import { AnimatePresence, motion } from 'framer-motion'

import { ButtonLink } from 'lib/components/ButtonLink'
import { PoolCurrencyIcon } from 'lib/components/PoolCurrencyIcon'
import { NewPrizeCountdown } from 'lib/components/NewPrizeCountdown'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

export const PoolRow = (
  props,
) => {
  const {
    pool,
    selected,
  } = props

  const router = useRouter()

  if (!pool || !pool.symbol) {
    return null
  }

  const symbol = pool.symbol
  const decimals = pool?.underlyingCollateralDecimals

  return <>
    <AnimatePresence>
        <motion.div
          onClick={(e) => {
            e.preventDefault()

            router.push(
              '/pools/[symbol]',
              `/pools/${symbol}`,
              { shallow: true }
            )
          }}
          animate
          className={classnames(
            'bg-card hover:bg-card-selected border-card w-full px-4 mb-3 py-5 inline-block trans rounded-lg border-0 text-inverse hover:text-inverse',
            {
              'border border-card shadow-md hover:shadow-xl cursor-pointer': !selected,
              'border border-card border-dashed': selected,
            }
          )}
          style={{
            minHeight: 120
          }}
        >
          <div className='flex items-center'>
            <div
              className='flex items-center font-bold w-8/12 sm:w-3/12 lg:w-3/12'
            >
              <PoolCurrencyIcon
                lg
                pool={pool}
              />
              <div className='inline-flex flex flex-col'>
                <h6
                  className='inline-block'
                  style={{
                    marginTop: -2
                  }}
                >
                  <span
                    className='text-inverse'
                  >
                    Prize ${displayAmountInEther(
                      pool?.estimatePrize,
                      { decimals, precision: 0 }
                    )}
                  </span>
                </h6>
                <span className='text-caption font-number uppercase -mt-1'>
                  {pool.frequency}
                </span>
              </div>
            </div>

            <div
              className='flex flex-col items-end w-4/12 sm:w-9/12 lg:w-9/12'
            >
              <NewPrizeCountdown
                pool={pool}
              />
            </div>
{/*}
            <div
              className='flex items-center w-1/12 justify-end'
            >
              <FeatherIcon
                icon='arrow-right-circle'
                className='stroke-current w-6 h-6 sm:w-8 sm:h-8'
              />
            </div> */}
          </div>

          <div
            className='mt-5 flex items-end justify-between'
          >
            <div
              className='w-7/12 sm:w-4/12 lg:w-6/12 pr-2'
            >
              <ButtonLink
                border='highlight-1'
                text='secondary'
                bg='highlight-1'
                hoverBorder='highlight-2'
                hoverText='green'
                hoverBg='purple'
                width='w-full'
                textSize='lg'
                href='/pools/[symbol]/deposit'
                as={`/pools/${pool.symbol}/deposit`}
              >
                Get tickets
              </ButtonLink>
            </div>

            <div
              className='w-2/12 text-right'
              style={{
                lineHeight: 1.2,
              }}
            >
              <ButtonLink
                border='highlight-1 border-2'
                text='highlight-1'
                bg='primary'
                hoverBorder='highlight-2'
                hoverText='highlight-2'
                hoverBg='primary'
                padding='pl-2 pr-0 py-2 sm:py-2'
                width='w-10 h-10 lg:w-12 lg:h-12'
                className='inline-flex items-center justify-center'

                rounded='full'
                href='/pools/[symbol]'
                as={`/pools/${pool.symbol}`}
                
              >
                <FeatherIcon
                  strokeWidth='2'
                  icon='arrow-right'
                  className='relative w-7 h-7 mx-auto'
                  style={{
                    left: -4
                  }}
                />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  </>
}
