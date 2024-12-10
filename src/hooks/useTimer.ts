import { useState, useEffect, useRef, useCallback } from "react"

type TimerProps = {
  startValue: number
  endValue?: number
  intervalSecond?: number
  onFinish?: () => void
  startOnMount?: boolean
}

export type UseTimerReturn = {
  value: number
  isFinished: boolean
  start: () => void
  pause: () => void
  restart: (startValue?: number) => void
  stop: () => void
}
/**
 * receives three values and a callback
 * @param {number} startValue starts the timer from this value
 * @param {number} endValue continues countdown until it reaches 0
 * @param {number} intervalSecond interval between times
 * @param {Function} onFinish a callback that will be called when timer reaches `endValue`
 * @param {boolean} startOnMount will call `timer.start` if true is passed
 * @example ```js
 * const [timerFinish, setTimerFinish] = useState(false)
 * const timer = useTimer({startValue: 60, endValue: 0, intervalSecond: 1, onFinish: () => {}})
 * timer.start() // call it to start the timer
 * timer.pause() // call it to pause the timer
 * timer.stop() // call it to stop the timer. difference between stop and pause is that stop will reset value to `startValue` and pause at the same time
 * timer.restart(120) // reset the timer to an optional value. If the value is not passed, `startValue` will be used instead
 * ```
 * @returns {UseTimerReturn}
 */
export const useTimer = ({
  startValue,
  endValue = 0,
  intervalSecond = 1,
  onFinish,
  startOnMount,
}: TimerProps): UseTimerReturn => {
  const [timerValue, setTimerValue] = useState<number>(startValue)
  const [isFinished, setIsFinished] = useState(false)
  const interval = useRef<NodeJS.Timeout>()

  const clearIntervalRef = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = undefined
    }
  }, [])

  const start = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setTimerValue((timer) => {
          return timer - intervalSecond
        })
      }, intervalSecond * 1000)
    }
  }

  const pause = useCallback(() => {
    clearIntervalRef()
  }, [clearIntervalRef])

  const stop = useCallback(() => {
    clearIntervalRef()
    setTimerValue(startValue)
  }, [setTimerValue, startValue, clearIntervalRef])

  const restart = useCallback(
    (startValueArg?: number) => {
      setIsFinished(false)
      clearIntervalRef()
      setTimerValue(startValueArg ?? startValue)
      start()
    },
    [setIsFinished, clearIntervalRef, setTimerValue, startValue, start],
  )

  useEffect(() => {
    if (startOnMount) start()
    return clearIntervalRef
  }, [startOnMount, clearIntervalRef])

  useEffect(() => {
    if (timerValue <= endValue) {
      onFinish?.()
      setIsFinished(true)
      clearIntervalRef()
    }
  }, [timerValue, endValue, onFinish, setIsFinished, clearIntervalRef])

  return {
    value: timerValue,
    start,
    pause,
    restart,
    stop,
    isFinished,
  }
}
