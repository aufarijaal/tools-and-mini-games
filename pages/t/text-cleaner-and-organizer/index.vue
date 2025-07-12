<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
    title: 'Text Cleaner & Organizer',
    meta: [
        { name: 'description', content: 'Clean, organize, and analyze your text: remove duplicates, empty lines, sort, and more.' },
        { property: 'og:title', content: 'Text Cleaner & Organizer' },
        { property: 'og:description', content: 'Clean, organize, and analyze your text: remove duplicates, empty lines, sort, and more.' },
        { property: 'og:type', content: 'website' }
    ]
})

const inputText = ref('')
const caseSensitive = ref(true)
const ignoreWhitespace = ref(false)
const removeEmptyLines = ref(true)
const sortOutput = ref(false)
const sortOrder = ref<'asc' | 'desc'>('asc')

function normalize(line: string) {
    let l = ignoreWhitespace.value ? line.trim() : line
    return caseSensitive.value ? l : l.toLowerCase()
}

const cleanedLines = computed(() => {
    const seen = new Set<string>()
    let result: string[] = []
    inputText.value.split(/\r?\n/).forEach(line => {
        const normalized = normalize(line)
        if ((removeEmptyLines.value && normalized === '') || (!removeEmptyLines.value && line === '')) return
        if (!seen.has(normalized)) {
            seen.add(normalized)
            result.push(line)
        }
    })
    if (sortOutput.value) {
        result = result.sort((a, b) => {
            const na = normalize(a)
            const nb = normalize(b)
            return sortOrder.value === 'asc' ? na.localeCompare(nb) : nb.localeCompare(na)
        })
    }
    return result
})

const removedLines = computed(() => {
    const seen = new Set<string>()
    const duplicates = new Map<string, number>()
    inputText.value.split(/\r?\n/).forEach(line => {
        const normalized = normalize(line)
        if ((removeEmptyLines.value && normalized === '') || (!removeEmptyLines.value && line === '')) return
        if (seen.has(normalized)) {
            duplicates.set(line, (duplicates.get(line) || 1) + 1)
        } else {
            seen.add(normalized)
        }
    })
    return Array.from(duplicates.entries()).map(([line, count]) => `${line} (${count}x)`)
})

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
}

function exportTxt(text: string, filename: string) {
    const blob = new Blob([text], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">
            ← Back to Main Menu
        </NuxtLink>
        <h1 class="text-3xl font-bold mb-8 text-center">Text Cleaner & Organizer</h1>
        <div class="mb-4 p-4 rounded-lg bg-info/10 border border-info text-info text-base">
            <span class="font-semibold">Info:</span>
            Clean, organize, and analyze your text: remove duplicates, empty lines, sort, and more.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="card bg-base-100 shadow-md border border-base-200">
                    <div class="card-body">
                        <label class="font-semibold mb-2">Original Text</label>
                        <textarea v-model="inputText" rows="14" class="textarea textarea-bordered w-full mb-4"
                            placeholder="Paste your text here..."></textarea>
                        <div class="flex flex-wrap gap-4 mb-2">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="caseSensitive" class="checkbox checkbox-primary" />
                                Case sensitive
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="ignoreWhitespace" class="checkbox checkbox-primary" />
                                Ignore leading/trailing spaces
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="removeEmptyLines" class="checkbox checkbox-primary" />
                                Remove empty lines
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="sortOutput" class="checkbox checkbox-primary" />
                                Sort output
                            </label>
                            <div v-if="sortOutput" class="flex items-center gap-2">
                                <label class="font-semibold">Order:</label>
                                <label class="flex items-center gap-1">
                                    <input type="radio" value="asc" v-model="sortOrder" class="radio radio-primary" />
                                    Asc
                                </label>
                                <label class="flex items-center gap-1">
                                    <input type="radio" value="desc" v-model="sortOrder" class="radio radio-primary" />
                                    Desc
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-6">
                <div class="card bg-base-100 shadow-md border border-base-200 flex-1">
                    <div class="card-body flex flex-col flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-semibold">Cleaned Text</label>
                            <div class="flex gap-2">
                                <button @click="copyToClipboard(cleanedLines.join('\n'))"
                                    class="btn btn-sm btn-primary">Copy</button>
                                <button @click="exportTxt(cleanedLines.join('\n'), 'cleaned.txt')"
                                    class="btn btn-sm btn-outline">Export</button>
                            </div>
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
                            <div class="flex gap-2">
                                <button @click="copyToClipboard(removedLines.join('\n'))" class="btn btn-sm btn-primary"
                                    :disabled="removedLines.length === 0">Copy</button>
                                <button @click="exportTxt(removedLines.join('\n'), 'duplicates.txt')"
                                    class="btn btn-sm btn-outline" :disabled="removedLines.length === 0">Export</button>
                            </div>
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
