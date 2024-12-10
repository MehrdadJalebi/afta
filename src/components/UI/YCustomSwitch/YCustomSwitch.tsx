import { css } from "@emotion/react"

export interface YCustomSwitchProps {
  className?: string
  toggleItems: [string, string]
  onChange?: () => void
}

export const YCustomSwitch = ({
  className,
  toggleItems,
  onChange,
}: YCustomSwitchProps) => {
  return (
    <button
      css={toggleCss}
      type="button"
      data-toggle="button"
      aria-pressed="true"
      onChange={onChange}
    >
      <div className="handle"></div>
    </button>
  )
}

const toggleCss = css`
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #6b7381;
  background: #29b5a8;
  margin: 0 4rem;
  padding: 0;
  position: relative;
  border: none;
  height: 2.5rem;
  width: 2.5rem * 2;
  border-radius: 2.5rem;
  transition: background-color 0.25s;

  &:focus,
  &.focus {
    outline: none;
  }

  &:before,
  &:after {
    line-height: calc(2.5rem - 2px);
    color: #fff;
    left: 2.5rem * 0.275;
    width: 4rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    transition: opacity 0.25s;
  }
  &:before {
    content: "Off";
    left: -4rem;
    opacity: 0;
    text-align: right;
  }
  &:after {
    content: "On";
    right: -4rem;
    text-align: left;
    opacity: 1;
  }

  > .handle {
    position: absolute;
    top: (2.5rem * 0.25) / 2;
    width: 2.5rem * 0.75;
    height: 2.5rem * 0.75;
    border-radius: 2.5rem * 0.75;
    background: #fff;
    left: 2.5rem + ((2.5rem * 0.25) / 2);
    transition: left 0.25s;
  }
`
