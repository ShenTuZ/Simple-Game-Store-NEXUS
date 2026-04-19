<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-animation">
        <div class="success-icon">
          <span class="check-mark">✓</span>
        </div>
        <div class="pulse-ring"></div>
        <div class="pulse-ring delay"></div>
      </div>

      <h1 class="success-title">订单提交成功！</h1>
      <p class="success-subtitle">感谢您的购买，祝您游戏愉快！</p>

      <div class="order-info" v-if="order">
        <div class="order-header">
          <span class="order-label">订单号</span>
          <span class="order-id">{{ order.id }}</span>
        </div>
        <div class="order-details">
          <div class="detail-row">
            <span class="detail-label">订单金额</span>
            <span class="detail-value">¥{{ order.total }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">支付方式</span>
            <span class="detail-value">{{ getPaymentName(order.paymentMethod) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">买家</span>
            <span class="detail-value">{{ order.customerInfo.name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">邮箱</span>
            <span class="detail-value">{{ order.customerInfo.email }}</span>
          </div>
        </div>

        <div class="order-games">
          <h3 class="games-title">购买的商品</h3>
          <div class="games-list">
            <div class="game-item" v-for="item in order.items" :key="item.id">
              <span class="game-name">{{ item.name }}</span>
              <span class="game-price">¥{{ item.price }}</span>
            </div>
          </div>
        </div>

        <div class="order-time">
          <span class="time-icon">🕐</span>
          订单时间：{{ formatTime(order.createdAt) }}
        </div>
      </div>

      <div class="success-actions">
        <router-link to="/" class="action-btn primary">
          <span class="btn-icon">🎮</span>
          继续购物
        </router-link>
      </div>

      <div class="delivery-notice">
        <div class="notice-icon">📧</div>
        <div class="notice-content">
          <h4>发货通知</h4>
          <p>订单确认邮件已发送至您的邮箱，请注意查收。游戏激活码将在付款后24小时内发送到您的邮箱。</p>
        </div>
      </div>

      <div class="support-info">
        <p>如有疑问，请联系客服：<span class="support-email">support@nexus.com</span></p>
      </div>
    </div>

    <div class="decoration">
      <div class="deco-circle circle-1"></div>
      <div class="deco-circle circle-2"></div>
      <div class="deco-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const order = ref(null)

const getPaymentName = (method) => {
  const names = {
    alipay: '支付宝',
    wechat: '微信支付',
    card: '银行卡'
  }
  return names[method] || method
}

const formatTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchOrder = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/orders/${route.params.id}`)
    order.value = res.data
  } catch (err) {
    console.error('获取订单失败:', err)
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.success-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.success-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.success-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-green), var(--neon-cyan));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.check-mark {
  font-size: 4rem;
  color: var(--dark-bg);
  font-weight: 700;
  animation: drawCheck 0.5s ease-out 0.3s both;
}

@keyframes drawCheck {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.pulse-ring {
  position: absolute;
  inset: -20px;
  border: 2px solid var(--accent-green);
  border-radius: 50%;
  opacity: 0;
  animation: pulse 2s ease-out infinite;
}

.pulse-ring.delay {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.success-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--neon-cyan), var(--accent-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.order-info {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(176, 38, 255, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: left;
  animation: fadeInUp 0.6s ease-out 0.5s both;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

.order-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.order-id {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--neon-cyan);
}

.order-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.detail-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
}

.order-games {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.games-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.game-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
}

.game-name {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.game-price {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  color: var(--accent-green);
  font-weight: 600;
}

.order-time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.time-icon {
  font-size: 1rem;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.action-btn.primary {
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  color: white;
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.5);
}

.btn-icon {
  font-size: 1.25rem;
}

.delivery-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: left;
  animation: fadeInUp 0.6s ease-out 0.7s both;
}

.notice-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.notice-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neon-cyan);
  margin-bottom: 0.5rem;
}

.notice-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.support-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
  animation: fadeInUp 0.6s ease-out 0.8s both;
}

.support-email {
  color: var(--neon-purple);
  font-weight: 500;
}

.decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(176, 38, 255, 0.1) 0%, transparent 70%);
}

.circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
  animation: float 20s ease-in-out infinite;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  animation: float 15s ease-in-out infinite reverse;
}

.circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-slow 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .success-title {
    font-size: 1.75rem;
  }

  .order-details {
    grid-template-columns: 1fr;
  }

  .success-actions {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }
}
</style>