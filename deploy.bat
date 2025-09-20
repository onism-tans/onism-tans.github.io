@echo off
chcp 65001 >nul
echo 🚀 开始部署 Onism's Blog...

:: 检查是否提供了提交信息
if "%~1"=="" (
    set "COMMIT_MSG=Update blog: %date% %time%"
) else (
    set "COMMIT_MSG=%~1"
)

echo 📝 提交信息: %COMMIT_MSG%

:: 清理缓存
echo 🧹 清理缓存...
call hexo clean
if errorlevel 1 (
    echo ❌ 清理失败，请检查错误信息
    pause
    exit /b 1
)

:: 生成静态文件
echo ⚙️ 生成静态文件...
call hexo generate
if errorlevel 1 (
    echo ❌ 生成失败，请检查错误信息
    pause
    exit /b 1
)

:: 部署到GitHub Pages
echo 🌐 部署到GitHub Pages...
call hexo deploy
if errorlevel 1 (
    echo ❌ 部署失败，请检查错误信息
    pause
    exit /b 1
)

echo ✅ 部署成功！
echo 🌟 您的博客已更新到: https://yourusername.github.io
echo.
echo 📋 部署信息:
echo    - 刘浩存背景: ✅ 已应用
echo    - 硬朗男性化主题: ✅ 已应用
echo    - 透明界面: ✅ 已应用
echo    - 部署时间: %date% %time%

:: 询问是否推送源代码
set /p choice="🤔 是否要推送源代码到source分支? (y/n): "
if /i "%choice%"=="y" (
    echo 📤 推送源代码到source分支...
    git add .
    git commit -m "%COMMIT_MSG%"
    git push origin source
    
    if errorlevel 1 (
        echo ⚠️ 源代码推送失败，但博客已成功部署
    ) else (
        echo ✅ 源代码推送成功！
    )
)

echo.
echo 🎉 部署完成！享受您的线上博客吧！
pause
