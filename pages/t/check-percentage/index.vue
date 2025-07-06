<script setup lang="ts">
import { ref, computed } from 'vue'

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

const totalNumber = ref(0)
const checkNumber = ref(0)
const thresholdPercentage = ref(3)

const percentage = computed(() => {
  if (totalNumber.value === 0) return 0
  return (checkNumber.value / totalNumber.value) * 100
})

const exceededThreshold = computed(() => {
  return percentage.value > thresholdPercentage.value
})

const numberInThreshold = computed(() => {
  return Math.ceil((thresholdPercentage.value / 100) * totalNumber.value)
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
          <span class="label-text">Percentage (%)</span>
        </label>
        <input type="number" v-model="thresholdPercentage" min="0" max="100" step="0.1" class="input input-bordered"
          placeholder="Enter threshold percentage" />
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
            {{ percentage.toFixed(2) }}%
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
          <span class="font-medium">Quota in {{ thresholdPercentage }}%:</span>
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
