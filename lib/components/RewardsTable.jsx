import React, { useContext } from 'react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Card } from 'lib/components/Card'
import useScreenSize, { ScreenSize } from 'lib/hooks/useScreenSize'

export const RewardsTable = (props) => {
  const { t } = useTranslation()

  const { children } = props

  const widthClass = props.columnOneWidthClass ?? 'sm:w-48 lg:w-64'

  return (
    <>
      <div className='hidden sm:flex bg-card justify-between rounded-lg px-4 sm:px-8 py-2 mt-5 text-xxs text-accent-1 capitalize'>
        <div className={widthClass}>{t('asset')}</div>
        <div className='w-20 lg:w-32'>APR</div>
        <div className='w-20 lg:w-32 sm:mx-4'>{t('rewards')}</div>

        <div className='w-20 lg:w-32 sm:mx-4'>{t('yourStake')}</div>
        <div className='w-10 lg:w-20'></div>
        <div className='w-20 lg:w-32 sm:mx-4'>{t('wallet')}</div>
      </div>

      {children}
    </>
  )
}

export const RewardsTableRow = (props) => {
  const screenSize = useScreenSize()

  const gradientClasses = {
    'border-b-8-gradient': Boolean(props.gradientBorder),
    'border-uniswap-gradient': Boolean(props.uniswap)
  }

  if (screenSize <= ScreenSize.sm) {
    return (
      <div
        className={classnames(
          'bg-card flex flex-col justify-center items-center rounded-lg py-4 px-4 my-4',
          gradientClasses
        )}
      >
        <div className='flex flex-col items-center text-center rounded-lg w-full py-6'>
          <ColumnOne {...props} />
          <ColumnTwo {...props} />
        </div>
        <RemainingColumns {...props} />
      </div>
    )
  }

  return (
    <Card
      noMargin
      noPad
      className={classnames('flex justify-between items-center py-4 px-8 my-1', gradientClasses)}
    >
      <ColumnOne {...props} />
      <ColumnTwo {...props} />
      <RemainingColumns {...props} />
    </Card>
  )
}

const ColumnOne = (props) => {
  const widthClass = props.columnOneWidthClass ?? 'sm:w-48 lg:w-64'

  return (
    <div className={`${widthClass} sm:pr-1 flex flex-col min-w-max sm:flex-row items-center`}>
      {props.columnOneImage}

      <div className='flex flex-col justify-center my-auto leading-none sm:leading-normal'>
        {props.columnOneContents}
      </div>
    </div>
  )
}

const ColumnTwo = (props) => {
  return <div className='sm:w-20 lg:w-32 text-xl sm:text-lg'>{props.columnTwoContents}</div>
}

const RemainingColumns = (props) => {
  return props.remainingColumnsContents
}

export const RewardsTableCell = (props) => {
  const { label, topContentJsx, centerContentJsx, bottomContentJsx } = props

  return (
    <>
      <div className='w-full flex flex-col sm:w-20 lg:w-32 items-start my-2 sm:mx-4'>
        {label && <h6 className='sm:hidden'>{label}</h6>}
        <div className='w-full sm:h-20 flex sm:flex-col justify-between items-start'>
          <span className='flex sm:inline items-baseline'>
            <span className='text-lg font-bold'>{topContentJsx}</span>
            <div className='flex items-center sm:h-6 ml-2 sm:ml-0'>{centerContentJsx}</div>
          </span>

          {bottomContentJsx}
        </div>
      </div>
    </>
  )
}

export const RewardsTableAprDisplay = (props) => {
  const { apr } = props

  return (
    <>
      <span className='font-bold'>{apr.split('.')?.[0]}</span>.{apr.split('.')?.[1]}%{' '}
      <span className='sm:hidden text-xxs text-accent-1 mt-1 sm:mt-2'>APR</span>
    </>
  )
}
