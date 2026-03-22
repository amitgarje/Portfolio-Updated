// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const html = document.documentElement;
const navbar = document.querySelector('.navbar');

// Theme Toggle
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

// CGPA Chart using Chart.js
const ctx = document.getElementById('cgpaChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
        datasets: [{
            label: 'CGPA Growth',
            data: [7.33, 7.80, 9.71, 9.13, 8.91],
            borderColor: '#2563EB', // Primary Color
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#2563EB',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return 'CGPA: ' + context.parsed.y;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 6,
                max: 10,
                grid: {
                    color: 'rgba(200, 200, 200, 0.1)'
                },
                ticks: {
                    font: {
                        family: 'Outfit'
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Outfit'
                    }
                }
            }
        }
    }
});

/* --- Smart Features --- */

// 1. Recommendation Modal
const modal = document.getElementById('recommendation-modal');
const closeModal = document.querySelector('.close-modal');
const personaBtns = document.querySelectorAll('.persona-btn');
const projects = document.querySelectorAll('.project-card');

// Show modal on first visit (using session storage to simple logic)
window.addEventListener('load', () => {
    if (!sessionStorage.getItem('visited')) {
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 1500); // Show after 1.5 seconds
        sessionStorage.setItem('visited', 'true');
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const persona = btn.getAttribute('data-persona');
        modal.style.display = 'none';

        // Highlight relevant projects based on persona
        highlightProjects(persona);

        // Scroll to projects section
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });
});

function highlightProjects(persona) {
    // Reset all projects opacity
    projects.forEach(p => {
        p.style.opacity = '0.5';
        p.style.transform = 'scale(0.95)';
        p.style.border = '1px solid var(--border-color)';
    });

    // Select based on persona logic
    let filter = '';
    if (persona === 'recruiter') {
        // Recruiters want to see Backend/Fullstack (Bank, Restaurant)
        // We'll highlight everything as all are impressive, but maybe focus on the most "Enterprise" ones
        highlightCard('backend');
        highlightCard('fullstack');
    } else if (persona === 'student') {
        // Students like cool tech (QR, Future AR)
        highlightCard('innovative');
        highlightCard('future');
    } else if (persona === 'developer') {
        // Developers look at code quality and logic (Bank, Restaurant)
        highlightCard('backend');
        highlightCard('fullstack');
    }
}

function highlightCard(category) {
    const cards = document.querySelectorAll(`.project-card[data-category="${category}"]`);
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1.02)';
        card.style.border = '2px solid var(--primary-color)';
    });
}

