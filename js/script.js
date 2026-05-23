// Navbar Scroll Logic
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.remove('bg-white/0');
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.add('bg-white/0');
        }
    });
}

const observerOptions = {
    threshold: 0.5
};

const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 detik
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        // Easing function (easeOutExpo)
        const currentCount = target * (1 - Math.pow(2, -10 * progress));

        if (frame < totalFrames) {
            el.innerText = isDecimal
                ? currentCount.toFixed(1) + suffix
                : Math.floor(currentCount) + suffix;
            requestAnimationFrame(animate);
        } else {
            el.innerText = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
    };
    animate();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target); // Hanya animasi satu kali
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number[data-target]').forEach(num => {
    observer.observe(num);
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;

        // Tutup item lain yang mungkin sedang terbuka (opsional)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });

        // Toggle item yang diklik
        faqItem.classList.toggle('active');
    });
});

// Testimonial Carousel Logic
const testimonials = [
    {
        text: "Nemo enim ipsam voluptatem quia voluptas sit na aut odit aut fugit, sed quia consearuntuo magni lores eos qui ratione volutatem sequi nesciuntpor auisuam est rui dolorem ipsum.",
        name: "Daniel Jemmi",
        role: "Happy Client"
    },
    {
        text: "The pet hotel services are absolutely phenomenal. My dog was so well taken care of, and the daily photo updates gave me such peace of mind. Highly recommend their services to everyone!",
        name: "Sarah Jenkins",
        role: "Dog Owner"
    },
    {
        text: "Excellent grooming service! They handled my nervous cat with such care and patience. She came back looking beautiful and smelling amazing. I won't go anywhere else now.",
        name: "Michael Rossi",
        role: "Cat Parent"
    },
    {
        text: "I love the 24/7 availability and the premium care they provide. The staff is incredibly knowledgeable and truly loves animals. My pets always get excited when we pull up to the clinic.",
        name: "Emily Chen",
        role: "Pet Enthusiast"
    }
];

let currentTestimonialIndex = 0;

const testimonialText = document.getElementById('testimonial-text');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');

const updateTestimonial = (index) => {
    if (!testimonialText) return;
    
    // Fade out
    testimonialText.style.opacity = 0;
    testimonialName.style.opacity = 0;
    testimonialRole.style.opacity = 0;

    setTimeout(() => {
        testimonialText.innerText = testimonials[index].text;
        testimonialName.innerText = testimonials[index].name;
        testimonialRole.innerText = testimonials[index].role;

        // Fade in
        testimonialText.style.opacity = 1;
        testimonialName.style.opacity = 1;
        testimonialRole.style.opacity = 1;
    }, 300);
};

document.getElementById('prev-testimonial')?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
});

document.getElementById('next-testimonial')?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
});

// Pricing Toggle Logic
const toggleMonthly = document.getElementById('toggle-monthly');
const toggleYearly = document.getElementById('toggle-yearly');

const priceFriendly = document.getElementById('price-friendly');
const priceFamily = document.getElementById('price-family');
const priceExclusive = document.getElementById('price-exclusive');

const suffixFriendly = document.getElementById('suffix-friendly');
const suffixFamily = document.getElementById('suffix-family');
const suffixExclusive = document.getElementById('suffix-exclusive');

if (toggleMonthly && toggleYearly) {
    const activeClasses = ['bg-[#111827]', 'text-white', 'shadow-md'];
    const inactiveClasses = ['text-gray-500', 'hover:text-gray-900'];

    toggleMonthly.addEventListener('click', () => {
        // Style changes
        toggleMonthly.classList.remove(...inactiveClasses);
        toggleMonthly.classList.add(...activeClasses);
        
        toggleYearly.classList.remove(...activeClasses);
        toggleYearly.classList.add(...inactiveClasses);

        // Value changes (Monthly)
        priceFriendly.style.opacity = 0;
        priceFamily.style.opacity = 0;
        priceExclusive.style.opacity = 0;
        
        setTimeout(() => {
            priceFriendly.innerText = '150k';
            priceFamily.innerText = '200k';
            priceExclusive.innerText = '300k';

            suffixFriendly.innerText = '/visit';
            suffixFamily.innerText = '/visit';
            suffixExclusive.innerText = '/visit';

            priceFriendly.style.opacity = 1;
            priceFamily.style.opacity = 1;
            priceExclusive.style.opacity = 1;
        }, 150);
    });

    toggleYearly.addEventListener('click', () => {
        // Style changes
        toggleYearly.classList.remove(...inactiveClasses);
        toggleYearly.classList.add(...activeClasses);
        
        toggleMonthly.classList.remove(...activeClasses);
        toggleMonthly.classList.add(...inactiveClasses);

        // Value changes (Yearly)
        priceFriendly.style.opacity = 0;
        priceFamily.style.opacity = 0;
        priceExclusive.style.opacity = 0;
        
        setTimeout(() => {
            priceFriendly.innerText = '1.5M';
            priceFamily.innerText = '2M';
            priceExclusive.innerText = '3M';

            suffixFriendly.innerText = '/year';
            suffixFamily.innerText = '/year';
            suffixExclusive.innerText = '/year';

            priceFriendly.style.opacity = 1;
            priceFamily.style.opacity = 1;
            priceExclusive.style.opacity = 1;
        }, 150);
    });
}

