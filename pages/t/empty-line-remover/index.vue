<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
    title: 'Empty Line Remover',
    meta: [
        { name: 'description', content: 'Remove empty lines from your text input.' },
        { property: 'og:title', content: 'Empty Line Remover' },
        { property: 'og:description', content: 'Remove empty lines from your text input.' },
        { property: 'og:type', content: 'website' }
    ]
})

const inputText = ref('')
const outputText = computed(() => {
    return inputText.value
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .join('\n')
})

function copyToClipboard() {
    navigator.clipboard.writeText(outputText.value)
}
</script>

<template>
    <div class="max-w-7xl mx-auto p-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline mb-4 block">
            ← Back to Main Menu
        </NuxtLink>
        <h1 class="text-2xl font-bold mb-6 text-center">Empty Line Remover</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block mb-2 font-semibold">Original Text</label>
                <textarea v-model="inputText" rows="16" class="textarea textarea-bordered w-full"
                    placeholder="Paste your text here..."></textarea>
            </div>
            <div>
                <label class="mb-2 font-semibold flex items-center justify-between">
                    Modified Text
                    <button @click="copyToClipboard" class="btn btn-sm btn-primary ml-2">Copy</button>
                </label>
                <textarea :value="outputText" rows="16"
                    class="textarea textarea-bordered w-full bg-base-200 leading-none" readonly></textarea>
            </div>
        </div>
    </div>
</template>
