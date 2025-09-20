#!/bin/bash

# Hexo博客快速部署脚本
# 使用方法: ./deploy.sh "提交信息"

echo "🚀 开始部署 Onism's Blog..."

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    COMMIT_MSG="Update blog: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo "📝 提交信息: $COMMIT_MSG"

# 清理缓存
echo "🧹 清理缓存..."
hexo clean

# 生成静态文件
echo "⚙️ 生成静态文件..."
hexo generate

# 检查生成是否成功
if [ $? -ne 0 ]; then
    echo "❌ 生成失败，请检查错误信息"
    exit 1
fi

# 部署到GitHub Pages
echo "🌐 部署到GitHub Pages..."
hexo deploy

# 检查部署是否成功
if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌟 您的博客已更新到: https://yourusername.github.io"
    echo ""
    echo "📋 部署信息:"
    echo "   - 刘浩存背景: ✅ 已应用"
    echo "   - 硬朗男性化主题: ✅ 已应用" 
    echo "   - 透明界面: ✅ 已应用"
    echo "   - 部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi

# 可选：推送源代码到source分支
read -p "🤔 是否要推送源代码到source分支? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 推送源代码到source分支..."
    git add .
    git commit -m "$COMMIT_MSG"
    git push origin source
    
    if [ $? -eq 0 ]; then
        echo "✅ 源代码推送成功！"
    else
        echo "⚠️ 源代码推送失败，但博客已成功部署"
    fi
fi

echo ""
echo "🎉 部署完成！享受您的线上博客吧！"
