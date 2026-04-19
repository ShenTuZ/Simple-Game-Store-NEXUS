<template>
  <div class="game-detail" v-if="game">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">NEXUS</span>
        </router-link>
        <div class="nav-links">
      <router-link to="/" class="nav-link">游戏商城</router-link>
      <router-link to="/customer-service" class="nav-link">在线客服</router-link>
    </div>
    <router-link to="/cart" class="cart-btn">
      <span class="cart-icon">🛒</span>
      <span class="cart-text">购物车</span>
    </router-link>
      </div>
    </nav>

    <div class="detail-hero" :style="{ backgroundImage: `url(${game.background})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <router-link to="/" class="back-btn">
          <span>←</span> 返回商城
        </router-link>
        <div class="game-info">
          <span class="genre-tag">{{ game.genre }}</span>
          <h1 class="game-title">{{ game.name }}</h1>
          <p class="game-subtitle">{{ game.nameEn }}</p>
          <div class="game-meta">
            <span class="meta-item">
              <span class="meta-icon">🏢</span>
              {{ game.developer }}
            </span>
            <span class="meta-item">
              <span class="meta-icon">📅</span>
              {{ game.releaseDate }}
            </span>
            <span class="meta-item rating">
              <span class="meta-icon">⭐</span>
              {{ game.rating }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-content">
      <div class="content-main">
        <section class="section">
          <h2 class="section-title">游戏介绍</h2>
          <p class="description">{{ game.description }}</p>
        </section>

        <section class="section">
          <h2 class="section-title">游戏特色</h2>
          <div class="features">
            <div class="feature" v-for="feature in game.features" :key="feature">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">截图预览</h2>
          <div class="screenshots">
            <img 
              v-for="(screenshot, index) in game.screenshots" 
              :key="index"
              :src="screenshot" 
              :alt="`截图 ${index + 1}`"
              class="screenshot"
            />
          </div>
        </section>
      </div>

      <div class="content-sidebar">
        <div class="purchase-card">
          <div class="card-image">
            <img :src="game.image" :alt="game.name" />
          </div>
          <div class="card-body">
            <div class="price-block">
              <span class="current-price">¥{{ game.price }}</span>
              <span class="original-price" v-if="game.originalPrice > game.price">
                ¥{{ game.originalPrice }}
              </span>
              <span class="discount" v-if="game.originalPrice > game.price">
                立省 ¥{{ game.originalPrice - game.price }}
              </span>
            </div>
            <button class="buy-btn" @click="addToCart">
              <span class="btn-icon">🛒</span>
              加入购物车
            </button>
            <button class="checkout-btn" @click="buyNow">
              <span class="btn-icon">⚡</span>
              立即购买
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="loading" v-else-if="loading">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>

  <div class="error" v-else>
    <h2>游戏不存在</h2>
    <router-link to="/" class="back-home">返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const game = ref(null)
const loading = ref(true)

const fetchGame = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/games/${route.params.id}`)
    game.value = res.data
  } catch (err) {
    console.error('获取游戏详情失败:', err)
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  try {
    await axios.post('http://localhost:3001/api/cart', { id: game.value.id })
    ElMessage.success('已添加到购物车')
  } catch (err) {
    if (err.response?.status === 400) {
      ElMessage.warning('游戏已在购物车中')
    } else {
      ElMessage.error('添加失败，请重试')
    }
  }
}

const buyNow = async () => {
  try {
    await axios.post('http://localhost:3001/api/cart', { id: game.value.id })
    router.push('/checkout')
  } catch (err) {
    if (err.response?.status === 400) {
      router.push('/checkout')
    } else {
      ElMessage.error('操作失败，请重试')
    }
  }
}

onMounted(() => {
  fetchGame()
})
</script>

<style scoped>
.game-detail {
  position: relative;
  z-index: 1;
  min-height: 100vh;
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

.cart-icon {
  font-size: 1.25rem;
}

.cart-text {
  font-weight: 500;
}

.detail-hero {
  height: 60vh;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-top: 80px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    var(--dark-bg) 0%,
    rgba(10, 10, 15, 0.8) 30%,
    rgba(10, 10, 15, 0.4) 60%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.back-btn:hover {
  color: var(--neon-cyan);
}

.game-info {
  max-width: 600px;
}

.genre-tag {
  display: inline-block;
  background: var(--neon-purple);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.game-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.game-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.game-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.meta-icon {
  font-size: 1rem;
}

.meta-item.rating {
  color: var(--accent-orange);
  font-weight: 600;
}

.detail-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
}

.content-main {
  min-width: 0;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--neon-cyan);
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-green);
  color: var(--dark-bg);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
}

.screenshots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.screenshot {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.screenshot:hover {
  transform: scale(1.02);
  border-color: var(--neon-cyan);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.2);
}

.content-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.purchase-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(176, 38, 255, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem;
}

.price-block {
  text-align: center;
  margin-bottom: 1.5rem;
}

.current-price {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-green);
}

.original-price {
  display: block;
  font-size: 1.25rem;
  color: var(--text-secondary);
  text-decoration: line-through;
  margin-top: 0.25rem;
}

.discount {
  display: inline-block;
  background: var(--accent-orange);
  color: white;
  padding: 0.3rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.75rem;
}

.buy-btn,
.checkout-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.buy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

.buy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: var(--neon-cyan);
}

.checkout-btn {
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  color: white;
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.5);
}

.btn-icon {
  font-size: 1.25rem;
}

.loading,
.error {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(176, 38, 255, 0.2);
  border-top-color: var(--neon-purple);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.back-home {
  padding: 0.75rem 1.5rem;
  background: var(--neon-purple);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
}

.back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

@media (max-width: 968px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    position: static;
  }

  .game-title {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .screenshots {
    grid-template-columns: 1fr;
  }
}
</style>