<template>
  <div class="customer-service">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">NEXUS</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">游戏商城</router-link>
          <router-link to="/customer-service" class="nav-link active">在线客服</router-link>
        </div>
        <router-link to="/cart" class="cart-btn">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">购物车</span>
        </router-link>
      </div>
    </nav>

    <div class="service-container">
      <div class="service-header">
        <h1 class="page-title">
          <span class="title-icon">💬</span>
          在线客服
        </h1>
        <p class="page-subtitle">7×24 小时为您提供服务</p>
      </div>

      <div class="service-content">
        <div class="chat-section">
          <div class="chat-header">
            <div class="cs-avatar">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=nexus" alt="客服" />
            </div>
            <div class="cs-info">
              <span class="cs-name">NEXUS 小助手</span>
              <span class="cs-status">
                <span class="status-dot"></span>
                在线
              </span>
            </div>
          </div>

          <div class="chat-messages" ref="messagesContainer">
            <div class="message service-message">
              <div class="message-avatar">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=nexus" alt="客服" />
              </div>
              <div class="message-content">
                <div class="message-text">
                  👋 您好！欢迎来到 NEXUS 游戏商城。<br><br>
                  我是您的专属客服助手，有什么可以帮到您的吗？
                </div>
                <div class="message-time">刚刚</div>
              </div>
            </div>

            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="['message', msg.type === 'user' ? 'user-message' : 'service-message']"
            >
              <div class="message-avatar" v-if="msg.type !== 'user'">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=nexus" alt="客服" />
              </div>
              <div class="message-content">
                <div class="message-text" v-html="msg.text"></div>
                <div class="message-time">{{ msg.time }}</div>
              </div>
            </div>
          </div>

          <div class="quick-questions" v-if="messages.length === 1">
            <p class="quick-title">您可能想了解：</p>
            <div class="quick-btns">
              <button
                v-for="q in quickQuestions"
                :key="q.id"
                class="quick-btn"
                @click="sendQuickQuestion(q)"
              >
                {{ q.text }}
              </button>
            </div>
          </div>

          <div class="chat-input">
            <input
              type="text"
              v-model="inputText"
              :placeholder="inputPlaceholder"
              class="input-field"
              @keyup.enter="sendMessage"
            />
            <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
              <span>发送</span>
              <span class="send-icon">➤</span>
            </button>
          </div>
        </div>

        <div class="sidebar">
          <div class="info-card">
            <h3 class="card-title">
              <span class="card-icon">📋</span>
              常见问题
            </h3>
            <div class="faq-list">
              <div
                v-for="faq in faqs"
                :key="faq.id"
                class="faq-item"
                @click="toggleFaq(faq.id)"
              >
                <div class="faq-question">
                  <span>{{ faq.question }}</span>
                  <span class="faq-arrow" :class="{ active: expandedFaq === faq.id }">▼</span>
                </div>
                <div class="faq-answer" v-show="expandedFaq === faq.id">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3 class="card-title">
              <span class="card-icon">📞</span>
              联系方式
            </h3>
            <div class="contact-list">
              <div class="contact-item">
                <span class="contact-icon">💬</span>
                <div class="contact-info">
                  <span class="contact-label">在线客服</span>
                  <span class="contact-value">24小时随时联系</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <div class="contact-info">
                  <span class="contact-label">邮箱</span>
                  <span class="contact-value">support@nexus.com</span>
                </div>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <div class="contact-info">
                  <span class="contact-label">电话</span>
                  <span class="contact-value">400-888-6666</span>
                </div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3 class="card-title">
              <span class="card-icon">🕐</span>
              服务时间
            </h3>
            <div class="service-hours">
              <div class="hours-row">
                <span>周一至周五</span>
                <span>09:00 - 22:00</span>
              </div>
              <div class="hours-row">
                <span>周末及节假日</span>
                <span>10:00 - 20:00</span>
              </div>
              <div class="hours-note">
                <span class="note-icon">💡</span>
                春节期间服务时间可能调整，请关注公告
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const messages = ref([])
const inputText = ref('')
const inputPlaceholder = ref('请输入您的问题...')
const expandedFaq = ref(null)

const messagesContainer = ref(null)

const quickQuestions = [
  { id: 1, text: '如何购买游戏？', answer: '您可以在游戏详情页点击"加入购物车"或"立即购买"，然后按照流程完成支付即可。支付成功后，游戏激活码会发送到您的邮箱。' },
  { id: 2, text: '支付方式有哪些？', answer: '我们支持支付宝、微信支付和银行卡支付三种方式。在结算页面您可以选择喜欢的支付方式。' },
  { id: 3, text: '游戏激活码如何获取？', answer: '支付完成后，游戏激活码会在24小时内发送到您的注册邮箱。同时您也可以在订单详情页面查看。' },
  { id: 4, text: '可以退款吗？', answer: '根据数字商品特殊性，未激活的游戏可在购买后7天内申请退款，激活后不支持退款。如有问题请联系客服。' }
]

