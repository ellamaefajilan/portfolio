/* ========== EMAIL JS INITIALIZATION ========== */
emailjs.init('_6bA-Bg6JAh6mbbIC');

/* ========== TYPING EFFECT ========== */
const titles = [
    "Full-Stack Developer",
    "Software Developer",
    "Mobile & Web Developer",
    "UI/UX Designer",
    "ML Developer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.querySelector('.typed-text');

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
});

/* ========== HAMBURGER MENU ========== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ========== SMOOTH SCROLLING ========== */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========== CONTACT FORM SUBMISSION ========== */
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const btn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMessage');
    
    if (!name || !email || !message) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address', 'error');
        return;
    }
    
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
        showStatus('Please complete the reCAPTCHA verification', 'error');
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Sending...';
    statusMsg.style.display = 'none';
    
    try {
        const templateParams = {
            from_name: name,
            from_email: email,
            reply_to: email,
            message: message,
            'g-recaptcha-response': recaptchaResponse
        };
        
        console.log('Sending email with params:', templateParams);
        
        const response = await emailjs.send('service_fxwioea', 'template_tf8yneb', templateParams);
        
        console.log('Email sent successfully:', response);
        
        showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        
        grecaptcha.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showStatus('Failed to send message. Please try again or email me directly at ellamaefajilan@gmail.com', 'error');
        
        grecaptcha.reset();
    } finally {
        btn.disabled = false;
        btn.textContent = 'Send Message';
    }
}

function showStatus(message, type) {
    const statusMsg = document.getElementById('statusMessage');
    statusMsg.textContent = message;
    statusMsg.className = `status-message ${type}`;
    statusMsg.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 5000);
    }
}

/* ========== THEME TOGGLE ========== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const homeSection = document.getElementById('home');

function updateBackground(isDark) {
    if (isDark) {
        homeSection.style.backgroundImage = "url('image/background1.png')";
    } else {
        homeSection.style.backgroundImage = "url('image/background.jpg')";
    }
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
    updateBackground(true);
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateBackground(true);
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateBackground(false);
    }
});

/* ========== VIDEO MODAL - PAWTESSIERIE ========== */
const videoCardBtn = document.getElementById('videoCardBtn');
const videoModal = document.getElementById('videoModal');
const videoCloseBtn = document.getElementById('videoCloseBtn');
const modalVideo = document.getElementById('modalVideo');

function openVideoModal() {
    videoModal.style.display = 'block';
    modalVideo.currentTime = 0;
    modalVideo.muted = false;
    modalVideo.play();
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.muted = true;
    document.body.style.overflow = 'auto';
}

videoCardBtn.addEventListener('click', openVideoModal);
videoCloseBtn.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

/* ========== VIDEO MODAL - FRYSCALES ========== */
const videoCardBtn2 = document.getElementById('videoCardBtn2');
const videoModal2 = document.getElementById('videoModal2');
const videoCloseBtn2 = document.getElementById('videoCloseBtn2');
const modalVideo2 = document.getElementById('modalVideo2');

function openVideoModal2() {
    videoModal2.style.display = 'block';
    modalVideo2.currentTime = 0;
    modalVideo2.muted = false;
    modalVideo2.play();
    document.body.style.overflow = 'hidden';
}

function closeVideoModal2() {
    videoModal2.style.display = 'none';
    modalVideo2.pause();
    modalVideo2.currentTime = 0;
    modalVideo2.muted = true;
    document.body.style.overflow = 'auto';
}

videoCardBtn2.addEventListener('click', openVideoModal2);
videoCloseBtn2.addEventListener('click', closeVideoModal2);

videoModal2.addEventListener('click', (e) => {
    if (e.target === videoModal2) {
        closeVideoModal2();
    }
});

/* ========== VIDEO MODAL - IMOVIE ========== */
const videoCardBtn3 = document.getElementById('videoCardBtn3');
const videoModal3 = document.getElementById('videoModal3');
const videoCloseBtn3 = document.getElementById('videoCloseBtn3');
const modalVideo3 = document.getElementById('modalVideo3');

function openVideoModal3() {
    videoModal3.style.display = 'block';
    modalVideo3.currentTime = 0;
    modalVideo3.muted = false;
    modalVideo3.play();
    document.body.style.overflow = 'hidden';
}

function closeVideoModal3() {
    videoModal3.style.display = 'none';
    modalVideo3.pause();
    modalVideo3.currentTime = 0;
    modalVideo3.muted = true;
    document.body.style.overflow = 'auto';
}

videoCardBtn3.addEventListener('click', openVideoModal3);
videoCloseBtn3.addEventListener('click', closeVideoModal3);

videoModal3.addEventListener('click', (e) => {
    if (e.target === videoModal3) {
        closeVideoModal3();
    }
});

/* ========== ESCAPE KEY TO CLOSE MODALS ========== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (videoModal.style.display === 'block') {
            closeVideoModal();
        }
        if (videoModal2.style.display === 'block') {
            closeVideoModal2();
        }
        if (videoModal3.style.display === 'block') {
            closeVideoModal3();
        }
    }
});

/* ========== FIX MULTIPLE VIDEO AUTOPLAY ========== */
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-thumbnail video');
    
    // Force play all videos with proper settings
    videos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        
        // Attempt to play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay prevented for video, will retry on user interaction:', error);
                // If autoplay fails, try again on any user interaction
                document.addEventListener('click', () => {
                    video.play().catch(e => console.log('Play failed:', e));
                }, { once: true });
            });
        }
    });
    
    // Use Intersection Observer to play videos when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Play on intersect failed:', e));
            }
        });
    }, { threshold: 0.5 });
    
    videos.forEach(video => observer.observe(video));
});