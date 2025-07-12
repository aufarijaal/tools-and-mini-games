<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Collection of Tools and Mini Games'
})

const tools = [
  {
    name: 'Check Percentage',
    path: '/t/check-percentage',
    img: '/img/percentage-checker.png',
    alt: 'Check Percentage',
  },
  {
    name: 'Text Cleaner & Organizer',
    path: '/t/text-cleaner-and-organizer',
    img: '/img/text-cleaner-and-organizer.png',
    alt: 'Text Cleaner & Organizer',
  },
]

const games = [
  {
    name: 'Birthday Guesser',
    path: '/g/birthday-guesser',
    img: '/img/birthday-guesser.png',
    alt: 'Birthday Guesser',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-base-100 py-10">
    <div class="flex flex-col items-center mb-8">
      <img src="~/assets/images/icon.png" alt="icon" class="w-32 mb-4" />
      <h2 class="font-bold text-3xl text-primary mb-2">
        Collection of Tools and Mini Games
      </h2>
      <p class="text-base-content/70 text-center max-w-md">
        A handy set of online tools and fun mini games, all in one place. Click
        below to get started!
      </p>
      <ThemeController />
    </div>

    <div class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-xl font-bold text-primary mb-4">Online Tools</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NuxtLink v-for="tool in tools" :key="tool.path" :to="tool.path"
            class="card bg-base-200 shadow-md hover:shadow-lg transition group">
            <div class="card-body flex flex-col items-center p-4">
              <img :src="tool.img" :alt="tool.alt"
                class="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition" />
              <span class="font-medium text-center">{{ tool.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <h3 class="text-xl font-bold text-secondary mb-4">Mini Games</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NuxtLink v-for="game in games" :key="game.path" :to="game.path"
            class="card bg-base-200 shadow-md hover:shadow-lg transition group">
            <div class="card-body flex flex-col items-center p-4">
              <img :src="game.img" :alt="game.alt"
                class="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition" />
              <span class="font-medium text-center">{{ game.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mt-8 text-sm text-base-content/70">
      Made with ❤️ by
      <a href="https://github.com/aufarijaal" target="_blank" class="text-primary hover:underline">
        aufarijaal
      </a>
    </div>
  </div>
</template>
