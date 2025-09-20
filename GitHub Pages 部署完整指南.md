# 🚀 GitHub Pages 部署完整指南

## 📋 部署前准备清单

在开始部署之前，请确保您已经完成：

✅ Hexo博客本地运行正常  
✅ 刘浩存背景图片已配置  
✅ 硬朗男性化主题已应用  
✅ 右下角按钮完全透明  
✅ 所有功能测试通过  

## 🛠️ 第一步：创建GitHub仓库

### 1.1 登录GitHub
访问 [GitHub.com](https://github.com) 并登录您的账户

### 1.2 创建新仓库
点击右上角的 `+` 号，选择 `New repository`

### 1.3 仓库设置
- **Repository name**: `yourusername.github.io` 
  - ⚠️ **重要**：必须是 `您的用户名.github.io` 格式
  - 例如：如果您的用户名是 `onism`，则仓库名应为 `onism.github.io`
- **Description**: `Onism's Personal Blog - 个人技术博客`
- **Public**: 选择公开（免费用户必须选择公开才能使用GitHub Pages）
- **Initialize this repository with**: 不要勾选任何选项（保持空白）

### 1.4 创建仓库
点击 `Create repository` 创建仓库

## 🔧 第二步：配置本地Git

### 2.1 初始化Git仓库
在您的博客目录中打开终端，执行：

```bash
# 初始化Git仓库
git init

# 添加远程仓库
git remote add origin https://github.com/onism-tans/onism-tans.github.io.git

# 替换 yourusername 为您的实际GitHub用户名
# 例如：git remote add origin https://github.com/onism/onism.github.io.git
```

### 2.2 配置Git用户信息
```bash
# 配置用户名和邮箱
git config --global user.name "您的用户名"
git config --global user.email "您的邮箱@example.com"

# 例如：
# git config --global user.name "onism"
# git config --global user.email "onism@example.com"
```

## ⚙️ 第三步：配置Hexo部署

### 3.1 安装部署插件
```bash
npm install hexo-deployer-git --save
```

### 3.2 修改配置文件
编辑 `_config.yml` 文件，找到 `deploy` 部分并修改：

```yaml
# Deployment
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io.git
  branch: main
  message: "Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

**替换说明**：
- 将 `yourusername` 替换为您的实际GitHub用户名
- 确保分支名为 `main`（GitHub默认分支）

### 3.3 创建.gitignore文件
创建 `.gitignore` 文件，内容如下：

```gitignore
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
.vscode/
.idea/
*.tmp
*.temp
```

## 🚀 第四步：部署到GitHub Pages

### 4.1 生成静态文件
```bash
# 清理缓存
hexo clean

# 生成静态文件
hexo generate
```

### 4.2 部署到GitHub
```bash
# 部署到GitHub Pages
hexo deploy
```

首次部署可能需要输入GitHub用户名和密码（或Personal Access Token）。

### 4.3 推送源代码（可选但推荐）
为了备份您的源代码，建议创建一个source分支：

```bash
# 添加所有文件
git add .

# 提交到本地仓库
git commit -m "Initial commit: Onism's Blog with 刘浩存 background"

# 创建并切换到source分支
git checkout -b source

# 推送source分支到GitHub
git push -u origin source
```

## 🌐 第五步：配置GitHub Pages

### 5.1 进入仓库设置
- 访问您的GitHub仓库页面
- 点击 `Settings` 选项卡

### 5.2 配置Pages设置
- 在左侧菜单找到 `Pages`
- **Source**: 选择 `Deploy from a branch`
- **Branch**: 选择 `main`
- **Folder**: 选择 `/ (root)`
- 点击 `Save` 保存设置

### 5.3 等待部署完成
GitHub Pages会自动构建和部署您的网站，通常需要几分钟时间。

## 🎯 第六步：访问您的博客

### 6.1 获取网站地址
部署完成后，您的博客将可通过以下地址访问：
```
https://yourusername.github.io
```

例如：`https://onism.github.io`

### 6.2 验证部署
访问您的网站，确认：
- ✅ 刘浩存背景图片正常显示
- ✅ 硬朗男性化主题应用正确
- ✅ 右下角按钮完全透明
- ✅ 所有页面功能正常

## 🔄 第七步：设置自动部署（推荐）

为了简化后续的部署流程，我们可以使用GitHub Actions自动部署。

### 7.1 创建GitHub Actions工作流
在您的博客根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy Hexo Blog

on:
  push:
    branches: [ source ]  # 当source分支有推送时触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v3
      with:
        ref: source

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install Dependencies
      run: |
        npm install hexo-cli -g
        npm install

    - name: Generate Static Files
      run: |
        hexo clean
        hexo generate

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
        publish_branch: main
        commit_message: 'Deploy: ${{ github.event.head_commit.message }}'
```

### 7.2 推送工作流配置
```bash
# 添加工作流文件
git add .github/workflows/deploy.yml

# 提交更改
git commit -m "Add GitHub Actions auto-deploy workflow"

# 推送到source分支
git push origin source
```

### 7.3 启用自动部署
现在，每当您向source分支推送代码时，GitHub Actions会自动：
1. 安装依赖
2. 生成静态文件
3. 部署到main分支
4. 更新GitHub Pages

## 📝 第八步：日常更新流程

### 8.1 本地写作和测试
```bash
# 创建新文章
hexo new post "文章标题"

# 本地预览
hexo server

# 访问 http://localhost:4000 预览
```

### 8.2 发布到线上（手动部署）
```bash
# 生成并部署
hexo clean && hexo generate && hexo deploy
```

### 8.3 发布到线上（自动部署）
```bash
# 提交到source分支
git add .
git commit -m "Add new post: 文章标题"
git push origin source

# GitHub Actions会自动部署
```

## 🛡️ 第九步：域名配置（可选）

如果您有自定义域名，可以进行以下配置：

### 9.1 添加CNAME文件
在 `source` 目录下创建 `CNAME` 文件（无扩展名），内容为您的域名：
```
yourdomain.com
```

### 9.2 配置DNS
在您的域名提供商处添加CNAME记录：
- **Name**: www
- **Value**: yourusername.github.io

### 9.3 GitHub Pages域名设置
在GitHub仓库的Pages设置中，输入您的自定义域名。

## ⚠️ 常见问题和解决方案

### 问题1：部署后图片不显示
**原因**：图片路径问题
**解决**：确保图片放在 `source/img/` 目录下，并使用相对路径

### 问题2：CSS样式不生效
**原因**：缓存问题
**解决**：
```bash
hexo clean
rm -rf .deploy_git
hexo generate
hexo deploy
```

### 问题3：GitHub Pages构建失败
**原因**：可能是主题或插件兼容性问题
**解决**：检查GitHub Pages的构建日志，根据错误信息修复

### 问题4：访问404错误
**原因**：仓库名不正确或Pages设置错误
**解决**：确保仓库名为 `yourusername.github.io` 格式

## 🎉 部署完成检查清单

部署完成后，请检查以下项目：

### 网站功能
- [ ] 网站可以正常访问
- [ ] 刘浩存背景图片显示正常
- [ ] 硬朗男性化主题应用正确
- [ ] 右下角按钮完全透明
- [ ] 导航栏完全透明
- [ ] 底部版权信息透明
- [ ] 文章页面正常显示
- [ ] 关于我、项目经历、学习笔记页面正常
- [ ] 搜索功能正常
- [ ] 响应式设计在移动端正常

### 性能和SEO
- [ ] 页面加载速度正常
- [ ] 图片压缩适当
- [ ] SEO信息配置正确
- [ ] RSS订阅功能正常

## 📱 移动端优化建议

### 响应式检查
使用以下工具检查移动端表现：
- Chrome DevTools 移动设备模拟
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- 实际手机测试

### 性能优化
- 图片懒加载已启用
- CSS和JS已压缩
- CDN加速已配置

## 🎯 总结

恭喜您！现在您的博客已经成功部署到GitHub Pages：

✅ **完美的视觉效果**：刘浩存背景 + 硬朗男性化主题  
✅ **纯净的界面**：完全透明的导航栏和按钮  
✅ **专业的功能**：完整的博客功能和SEO优化  
✅ **自动化部署**：GitHub Actions自动部署流程  
✅ **全球访问**：通过GitHub Pages全球CDN加速  

您的技术博客现在已经上线，可以向全世界展示您的技术实力和个人风格了！

---

**部署完成后的网站地址**：`https://yourusername.github.io`  
**源代码管理**：source分支  
**自动部署**：推送到source分支自动触发  
**更新频率**：随时更新，实时发布  

🌟 **享受您的线上博客之旅吧！** 🌟

