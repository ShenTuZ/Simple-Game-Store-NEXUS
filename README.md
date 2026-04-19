# NEXUS 游戏商城

🎮 现代化游戏售卖平台，基于 Vue 3 + Node.js 开发

![NEXUS Game Store](Webpage%20images.png)

## 项目简介

NEXUS 游戏商城是一个完整的游戏售卖平台，提供从浏览游戏、加入购物车、结算支付到订单管理的全流程功能。

## 技术栈

### 前端
- **框架**: Vue 3 + Composition API
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **构建工具**: Vite 8
- **样式**: 原生 CSS + CSS 变量
- **字体**: Google Fonts (Orbitron + Noto Sans SC)

### 后端
- **运行环境**: Node.js 18+
- **Web 框架**: Express
- **跨域处理**: CORS
- **数据存储**: 内存存储 (开发环境)

## 功能特性

### 🎮 核心功能
- **游戏浏览**: 10款精选游戏展示，支持分类筛选
- **购物车管理**: 添加/移除商品，查看购物车
- **结算流程**: 用户信息填写，多种支付方式选择
- **订单管理**: 订单创建和查询
- **客服系统**: 在线客服聊天，常见问题解答

### 🔐 用户系统
- **用户登录**: 普通用户登录
- **管理员登录**: 管理后台访问
- **权限控制**: 管理员专属功能

### 🛠️ 管理后台
- **游戏管理**: 查看和管理游戏列表
- **订单管理**: 查看所有订单
- **用户管理**: 查看用户列表

## 项目结构

```
vue-demo/
├── src/                    # 前端源码
│   ├── main.js            # 应用入口
│   ├── App.vue            # 根组件
│   ├── router/            # 路由配置
│   ├── pages/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── GameDetail.vue # 游戏详情
│   │   ├── Cart.vue       # 购物车
│   │   ├── Checkout.vue   # 结算
│   │   ├── OrderSuccess.vue # 订单成功
│   │   ├── CustomerService.vue # 客服
│   │   ├── Login.vue      # 登录
│   │   └── Admin.vue      # 管理后台
│   └── assets/            # 静态资源
├── server/                 # 后端服务器
│   ├── server.js          # Express 服务器
│   └── package.json       # 后端依赖
├── index.html             # 入口 HTML
├── package.json           # 前端依赖
└── vite.config.js         # Vite 配置
```

## 安装与运行

### 前端安装

```bash
# 进入项目目录
cd vue-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问: http://localhost:5173
```

### 后端安装

```bash
# 进入服务器目录
cd vue-demo/server

# 安装依赖
npm install

# 启动后端服务器
npm start
# 运行在: http://localhost:3001
```

## 测试账号

### 普通用户
- **用户名**: user123
- **密码**: password123

### 管理员
- **用户名**: admin
- **密码**: admin123

## 功能演示

### 1. 游戏浏览
- 首页展示10款精选游戏
- 支持按游戏类型筛选
- 游戏卡片悬停效果

### 2. 购物流程
- 点击游戏进入详情页
- 加入购物车或立即购买
- 购物车管理和结算

### 3. 登录系统
- 普通用户登录
- 管理员登录
- 登录状态持久化

### 4. 管理后台
- 游戏管理
- 订单管理
- 用户管理

## 项目特色

- **现代化界面**: 赛博朋克风格，霓虹色彩
- **响应式设计**: 适配不同屏幕尺寸
- **完整的购买流程**: 从浏览到支付的全流程
- **用户友好**: 直观的界面和交互
- **可扩展性**: 模块化设计，易于扩展

## 开发说明

### 前端开发
- 使用 Vue 3 Composition API
- 组件化开发
- 路由配置在 `src/router/index.js`

### 后端开发
- Express 服务器
- RESTful API 设计
- 模拟数据存储

## 部署说明

### 前端构建

```bash
npm run build
# 构建产物在 dist 目录
```

### 后端部署
- 可部署到任何 Node.js 环境
- 建议使用 PM2 进行进程管理

## 许可证

MIT License

**NEXUS Game Store** - 探索游戏世界，释放无限激情！