import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const games = [
  {
    id: 1,
    name: '星际争霸：重制版',
    nameEn: 'StarCraft: Remastered',
    price: 99,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80',
    description: '经典科幻即时战略游戏重制版，包含高清画质和重制音效。指挥星灵、虫族或人类军队，征服银河系。',
    genre: '即时战略',
    developer: 'Blizzard Entertainment',
    releaseDate: '2017-08-14',
    rating: 4.9,
    features: ['高清重制画质', '跨平台对战', '重制音效', '成就系统'],
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80'
    ]
  },
  {
    id: 2,
    name: '黑暗之魂 III',
    nameEn: 'Dark Souls III',
    price: 198,
    originalPrice: 268,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80',
    description: '备受赞誉的动作RPG续作，探索充满挑战的黑暗世界。考验你的技巧、策略与耐心。',
    genre: '动作角色扮演',
    developer: 'FromSoftware',
    releaseDate: '2016-04-12',
    rating: 4.8,
    features: ['硬核战斗系统', '深度剧情', '联机模式', '多结局'],
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80'
    ]
  },
  {
    id: 3,
    name: '巫师 3：狂猎',
    nameEn: 'The Witcher 3: Wild Hunt',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80',
    description: '开放世界动作RPG巅峰之作，扮演猎魔人杰洛特，踏遍大陆寻找失踪的爱人。',
    genre: '开放世界',
    developer: 'CD Projekt RED',
    releaseDate: '2015-05-19',
    rating: 4.9,
    features: ['庞大开放世界', '深度决策系统', '昆特牌', '资料片完整版'],
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80'
    ]
  },
  {
    id: 4,
    name: '艾尔登法环',
    nameEn: 'Elden Ring',
    price: 298,
    originalPrice: 398,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80',
    description: '宫崎英高与乔治·R·R·马丁联手打造，广受好评的开放世界动作RPG。',
    genre: '开放世界',
    developer: 'FromSoftware',
    releaseDate: '2022-02-25',
    rating: 4.9,
    features: ['开放世界设计', '魂系战斗', '合作模式', '丰富探索内容'],
    screenshots: [
      'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80'
    ]
  },
  {
    id: 5,
    name: '赛博朋克 2077',
    nameEn: 'Cyberpunk 2077',
    price: 149,
    originalPrice: 298,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=1920&q=80',
    description: '来自 CD Projekt RED 的史诗级开放世界RPG，设定在未来的夜之城。',
    genre: '开放世界',
    developer: 'CD Projekt RED',
    releaseDate: '2020-12-10',
    rating: 4.5,
    features: ['沉浸式夜城', '自由定制', '多结局剧情', 'DLC资料片'],
    screenshots: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
      'https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&q=80'
    ]
  },
  {
    id: 6,
    name: '博德之门 3',
    nameEn: 'Baldur\'s Gate 3',
    price: 298,
    originalPrice: 358,
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=1920&q=80',
    description: '拉瑞安工作室打造的经典CRPG续作，沉浸式的回合制战斗与史诗剧情。',
    genre: '角色扮演',
    developer: 'Larian Studios',
    releaseDate: '2023-08-03',
    rating: 4.9,
    features: ['回合制战斗', '高度自由', '多人合作', '分支剧情'],
    screenshots: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80',
      'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800&q=80'
    ]
  },
  {
    id: 7,
    name: '只狼：影逝二度',
    nameEn: 'Sekiro: Shadows Die Twice',
    price: 168,
    originalPrice: 268,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80',
    description: '宫崎英高新作，扮演孤独的忍者，为主复仇并夺回荣誉。',
    genre: '动作冒险',
    developer: 'FromSoftware',
    releaseDate: '2019-03-22',
    rating: 4.8,
    features: ['忍术战斗', '潜行系统', '精美日本战国场景', '高难度挑战'],
    screenshots: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80'
    ]
  },
  {
    id: 8,
    name: '霍格沃茨之遗',
    nameEn: 'Hogwarts Legacy',
    price: 248,
    originalPrice: 298,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=1920&q=80',
    description: '沉浸式开放世界动作RPG，探索霍格沃茨魔法世界的秘密。',
    genre: '开放世界',
    developer: 'Avalanche Software',
    releaseDate: '2023-02-10',
    rating: 4.7,
    features: ['魔法世界探索', '炼金术系统', '魔法战斗', '分支选择'],
    screenshots: [
      'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=80',
      'https://images.unsplash.com/photo-1476546893973-7d3ac48f4e37?w=800&q=80'
    ]
  },
  {
    id: 9,
    name: '荒野大镖客：救赎 2',
    nameEn: 'Red Dead Redemption 2',
    price: 199,
    originalPrice: 329,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
    description: 'Rockstar打造的西部开放世界杰作，体验亡命之徒的传奇人生。',
    genre: '开放世界',
    developer: 'Rockstar Games',
    releaseDate: '2018-10-26',
    rating: 4.9,
    features: ['逼真开放世界', '主线剧情', '在线模式', '丰富活动'],
    screenshots: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
    ]
  },
  {
    id: 10,
    name: '死亡搁浅',
    nameEn: 'Death Stranding',
    price: 149,
    originalPrice: 298,
    image: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80',
    background: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
    description: '小岛秀夫打造的创新之作，连接破碎的世界，传递希望。',
    genre: '动作冒险',
    developer: 'Kojima Productions',
    releaseDate: '2019-11-08',
    rating: 4.6,
    features: ['独特配送玩法', '异步联机', '深度剧情', '明星阵容'],
    screenshots: [
      'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80'
    ]
  }
];

let cart = [];
let orders = [];

const users = [
  {
    id: 1,
    username: 'user123',
    password: 'password123',
    type: 'user',
    email: 'user123@example.com'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    type: 'admin',
    email: 'admin@example.com'
  }
];

app.get('/api/games', (req, res) => {
  res.json(games);
});

app.get('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: '游戏不存在' });
  }
  res.json(game);
});

app.get('/api/cart', (req, res) => {
  const cartWithDetails = cart.map(item => {
    const game = games.find(g => g.id === item.id);
    return { ...item, game };
  });
  res.json(cartWithDetails);
});

app.post('/api/cart', (req, res) => {
  const { id } = req.body;
  const game = games.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ error: '游戏不存在' });
  }
  
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    return res.status(400).json({ error: '游戏已在购物车中' });
  }
  
  cart.push({ id, quantity: 1 });
  res.json({ message: '已添加到购物车', cart });
});

app.delete('/api/cart/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json({ message: '已从购物车移除', cart });
});

app.post('/api/orders', (req, res) => {
  const { items, total, customerInfo, paymentMethod } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: '购物车为空' });
  }
  
  if (!customerInfo || !customerInfo.name || !customerInfo.email) {
    return res.status(400).json({ error: '请填写完整的用户信息' });
  }
  
  const orderId = 'ORD' + Date.now();
  const order = {
    id: orderId,
    items,
    total,
    customerInfo,
    paymentMethod,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  cart = [];
  
  res.json({ 
    success: true, 
    orderId,
    message: '订单创建成功',
    order 
  });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: '订单不存在' });
  }
  res.json(order);
});

app.post('/api/login', (req, res) => {
  const { username, password, type } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password && u.type === type);
  
  if (!user) {
    return res.status(401).json({ error: '账号或密码错误' });
  }
  
  // 生成简单的token
  const token = 'token_' + Date.now() + '_' + user.id;
  
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      type: user.type,
      email: user.email
    }
  });
});

app.listen(PORT, () => {
  console.log(`游戏商城服务器运行在 http://localhost:${PORT}`);
});