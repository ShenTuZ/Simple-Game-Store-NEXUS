<template>
  <div class="game-store">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  --neon-cyan: #00f0ff;
  --neon-pink: #ff00aa;
  --neon-purple: #b026ff;
  --dark-bg: #0a0a0f;
  --card-bg: #12121a;
  --card-hover: #1a1a25;
  --text-primary: #ffffff;
  --text-secondary: #8a8a9a;
  --accent-green: #00ff88;
  --accent-orange: #ff6b35;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background: var(--dark-bg);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

.game-store {
  min-height: 100vh;
  position: relative;
}

.game-store::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(176, 38, 255, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 0, 170, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--dark-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--neon-purple);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--neon-cyan);
}
</style>