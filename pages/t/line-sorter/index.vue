<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
    title: 'Line Sorter',
    meta: [
        { name: 'description', content: 'Sort lines of text in ascending or descending order.' },
        { property: 'og:title', content: 'Line Sorter' },
        { property: 'og:description', content: 'Sort lines of text in ascending or descending order.' },
        { property: 'og:type', content: 'website' }
    ]
})

const inputText = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const treatAsNumber = ref(false)

const isAllNumbers = computed(() => {
    const lines = inputText.value.split(/\r?\n/).filter(l => l.trim() !== '')
    return lines.length > 0 && lines.every(line => /^-?\d+(\.\d+)?$/.test(line.trim()))
})

const outputText = computed(() => {
    let lines = inputText.value.split(/\r?\n/)
    if (treatAsNumber.value && isAllNumbers.value) {
        lines = lines.sort((a, b) => {
            const na = parseFloat(a)
            const nb = parseFloat(b)
            return sortOrder.value === 'asc' ? na - nb : nb - na
        })
    } else {
        lines = lines.sort((a, b) => {
            return sortOrder.value === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
        })
    }
    return lines.join('\n')
})

function copyToClipboard() {
    navigator.clipboard.writeText(outputText.value)
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">
            ← Back to Main Menu
        </NuxtLink>
        <h1 class="text-3xl font-bold mb-8 text-center">Line Sorter</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="card bg-base-100 shadow-md border border-base-200">
                    <div class="card-body">
                        <label class="font-semibold mb-2">Original Text</label>
                        <textarea v-model="inputText" rows="14" class="textarea textarea-bordered w-full mb-4"
                            placeholder="Paste your text here..."></textarea>
                        <div class="flex flex-wrap gap-4 items-center">
                            <span class="font-semibold">Sort Order:</span>
                            <label class="cursor-pointer flex items-center gap-1">
                                <input type="radio" value="asc" v-model="sortOrder" class="radio radio-primary" />
                                Ascending
                            </label>
                            <label class="cursor-pointer flex items-center gap-1">
                                <input type="radio" value="desc" v-model="sortOrder" class="radio radio-primary" />
                                Descending
                            </label>
                            <label v-if="isAllNumbers" class="cursor-pointer flex items-center gap-1 ml-2">
                                <input type="checkbox" v-model="treatAsNumber" class="checkbox checkbox-primary" />
                                Treat as numbers
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="card bg-base-100 shadow-md border border-base-200 h-full flex flex-col">
                    <div class="card-body flex flex-col flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-semibold">Modified Text</label>
                            <button @click="copyToClipboard" class="btn btn-sm btn-primary">Copy</button>
                        </div>
                        <textarea :value="outputText" rows="14"
                            class="textarea textarea-bordered w-full bg-base-200 flex-1 resize-none"
                            readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
