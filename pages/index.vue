<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Collection of Tools and Mini Games'
})
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

    <div class="flex flex-col md:flex-row gap-4 w-full max-w-7xl">
      <div class="card bg-base-200 shadow-md flex-1">
        <div class="card-body">
          <h3 class="card-title text-lg text-primary">Online Tools</h3>
          <ul class="menu menu-vertical">
            <li>
              <NuxtLink to="/t/check-percentage" class="hover:bg-primary hover:text-primary-content rounded-md">
                <span class="font-medium">Check Percentage</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/t/empty-line-remover" class="hover:bg-primary hover:text-primary-content rounded-md">
                <span class="font-medium">Empty Line Remover</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/t/line-sorter" class="hover:bg-primary hover:text-primary-content rounded-md">
                <span class="font-medium">Line sorter</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/t/duplicate-line-remover" class="hover:bg-primary hover:text-primary-content rounded-md">
                <span class="font-medium">Duplicate Line Remover</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="card bg-base-200 shadow-md flex-1">
        <div class="card-body">
          <h3 class="card-title text-lg text-secondary">Mini Games</h3>
          <ul class="menu menu-vertical">
            <li>
              <NuxtLink to="/g/birthday-guesser" class="hover:bg-secondary hover:text-secondary-content rounded-md">
                <span class="font-medium">Birthday Guesser</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- made by -->
    <div class="mt-8 text-sm text-base-content/70">
      Made with ❤️ by
      <a href="https://github.com/aufarijaal" target="_blank" class="text-primary hover:underline">
        aufarijaal
      </a>
    </div>
  </div>
</template>
