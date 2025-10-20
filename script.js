// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/68a7c7a062427d192461c06c/1j37m7j02';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

<!-- Hotjar Tracking Code for dry-ice-blasting-machine -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6501246,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Scenarios Carousel Logic
    const scenariosCarouselWrapper = document.getElementById('carousel-wrapper');
    if (scenariosCarouselWrapper) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let isDesktop = window.innerWidth > 768;
        let currentSlide = 0;

        const scrollCarousel = (direction) => {
            const slide = scenariosCarouselWrapper.querySelector('.carousel-slide');
            if (!slide) return;

            const slideStyle = window.getComputedStyle(slide);
            const slideMargin = parseFloat(slideStyle.marginRight);
            const scrollWidth = slide.offsetWidth + slideMargin;
            const scrollAmount = direction === 'next' ? scrollWidth : -scrollWidth;

            scenariosCarouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        };

        function updateDesktopCarousel() {
            if (isDesktop) {
                const slideWidth = 400 + 32;
                const totalSlides = scenariosCarouselWrapper.children.length;
                const visibleSlides = Math.floor(scenariosCarouselWrapper.parentElement.offsetWidth / slideWidth);
                const maxTranslate = Math.max(0, totalSlides - visibleSlides);
                currentSlide = Math.max(0, Math.min(currentSlide, maxTranslate));
                scenariosCarouselWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            } else {
                scenariosCarouselWrapper.style.transform = 'none';
            }
        }

        prevBtn.addEventListener('click', () => {
            if(isDesktop) {
                 if (currentSlide > 0) {
                      currentSlide--;
                      updateDesktopCarousel();
                 }
            } else {
                scrollCarousel('prev');
            }
        });
        nextBtn.addEventListener('click', () => {
            if (isDesktop) {
                const slideWidth = 400 + 32;
                const totalSlides = scenariosCarouselWrapper.children.length;
                const visibleSlides = Math.floor(scenariosCarouselWrapper.parentElement.offsetWidth / slideWidth);
                const maxTranslate = Math.max(0, totalSlides - visibleSlides);
                if (currentSlide < maxTranslate) {
                    currentSlide++;
                    updateDesktopCarousel();
                }
            } else {
                scrollCarousel('next');
            }
        });

        window.addEventListener('resize', () => {
            const wasDesktop = isDesktop;
            isDesktop = window.innerWidth > 768;
            if (isDesktop !== wasDesktop) {
                updateDesktopCarousel();
            }
        });

        updateDesktopCarousel();
    }

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });

            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // Button interactions
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-btn, .btn-solid-white, .btn-dark').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('#') || !href.includes('mailto:'))) return;

            if (href && href.includes('mailto:')) {
                e.preventDefault();
            }

            const text = this.textContent.trim();
            let toastText = '';
            let toastStyle = { background: "linear-gradient(to right, #1d1d1f, #3c3c3e)" };
            let isSuccess = false;

            if (text === 'Get Discount') {
                toastText = 'Opening your email client to send a quote request!';
                isSuccess = true;
                setTimeout(() => { window.location.href = href; }, 1000);
            }

            if (isSuccess) {
                toastStyle.background = "linear-gradient(to right, #00b09b, #96c93d)";
            }

            if (toastText) {
                Toastify({
                    text: toastText,
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    style: toastStyle,
                }).showToast();
            }
        });
    });

    // Product Image Gallery & Lightbox Logic
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const scroller = document.querySelector('.product-image-scroller');
    const indicator = document.querySelector('.scroll-indicator');

    if (scroller && indicator) {
        scroller.addEventListener('scroll', () => {
            indicator.classList.add('hidden');
        }, { once: true });
    }

    if(mainProductImage && thumbnailImages.length > 0) {
        thumbnailImages.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnailImages.forEach(img => img.classList.remove('active'));
                this.classList.add('active');
                mainProductImage.src = this.src;
            });
        });

        mainProductImage.addEventListener('click', () => {
            lightboxImage.src = mainProductImage.src;
            lightbox.classList.add('active');
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Comparison Carousel Logic
    const comparisonData = [
        {
            title: "Food Molds",
            description: "Rust buildup on food molds can affect the quality of the products and cause contamination risks, With rust removed, the molds are restored to a clean, smooth surface, ensuring high-quality products and eliminating contamination concerns.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-Adhesive-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-Adhesive-after.webp"
        },
        {
            title: "Fuel Injectors",
            description: "Carbon buildup in the fuel injectors can lead to poor fuel atomization, reducing engine performance and fuel efficiency, After, the injectors are free of carbon deposits, allowing for smooth fuel atomization and optimal engine performance and fuel efficiency.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-carbon-deposits-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-carbon-deposits-after.webp"
        },
        {
            title: "Control Arms",
            description: "Accumulated carbon on the suspension control arms can restrict movement, leading to poor performance and faster wear, With carbon deposits removed, the control arms operate smoothly, improving suspension performance and extending the lifespan of the components.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-Control-arm-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-Control-arm-after.webp"
        },
        {
            title: "Shock Absorbers",
            description: "Residues and dust on the shock absorbers can affect their performance, leading to a rougher ride and less effective dampening, With residues and dust removed, the shock absorbers function at their best, providing a smoother ride and improved suspension performance.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-Damper-Residues-Dust-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-Damper-Residues-Dust-after.webp"
        },
        {
            title: "Driveshaft",
            description: "Dirt, grease, and debris on the driveshaft can affect performance and cause wear over time. Conventional cleaning methods can’t reach all the tough spots, The driveshaft is completely clean, free of grime and buildup, ensuring smooth performance and extending the lifespan of the components.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-CSB-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-CSB-after.webp"
        },
        {
            title: "Ball Joints",
            description: "Heavy grease and dust buildup on the ball joints can affect steering performance, leading to stiffness and wear over time, Once the grease and dust are removed, the ball joints function smoothly, improving steering response and overall performance.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-Dust-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-Dust-after.webp"
        },
        {
            title: "Engine Bay Bottom",
            description: "Grease and dirt under the engine can lead to overheating and reduced performance. Traditional cleaning methods can’t get into tight spots and can be messy, After The engine’s underside is spotless and free of grime, improving cooling efficiency and performance—no mess, no chemicals.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-oil-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-oil-after.webp"
        },
        {
            title: "Exhaust System",
            description: "Carbon buildup and grime in your car’s exhaust system can cause poor performance and increased emissions. Conventional cleaning methods can’t reach deep into the system, After,the exhaust system is free of carbon and contaminants, improving engine performance and reducing emissions—clean, efficient, and environmentally friendly!",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-oil-sludge-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-oil-sludge-after.webp"
        },
        {
            title: "Oil Pan",
            description: "Oil buildup and sludge in the oil pan can reduce engine efficiency and cause overheating. Traditional cleaning methods often fail to remove all the debris, After, the oil pan is spotless, free of sludge and contaminants, ensuring better oil flow and improved engine performance.",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-suspension-arm-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-suspension-arm-after.webp"
        },
        {
            title: "Transmission",
            description: "Grease, dirt, and residue on your transmission can lead to overheating and reduced efficiency. Traditional cleaning methods often struggle with precision and risk causing damage, dry ice blaster thoroughly removes grime from your transmission, ensuring optimal performance and extending its lifespan. No water, no chemicals—just safe, efficient cleaning for vital components!",
            before_img: "/images/power-in-action/dry-ice-blaster-cleaning-Transmission-before.webp",
            after_img: "/images/power-in-action/dry-ice-blaster-cleaning-Transmission-after.webp"
        }
    ];

    const imageWrapper = document.querySelector('.carousel-image-wrapper');
    const textWrapper = document.querySelector('.comparison-text');

    if (imageWrapper && textWrapper) {
        comparisonData.forEach((item) => {
            const slide = document.createElement('div');
            slide.className = 'comparison-slide';
            slide.innerHTML = `
                <div class="comparison-image-container">
                    <img src="${item.before_img}" alt="${item.title} Before">
                    <span class="comparison-image-label">Before</span>
                </div>
                <div class="comparison-image-container">
                    <img src="${item.after_img}" alt="${item.title} After">
                    <span class="comparison-image-label">After</span>
                </div>
            `;
            imageWrapper.appendChild(slide);

            const textBlock = document.createElement('div');
            textBlock.className = 'text-block';
            textBlock.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            textWrapper.appendChild(textBlock);
        });

        let currentComparisonIndex = 0;
        const slides = document.querySelectorAll('.comparison-slide');
        const textBlocks = document.querySelectorAll('.text-block');
        const prevBtn = document.getElementById('comparison-prev');
        const nextBtn = document.getElementById('comparison-next');
        const counter = document.getElementById('comparison-counter');

        function updateComparisonView(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            textBlocks.forEach(block => block.classList.remove('active'));

            slides[index].classList.add('active');
            textBlocks[index].classList.add('active');
            counter.textContent = `${index + 1} / ${slides.length}`;
        }

        nextBtn.addEventListener('click', () => {
            currentComparisonIndex = (currentComparisonIndex + 1) % slides.length;
            updateComparisonView(currentComparisonIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentComparisonIndex = (currentComparisonIndex - 1 + slides.length) % slides.length;
            updateComparisonView(currentComparisonIndex);
        });

        updateComparisonView(0);
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const navOverlay = document.getElementById('nav-overlay');
    const mobileLinks = document.querySelectorAll('#mobile-nav a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Attachments Carousel
    const attachmentsCarouselWrapper = document.getElementById('attachments-carousel-wrapper');
    if (attachmentsCarouselWrapper) {
        const attachmentsPrevBtn = document.getElementById('attachments-prev-btn');
        const attachmentsNextBtn = document.getElementById('attachments-next-btn');
        let attachmentsIsDesktop = window.innerWidth > 768;
        let attachmentsCurrentSlide = 0;

        const getAttachmentsSlideWidth = () => {
            const firstSlide = attachmentsCarouselWrapper.querySelector('.attachment-card');
            if (!firstSlide) return 0;
            const slideStyle = window.getComputedStyle(firstSlide);
            const slideMargin = parseFloat(slideStyle.marginRight);
            return firstSlide.offsetWidth + slideMargin;
        };

        const scrollAttachmentsCarousel = (direction) => {
            const scrollWidth = getAttachmentsSlideWidth();
            const scrollAmount = direction === 'next' ? scrollWidth : -scrollWidth;
            attachmentsCarouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        };

        function updateAttachmentsDesktopCarousel() {
            if (attachmentsIsDesktop) {
                const slideWidth = getAttachmentsSlideWidth();
                if (slideWidth === 0) return;
                const totalSlides = attachmentsCarouselWrapper.children.length;
                const containerWidth = attachmentsCarouselWrapper.parentElement.offsetWidth;
                const visibleSlides = Math.floor(containerWidth / slideWidth);
                const maxTranslate = Math.max(0, totalSlides - visibleSlides);

                attachmentsCurrentSlide = Math.max(0, Math.min(attachmentsCurrentSlide, maxTranslate));
                attachmentsCarouselWrapper.style.transform = `translateX(-${attachmentsCurrentSlide * slideWidth}px)`;
            } else {
                attachmentsCarouselWrapper.style.transform = 'none';
            }
        }

        attachmentsPrevBtn.addEventListener('click', () => {
            if (attachmentsIsDesktop) {
                if (attachmentsCurrentSlide > 0) {
                    attachmentsCurrentSlide--;
                    updateAttachmentsDesktopCarousel();
                }
            } else {
                scrollAttachmentsCarousel('prev');
            }
        });

        attachmentsNextBtn.addEventListener('click', () => {
            if (attachmentsIsDesktop) {
                const slideWidth = getAttachmentsSlideWidth();
                if (slideWidth === 0) return;
                const totalSlides = attachmentsCarouselWrapper.children.length;
                const containerWidth = attachmentsCarouselWrapper.parentElement.offsetWidth;
                const visibleSlides = Math.floor(containerWidth / slideWidth);
                const maxTranslate = Math.max(0, totalSlides - visibleSlides);

                if (attachmentsCurrentSlide < maxTranslate) {
                    attachmentsCurrentSlide++;
                    updateAttachmentsDesktopCarousel();
                }
            } else {
                scrollAttachmentsCarousel('next');
            }
        });

        window.addEventListener('resize', () => {
            const wasDesktop = attachmentsIsDesktop;
            attachmentsIsDesktop = window.innerWidth > 768;
            if (attachmentsIsDesktop !== wasDesktop) {
                updateAttachmentsDesktopCarousel();
            }
        });

        setTimeout(updateAttachmentsDesktopCarousel, 100);
    }

    // Page Progress Indicator Logic
    const progressContainer = document.getElementById('page-progress');
    if (progressContainer) {
        const navLinksForProgress = document.querySelectorAll('.nav-right .nav-links a');
        const sectionsToObserve = [];
        let scrollTimeout;

        progressContainer.innerHTML = '';
        navLinksForProgress.forEach(link => {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                sectionsToObserve.push(section);
                const dot = document.createElement('a');
                dot.classList.add('progress-dot');
                dot.href = `#${sectionId}`;
                dot.dataset.section = sectionId;
                progressContainer.appendChild(dot);
            }
        });

        const progressDots = document.querySelectorAll('.progress-dot');

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    progressDots.forEach(dot => {
                        dot.classList.toggle('active', dot.dataset.section === id);
                    });
                }
            });
        }, { rootMargin: "-30% 0px -70% 0px" });

        sectionsToObserve.forEach(section => progressObserver.observe(section));

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            progressContainer.classList.add('visible');
            scrollTimeout = setTimeout(() => {
                progressContainer.classList.remove('visible');
            }, 2000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== NEW: Subscription Form AJAX Submission =====
    const subForm = document.getElementById('subscription-form');
    if (subForm) {
        subForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submittingToast = Toastify({
                text: "Submitting your request...",
                duration: -1,
                gravity: "bottom",
                position: "right",
                style: { background: "linear-gradient(to right, #1d1d1f, #3c3c3e)" }
            }).showToast();
            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                submittingToast.hideToast();
                if (response.ok) {
                    Toastify({
                        text: "Thanks for subscribing! 🎉",
                        duration: 5000,
                        gravity: "bottom",
                        position: "right",
                        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
                    }).showToast();
                    form.reset();
                } else {
                    response.json().then(data => {
                        let errorMessage = "Oops! Something went wrong.";
                        if (data.errors) {
                            errorMessage = data.errors.map(error => error.message).join(", ");
                        }
                        Toastify({
                            text: errorMessage,
                            duration: 5000,
                            gravity: "bottom",
                            position: "right",
                            style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
                        }).showToast();
                    })
                }
            }).catch(error => {
                submittingToast.hideToast();
                Toastify({
                    text: "Oops! There was a problem with your submission.",
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
                }).showToast();
            });
        });
    }
});
