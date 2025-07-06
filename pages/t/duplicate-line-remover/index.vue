<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
    title: 'Duplicate Line Remover',
    meta: [
        { name: 'description', content: 'Remove duplicate lines from your text input.' },
        { property: 'og:title', content: 'Duplicate Line Remover' },
        { property: 'og:description', content: 'Remove duplicate lines from your text input.' },
        { property: 'og:type', content: 'website' }
    ]
})

const inputText = ref('')

const cleanedLines = computed(() => {
    const seen = new Set<string>()
    const result: string[] = []
    inputText.value.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim()
        if (trimmed !== '' && !seen.has(line)) {
            seen.add(line)
            result.push(line)
        }
    })
    return result
})

const removedLines = computed(() => {
    const seen = new Set<string>()
    const duplicates = new Set<string>()
    inputText.value.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim()
        if (trimmed === '') return
        if (seen.has(line)) {
            duplicates.add(line)
        } else {
            seen.add(line)
        }
    })
    return Array.from(duplicates)
})

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">
            ← Back to Main Menu
        </NuxtLink>
        <h1 class="text-3xl font-bold mb-8 text-center">Duplicate Line Remover</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="card bg-base-100 shadow-md border border-base-200">
                    <div class="card-body">
                        <label class="font-semibold mb-2">Original Text</label>
                        <textarea v-model="inputText" rows="14" class="textarea textarea-bordered w-full mb-4"
                            placeholder="Paste your text here..."></textarea>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-6">
                <div class="card bg-base-100 shadow-md border border-base-200 flex-1">
                    <div class="card-body flex flex-col flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-semibold">Cleaned Text</label>
                            <button @click="copyToClipboard(cleanedLines.join('\n'))"
                                class="btn btn-sm btn-primary">Copy</button>
                        </div>
                        <textarea :value="cleanedLines.join('\n')" rows="7"
                            class="textarea textarea-bordered w-full bg-base-200 flex-1 resize-none"
                            readonly></textarea>
                    </div>
                </div>
                <div class="card bg-base-100 shadow border border-base-200">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-semibold">Removed Duplicates</label>
                            <button @click="copyToClipboard(removedLines.join('\n'))" class="btn btn-sm btn-primary"
                                :disabled="removedLines.length === 0">Copy</button>
                        </div>
                        <textarea :value="removedLines.join('\n')" rows="4"
                            class="textarea textarea-bordered w-full bg-base-200 resize-none" readonly
                            placeholder="No duplicates found"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
