import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

import { PaneTitle } from 'lib/components/PaneTitle'

export const DepositWizardLayout = (props) => {
  const { currentWizardStep, children, handlePreviousStep } = props
  console.log('wtf', currentWizardStep)
  
  const router = useRouter()

  const handleCloseDeposit = () => {
    const pathname = router.pathname.split('/deposit').shift()
    const asPath = router.asPath.split('/deposit').shift()

    router.push(
      `${pathname}`,
      `${asPath}`,
      {
        shallow: true
      }
    )
  }

  // const currentWizardStep = 1
  const disabled = currentWizardStep <= 1

  return <>
    <AnimatePresence>
      <motion.div
        key='deposit-scaled-bg'
        className='fixed t-0 l-0 r-0 b-0 w-full h-full z-40 bg-darkened'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        key='deposit-pane'
        className='fixed t-0 l-0 r-0 b-0 w-full h-full z-40'
      >
        <nav
          className='fixed t-0 l-0 r-0 w-full px-4 pt-4 flex items-start justify-between flex-wrap h-20'
        >
          <button
            disabled={disabled}
            type='button'
            onClick={handlePreviousStep}
            className={classnames(
              'text-primary trans',
              {
                'hover:text-secondary': !disabled
              }
            )}
          >
            <FeatherIcon
              icon='arrow-left-circle'
              className='w-8 h-8 sm:w-16 sm:h-16'
            />
          </button>
          <PaneTitle>
            {currentWizardStep}
          </PaneTitle>
          <button
            type='button'
            onClick={handleCloseDeposit}
            className='text-primary hover:text-secondary trans'
          >
            <FeatherIcon
              icon='x-circle'
              className='w-8 h-8 sm:w-16 sm:h-16'
            />
          </button>
        </nav>

        {/* {props.usersChainValues.usersTokenAllowance.gt(0) ?
          <DepositUI
            {...props}
          /> :
          <UnlockDepositUI
            {...props}
          />
        }
        */}
        <div className='h-full flex flex-col justify-center px-4 sm:px-32 lg:px-64 text-center'>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  </>
}
