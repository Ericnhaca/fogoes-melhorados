document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll to top button
    var scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animated number counter
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var duration = 2000;
            var startTime = null;

            counter.textContent = '0';

            function easeOut(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var current = Math.floor(easeOut(progress) * target);
                counter.textContent = current.toLocaleString('pt-PT');
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString('pt-PT');
                }
            }

            requestAnimationFrame(step);
        });
    }

    // Intersection Observer for animations
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    };

    // Animate stats when visible
    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }

    // Fade-in animation for sections
    var fadeElements = document.querySelectorAll(
        '.about-card, .benefit-card, .timeline-item, .instruction-card, ' +
        '.scholarship-card, .sdg-item, .partner-card, .contact-item'
    );

    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var delay = 0;
                var parent = entry.target.parentElement;
                var siblings = parent.querySelectorAll('.fade-in');
                siblings.forEach(function (sibling, index) {
                    if (sibling === entry.target) {
                        delay = index * 80;
                    }
                });
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
    });

    // Active nav link on scroll
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-menu a[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = 'var(--green-dark)';
                    link.style.fontWeight = '600';
                } else {
                    link.style.color = '';
                    link.style.fontWeight = '';
                }
            }
        });
    });

    // Contact form - sends via mailto
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var telefone = document.getElementById('telefone').value;
        var mensagem = document.getElementById('mensagem').value;

        var subject = encodeURIComponent('Contacto via Site - ' + nome);
        var body = encodeURIComponent(
            'Nome: ' + nome + '\n' +
            'Email: ' + email + '\n' +
            'Telefone: ' + telefone + '\n\n' +
            'Mensagem:\n' + mensagem
        );

        window.location.href = 'mailto:improvedcookstovesproject@gmail.com?subject=' + subject + '&body=' + body;

        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'A abrir email...';
        btn.style.background = 'var(--green)';
        btn.style.borderColor = 'var(--green)';
        btn.style.color = '#fff';

        setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
            contactForm.reset();
        }, 3000);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

});
