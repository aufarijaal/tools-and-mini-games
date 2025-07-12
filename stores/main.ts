import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useMainStore = defineStore('mainStore', () => {
  const tresholdPercentage = useLocalStorage('tresholdPercentage', 3)
  const roundTo = useLocalStorage('roundTo', 'up') // 'up' or 'down'
  const decimalPlaces = useLocalStorage('decimalPlaces', 2) // Number of decimal

  return { tresholdPercentage, roundTo, decimalPlaces }
})
