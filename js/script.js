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