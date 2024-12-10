import { memo, useEffect, useMemo, useRef } from "react"
import { OTPInputProps } from "./types"
import SingleInput from "./Input"
import "./styles.scss"

const OTPInput = ({ pinCount, value, setOTPValue }: OTPInputProps) => {
  const refs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (!value) {
      refs.current?.[0]?.focus?.()
    }
  }, [value])

  const isFilledArray = useMemo<boolean[]>(
    () => Array.from({ length: pinCount }).map((_, i) => !!value[i]),
    [value, pinCount],
  )

  return (
    <div className={"otp-input__container"}>
      {Array.from({ length: pinCount }).map((_, i) => (
        <SingleInput
          key={i}
          pinCount={pinCount}
          refs={refs}
          index={i}
          value={value[i] || ""}
          isFilledArray={isFilledArray}
          setValue={(val) => {
            const final =
              value.slice(0, i) + val + value.slice(i + Math.max(val.length, 1))
            setOTPValue(final)
          }}
        />
      ))}
    </div>
  )
}

export default memo(OTPInput)
