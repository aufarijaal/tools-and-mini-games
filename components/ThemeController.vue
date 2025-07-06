<script setup lang="ts">
import { onMounted } from 'vue';
import { themeChange } from 'theme-change';

const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset'
]

onMounted(() => {
    themeChange(false); // Disable auto theme change
});
</script>

<template>
    <div class="my-4">
        <select class="select select-sm shadow-sm" data-choose-theme>
            <option value="">Default</option>
            <option v-for="theme in themes" :key="theme" :value="theme">
                {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
            </option>
        </select>
    </div>
</template>
