<template>
  <nav class="sticky flex top-0 bg-gradient-to-r from-amber-400 to-amber-600">
    <div class="flex items-center p-2 text-white">
      <router-link to="/">
        <div class="flex items-center p-2 gap-2">
          <img src="./assets/logo.svg" alt="logo" width="100" />
          <p class="text-2xl font-bold">Bratislavská Piváreň</p>
        </div>
      </router-link>

      <router-link to="/about">About</router-link>
    </div>
  </nav>
  <router-view />
</template>
