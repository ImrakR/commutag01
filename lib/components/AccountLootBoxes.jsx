import React, { useContext } from 'react'

import { useTranslation } from 'lib/../i18n'
import { AuthControllerContext } from 'lib/components/contextProviders/AuthControllerContextProvider'
import { PoolDataContext } from 'lib/components/contextProviders/PoolDataContextProvider'
import { PoolNumber } from 'lib/components/PoolNumber'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'
import { testAddress } from 'lib/utils/testAddress'

import IconTarget from 'assets/images/icon-target@2x.png'

export const AccountLootBoxes = () => {
  const { t } = useTranslation()
  
  const { chainId, pauseQueries, usersAddress } = useContext(AuthControllerContext)
  const { pools } = useContext(PoolDataContext)

  const playerAddressError = testAddress(usersAddress)

  // could query to get all the prizes this account has won, then iterate through each
  // prize to see if it matches any of our ptloot nft addresses
  //
  // prizes(
  //   orderBy: id,
  //   orderDirection: desc,
  //   where: {
  //   winners_contains: ["0x8f7f92e0660dd92eca1fad5f285c4dca556e433e"]
  // }
  // ) {
  //   winners
  //   awardedExternalErc721Nfts {
  //     id
  //     address
  //     tokenIds
  //   }
  // }

  return <>
    <h5
      className='font-normal text-accent-2 mt-16 mb-4'
    >
      {t('myLootBoxes')}
    </h5>

    <div
      className='xs:mt-3 bg-accent-grey-4 rounded-lg xs:mx-0 px-2 sm:px-6 py-3'
    >
      <div className='flex justify-between flex-col xs:flex-row xs:pt-4 pb-0 px-2 xs:px-4'>

        <div className='flex-col order-2 xs:order-1'>
          <h6
            className='flex items-center font-normal'
          >
            {t('allTimeWinnings')}
          </h6>

          <h3>
            $<PoolNumber>
              {displayAmountInEther(totalWinnings(), { precision: 2 })}
            </PoolNumber>
          </h3>
        </div>

        <div
          className='order-1 xs:order-2 ml-auto'
        >
          <img
            src={IconTarget}
            className='w-24 h-24 mx-auto'
          />
        </div>
      </div>
    </div>
  </>
}