const faqs = [
  {
    id: 1,
    question: '购买后多久能收到激活码？',
    answer: '支付成功后，激活码会在24小时内发送到您的注册邮箱。部分商品支持即时发货，您可以在订单详情页面直接查看。'
  },
  {
    id: 2,
    question: '支持哪些支付方式？',
    answer: '我们支持支付宝、微信支付和银行卡（Visa/MasterCard）三种支付方式。所有支付均采用加密处理，保障您的资金安全。'
  },
  {
    id: 3,
    question: '购买的游戏是正版吗？',
    answer: '是的，我们商城所有游戏均为官方正版授权，提供正规激活码，可直接在游戏平台（如Steam、Epic）激活使用。'
  },
  {
    id: 4,
    question: '如何申请退款？',
    answer: '未激活的数字商品可在购买后7天内申请退款。请通过在线客服或邮箱联系我们，提供订单号和退款原因，我们会在1-3个工作日内处理。'
  },
  {
    id: 5,
    question: '激活码无法使用怎么办？',
    answer: '如果遇到激活码无法使用的情况，请立即联系我们的在线客服，提供订单号和错误信息，我们会尽快为您处理或更换激活码。'
  }
]

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const getTimeString = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const sendMessage = () => {
  if (!inputText.value.trim()) return

  messages.value.push({
    type: 'user',
    text: inputText.value,
    time: getTimeString()
  })

  const userQuestion = inputText.value
  inputText.value = ''
  inputPlaceholder.value = '客服正在输入...'
  scrollToBottom()

  setTimeout(() => {
    const response = getAutoResponse(userQuestion)
    messages.value.push({
      type: 'service',
      text: response,
      time: getTimeString()
    })
    inputPlaceholder.value = '请输入您的问题...'
    scrollToBottom()
  }, 1000)
}

const sendQuickQuestion = (question) => {
  messages.value.push({
    type: 'user',
    text: question.text,
    time: getTimeString()
  })
  scrollToBottom()

  setTimeout(() => {
    messages.value.push({
      type: 'service',
      text: question.answer,
      time: getTimeString()
    })
    scrollToBottom()
  }, 800)
}

const getAutoResponse = (question) => {
  const q = question.toLowerCase()

  if (q.includes('退款') || q.includes('取消')) {
    return '关于退款问题，未激活的数字商品可在购买后7天内申请退款。请提供您的订单号，我会为您跟进处理。'
  }
  if (q.includes('支付') || q.includes('付款')) {
    return '我们支持支付宝、微信支付和银行卡三种支付方式。在结算页面选择您方便的支付方式即可，所有支付均采用加密处理。'
  }
  if (q.includes('激活码') || q.includes('激活')) {
    return '支付成功后，激活码会在24小时内发送到您的注册邮箱。部分商品支持即时发货，您可以在订单详情页面直接查看。'
  }
  if (q.includes('正版') || q.includes('正版授权')) {
    return '请您放心，我们商城所有游戏均为官方正版授权，提供正规激活码，可直接在游戏平台（如Steam、Epic）激活使用。'
  }
  if (q.includes('联系') || q.includes('电话')) {
    return '您可以通过以下方式联系我们：<br>📧 邮箱：support@nexus.com<br>📞 电话：400-888-6666<br>💬 在线客服：7×24小时'
  }

  return '感谢您的咨询，您的问题我已经收到了。为了更好地帮助您，请详细描述一下您遇到的问题，或者选择上面的常见问题快速获取答案。'
}

const toggleFaq = (id) => {
  expandedFaq.value = expandedFaq.value === id ? null : id
}
</script>

<style scoped>
.customer-service {
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
}

.service-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
}

.service-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.title-icon {
  font-size: 2rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.service-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
}

.chat-section {
  background: var(--card-bg);
  border-radius: 20px;
  border: 1px solid rgba(176, 38, 255, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 600px;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(176, 38, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cs-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--dark-bg);
}

.cs-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cs-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cs-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.cs-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--accent-green);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--dark-bg);
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message-text {
  padding: 0.875rem 1.25rem;
  border-radius: 16px;
  line-height: 1.6;
  font-size: 0.95rem;
}

.service-message .message-text {
  background: rgba(176, 38, 255, 0.15);
  border: 1px solid rgba(176, 38, 255, 0.2);
  border-top-left-radius: 4px;
}

.user-message .message-text {
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border-top-right-radius: 4px;
  color: white;
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
  padding: 0 0.5rem;
}

.user-message .message-time {
  text-align: right;
}

.quick-questions {
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.quick-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.quick-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-btn {
  padding: 0.5rem 1rem;
  background: rgba(176, 38, 255, 0.1);
  border: 1px solid rgba(176, 38, 255, 0.3);
  border-radius: 50px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-btn:hover {
  background: rgba(176, 38, 255, 0.3);
  border-color: var(--neon-purple);
}

.chat-input {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.input-field {
  flex: 1;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: all 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
}

.input-field::placeholder {
  color: var(--text-secondary);
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-icon {
  font-size: 1rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-icon {
  font-size: 1.25rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-item:hover {
  background: rgba(176, 38, 255, 0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 0.875rem;
}

.faq-arrow {
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: transform 0.3s;
}

.faq-arrow.active {
  transform: rotate(180deg);
  color: var(--neon-cyan);
}

.faq-answer {
  padding: 0 1rem 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.contact-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.contact-value {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.service-hours {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.hours-row span:first-child {
  color: var(--text-secondary);
}

.hours-row span:last-child {
  color: var(--text-primary);
}

.hours-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.note-icon {
  font-size: 0.875rem;
}

@media (max-width: 968px) {
  .service-content {
    grid-template-columns: 1fr;
  }

  .chat-section {
    height: 500px;
  }

  .page-title {
    font-size: 1.75rem;
  }
}
</style>