/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSystem, defaultConfig } from "@chakra-ui/react"

const { globalCss: _, ...restConfig } = defaultConfig
export const system = createSystem(restConfig)