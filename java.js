document.addEventListener('DOMContentLoaded', function() {
    
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            if (isElementInViewport(bar) && !bar.style.width) {
                bar.style.width = width;
            }
        });
    }
    
    
    const circleProgresses = document.querySelectorAll('.circle-progress');
    
    function animateCircleProgress() {
        circleProgresses.forEach(circle => {
            const value = circle.getAttribute('data-value');
            const circumference = 2 * Math.PI * 60; 
            const offset = circumference - (value / 100) * circumference;
            
            if (isElementInViewport(circle) && !circle.style.strokeDashoffset) {
                circle.style.background = `conic-gradient(var(--primary-color) ${value * 3.6}deg, #f1f1f1 0deg)`;
                document.querySelector(`.circle-progress[data-value="${value}"] .circle-value`).textContent = `${value}%`;
            }
        });
    }
    
   
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    
    animateSkillBars();
    animateCircleProgress();
    
    
    window.addEventListener('scroll', function() {
        animateSkillBars();
        animateCircleProgress();
    });
    
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
   
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200 && pageYOffset < sectionTop + sectionHeight - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    
    window.addEventListener('load', function() {
        
        setTimeout(() => {
            animateSkillBars();
            animateCircleProgress();
            highlightNavItem();
        }, 300);
    });
});