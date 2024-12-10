import React, { useEffect, useMemo } from "react"
import { InputProps } from "./types"

const SingleInput = ({
  index,
  refs,
  setValue,
  value,
  pinCount,
  isFilledArray,
}: InputProps) => {
  const isFilled = useMemo<boolean>(() => !!value, [value])

  const firstEmptyIndex = isFilledArray.findIndex((isFilled) => !isFilled)
  const lastFilledIndex = isFilledArray.lastIndexOf(true)

  useEffect(() => {
    refs.current[0].focus()
  }, [])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toString()
    let nextFocusIndex: number | null = null
    if (value.length === 1) {
      nextFocusIndex = index + 1 < pinCount ? index + 1 : index
    } else if (value.length > 1) {
      if (isFilled) {
        value = value.slice(1)
      }
      nextFocusIndex = Math.min(pinCount - 1, value.length + index)
    }
    setValue(value)
    if (nextFocusIndex !== null) {
      refs.current[nextFocusIndex].focus()
    }
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (isFilled) {
        setValue("")
      } else {
        refs.current[index > 0 ? index - 1 : index].focus()
      }
    } else if (e.key === "ArrowRight" && index < lastFilledIndex) {
      refs.current[index + 1].focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1].focus()
    } else if (e.key === "End" && lastFilledIndex !== -1) {
      refs.current[lastFilledIndex].focus()
    } else if (e.key === "Home") {
      refs.current[0].focus()
    }
  }

  const clickHandler = () => {
    if (index > firstEmptyIndex && firstEmptyIndex !== -1) {
      refs.current[firstEmptyIndex].focus()
    }
  }

  const focusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.type = "text"
    const valueLength = e.target.value.length
    e.target.setSelectionRange(valueLength, valueLength)
    e.target.type = "number"
  }

  return (
    <input
      className={"otp-input__input"}
      autoFocus={index === 0}
      ref={(el: HTMLInputElement) => {
        refs.current[index] = el
      }}
      type="number"
      value={value}
      onKeyDown={keyDownHandler}
      onChange={changeHandler}
      onClick={clickHandler}
      onFocus={focusHandler}
    />
  )
}

export default SingleInput
