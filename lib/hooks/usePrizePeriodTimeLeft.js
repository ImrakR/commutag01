import { useTimeCountdown } from 'lib/hooks/useTimeCountdown'
import { getSecondsSinceEpoch } from 'lib/utils/getSecondsSinceEpoch'

export const usePrizePeriodTimeLeft = (prizePeriodSeconds, prizePeriodStartedAt) => {
  const prizePeriodDurationInSeconds = prizePeriodSeconds.toNumber()
  const prizePeriodStartedAtInSeconds = prizePeriodStartedAt.toNumber()
  const currentTimeInSeconds = getSecondsSinceEpoch()

  const secondsSinceStartOfPrizePeriod = currentTimeInSeconds - prizePeriodStartedAtInSeconds
  const initialSecondsLeft = prizePeriodDurationInSeconds - secondsSinceStartOfPrizePeriod

  return useTimeCountdown(initialSecondsLeft)
}
