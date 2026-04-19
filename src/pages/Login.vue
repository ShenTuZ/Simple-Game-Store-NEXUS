<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">NEXUS</span>
        </div>
        <h1 class="login-title">用户登录</h1>
      </div>

      <div class="login-tabs">
        <button
          class="tab-btn"
          :class="{ active: loginType === 'user' }"
          @click="loginType = 'user'"
        >
          <span class="tab-icon">👤</span>
          普通用户
        </button>
        <button
          class="tab-btn"
          :class="{ active: loginType === 'admin' }"
          @click="loginType = 'admin'"
        >
          <span class="tab-icon">🛠️</span>
          管理员
        </button>
      </div>

      <div class="login-form">
        <div class="form-group">
          <label class="form-label">账号</label>
          <input
            type="text"
            v-model="form.username"
            class="form-input"
            :placeholder="loginType === 'user' ? '请输入用户名' : '请输入管理员账号'"
          />
        </div>

        <div class="form-group">
          <label class="form-label">密码</label>
          <input
            type="password"
            v-model="form.password"
            class="form-input"
            :placeholder="loginType === 'user' ? '请输入密码' : '请输入管理员密码'"
          />
        </div>

        <button
          class="login-btn"
          @click="handleLogin"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span>{{ isLoading ? '登录中...' : '登录' }}</span>
        </button>

        <div class="login-tips" v-if="loginType === 'user'">
          <p>📌 测试账号：</p>
          <p>用户名：user123</p>
          <p>密码：password123</p>
        </div>

        <div class="login-tips" v-else>
          <p>📌 管理员账号：</p>
          <p>用户名：admin</p>
          <p>密码：admin123</p>
        </div>
      </div>

      <div class="login-footer">
        <router-link to="/" class="back-link">
          <span class="back-icon">←</span>
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loginType = ref('user')
const isLoading = ref(false)

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    alert('请输入账号和密码')
    return
  }

  isLoading.value = true

  try {
    const response = await axios.post('http://localhost:3001/api/login', {
      username: form.value.username,
      password: form.value.password,
      type: loginType.value
    })

    const { token, user } = response.data
    
    // 存储登录状态
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userType', loginType.value)

    // 跳转到对应页面
    if (loginType.value === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.log('登录错误:', error)
    if (error.response?.status === 401) {
      alert('账号或密码错误')
    } else if (error.message.includes('Network Error')) {
      alert('网络错误，请检查后端服务器是否运行')
    } else {
      alert('登录失败，请稍后重试')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--dark-bg), #1a1a2e);
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(176, 38, 255, 0.1), transparent 70%),
              radial-gradient(circle at 70% 70%, rgba(0, 240, 255, 0.1), transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-container {
  position: relative;
  z-index: 10;
  background: var(--card-bg);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 480px;
  border: 1px solid rgba(176, 38, 255, 0.2);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(176, 38, 255, 0.1);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 2.5rem;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.login-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 1.1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
}

.form-input::placeholder {
  color: var(--text-secondary);
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(176, 38, 255, 0.4);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-tips {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.login-tips p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.login-tips p:first-child {
  font-weight: 600;
  color: var(--neon-cyan);
}

.login-footer {
  text-align: center;
}

.back-link {
  color: var(--neon-cyan);
  text-decoration: none;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--neon-pink);
}

.back-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .login-container {
    margin: 1rem;
    padding: 2rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>