// 等待文档加载完毕
document.addEventListener('DOMContentLoaded', () => {
    /* 预加载消失 */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        // 稍微延迟，让动画更自然
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });

    /* 轮播图切换 */
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    /* 滚动触发动画 */
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    revealElements.forEach(el => observer.observe(el));

    /* 产品轮播控制 */
    const productSlider = document.querySelector('.product-slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let offset = 0;
    const cardWidth = 300; // card width + margin
    const maxOffset = -(productSlider.children.length * cardWidth - cardWidth * 3 - 20);
    const updateSlider = () => {
        productSlider.style.transform = `translateX(${offset}px)`;
    };
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            offset += cardWidth;
            if (offset > 0) offset = maxOffset;
            updateSlider();
        });
        nextBtn.addEventListener('click', () => {
            offset -= cardWidth;
            if (offset < maxOffset) offset = 0;
            updateSlider();
        });

        // 自动轮播：每5秒自动切换到下一组
        let autoSlide = setInterval(() => {
            nextBtn.click();
        }, 5000);
        // 当用户手动点击箭头时，重置计时器以避免干扰体验
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                nextBtn.click();
            }, 5000);
        });
        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                nextBtn.click();
            }, 5000);
        });
    }

    /* 汉堡菜单 */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    }
    // 点击导航链接后关闭菜单
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        });
    });

    /* 返回顶部按钮 */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* 聊天组件 */
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close');
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.toggle('show');
        });
    }
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatBox.classList.remove('show');
        });
    }

    /* 设置当前年份 */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* 数字滚动动画：在加盟页面显示加盟数据时触发 */
    const statNumbers = document.querySelectorAll('.stat-item .number');
    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'));
            if (isNaN(target)) return;
            const duration = 1200;
            const startTime = performance.now();
            const step = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const value = Math.floor(progress * target);
                el.textContent = value;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            };
            requestAnimationFrame(step);
        };
        // 在元素进入视图时触发数字动画
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nums = entry.target.querySelectorAll('.number');
                    nums.forEach(num => {
                        if (!num.dataset.animated) {
                            animateCounter(num);
                            num.dataset.animated = 'true';
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        const statContainers = document.querySelectorAll('.join-stats');
        statContainers.forEach(container => statsObserver.observe(container));
        // 兜底：页面加载后若无滚动仍然启动动画
        setTimeout(() => {
            statNumbers.forEach(num => {
                if (!num.dataset.animated) {
                    animateCounter(num);
                    num.dataset.animated = 'true';
                }
            });
        }, 1500);
    }

    /* 在线客服功能：发送消息到 API */
    const chatSendBtn = document.getElementById('chat-send');
    const chatInputBox = document.getElementById('chat-input');
    const chatMessagesContainer = document.getElementById('chat-messages');
    // 获取或初始化会话 ID
    let sessionId = localStorage.getItem('halu_session_id');
    if (!sessionId) {
        sessionId = 'sess-' + Date.now();
        localStorage.setItem('halu_session_id', sessionId);
    }
    // 辅助函数：追加消息
    function appendMessage(role, text) {
        const msgEl = document.createElement('div');
        msgEl.className = `chat-message ${role}`;
        msgEl.textContent = text;
        chatMessagesContainer.appendChild(msgEl);
        // 滚动到底部
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
    // 发送消息函数
    async function sendChatMessage() {
        const userInput = chatInputBox.value.trim();
        if (!userInput) return;
        appendMessage('user', userInput);
        chatInputBox.value = '';
        // 调用后端 API
        try {
            const response = await fetch('http://127.0.0.1:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session_id: sessionId, user_input: userInput })
            });
            const data = await response.json();
            if (data && data.reply) {
                appendMessage('assistant', data.reply);
            } else {
                appendMessage('assistant', '抱歉，系统暂时无法回复，请稍后再试。');
            }
        } catch (err) {
            console.error(err);
            appendMessage('assistant', '抱歉，客服系统未能连接。');
        }
    }
    if (chatSendBtn && chatInputBox) {
        chatSendBtn.addEventListener('click', sendChatMessage);
        chatInputBox.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    /* 根据当前URL高亮导航 */
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        // 解析锚点 href 并获取文件名
        const link = document.createElement('a');
        link.href = anchor.getAttribute('href');
        const anchorFile = link.pathname.split('/').pop();
        if (current === 'index.html' && anchorFile.startsWith('index')) {
            anchor.classList.add('active');
        } else if (anchorFile && current === anchorFile) {
            anchor.classList.add('active');
        }
    });

    /* 英雄区域鼠标视差效果：
       为首页的吉祥物和口号添加轻微的视差效果，增强互动感。
       鼠标移动时，根据相对位置平移小猪和呼喊框。 */
    const heroSection = document.getElementById('hero');
    const pigWrapper = document.querySelector('.pig-wrapper');
    const callout = document.querySelector('.callout');
    if (heroSection && pigWrapper && callout) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const offsetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const offsetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
            // 移动量乘以像素值，制造柔和的视差效果
            const moveX = offsetX * 30;
            const moveY = offsetY * 30;
            pigWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
            callout.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            pigWrapper.style.transform = '';
            callout.style.transform = '';
        });
    }
});