// 2. Chatbot Logic
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// Predefined knowledge base
const knowledgeBase = {
    skills: "I am proficient in Java, Advanced Java (Servlets, JSP), MySQL/SQL, and Front-end technologies like HTML, CSS, and JavaScript. I also have strong UI/UX design skills.",
    projects: "I've built a Bank Management System, a Restaurant Order System, and a QR Code Menu. I'm also planning an AR Shopping experience!",
    internships: "I've completed 3 internships: Web Development, Full Stack Java Development, and a Technical Internship.",
    experience: "I have hands-on experience in full-stack development, database management, and UI/UX design through multiple internships and projects.",
    contact: "You can reach me via email at garjeamit841@gmail.com or connect with me on LinkedIn and GitHub!",
    "recent activity": "I've recently completed a major portfolio overhaul, including a new 'AI-Human Lab' and a Bento-style About section! I also organized the successful 'Quantum Hacks' hackathon.",
    "ai workflow": "I use an 'AI-Human Lab' approach: leveraging tools like Cursor and Claude 3.5 for 10x velocity, while performing rigorous human-in-the-loop security and logic audits.",
    "hire amt": "Amit is a Full Stack Java Developer with a 9+ CGPA, 3 internships, and a 2026-ready AI-orchestration workflow. He's perfect for roles requiring both technical depth and modern AI efficiency.",
    default: "I'm not sure about that, but I can tell you about my Skills, Projects, AI Workflow, or Recent Activity. What would you like to know?"
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><i class="fas fa-robot"></i></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    // Simple keyword matching
    const msg = userMessage.toLowerCase();
    let response = knowledgeBase.default;

    if (msg.includes("skill") || msg.includes("tech")) response = knowledgeBase.skills;
    else if (msg.includes("project") || msg.includes("work")) response = knowledgeBase.projects;
    else if (msg.includes("recent") || msg.includes("activity") || msg.includes("done")) response = knowledgeBase["recent activity"];
    else if (msg.includes("ai") || msg.includes("workflow") || msg.includes("lab")) response = knowledgeBase["ai workflow"];
    else if (msg.includes("hire") || msg.includes("why")) response = knowledgeBase["hire amt"];
    else if (msg.includes("intern") || msg.includes("job")) response = knowledgeBase.internships;
    else if (msg.includes("experience")) response = knowledgeBase.experience;
    else if (msg.includes("contact") || msg.includes("email") || msg.includes("reach")) response = knowledgeBase.contact;
    else if (msg.includes("hello") || msg.includes("hi")) response = "Hello! How can I help you explore my portfolio today?";

    // Simulate typing delay
    setTimeout(() => {
        messageElement.textContent = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append user message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Append thinking message
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Quick Reply Button Logic
document.querySelectorAll(".sq-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        chatInput.value = btn.getAttribute("data-question");
        handleChat();
    });
});

// 3. Logo Pet Removed




// =============================================
// 4. Gallery Lightbox
// =============================================
(function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    const lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lbTitle = document.getElementById('lightbox-title');
    const lbDesc = document.getElementById('lightbox-desc');
    const lbIconDisplay = lightbox ? lightbox.querySelector('.lightbox-icon-display') : null;

    if (!lightbox) return;

    function openLightbox(item) {
        const title = item.getAttribute('data-title') || '';
        const desc = item.getAttribute('data-desc') || '';

        // Check if the gallery item has a real image
        const itemImg = item.querySelector('img');
        const lbImg = document.getElementById('lightbox-img');

        if (itemImg && lbImg) {
            lbImg.src = itemImg.src;
            lbImg.alt = itemImg.alt;
            lbImg.style.display = 'block';
            lbIconDisplay.style.display = 'none';
        } else {
            // Fallback: show icon (for any remaining placeholder items)
            lbImg && (lbImg.style.display = 'none');
            lbIconDisplay.className = 'fas fa-image lightbox-icon-display';
            lbIconDisplay.style.display = '';
        }

        lbTitle.textContent = title;
        lbDesc.textContent = desc;

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Open on gallery item click
    // Open on gallery item click
    // We attach it dynamically to document body to account for cloned cards
    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item && item.closest('#gallery')) { // Make sure we're in the right section
            openLightbox(item);
        }
    });

    // Close handlers
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
})();

// =============================================
// 6. Infinite Scroll Marquee Setup
// =============================================
(function initMarquee() {
    const marqueeContainer = document.querySelector('.gallery-marquee');
    const track = document.querySelector('.gallery-track');
    
    if (!marqueeContainer || !track) return;
    
    // Inject the title span dynamically into each overlay so it looks pretty
    const items = track.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const titleText = item.getAttribute('data-title');
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay && titleText) {
            // Give icon a wrapper
            const icon = overlay.querySelector('i');
            overlay.innerHTML = ''; // reset
            if (icon) overlay.appendChild(icon);
            // Append the title
            const titleSpan = document.createElement('span');
            titleSpan.className = 'title';
            titleSpan.textContent = titleText;
            overlay.appendChild(titleSpan);
        }
    });

    // Clone all items and append them to the track to make scrolling infinite loop successfully
    const clonedItems = Array.from(items).map(item => item.cloneNode(true));
    clonedItems.forEach(clone => {
        clone.setAttribute('aria-hidden', true); // screen reader friendly
        track.appendChild(clone);
    });
})();

