<template>
  <div class="home">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">NEXUS</span>
          <span class="logo-sub">GAME STORE</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link active">游戏商城</router-link>
          <router-link to="/customer-service" class="nav-link">在线客服</router-link>
        </div>
        <router-link to="/cart" class="cart-btn">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">购物车</span>
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </router-link>
        <div class="user-actions">
          <router-link v-if="!user" to="/login" class="user-btn">
            <span class="user-icon">👤</span>
            <span class="user-text">登录</span>
          </router-link>
          <div v-else class="user-dropdown">
            <div class="user-btn">
              <span class="user-icon">👤</span>
              <span class="user-text">{{ user.username }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">探索游戏世界</span>
          <span class="title-accent">释放无限激情</span>
        </h1>
        <p class="hero-subtitle">精选10款顶级游戏，带你进入前所未有的虚拟世界</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">10+</span>
            <span class="stat-label">精选游戏</span>
          </div>
          <div class="stat">
            <span class="stat-num">24h</span>
            <span class="stat-label">即时交付</span>
          </div>
          <div class="stat">
            <span class="stat-num">100%</span>
            <span class="stat-label">正版授权</span>
          </div>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="deco-line"></div>
        <div class="deco-line"></div>
        <div class="deco-line"></div>
      </div>
    </section>

    <section class="games-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🔥</span>
          热门游戏
        </h2>
        <div class="filter-tabs">
          <button 
            v-for="genre in genres" 
            :key="genre"
            :class="['filter-tab', { active: selectedGenre === genre }]"
            @click="selectedGenre = genre"
          >
            {{ genre }}
          </button>
        </div>
      </div>

      <div class="games-grid" v-if="!loading">
        <router-link 
          v-for="game in filteredGames" 
          :key="game.id" 
          :to="`/game/${game.id}`"
          class="game-card"
        >
          <div class="card-image">
            <img :src="game.image" :alt="game.name" />
            <div class="card-overlay">
              <span class="view-btn">查看详情</span>
            </div>
            <div class="card-badge" v-if="game.originalPrice > game.price">
              -{{ Math.round((1 - game.price / game.originalPrice) * 100) }}%
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ game.name }}</h3>
            <p class="card-subtitle">{{ game.nameEn }}</p>
            <div class="card-meta">
              <span class="genre-tag">{{ game.genre }}</span>
              <div class="rating">
                <span class="star">⭐</span>
                {{ game.rating }}
              </div>
            </div>
            <div class="card-footer">
              <div class="price">
                <span class="current-price">¥{{ game.price }}</span>
                <span class="original-price" v-if="game.originalPrice > game.price">
                  ¥{{ game.originalPrice }}
                </span>
              </div>
              <button class="add-cart-btn" @click.prevent="addToCart(game.id)">
                <span>加入购物车</span>
              </button>
            </div>
          </div>
        </router-link>
      </div>

      <div class="loading-grid" v-else>
        <div class="skeleton-card" v-for="n in 6" :key="n">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-footer"></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="logo-icon">🎮</span>
          <span>NEXUS GAME STORE</span>
        </div>
        <p class="footer-text">© 2024  nexus. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const user = ref(JSON.parse(localStorage.getItem('user')))

const games = ref([])
const loading = ref(true)
const cartCount = ref(0)
const selectedGenre = ref('全部')

const genres = computed(() => {
  const allGenres = games.value.map(g => g.genre)
  return ['全部', ...new Set(allGenres)]
})

const filteredGames = computed(() => {
  if (selectedGenre.value === '全部') {
    return games.value
  }
  return games.value.filter(g => g.genre === selectedGenre.value)
})

const fetchGames = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/games')
    games.value = res.data
  } catch (err) {
    console.error('获取游戏列表失败:', err)
  } finally {
    loading.value = false
  }
}

const fetchCart = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/cart')
    cartCount.value = res.data.length
  } catch (err) {
    console.error('获取购物车失败:', err)
  }
}

const addToCart = async (gameId) => {
  try {
    await axios.post('http://localhost:3001/api/cart', { id: gameId })
    cartCount.value++
    ElMessage.success('已添加到购物车')
  } catch (err) {
    if (err.response?.status === 400) {
      ElMessage.warning('游戏已在购物车中')
    } else {
      ElMessage.error('添加失败，请重试')
    }
  }
}

