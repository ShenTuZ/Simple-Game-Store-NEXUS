<template>
  <div class="admin-page">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">NEXUS</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">游戏商城</router-link>
          <router-link to="/customer-service" class="nav-link">在线客服</router-link>
          <router-link to="/admin" class="nav-link active">管理后台</router-link>
        </div>
        <div class="admin-actions">
          <span class="admin-user">
            <span class="user-icon">🛠️</span>
            管理员
          </span>
          <button class="logout-btn" @click="handleLogout">
            <span class="logout-icon">🚪</span>
            退出
          </button>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <h1 class="admin-title">
        <span class="title-icon">🛠️</span>
        管理后台
      </h1>

      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-icon">🎮</div>
          <div class="stat-content">
            <div class="stat-value">{{ games.length }}</div>
            <div class="stat-label">游戏总数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <div class="stat-value">{{ orders.length }}</div>
            <div class="stat-label">订单总数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👤</div>
          <div class="stat-content">
            <div class="stat-value">{{ users.length }}</div>
            <div class="stat-label">用户数量</div>
          </div>
        </div>
      </div>

      <div class="admin-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'games' }"
          @click="activeTab = 'games'"
        >
          <span class="tab-icon">🎮</span>
          游戏管理
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'orders' }"
          @click="activeTab = 'orders'"
        >
          <span class="tab-icon">📋</span>
          订单管理
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'users' }"
          @click="activeTab = 'users'"
        >
          <span class="tab-icon">👥</span>
          用户管理
        </button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'games'" class="games-tab">
          <div class="tab-header">
            <h2>游戏列表</h2>
            <button class="add-btn">
              <span class="add-icon">+</span>
              添加游戏
            </button>
          </div>
          <div class="games-grid">
            <div v-for="game in games" :key="game.id" class="game-card">
              <div class="game-image">
                <img :src="game.image" :alt="game.name" />
              </div>
              <div class="game-info">
                <h3>{{ game.name }}</h3>
                <p class="game-genre">{{ game.genre }}</p>
                <p class="game-price">¥{{ game.price }}</p>
                <div class="game-actions">
                  <button class="edit-btn">编辑</button>
                  <button class="delete-btn">删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'orders'" class="orders-tab">
          <div class="tab-header">
            <h2>订单列表</h2>
          </div>
          <div class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-item">
              <div class="order-info">
                <div class="order-id">订单号: {{ order.id }}</div>
                <div class="order-date">{{ order.createdAt }}</div>
                <div class="order-status" :class="order.status">
                  {{ order.status === 'pending' ? '待处理' : '已完成' }}
                </div>
              </div>
              <div class="order-details">
                <div class="order-items">
                  <div v-for="item in order.items" :key="item.game.id" class="order-item-game">
                    {{ item.game.name }} × {{ item.quantity }}
                  </div>
                </div>
                <div class="order-total">
                  总计: ¥{{ order.total }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'users'" class="users-tab">
          <div class="tab-header">
            <h2>用户列表</h2>
          </div>
          <div class="users-list">
            <div v-for="user in users" :key="user.id" class="user-item">
              <div class="user-info">
                <span class="user-icon">👤</span>
                <div class="user-details">
                  <div class="user-name">{{ user.username }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
              <div class="user-actions">
                <button class="view-btn">查看</button>
                <button class="delete-btn">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('games')

const games = ref([
  { id: 1, name: '巫师 3：狂猎', genre: '开放世界', price: 149, image: 'https://api.dicebear.com/7.x/bottts/svg?seed=witcher' },
  { id: 2, name: '赛博朋克 2077', genre: '开放世界', price: 199, image: 'https://api.dicebear.com/7.x/bottts/svg?seed=cyberpunk' },
  { id: 3, name: '艾尔登法环', genre: '魂系', price: 299, image: 'https://api.dicebear.com/7.x/bottts/svg?seed=elden' },
  { id: 4, name: '只狼：影逝二度', genre: '魂系', price: 219, image: 'https://api.dicebear.com/7.x/bottts/svg?seed=sekiro' }
])

const orders = ref([
  { id: 'ORD-2024-001', status: 'completed', total: 149, createdAt: '2024-01-15', items: [{ game: { id: 1, name: '巫师 3：狂猎' }, quantity: 1 }] },
  { id: 'ORD-2024-002', status: 'pending', total: 199, createdAt: '2024-01-16', items: [{ game: { id: 2, name: '赛博朋克 2077' }, quantity: 1 }] }
])

const users = ref([
  { id: 1, username: 'user123', email: 'user123@example.com' },
  { id: 2, username: 'player456', email: 'player456@example.com' }
])

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('userType')
  router.push('/login')
}

onMounted(() => {
  // 检查是否登录
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')
  
  if (!token || userType !== 'admin') {
    router.push('/login')
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: var(--dark-bg);
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
  max-width: 1200px;
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

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--neon-cyan);
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 240, 255, 0.1);
  border-radius: 50px;
  font-size: 0.875rem;
}

.user-icon {
  font-size: 1rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 0, 170, 0.2);
  border: 1px solid rgba(255, 0, 170, 0.4);
  border-radius: 50px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 0, 170, 0.4);
  border-color: var(--neon-pink);
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
}

.admin-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(176, 38, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(176, 38, 255, 0.2);
  border-radius: 50%;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  color: var(--neon-cyan);
  border-bottom-color: var(--neon-cyan);
}

.tab-btn.active {
  color: var(--neon-cyan);
  border-bottom-color: var(--neon-cyan);
}

.tab-icon {
  font-size: 1rem;
}

.tab-content {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tab-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.add-icon {
  font-size: 1.25rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.2);
}

.game-image {
  height: 160px;
  overflow: hidden;
  background: var(--dark-bg);
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.game-card:hover .game-image img {
  transform: scale(1.1);
}

.game-info {
  padding: 1rem;
}

.game-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.game-genre {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.game-price {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--neon-cyan);
}

.game-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn,
.view-btn {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn {
  background: rgba(0, 240, 255, 0.1);
  color: var(--neon-cyan);
}

.edit-btn:hover {
  background: rgba(0, 240, 255, 0.3);
  border-color: var(--neon-cyan);
}

.delete-btn {
  background: rgba(255, 0, 170, 0.1);
  color: var(--neon-pink);
}

.delete-btn:hover {
  background: rgba(255, 0, 170, 0.3);
  border-color: var(--neon-pink);
}

.view-btn {
  background: rgba(0, 255, 136, 0.1);
  color: var(--accent-green);
}

.view-btn:hover {
  background: rgba(0, 255, 136, 0.3);
  border-color: var(--accent-green);
}

.orders-list,
.users-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item,
.user-item {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.order-item:hover,
.user-item:hover {
  background: rgba(176, 38, 255, 0.1);
}

.order-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.order-id {
  font-weight: 600;
}

.order-date {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.order-status.pending {
  background: rgba(255, 107, 53, 0.2);
  color: var(--accent-orange);
}

.order-status.completed {
  background: rgba(0, 255, 136, 0.2);
  color: var(--accent-green);
}

.order-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
}

.order-items {
  flex: 1;
  min-width: 200px;
}

.order-item-game {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.order-total {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--neon-cyan);
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 600;
}

.user-email {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.user-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .admin-stats {
    grid-template-columns: 1fr;
  }

  .admin-tabs {
    flex-direction: column;
  }

  .tab-btn {
    text-align: left;
  }

  .order-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .order-details {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .user-actions {
    align-self: stretch;
  }
}
</style>