// =============================================
// 5. Flip Card Click Logic
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // We use event delegation here to handle all flip cards reliably
    document.body.addEventListener('click', function(e) {
        // Did we click the Story button (or an icon inside it)?
        const storyBtn = e.target.closest('.btn-story');
        if (storyBtn) {
            e.preventDefault();
            const card = storyBtn.closest('.flip-card');
            if (card) {
                card.classList.add('is-flipped');
            }
            return;
        }

        // Did we click the Back button (or an icon inside it)?
        const backBtn = e.target.closest('.btn-flip-back');
        if (backBtn) {
            e.preventDefault();
            const card = backBtn.closest('.flip-card');
            if (card) {
                card.classList.remove('is-flipped');
            }
            return;
        }
    });
});



// =============================================
// 8. Impact Section — Counter Animation
// =============================================
(function initImpactCounters() {
    const counters = document.querySelectorAll('.impact-number');
    const speed = 200; // The lower the slower

    const animate = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // For CGPA (floating point)
        if (target % 1 !== 0) {
            const inc = target / speed;
            if (count < target) {
                counter.innerText = (count + inc).toFixed(2);
                setTimeout(() => animate(counter), 1);
            } else {
                counter.innerText = target;
            }
        } else {
            // For Integers
            const inc = Math.ceil(target / speed);
            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(() => animate(counter), 1);
            } else {
                counter.innerText = target;
            }
        }
    };

    // Use Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
})();

// =============================================
// 9. Interactive Infinite Testimonial Marquee
// =============================================
(function initTestimonialMarquee() {
    const marquee = document.querySelector('.testimonial-marquee');
    const track = document.querySelector('.testimonial-track');
    const modal = document.getElementById('add-recommendation-modal');
    const openBtn = document.getElementById('open-recommendation-modal');
    const closeBtn = document.querySelector('.close-recommendation-modal');
    const form = document.getElementById('recommendation-form');
    const successModal = document.getElementById('recommendation-success-modal');

    if (!track) return;

    function setupMarquee() {
        // Remove old clones if any
        const clones = track.querySelectorAll('.clone');
        clones.forEach(c => c.remove());

        const cards = Array.from(track.querySelectorAll('.testimonial-card'));
        if (cards.length === 0) return;

        // Clone cards to ensure infinite scroll coverage
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        });

        // Set duration based on number of cards to keep speed consistent
        const totalCards = track.querySelectorAll('.testimonial-card').length;
        const duration = totalCards * 5; // 5s per card
        track.style.animationDuration = `${duration}s`;
    }

    // Modal Operations
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    const closeAllModals = () => {
        if (modal) modal.style.display = 'none';
        if (successModal) successModal.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeAllModals);
    
    const closeSuccessBtn = document.querySelector('.close-success-modal');
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeAllModals);

    window.addEventListener('click', (e) => {
        if (e.target === modal || e.target === successModal) closeAllModals();
    });

    // Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('rec-name').value;
            const role = document.getElementById('rec-role').value;
            const text = document.getElementById('rec-text').value;

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            setTimeout(() => {
                const newCard = document.createElement('div');
                newCard.className = 'testimonial-card';
                newCard.innerHTML = `
                    <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                    <p class="testimonial-text">"${text}"</p>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <strong>${name}</strong>
                            <span>${role}</span>
                        </div>
                    </div>
                `;

                // Add to start of original set
                track.prepend(newCard);

                // Reset & UI Feedback
                form.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                closeAllModals();

                if (successModal) successModal.style.display = 'flex';

                // Re-initialize marquee to include new card
                setupMarquee();
            }, 1000);
        });
    }

    // Initialize
    setupMarquee();
})();

// Hero Typewriter Effect
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;
    
    const words = [
        "Computer Engineering Student",
        "Full Stack Java Developer",
        "Creative UI/UX Designer",
        "Turning Ideas into Code & Experiences"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
});