onMounted(() => {
  fetchGames()
  fetchCart()
})
</script>

<style scoped>
.home {
  position: relative;
  z-index: 1;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(176, 38, 255, 0.2);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-sub {
  font-size: 0.6rem;
  color: var(--text-secondary);
  letter-spacing: 0.2em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--neon-cyan);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--neon-cyan);
  box-shadow: 0 0 10px var(--neon-cyan);
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, rgba(176, 38, 255, 0.2), rgba(0, 240, 255, 0.2));
  border: 1px solid rgba(176, 38, 255, 0.4);
  border-radius: 50px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.cart-btn:hover {
  background: linear-gradient(135deg, rgba(176, 38, 255, 0.4), rgba(0, 240, 255, 0.4));
  border-color: var(--neon-cyan);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.3);
}

.cart-count {
  background: var(--neon-pink);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 50px;
  min-width: 1.5rem;
  text-align: center;
}

/* User Actions */
.user-actions {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, rgba(176, 38, 255, 0.2), rgba(0, 240, 255, 0.2));
  border: 1px solid rgba(176, 38, 255, 0.4);
  border-radius: 50px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.user-btn:hover {
  background: linear-gradient(135deg, rgba(176, 38, 255, 0.4), rgba(0, 240, 255, 0.4));
  border-color: var(--neon-cyan);
}

.user-icon {
  font-size: 1.1rem;
}

.user-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.user-dropdown {
  position: relative;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 900px;
  z-index: 1;
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-line {
  display: block;
  color: var(--text-primary);
}

.title-accent {
  display: block;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-pink), var(--neon-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.5));
  }
  to {
    filter: drop-shadow(0 0 40px rgba(255, 0, 170, 0.5));
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
}

.stat {
  text-align: center;
}

.stat-num {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.hero-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.deco-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon-purple), transparent);
  opacity: 0.3;
}

.deco-line:nth-child(1) {
  width: 60%;
  top: 30%;
  left: 20%;
  transform: rotate(-5deg);
}

.deco-line:nth-child(2) {
  width: 40%;
  top: 70%;
  right: 10%;
  transform: rotate(5deg);
}

.deco-line:nth-child(3) {
  width: 30%;
  top: 50%;
  left: 5%;
  transform: rotate(10deg);
}

.games-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
}

.filter-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.filter-tab:hover {
  border-color: var(--neon-purple);
  color: var(--text-primary);
}

.filter-tab.active {
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border-color: transparent;
  color: white;
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.game-card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.game-card:hover {
  transform: translateY(-10px);
  border-color: var(--neon-cyan);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 240, 255, 0.2);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.game-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 15, 0.9), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.game-card:hover .card-overlay {
  opacity: 1;
}

.view-btn {
  padding: 0.75rem 1.5rem;
  background: var(--neon-cyan);
  color: var(--dark-bg);
  font-weight: 600;
  border-radius: 50px;
  transform: translateY(20px);
  transition: transform 0.3s;
}

.game-card:hover .view-btn {
  transform: translateY(0);
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.genre-tag {
  background: rgba(176, 38, 255, 0.2);
  color: var(--neon-purple);
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--accent-orange);
  font-weight: 600;
}

.star {
  font-size: 0.875rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.current-price {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-green);
}

.original-price {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: line-through;
}

.add-cart-btn {
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.add-cart-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.5);
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.skeleton-card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
}

.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, var(--card-bg) 0%, var(--card-hover) 50%, var(--card-bg) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 1.5rem;
}

.skeleton-title,
.skeleton-text,
.skeleton-footer {
  background: linear-gradient(90deg, var(--card-bg) 0%, var(--card-hover) 50%, var(--card-bg) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 24px;
  width: 70%;
  margin-bottom: 0.75rem;
}

.skeleton-text {
  height: 16px;
  width: 50%;
  margin-bottom: 1rem;
}

.skeleton-footer {
  height: 32px;
  width: 100%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.footer {
  margin-top: 6rem;
  padding: 3rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-num {
    font-size: 1.75rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }

  .nav-container {
    padding: 1rem;
  }

  .logo-sub {
    display: none;
  }

  .cart-text {
    display: none;
  }
}
</style>