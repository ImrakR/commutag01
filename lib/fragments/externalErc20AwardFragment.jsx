import gql from 'graphql-tag'

export const externalErc20AwardFragment = gql`
  fragment externalErc20AwardFragment on ExternalErc20Award {
    id

    address
    balanceAwarded

    name
    symbol
    decimals
  }
`
