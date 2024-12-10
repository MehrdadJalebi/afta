import { useMedia } from "react-use"

import { themeVariables } from "src/styles/bootstrap/variables"

export function useDisplay() {
  const smAndDown = useMedia(
    `(max-width: ${themeVariables.breakpoints.md})`,
    false,
  )
  const mdAndDown = useMedia(
    `(max-width: ${themeVariables.breakpoints.lg})`,
    false,
  )
  const lgAndDown = useMedia(
    `(max-width: ${themeVariables.breakpoints.xl})`,
    true,
  )

  return { smAndDown, mdAndDown, lgAndDown }
}
