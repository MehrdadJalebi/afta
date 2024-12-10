export interface BaseFilterProps<T extends unknown> {
  value: T
  onChange: (value: T) => void
  title: string
}
