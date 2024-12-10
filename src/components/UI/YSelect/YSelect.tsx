import React, { useId } from "react"
import Select, {
  components,
  ControlProps,
  GroupBase,
  OptionProps,
  Props as SelectProps,
} from "react-select"
import { YInput, YInputProps, YTypography } from "@/components/UI"
import { Spinner } from "react-bootstrap"
import { css } from "@emotion/react"
import { themeColors } from "@/styles/bootstrap/variables"
import { LabelValue, IsHijacked } from "@/types/common"
import { useAccountStore } from "@/store"
import clsx from "clsx"

export type HijackLabelValue = LabelValue & IsHijacked

export interface YSelectProps<
  Option = HijackLabelValue,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends SelectProps<Option, IsMulti, Group> {
  yInputProps: YInputProps
}

export function YSelect<
  Option extends HijackLabelValue = HijackLabelValue,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ yInputProps, ...selectProps }: YSelectProps<Option, IsMulti, Group>) {
  const id = useId()
  const isHijacked = useAccountStore((state) => state.isHijacked)
  return (
    <Select
      isSearchable
      instanceId={id}
      placeholder={""}
      isRtl
      loadingMessage={() => <Spinner size={"sm"} />}
      noOptionsMessage={() => "موردی وجود ندارد"}
      {...selectProps}
      options={selectProps.options?.filter(
        (option) => !(option as HijackLabelValue).isHijacked || isHijacked,
      )}
      styles={{
        ...selectProps.styles,
        control: (baseStyles, props) => ({
          ...baseStyles,
          border: "none",
          minHeight: "100%",
          ...selectProps.styles?.control?.(baseStyles, props),
        }),
        indicatorSeparator: (baseStyles, props) => ({
          ...baseStyles,
          display: "none",
          ...selectProps.styles?.indicatorSeparator?.(baseStyles, props),
        }),
        menu: (baseStyles, props) => ({
          ...baseStyles,
          top: `calc(100% - ${yInputProps.feedbackProps && !selectProps.menuPortalTarget ? 32 : 5}px)`,
          ...selectProps.styles?.menu?.(baseStyles, props),
        }),
        option: (baseStyles, props) => ({
          ...baseStyles,
          transition: "background-color 0.2s",
          padding: 8,
          borderRadius: 8,
          cursor: props.isDisabled ? "not-allowed" : "pointer",
          backgroundColor: props.isSelected
            ? themeColors.primary_200
            : props.isFocused
              ? themeColors.gray_300
              : "transparent",
          "&:active": {
            backgroundColor: themeColors.primary_100,
          },
          ...selectProps.styles?.option?.(baseStyles, props),
        }),
      }}
      components={{
        Control: CustomControl,
        Option: CustomOption,
        ...selectProps.components,
      }}
      //@ts-ignore
      yInputProps={yInputProps}
    />
  )
}

function CustomControl(props: ControlProps<any, any, any>) {
  const yInputProps: YInputProps = (props.selectProps as YSelectProps)
    .yInputProps
  return (
    <YInput
      {...yInputProps}
      containerProps={{
        ...yInputProps.containerProps,
        css: [yInputProps.containerProps?.css, inputContainerCss],
      }}
      customInputNode={
        <div className={"w-100"}>
          <components.Control {...props}>{props.children}</components.Control>
        </div>
      }
    />
  )
}

function CustomOption(props: OptionProps<any, any, any>) {
  const isHijackOption = (props.data as HijackLabelValue)?.isHijacked
  return (
    <div css={optionContainerCss}>
      <components.Option
        {...props}
        className={clsx(props.className, { hijack: isHijackOption })}
      >
        <YTypography variant={"body-medium"}>{props.children}</YTypography>
      </components.Option>
    </div>
  )
}

const inputContainerCss = css`
  & .y-input-container {
    overflow-y: auto;
  }
`

const optionContainerCss = css`
  padding: 8px 0;
  border-bottom: 1px solid ${themeColors.gray_400};

  &:last-child {
    border-bottom: none;
  }
`
