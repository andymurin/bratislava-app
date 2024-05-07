<template>
  <nav class="sticky flex top-0 bg-gradient-to-r from-amber-400 to-amber-600">
    <router-link
      to="/"
      class="flex text-white hover:text-amber-100 hover:bg-white/10 transition-colors ease-in-out"
    >
      <div class="flex items-center p-2 gap-2">
        <img src="./assets/logo.svg" alt="logo" width="100" />
        <p class="text-2xl font-bold">
          Bratislavská <br />
          Piváreň
        </p>
      </div>
    </router-link>

    <div class="flex-1 flex items-center justify-end">
      <router-link
        to="/about"
        class="realtive flex h-full items-center p-4 cursor-pointer font-bold text-white hover:text-amber-100 hover:bg-white/10 transition-colors ease-in-out"
        >About</router-link
      >
    </div>
  </nav>
  <router-view />
</template>
