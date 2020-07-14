import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { AuthControllerContextProvider } from 'lib/components/contextProviders/AuthControllerContextProvider'
import { ConfettiContextProvider } from 'lib/components/contextProviders/ConfettiContextProvider'
import { PoolDataContextProvider } from 'lib/components/contextProviders/PoolDataContextProvider'
import { ThemeContextProvider } from 'lib/components/contextProviders/ThemeContextProvider'

const MagicContextProviderDynamic = dynamic(() =>
  import('lib/components/contextProviders/MagicContextProvider').then(mod => mod.MagicContextProvider),
  { ssr: false }
)

const WalletContextProviderDynamic = dynamic(() =>
  import('lib/components/contextProviders/WalletContextProvider').then(mod => mod.WalletContextProvider),
  { ssr: false }
)

export const AllContextProviders = (props) => {
  const { children } = props

  const router = useRouter()
  
  return <>
    <ThemeContextProvider>
      <ConfettiContextProvider>
        <MagicContextProviderDynamic>
          <WalletContextProviderDynamic
            postDisconnectCallback={async () => {
              router.push(
                `${router.pathname}`,
                `${router.asPath}`,
                {
                  shallow: true
                }
              )
            }}
          >
            <AuthControllerContextProvider>
              <PoolDataContextProvider>
                {children}
              </PoolDataContextProvider>
            </AuthControllerContextProvider>
          </WalletContextProviderDynamic>
        </MagicContextProviderDynamic>
      </ConfettiContextProvider>
    </ThemeContextProvider>
  </>
}
