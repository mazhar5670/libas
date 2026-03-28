// Premium Scroll effect for Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for Hero content
    const heroContent = document.querySelector('.hero-content');
    const scrollVal = window.scrollY;
    if (heroContent && scrollVal < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollVal * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollVal / 600);
    }
});

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // trigger slightly before it comes into view
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Chatbot Logic
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('open');
    chatInput.focus();
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserMessage(userText) {
    const lowerText = userText.toLowerCase();
    let botResponse = "";

    if (lowerText.includes("time") || lowerText.includes("hour") || lowerText.includes("open") || lowerText.includes("close") || lowerText.includes("holiday")) {
        botResponse = "We proudly open for you exactly from <strong>9 AM to 9 PM</strong>. Please note we have a holiday and remain closed exclusively on <strong>Tuesdays</strong>.";
    } else if (lowerText.includes("location") || lowerText.includes("address") || lowerText.includes("where")) {
        botResponse = "We are located at <strong>LIBAS TAILORS ANAND BAZAAR BYTCO, Nashik, Maharashtra</strong>. You can click the address in our website footer for exact Google Maps directions!";
    } else if (lowerText.includes("stitch") || lowerText.includes("raw") || lowerText.includes("fabric") || lowerText.includes("material")) {
        botResponse = "Yes! You can bring your own unstitched raw cloth to us. We will craft it into a bespoke masterpiece using our own premium threads, imported canvases, and luxury inner linings.";
    } else if (lowerText.includes("contact") || lowerText.includes("phone") || lowerText.includes("email") || lowerText.includes("call") || lowerText.includes("whatsapp")) {
        botResponse = "You can WhatsApp us anytime at <strong>+91 9767278751</strong> or email us at <strong>anwaransarilibastailors@gmail.com</strong>.";
    } else if (lowerText.includes("hi") || lowerText.includes("hello") || lowerText.includes("hey")) {
        botResponse = "Hello there! How can I assist you with your personalized tailoring needs today?";
    } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("much")) {
        botResponse = "Our bespoke tailoring prices vary depending on the style and complexity of the garment. Please reach out to us via WhatsApp at +91 9767278751 for a personalized quote.";
    } else {
        botResponse = "I'm sorry, I didn't quite catch that. Could you try asking about our <strong>hours</strong>, <strong>location</strong>, or our <strong>custom stitching</strong> services?";
    }

    // Simulate thinking delay
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 600);
}

sendMessage.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text === "") return;
    
    addMessage(text, 'user');
    chatInput.value = "";
    processUserMessage(text);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage.click();
    }
});
