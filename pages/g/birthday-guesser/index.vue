<script setup lang="ts">
useHead({
    title: 'Birthday Number Guesser',
    meta: [
        { name: 'description', content: 'A fun game to guess your birthday number!' },
        { property: 'og:title', content: 'Birthday Number Guesser' },
        { property: 'og:description', content: 'A fun game to guess your birthday number!' },
        { property: 'og:type', content: 'website' }
    ]
})

const cards = [
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
    [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31],
    [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31],
    [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31],
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
]

const currentCardIndex = ref(0)
const selectedCards = ref<number[]>([])
const showResult = ref(false)
const result = computed(() => {
    return selectedCards.value.reduce((sum, cardIndex) => {
        return sum + cards[cardIndex][0]
    }, 0)
})

const moveToNextCard = () => {
    currentCardIndex.value++
}

const selectCard = (hasNumber: boolean) => {
    if (hasNumber) {
        selectedCards.value.push(currentCardIndex.value)
    }
    if (currentCardIndex.value < cards.length - 1) {
        moveToNextCard()
    } else {
        showResult.value = true
    }
}

const resetGame = () => {
    currentCardIndex.value = 0
    selectedCards.value = []
    showResult.value = false
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-4">
        <NuxtLink to="/" class="text-primary underline mb-4 block">
            ← Back to Main Menu
        </NuxtLink>

        <div class="space-y-6">
            <div class="text-center">
                <h1 class="text-3xl font-bold mb-4 text-primary">Birthday Number Guesser</h1>
                <p class="text-base-content mb-6">Think of a number between 1 and 31. Look at each card and tell me
                    if
                    your number appears in it.</p>
            </div>

            <div v-if="!showResult" class="flex justify-center">
                <div class="card w-full max-w-lg bg-base-100 shadow-xl border border-base-200">
                    <div class="card-body">
                        <h2 class="card-title justify-center mb-4 text-secondary">Card {{ currentCardIndex + 1 }}
                        </h2>
                        <div class="grid grid-cols-4 gap-3 mb-6">
                            <div v-for="number in cards[currentCardIndex]" :key="number"
                                class="bg-primary text-primary-content rounded-lg text-center font-semibold text-lg py-3 shadow">
                                {{ number }}
                            </div>
                        </div>
                        <div class="card-actions justify-center gap-4">
                            <button @click="selectCard(true)" class="btn btn-success btn-lg">
                                Yes, my number is here
                            </button>
                            <button @click="selectCard(false)" class="btn btn-error btn-lg">
                                No, it's not here
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center space-y-4">
                <div class="card w-full max-w-md mx-auto bg-base-100 shadow-xl border border-base-200">
                    <div class="card-body">
                        <h2 class="text-2xl font-bold text-success mb-4">Your number is {{ result }}!</h2>
                        <button @click="resetGame" class="btn btn-primary btn-lg">
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
