import React from 'react'
import classnames from 'classnames'
import CircleLoader from 'react-spinners/CircleLoader'
import { isUndefined } from 'lodash'

import DaiSvg from 'assets/images/dai-new-transparent.png'
// import WbtcSvg from 'assets/images/wbtc-new-transparent.png'
// import UsdcSvg from 'assets/images/usdc-new-transparent.png'
// import UsdtSvg from 'assets/images/usdt-new-transparent.png'
// import ZrxSvg from 'assets/images/zrx-new-transparent.png'
import BatSvg from 'assets/images/bat-new-transparent.png'
import UniSvg from 'assets/images/token-uni.png'
import MissingCurrencySvg from 'assets/images/activity.svg'

export const PoolCurrencyIcon = (
  props,
) => {
  const {
    className,
    noMediaQueries,
    sm,
    lg,
    xl,
    xs,
    pool
  } = props
  
  const noMargin = props.noMargin || false
  const symbol = pool?.underlyingCollateralSymbol?.toLowerCase()

  let iconMissing
  let currencyIcon
  if (symbol === 'dai') {
    currencyIcon = DaiSvg
  // } else if (symbol === 'usdc') {
  //   currencyIcon = UsdcSvg
  // } else if (symbol === 'usdt') {
  //   currencyIcon = UsdtSvg
  // } else if (symbol === 'wbtc') {
  //   currencyIcon = WbtcSvg
  // } else if (symbol === 'zrx') {
  //   currencyIcon = ZrxSvg
  } else if (symbol === 'bat') {
    currencyIcon = BatSvg
  } else if (symbol === 'uni') {
    currencyIcon = UniSvg
  } else {
    iconMissing = true
  }

  let sizeClasses = 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'
  if (isUndefined(noMediaQueries)) {
    if (xs) {
      sizeClasses = 'w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
    } else if (sm) {
      sizeClasses = 'w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8'
    } else if (lg) {
      sizeClasses = 'w-8 h-8 sm:w-14 sm:h-14'
    } else if (xl) {
      sizeClasses = 'w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18'
    }
  } else {
    sizeClasses = 'w-8 h-8'
  }

  const classes = classnames(
    sizeClasses,
    {
      [className]: className,
      'inline-block': !className,
      'mr-1': !noMargin,
    }
  )

  return <>
    {iconMissing ? <>
      <div
        className={`${classes} scale-80 text-center`}
      >
        <CircleLoader
          color='rgba(255,255,255,0.3)'
        />
      </div>
    </> : <>
      <img
        src={currencyIcon}
        className={classes}
      />
    </>}
  </>
}
