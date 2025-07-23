// ロゴコンポーネントを動的に読み込む関数
async function loadLogo(targetElement) {
    try {
        const response = await fetch('components/logo.html');
        const logoHtml = await response.text();
        
        if (targetElement) {
            targetElement.innerHTML = logoHtml;
        }
    } catch (error) {
        console.error('ロゴの読み込みに失敗しました:', error);
    }
}

// ページ読み込み時にロゴを表示
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        loadLogo(logoContainer);
    }
});

// ロゴのアニメーション効果を強化
function enhanceLogoAnimation() {
    const logo = document.querySelector('.ascii-logo');
    if (logo) {
        // マウスオーバー時の追加効果
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // クリック時の効果
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// ページ読み込み完了後にアニメーション効果を適用
window.addEventListener('load', enhanceLogoAnimation); 

