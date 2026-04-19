<template>
  <div class="cart-page">
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
        <router-link to="/cart" class="cart-btn active">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">购物车</span>
          <span class="cart-count" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
        </router-link>
      </div>
    </nav>

    <div class="cart-content">
      <div class="cart-main">
        <div class="cart-header">
          <h1 class="page-title">
            <span class="title-icon">🛒</span>
            我的购物车
          </h1>
          <button class="clear-btn" @click="clearCart" v-if="cartItems.length > 0">
            清空购物车
          </button>
        </div>

        <div class="cart-items" v-if="cartItems.length > 0">
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <div class="item-image">
              <img :src="item.game.image" :alt="item.game.name" />
            </div>
            <div class="item-info">
              <router-link :to="`/game/${item.game.id}`" class="item-title">
                {{ item.game.name }}
              </router-link>
              <p class="item-subtitle">{{ item.game.nameEn }}</p>
              <div class="item-meta">
                <span class="genre-tag">{{ item.game.genre }}</span>
                <div class="rating">
                  <span class="star">⭐</span>
                  {{ item.game.rating }}
                </div>
              </div>
            </div>
            <div class="item-price">
              <span class="price">¥{{ item.game.price }}</span>
              <span class="original" v-if="item.game.originalPrice > item.game.price">
                ¥{{ item.game.originalPrice }}
              </span>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.id)">
              <span>×</span>
            </button>
          </div>
        </div>

        <div class="empty-cart" v-else>
          <div class="empty-icon">🛒</div>
          <h2>购物车是空的</h2>
          <p>快去挑选你喜欢的游戏吧！</p>
          <router-link to="/" class="browse-btn">浏览游戏</router-link>
        </div>

        <div class="cart-actions" v-if="cartItems.length > 0">
          <router-link to="/" class="continue-btn">
            <span>←</span> 继续购物
          </router-link>
        </div>
      </div>

      <div class="cart-sidebar" v-if="cartItems.length > 0">
        <div class="summary-card">
          <h3 class="summary-title">订单摘要</h3>
          <div class="summary-items">
            <div class="summary-item" v-for="item in cartItems" :key="item.id">
              <span class="item-name">{{ item.game.name }}</span>
              <span class="item-price">¥{{ item.game.price }}</span>
            </div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-total">
            <span class="total-label">总计</span>
            <span class="total-value">¥{{ total }}</span>
          </div>
          <router-link to="/checkout" class="checkout-btn">
            <span class="btn-icon">⚡</span>
            去结算
          </router-link>
          <p class="secure-notice">
            <span class="lock-icon">🔒</span>
            安全加密结账
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const cartItems = ref([])

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.game.price, 0)
})

const fetchCart = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/cart')
    cartItems.value = res.data
  } catch (err) {
    console.error('获取购物车失败:', err)
    ElMessage.error('加载购物车失败')
  }
}

const removeFromCart = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/cart/${id}`)
    cartItems.value = cartItems.value.filter(item => item.id !== id)
    ElMessage.success('已从购物车移除')
  } catch (err) {
    ElMessage.error('移除失败，请重试')
  }
}

const clearCart = async () => {
  try {
    for (const item of cartItems.value) {
      await axios.delete(`http://localhost:3001/api/cart/${item.id}`)
    }
    cartItems.value = []
    ElMessage.success('购物车已清空')
  } catch (err) {
    ElMessage.error('清空失败，请重试')
  }
}

onMounted(() => {
  fetchCart()
})
</script>

<style scoped>
.cart-page {
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

.cart-btn:hover,
.cart-btn.active {
  background: linear-gradient(135deg, rgba(176, 38, 255, 0.4), rgba(0, 240, 255, 0.4));
  border-color: var(--neon-cyan);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.3);
}

.cart-icon {
  font-size: 1.25rem;
}

.cart-text {
  font-weight: 500;
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

.cart-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
}

.cart-main {
  min-width: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(255, 100, 100, 0.5);
  border-radius: 50px;
  color: #ff6464;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.clear-btn:hover {
  background: rgba(255, 100, 100, 0.1);
  border-color: #ff6464;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 160px 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.cart-item:hover {
  border-color: rgba(176, 38, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.item-image {
  width: 160px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  min-width: 0;
}

.item-title {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  margin-bottom: 0.25rem;
  transition: color 0.3s;
}

.item-title:hover {
  color: var(--neon-cyan);
}

.item-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.genre-tag {
  background: rgba(176, 38, 255, 0.2);
  color: var(--neon-purple);
  padding: 0.25rem 0.75rem;
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
  font-size: 0.875rem;
}

.item-price {
  text-align: right;
}

.price {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-green);
}

.original {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: line-through;
}

.remove-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 100, 100, 0.1);
  border: 1px solid rgba(255, 100, 100, 0.3);
  border-radius: 50%;
  color: #ff6464;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: rgba(255, 100, 100, 0.2);
  border-color: #ff6464;
  transform: rotate(90deg);
}

.empty-cart {
  text-align: center;
  padding: 5rem 2rem;
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-cart h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-cart p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.browse-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.4);
}

.cart-actions {
  margin-top: 2rem;
}

.continue-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.continue-btn:hover {
  color: var(--neon-cyan);
}

.cart-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(176, 38, 255, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.summary-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.summary-item .item-name {
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.summary-item .item-price {
  color: var(--text-primary);
  font-weight: 500;
}

.summary-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1.5rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.total-label {
  font-size: 1rem;
  color: var(--text-secondary);
}

.total-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-green);
}

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.5);
}

.btn-icon {
  font-size: 1.25rem;
}

.secure-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.lock-icon {
  font-size: 0.875rem;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
    padding-top: 7rem;
  }

  .cart-sidebar {
    position: static;
  }

  .cart-item {
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
  }

  .item-image {
    width: 100px;
    height: 70px;
  }

  .remove-btn {
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: 0.5rem;
  }
}
</style>