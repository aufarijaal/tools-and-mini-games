<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '~/stores/main'

useHead({
  title: 'Percentage Checker Tool',
  meta: [
    {
      name: 'description',
      content:
        'A tool to check if a number exceeds a certain percentage of a total.'
    }
  ]
})

const store = useMainStore()
const totalNumber = ref(0)
const checkNumber = ref(0)

const percentage = computed(() => {
  if (totalNumber.value === 0) return 0
  const raw = (checkNumber.value / totalNumber.value) * 100
  const factor = Math.pow(10, store.decimalPlaces)
  let rounded = raw
  if (store.roundTo === 'up') {
    rounded = Math.ceil(raw * factor) / factor
  } else {
    rounded = Math.floor(raw * factor) / factor
  }
  return rounded
})

const exceededThreshold = computed(() => {
  return percentage.value > store.tresholdPercentage
})

const numberInThreshold = computed(() => {
  const raw = (store.tresholdPercentage / 100) * totalNumber.value
  const factor = Math.pow(10, store.decimalPlaces)
  let rounded = raw
  if (store.roundTo === 'up') {
    rounded = Math.ceil(raw * factor) / factor
  } else {
    rounded = Math.floor(raw * factor) / factor
  }
  return rounded
})

const numberLeft = computed(() => {
  return Math.max(0, numberInThreshold.value - checkNumber.value)
})
</script>

<template>
  <div id="check-percentage-tool" class="max-w-2xl mx-auto p-6 space-y-6">
    <!-- Link to go back in menu -->
    <NuxtLink to="/" class="text-blue-500 hover:underline mb-4">
      ← Back to Main Menu
    </NuxtLink>

    <h1 class="text-3xl font-bold mb-6 text-center">Percentage Checker Tool</h1>

    <div class="mb-4 p-4 rounded-lg bg-info/10 border border-info text-info text-base">
      <span class="font-semibold">Info:</span>
      This tool helps you check if a production PO quantity for shoes (in pairs) has exceeded a certain percentage
      threshold. Enter the total PO quantity and the number of replenishments to see if the threshold is exceeded.
    </div>

    <div class="space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Total Number</span>
        </label>
        <input type="number" v-model="totalNumber" min="0" class="input input-bordered"
          placeholder="Enter total number" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Number to Check</span>
        </label>
        <input type="number" v-model="checkNumber" min="0" :max="totalNumber" class="input input-bordered"
          placeholder="Enter number to check" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Threshold Percentage (%)</span>
        </label>
        <input type="number" v-model="store.tresholdPercentage" min="0" max="100" step="0.1"
          class="input input-bordered" placeholder="Enter threshold percentage" />
      </div>

      <div class="form-control flex flex-col md:flex-row gap-4">
        <div>
          <label class="label">
            <span class="label-text">Decimal Places</span>
          </label>
          <input type="number" v-model="store.decimalPlaces" min="0" max="10" class="input input-bordered w-32" />
        </div>
        <div>
          <label class="label">
            <span class="label-text">Rounding</span>
          </label>
          <div class="flex gap-4 items-center">
            <label class="cursor-pointer flex items-center gap-1">
              <input type="radio" value="up" v-model="store.roundTo" class="radio radio-primary" /> Up
            </label>
            <label class="cursor-pointer flex items-center gap-1">
              <input type="radio" value="down" v-model="store.roundTo" class="radio radio-primary" /> Down
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-md mt-6">
      <div class="card-body space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-medium">Current Percentage:</span>
          <span :class="exceededThreshold
            ? 'text-error font-bold'
            : 'text-success font-bold'
            ">
            {{ percentage }}%
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-medium">Status:</span>
          <span :class="exceededThreshold
            ? 'text-error font-bold'
            : 'text-success font-bold'
            ">
            {{ exceededThreshold ? 'Exceeded Threshold' : 'Within Threshold' }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-medium">Quota in {{ store.tresholdPercentage }}%:</span>
          <span>{{ numberInThreshold }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-medium">Remaining:</span>
          <span>{{ numberLeft }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
