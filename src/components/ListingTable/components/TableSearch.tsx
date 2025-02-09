import { YBtn, YInput } from "@/components/UI"
import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { Search } from "lucide-react"

export interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function TableSearch({
  value,
  onChange,
  placeholder,
}: TableSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }, [value])

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(inputRef.current?.value || "")
    }
  }

  return (
    <YInput
      ref={inputRef}
      placeholder={placeholder}
      onKeyDown={keyDownHandler}
      containerProps={{ css: containerCss }}
      endButton={
        <YBtn
          css={buttonCss}
          onClick={() => onChange(inputRef.current?.value || "")}
        >
          <Search />
        </YBtn>
      }
    />
  )
}

const containerCss = css`
  margin-right: 1.5rem;
  width: 339px;
`

const buttonCss = css`
  border-radius: 0;
  padding: 10px 12px;
`
