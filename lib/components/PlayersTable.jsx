import React from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useTable } from 'react-table'

import { useTranslation } from 'lib/../i18n'
import { BasicTable } from 'lib/components/BasicTable'
import { Odds } from 'lib/components/Odds'
import { numberWithCommas } from 'lib/utils/numberWithCommas'
import { shorten } from 'lib/utils/shorten'

const playerLink = (t, player) => {
  return <Link
    href='/players/[playerAddress]'
    as={`/players/${player.address}`}
    shallow
  >
    <a
      className='trans'
    >
      {t('viewPlayerInfo')}
    </a>
  </Link>
}

const formatPlayerObject = (t, pool, player, winners) => {
  const decimals = pool.underlyingCollateralDecimals
  const balance = player.balance && decimals ?
    ethers.utils.formatUnits(
      player.balance,
      Number(decimals)
    ) : ethers.utils.bigNumberify(0)

  const isWinner = winners?.includes(player.address)

  const address = <>
    {shorten(player.address)} {isWinner && <span
      className='text-flashy font-bold'
    >
      {t('winner')}
    </span>}
  </>
  
  return {
    balance: `${numberWithCommas(
      balance.toString(),
      { precision: 2 }
    )}`,
    address,
    odds: <Odds
      timeTravelTicketSupply={pool.ticketSupply}
      pool={pool}
      usersBalance={balance}
    />,
    view: playerLink(t, player)
  }
}

export const PlayersTable = (
  props,
) => {
  const { t } = useTranslation()

  let players = []
  if (props.players) {
    players = props.players
  }

  const { pool, prize } = props

  const columns = React.useMemo(() => {
    return [
      {
        Header: t('address'),
        accessor: 'address',
      },
      {
        Header: t('tickets'),
        accessor: 'balance', // accessor is the "key" in the data
      },
      {
        Header: t('odds'),
        accessor: 'odds',
      },
      {
        Header: '',
        accessor: 'view',
        Cell: row => <div style={{ textAlign: 'right' }}>{row.value}</div>
      },
    ]
  }, [] )

  // const winners = prize?.winners
  const winners = [
    '0x8f7f92e0660dd92eca1fad5f285c4dca556e433e',
    '0xa5c3a513645a9a00cb561fed40438e9dfe0d6a69',
    '0x7c738364fea236198dc71c88302d633eb6ad31c1']

  let data = React.useMemo(() => {
    return players.map(player => {
      return formatPlayerObject(
        t,
        pool,
        player,
        winners
      )
    })
  }, [players, pool, pool?.ticketSupply])

  const tableInstance = useTable({
    columns,
    data
  })

  if (!players || players?.length === 0) {
    return null
  }

  return <BasicTable
    {...props}
    tableInstance={tableInstance}
  />

}
