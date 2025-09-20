// 自定义 JavaScript - Onism's Blog

document.addEventListener('DOMContentLoaded', function() {
    
    // 页面加载完成后的动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 禁用鼠标跟随效果，保持背景简洁
    let isMouseEffectEnabled = false;
    
                function createTechParticle(x, y) {
                    const particle = document.createElement('div');
                    const shapes = ['■', '▲', '●', '◆', '▼'];
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    
                    particle.innerHTML = shape;
                    particle.style.cssText = `
                        position: fixed;
                        left: ${x}px;
                        top: ${y}px;
                        font-size: 12px;
                        font-weight: bold;
                        color: var(--primary-color);
                        pointer-events: none;
                        z-index: 9999;
                        opacity: 0.9;
                        transition: all 1s ease-out;
                        text-shadow: 0 0 5px var(--primary-color);
                    `;

                    document.body.appendChild(particle);

                    // 使用 requestAnimationFrame 优化动画
                    requestAnimationFrame(() => {
                        particle.style.transform = 'scale(0) translateY(-40px) rotate(180deg)';
                        particle.style.opacity = '0';
                    });

                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1000);
                }

    // 滚动视差效果
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', parallaxScroll);

    // 文字打字机效果增强
    function enhanceTyped() {
        const typedElements = document.querySelectorAll('.typed');
        typedElements.forEach(element => {
            element.style.borderRight = '2px solid #ff6b6b';
        });
    }

    // 简化的卡片效果 - 移除3D变换
    function addSimpleCardEffect() {
        const cards = document.querySelectorAll('.recent-post-item, .card-widget');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // 彩虹进度条
    function createRainbowProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'rainbow-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
            background-size: 400% 400%;
            animation: rainbow 2s linear infinite;
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // 代码块复制功能增强
    function enhanceCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.highlight');
        
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.textContent = '复制';
            copyButton.className = 'copy-code-btn';
            copyButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                opacity: 0;
                transition: all 0.3s ease;
            `;
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
            
            block.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            block.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            copyButton.addEventListener('click', () => {
                const code = block.querySelector('code');
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        copyButton.textContent = '已复制!';
                        copyButton.style.background = '#4ecdc4';
                        setTimeout(() => {
                            copyButton.textContent = '复制';
                            copyButton.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                        }, 2000);
                    });
                }
            });
        });
    }

    // 平滑滚动
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 懒加载图片增强
    function enhanceLazyImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // 夜间模式切换动画
    function enhanceThemeToggle() {
        const themeToggle = document.querySelector('[data-theme-toggle]');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.style.transition = 'all 0.5s ease';
                
                // 添加切换动画
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: fixed;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 9999;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(window.innerWidth, window.innerHeight) * 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
                
                document.body.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        }
    }

    // 添加必要的CSS动画
    const additionalStyles = `
        @keyframes ripple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .fade-in {
            animation: fadeInImage 0.6s ease-in-out;
        }
        
        @keyframes fadeInImage {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        body.loaded {
            animation: none;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // 初始化所有效果 - 优化版本
    setTimeout(() => {
        enhanceTyped();
        addSimpleCardEffect();
        createRainbowProgressBar();
        enhanceCodeBlocks();
        smoothScroll();
        enhanceLazyImages();
        enhanceThemeToggle();
    }, 300);

    // 移除页面离开动画，避免跳转卡顿
});

    // 强力移除所有爱心效果
    function removeHeartEffects() {
        // 移除所有包含heart、love、❤等的元素
        const heartSelectors = [
            '.heart', '.love', '[class*="heart"]', '[class*="love"]',
            '[data-heart]', '[id*="heart"]', '[id*="love"]'
        ];
        
        heartSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
        
        // 移除包含爱心符号的元素
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.textContent && /❤|♥|💖|💕|💗|💓|💝/.test(el.textContent)) {
                if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
                    el.remove();
                }
            }
        });
    }

    // 简化男性化点击效果
    function addMasculineClickEffect() {
        document.addEventListener('click', function(e) {
            if (Math.random() > 0.85) { // 15% 概率触发，更加克制
                const techSymbols = ['⚡', '💪', '🚀', '⭐'];
                const symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
                
                const effect = document.createElement('div');
                effect.className = 'click-effect';
                effect.textContent = symbol;
                effect.style.left = e.clientX + 'px';
                effect.style.top = e.clientY + 'px';
                
                document.body.appendChild(effect);
                
                setTimeout(() => {
                    if (effect.parentNode) {
                        effect.parentNode.removeChild(effect);
                    }
                }, 1000);
            }
        });
    }

    // 定期检查和移除爱心效果
    setInterval(removeHeartEffects, 2000);
    
    // 立即执行一次
    removeHeartEffects();
    addMasculineClickEffect();

// 控制台欢迎信息
console.log('%c💪 欢迎来到 Onism\'s Blog! 💪', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%c⚡ 硬核技术，极致性能 ⚡', 'color: #f59e0b; font-size: 16px;');
console.log('%c如果你对这个博客感兴趣，欢迎联系我: onism@example.com', 'color: #45b7d1; font-size: 14px;');
