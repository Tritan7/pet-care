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