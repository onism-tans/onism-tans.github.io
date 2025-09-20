# 🎨 我的 Hexo 博客

基于 Hexo + Butterfly 主题搭建的个人博客，支持自动部署到 GitHub Pages。

## ✨ 特性

- 🎨 **美观的界面设计**：采用 Butterfly 主题，支持暗黑模式
- 📱 **响应式布局**：完美适配手机、平板和桌面设备
- 🔍 **强大的搜索功能**：本地搜索，快速找到想要的内容
- 💬 **评论系统**：支持 Waline 评论系统
- 📊 **数据统计**：文章字数统计、阅读时间估算
- 🏷️ **标签和分类**：完善的内容组织结构
- 🚀 **自动部署**：GitHub Actions 自动部署到 GitHub Pages
- 📈 **SEO 优化**：自动生成 sitemap、RSS 订阅

## 🛠️ 技术栈

- **框架**: [Hexo 5.5.0](https://hexo.io/)
- **主题**: [Butterfly](https://butterfly.js.org/)
- **部署**: GitHub Pages + GitHub Actions
- **评论**: Waline
- **搜索**: 本地搜索
- **图床**: 支持 GitHub 图床 / Cloudflare R2

## 📁 项目结构

```
blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── source/                     # 源文件目录
│   ├── _posts/                 # 博客文章
│   ├── about/                  # 关于页面
│   ├── projects/               # 项目经历页面
│   ├── notes/                  # 学习笔记页面
│   ├── tags/                   # 标签页面
│   └── categories/             # 分类页面
├── themes/
│   └── butterfly/              # Butterfly 主题
├── _config.yml                 # Hexo 主配置文件
├── _config.butterfly.yml       # Butterfly 主题配置文件
├── package.json               # 依赖管理
└── README.md                  # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0
- npm >= 8.0
- Git

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/your-blog.git
   cd your-blog
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动本地服务**
   ```bash
   hexo server
   ```
   
   访问 `http://localhost:4000` 预览博客

### 创建新文章

```bash
# 创建新文章
hexo new "文章标题"

# 创建新页面
hexo new page "页面名称"
```

### 生成和部署

```bash
# 清理缓存
hexo clean

# 生成静态文件
hexo generate

# 本地预览
hexo server

# 部署到 GitHub Pages（如果配置了 hexo-deployer-git）
hexo deploy
```

## 📝 配置说明

### 主配置文件 (_config.yml)

主要配置项：

```yaml
# 站点信息
title: 我的博客
subtitle: 分享技术与生活
description: 一个专注于技术分享和个人成长的博客
author: 您的名字
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://yourusername.github.io

# 主题
theme: butterfly

# 插件配置
search:
  path: search.xml
  field: post
  content: true

feed:
  enable: true
  type: atom
  path: atom.xml

sitemap:
  path: sitemap.xml
```

### 主题配置文件 (_config.butterfly.yml)

主要配置项：

```yaml
# 导航菜单
menu:
  首页: / || fas fa-home
  关于我: /about/ || fas fa-user
  项目经历: /projects/ || fas fa-code
  学习笔记: /notes/ || fas fa-book
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open

# 社交链接
social:
  fab fa-github: https://github.com/yourusername || Github
  fas fa-envelope: mailto:your@email.com || Email

# 搜索
search:
  use: local_search
  placeholder: 搜索文章...

# 评论系统
comments:
  use: Waline
  
waline:
  serverURL: https://your-waline-server.vercel.app
  pageview: true
```

## 🖼️ 图床配置

### 方案一：GitHub 图床 + PicGo

1. **创建 GitHub 仓库**
   - 新建一个公开仓库作为图床
   - 生成 Personal Access Token

2. **安装 PicGo**
   ```bash
   # 下载 PicGo 客户端
   # https://github.com/Molunerfinn/PicGo/releases
   ```

3. **配置 PicGo**
   - 图床设置 → GitHub
   - 填入仓库名、分支、Token、存储路径
   - 设置自定义域名：`https://cdn.jsdelivr.net/gh/username/repo@branch/`

### 方案二：Cloudflare R2

1. **创建 R2 存储桶**
2. **配置 PicGo-Core**
   ```bash
   npm install picgo -g
   picgo install s3
   ```

## 🚀 部署到 GitHub Pages

### 自动部署（推荐）

1. **创建 GitHub 仓库**
   ```bash
   # 仓库名必须是：username.github.io
   ```

2. **配置 GitHub Actions**
   - 项目已包含 `.github/workflows/deploy.yml`
   - 推送到 `main` 分支自动部署

3. **设置 GitHub Pages**
   - 仓库设置 → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages"

### 手动部署

1. **安装部署插件**
   ```bash
   npm install hexo-deployer-git --save
   ```

2. **配置部署设置**
   ```yaml
   # _config.yml
   deploy:
     type: git
     repo: https://github.com/yourusername/yourusername.github.io.git
     branch: main
   ```

3. **执行部署**
   ```bash
   hexo deploy
   ```

## 📚 常用命令

```bash
# 安装依赖
npm install

# 清理缓存
hexo clean

# 生成静态文件
hexo generate
# 或简写
hexo g

# 启动本地服务器
hexo server
# 或简写
hexo s

# 部署
hexo deploy
# 或简写
hexo d

# 创建新文章
hexo new post "文章标题"

# 创建新页面
hexo new page "页面名称"

# 生成并部署
hexo g -d
```

## 🔧 自定义配置

### 添加新页面

1. **创建页面**
   ```bash
   hexo new page "页面名称"
   ```

2. **编辑页面内容**
   ```markdown
   ---
   title: 页面标题
   date: 2025-09-20
   type: "页面类型"
   ---
   
   页面内容...
   ```

3. **添加到导航菜单**
   ```yaml
   # _config.butterfly.yml
   menu:
     页面名称: /页面名称/ || fas fa-icon
   ```

### 配置评论系统

#### Waline（推荐）

1. **部署 Waline 服务**
   - 访问 [Waline 官网](https://waline.js.org/)
   - 按照文档部署到 Vercel

2. **配置主题**
   ```yaml
   # _config.butterfly.yml
   waline:
     serverURL: https://your-waline-server.vercel.app
     pageview: true
   ```

#### Gitalk

1. **创建 GitHub OAuth App**
2. **配置主题**
   ```yaml
   # _config.butterfly.yml
   gitalk:
     client_id: your_client_id
     client_secret: your_client_secret
     repo: your_repo
     owner: your_username
     admin: your_username
   ```

## 📊 SEO 优化

### 已配置的插件

- `hexo-generator-sitemap`: 生成站点地图
- `hexo-generator-feed`: 生成 RSS 订阅
- `hexo-generator-searchdb`: 生成搜索数据
- `hexo-abbrlink`: 生成短链接

### 文章 SEO 最佳实践

```markdown
---
title: 文章标题
date: 2025-09-20
categories: [分类名]
tags: [标签1, 标签2]
description: 文章描述，用于 SEO
keywords: 关键词1,关键词2
cover: 封面图片URL
---
```

## 🎨 主题自定义

### 修改颜色主题

编辑 `_config.butterfly.yml`：

```yaml
# 主题色彩
theme_color:
  enable: true
  main: "#49B1F5"
  paginator: "#00C4B6"
  button_hover: "#FF7242"
  text_selection: "#00C4B6"
  link_color: "#99A9BF"
  meta_color: "#858585"
  hr_color: "#A4D8FA"
  code_foreground: "#F47466"
  code_background: "rgba(27, 31, 35, .05)"
  toc_color: "#00C4B6"
  blockquote_padding_color: "#49B1F5"
  blockquote_background_color: "#49B1F5"
  scrollbar_color: "#49B1F5"
```

### 添加自定义 CSS

1. 创建 `source/css/custom.css`
2. 在主题配置中引入：
   ```yaml
   # _config.butterfly.yml
   inject:
     head:
       - <link rel="stylesheet" href="/css/custom.css">
   ```

## 🐛 常见问题

### 1. 主题样式不生效
```bash
hexo clean
hexo generate
```

### 2. 评论系统不显示
检查评论系统配置和网络连接

### 3. 搜索功能无法使用
确保安装了 `hexo-generator-searchdb` 插件

### 4. 部署失败
检查 GitHub Actions 日志，确认仓库权限设置

## 📞 联系方式

- 📧 Email: your@email.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 🌐 博客: [https://yourusername.github.io](https://yourusername.github.io)

## 📄 许可证

MIT License

---

⭐ 如果这个项目对你有帮助，请给个 Star！