// GSAP Entrance Animations
const initGSAPAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Helper to disable CSS transitions during GSAP animation
    const disableTransitions = (elements) => {
        elements.forEach(el => {
            if (el && el.style) el.style.transition = 'none';
        });
    };

    const enableTransitions = (elements) => {
        elements.forEach(el => {
            if (el && el.style) el.style.transition = '';
        });
    };

    // Hero Section
    const heroSection = document.querySelector('section.pt-40');
    if (heroSection) {
        const heroTitle = heroSection.querySelector('h1');
        const heroButtons = heroSection.querySelector('.flex.flex-col');
        const heroImages = heroSection.querySelectorAll('.grid-cols-1.md\\:grid-cols-3 > div');
        const heroFeatures = heroSection.querySelectorAll('.grid-cols-1.sm\\:grid-cols-2 > div');

        disableTransitions(heroImages);
        disableTransitions(heroFeatures);

        const tl = gsap.timeline();
        if (heroTitle) {
            tl.from(heroTitle, { y: 50, opacity: 0, duration: 1, ease: "back.out(1.7)" });
        }
        if (heroButtons) {
            tl.from(heroButtons, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
        }
        if (heroImages.length) {
            tl.from(heroImages, { 
                y: 100, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)",
                onComplete: () => enableTransitions(heroImages)
            }, "-=0.4");
        }
        if (heroFeatures.length) {
            tl.from(heroFeatures, { 
                y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
                onComplete: () => enableTransitions(heroFeatures)
            }, "-=0.2");
        }
    }

    // Stats Section
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length) {
        disableTransitions(statItems);
        gsap.from(statItems, {
            scrollTrigger: {
                trigger: '#stats',
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)",
            onComplete: () => enableTransitions(statItems)
        });
    }

    // Services Section
    const serviceTitle = document.querySelector('#services h2');
    const serviceCards = document.querySelectorAll('#services .grid > div');
    if (serviceTitle) {
        gsap.from(serviceTitle, {
            scrollTrigger: { trigger: '#services', start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    }
    if (serviceCards.length) {
        disableTransitions(serviceCards);
        gsap.from(serviceCards, {
            scrollTrigger: { trigger: '#services', start: "top 75%" },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            onComplete: () => enableTransitions(serviceCards)
        });
    }

    // Pricing Section
    const pricingHeader = document.querySelector('#pricing .flex-col.items-center');
    const pricingCards = document.querySelectorAll('#pricing .grid > div');
    if (pricingHeader) {
        gsap.from(pricingHeader, {
            scrollTrigger: { trigger: '#pricing', start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    }
    if (pricingCards.length) {
        disableTransitions(pricingCards);
        gsap.from(pricingCards, {
            scrollTrigger: { trigger: '#pricing', start: "top 75%" },
            y: 50,
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            onComplete: () => enableTransitions(pricingCards)
        });
    }

    // Gallery Section
    const galleryTitle = document.querySelector('#gallery h2');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryTitle) {
        gsap.from(galleryTitle, {
            scrollTrigger: { trigger: '#gallery', start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    }
    if (galleryItems.length) {
        disableTransitions(galleryItems);
        gsap.from(galleryItems, {
            scrollTrigger: { trigger: '#gallery', start: "top 75%" },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            onComplete: () => enableTransitions(galleryItems)
        });
    }

    // Testimonials
    const testiContainer = document.querySelector('#testimonials .flex-col.md\\:flex-row');
    if (testiContainer && testiContainer.children.length >= 2) {
        const testiLeft = testiContainer.children[0];
        const testiRight = testiContainer.children[1];
        
        gsap.from(testiLeft, {
            scrollTrigger: { trigger: '#testimonials', start: "top 75%" },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        gsap.from(testiRight, {
            scrollTrigger: { trigger: '#testimonials', start: "top 75%" },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
    }

    // FAQ
    const faqTitle = document.querySelector('#faq h2');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqImage = document.querySelector('#faq .lg\\:w-1\\/2.relative');
    if (faqTitle) {
        gsap.from(faqTitle, {
            scrollTrigger: { trigger: '#faq', start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    }
    if (faqItems.length) {
        disableTransitions(faqItems);
        gsap.from(faqItems, {
            scrollTrigger: { trigger: '#faq', start: "top 75%" },
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => enableTransitions(faqItems)
        });
    }
    if (faqImage) {
        gsap.from(faqImage, {
            scrollTrigger: { trigger: '#faq', start: "top 75%" },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    // CTA
    const faqSection = document.querySelector('#faq');
    const ctaSection = faqSection ? faqSection.nextElementSibling : null;
    if (ctaSection) {
        const ctaBanner = ctaSection.firstElementChild;
        if (ctaBanner) {
            gsap.from(ctaBanner, {
                scrollTrigger: { trigger: ctaSection, start: "top 85%" },
                y: 50,
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.2)"
            });
        }
    }

    // Footer
    const footer = document.querySelector('footer');
    if (footer) {
        gsap.from(footer.children[0], {
            scrollTrigger: { trigger: footer, start: "top 90%" },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to ensure layouts are stable before triggering animations
    setTimeout(initGSAPAnimations, 100);
});