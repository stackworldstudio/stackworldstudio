document.addEventListener('DOMContentLoaded', () => {

    /* ===== THEME TOGGLE (DARK/LIGHT MODE) ===== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check localStorage for preferred theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    /* ===== MOBILE MENU TOGGLE ===== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ===== TYPING ANIMATION ===== */
    const nameText = "Joy Pramanik";
    const typingElement = document.getElementById('typing-name');
    let i = 0;
    
    function typeWriter() {
        if (i < nameText.length) {
            typingElement.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation with a small delay
    setTimeout(typeWriter, 500);

    /* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ===== DISCOUNT PRICE AUTO CALCULATION (Integrated from Website B) ===== */
    const priceElements = document.querySelectorAll('.discount-calc');
    
    priceElements.forEach(element => {
        const originalPriceAttr = element.getAttribute('data-original');
        const discountAttr = element.getAttribute('data-discount');
        
        if (originalPriceAttr && discountAttr) {
            const originalPrice = parseFloat(originalPriceAttr);
            const discountPercentage = parseFloat(discountAttr);
            
            // Calculate final price: Final = Original - (Original * Discount / 100)
            const finalPrice = originalPrice - (originalPrice * discountPercentage / 100);
            
            // Format as currency
            const formatCurrency = (amount) => {
                return '$' + amount.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            };

            // Inject HTML structure identical to A and B
            element.innerHTML = `
                <span class="original-price">${formatCurrency(originalPrice)}</span>
                <span class="discount-badge">-${discountPercentage}%</span>
                <div class="final-price">${formatCurrency(finalPrice)}</div>
            `;
        }
    });

    /* ===== SCROLL REVEAL ANIMATIONS ===== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };
    
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ===== DYNAMIC HEADER STYLE ON SCROLL ===== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--nav-shadow)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });
});
