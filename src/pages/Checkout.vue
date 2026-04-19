<template>
  <div class="checkout-page">
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
        <div class="step-indicator">
          <span class="step active">
            <span class="step-num">1</span>
            购物车
          </span>
          <span class="step-line"></span>
          <span class="step active">
            <span class="step-num">2</span>
            结算
          </span>
          <span class="step-line"></span>
          <span class="step">
            <span class="step-num">3</span>
            完成
          </span>
        </div>
      </div>
    </nav>

    <div class="checkout-content">
      <div class="checkout-main">
        <form @submit.prevent="submitOrder" class="checkout-form">
          <section class="form-section">
            <h2 class="section-title">
              <span class="title-icon">👤</span>
              收货信息
            </h2>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">用户名 *</label>
                <input
                  type="text"
                  v-model="formData.name"
                  class="form-input"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">邮箱地址 *</label>
                <input
                  type="email"
                  v-model="formData.email"
                  class="form-input"
                  placeholder="用于接收订单信息"
                  required
                />
              </div>
              <div class="form-group full">
                <label class="form-label">手机号码</label>
                <input
                  type="tel"
                  v-model="formData.phone"
                  class="form-input"
                  placeholder="选填，便于接收订单状态通知"
                />
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <span class="title-icon">💳</span>
              支付方式
            </h2>
            <div class="payment-methods">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                :class="['payment-option', { selected: formData.paymentMethod === method.id }]"
              >
                <input
                  type="radio"
                  :value="method.id"
                  v-model="formData.paymentMethod"
                  class="payment-radio"
                />
                <span class="payment-icon">{{ method.icon }}</span>
                <div class="payment-info">
                  <span class="payment-name">{{ method.name }}</span>
                  <span class="payment-desc">{{ method.desc }}</span>
                </div>
                <span class="check-icon" v-if="formData.paymentMethod === method.id">✓</span>
              </label>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <span class="title-icon">📝</span>
              订单备注
            </h2>
            <textarea
              v-model="formData.notes"
              class="form-textarea"
              placeholder="如有特殊需求，请在此说明..."
              rows="3"
            ></textarea>
          </section>

          <div class="form-actions">
            <router-link to="/cart" class="back-btn">
              <span>←</span> 返回购物车
            </router-link>
            <button type="submit" class="submit-btn" :disabled="submitting">
              <span v-if="!submitting" class="btn-content">
                <span class="btn-icon">🔒</span>
                确认订单 - ¥{{ total }}
              </span>
              <span v-else class="btn-loading">
                <span class="spinner"></span>
                处理中...
              </span>
            </button>
          </div>
        </form>
      </div>

      <div class="checkout-sidebar">
        <div class="order-summary">
          <h3 class="summary-title">订单摘要</h3>
          <div class="summary-items">
            <div class="summary-item" v-for="item in cartItems" :key="item.id">
              <div class="item-info">
                <img :src="item.game.image" :alt="item.game.name" class="item-thumb" />
                <span class="item-name">{{ item.game.name }}</span>
              </div>
              <span class="item-price">¥{{ item.game.price }}</span>
            </div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row">
            <span>商品总价</span>
            <span>¥{{ subtotal }}</span>
          </div>
          <div class="summary-row">
            <span>优惠</span>
            <span class="discount">-¥{{ discount }}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-total">
            <span class="total-label">应付总额</span>
            <span class="total-value">¥{{ total }}</span>
          </div>
        </div>

        <div class="guarantee-card">
          <div class="guarantee-item">
            <span class="guarantee-icon">🔒</span>
            <div class="guarantee-text">
              <span class="guarantee-title">安全支付</span>
              <span class="guarantee-desc">数据加密保护</span>
            </div>
          </div>
          <div class="guarantee-item">
            <span class="guarantee-icon">⚡</span>
            <div class="guarantee-text">
              <span class="guarantee-title">即时交付</span>
              <span class="guarantee-desc">付款后立即发货</span>
            </div>
          </div>
          <div class="guarantee-item">
            <span class="guarantee-icon">🎮</span>
            <div class="guarantee-text">
              <span class="guarantee-title">正版授权</span>
              <span class="guarantee-desc">官方激活码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const cartItems = ref([])
const submitting = ref(false)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  paymentMethod: 'alipay',
  notes: ''
})

const paymentMethods = [
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💰',
    desc: '推荐有优惠'
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: '💬',
    desc: '便捷快速'
  },
  {
    id: 'card',
    name: '银行卡',
    icon: '💳',
    desc: '支持Visa/MasterCard'
  }
]

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.game.originalPrice, 0)
})

const discount = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.game.originalPrice - item.game.price)
  }, 0)
})

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.game.price, 0)
})

const fetchCart = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/cart')
    cartItems.value = res.data
    if (cartItems.value.length === 0) {
      router.push('/cart')
    }
  } catch (err) {
    console.error('获取购物车失败:', err)
    router.push('/cart')
  }
}

const submitOrder = async () => {
  if (!formData.value.name || !formData.value.email) {
    ElMessage.warning('请填写完整的收货信息')
    return
  }

  submitting.value = true

  try {
    const orderData = {
      items: cartItems.value.map(item => ({
        id: item.id,
        name: item.game.name,
        price: item.game.price
      })),
      total: total.value,
      customerInfo: {
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone
      },
      paymentMethod: formData.value.paymentMethod,
      notes: formData.value.notes
    }

    const res = await axios.post('http://localhost:3001/api/orders', orderData)

    if (res.data.success) {
      router.push(`/order-success/${res.data.orderId}`)
    }
  } catch (err) {
    console.error('提交订单失败:', err)
    ElMessage.error('订单提交失败，请重试')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchCart()
})
</script>

<style scoped>
.checkout-page {
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

.step-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.step.active {
  color: var(--neon-cyan);
}

.step-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.75rem;
}

.step.active .step-num {
  background: var(--neon-cyan);
  color: var(--dark-bg);
}

.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.checkout-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-input,
.form-textarea {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-secondary);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-option:hover {
  border-color: rgba(176, 38, 255, 0.5);
}

.payment-option.selected {
  border-color: var(--neon-cyan);
  background: rgba(0, 240, 255, 0.05);
}

.payment-radio {
  display: none;
}

.payment-icon {
  font-size: 2rem;
}

.payment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.payment-name {
  font-weight: 600;
  color: var(--text-primary);
}

.payment-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.check-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neon-cyan);
  color: var(--dark-bg);
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.back-btn:hover {
  color: var(--neon-cyan);
}

.submit-btn {
  flex: 1;
  max-width: 400px;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(176, 38, 255, 0.5);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.25rem;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.checkout-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-summary {
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
  gap: 1rem;
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.summary-item .item-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.item-thumb {
  width: 50px;
  height: 35px;
  object-fit: cover;
  border-radius: 6px;
}

.item-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
  flex-shrink: 0;
}

.summary-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.summary-row .discount {
  color: var(--accent-green);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.guarantee-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
}

.guarantee-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.guarantee-icon {
  font-size: 1.5rem;
}

.guarantee-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.guarantee-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.guarantee-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
    padding-top: 7rem;
  }

  .checkout-sidebar {
    position: static;
  }

  .step-indicator {
    display: none;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-btn {
    max-width: 100%;
  }
}
</style>