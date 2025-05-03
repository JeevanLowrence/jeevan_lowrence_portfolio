// Three.js Initialization with Error Handling
function initThreeJS() {
    const container = document.getElementById('threejs-background');
    if (!container) {
        console.error('Three.js container not found');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera with dynamic aspect ratio
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 30;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        colorArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Movement Variables
    let mouseX = 0;
    let mouseY = 0;

    // Animation Loop with Delta Time
    let clock = new THREE.Clock();
    let previousTime = 0;

    function animate() {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005 * deltaTime * 60;
        particlesMesh.rotation.y += 0.0005 * deltaTime * 60;
        
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.02 * deltaTime * 60;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.02 * deltaTime * 60;
        
        renderer.render(scene, camera);
    }

    animate();

    // Event Listeners
    const eventListeners = {
        resize: () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        mousemove: (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        }
    };

    window.addEventListener('resize', eventListeners.resize);
    document.addEventListener('mousemove', eventListeners.mousemove);

    // Cleanup function
    return () => {
        window.removeEventListener('resize', eventListeners.resize);
        document.removeEventListener('mousemove', eventListeners.mousemove);
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
    };
}

// Dynamic Content Loading
function initDynamicContent() {
    // Skills
    const skills = ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'Deep Learning', 'NLP', 'Machine Learning', 'JavaScript', 'HTML/CSS', 'React', 'Django', 'PostgreSQL', 'Git', 'Bootstrap', 'Flask'];
    const skillsContainer = document.querySelector('.skills-container');
    
    if (skillsContainer) {
        skillsContainer.innerHTML = skills.map(skill => 
            `<div class="skill-tag">${skill}</div>`
        ).join('');
    }

    // Projects
    const projects = [
        {
            title: 'AI Flood Risk Prediction',
            description: 'Hackathon winning project that predicts flood risks based on environmental parameters with explainability using SHAP values and LLM-generated explanations',
            tags: ['Machine Learning', 'SHAP', 'LLM', 'Gradio'],
            image: 'assets/images/AI Flood Risk Prediction.jpeg',
            link: 'https://linkedin.com/in/jeevan-lowrence'
        },
        {
            title: 'RAG for Medical Queries',
            description: 'Built a Retrieval-Augmented Generation pipeline using a quantized 4-bit LLaMA2-7B model for efficient inference on medical data',
            tags: ['RAG', 'LLaMA2', 'Vector Database', 'Sentence Transformers'],
            image: 'assets/images/RAG For medical domain.png',
            link: 'https://github.com/JeevanLowrence/RAG_project'
        },
        {
            title: 'Skin Cancer Classification Web-App',
            description: 'CNN-based classifier using AlexNet architecture in TensorFlow/Keras to categorize skin lesions as benign or malignant',
            tags: ['CNN', 'TensorFlow', 'Keras', 'Flask'],
            image: 'assets/images/Skin Cancer Classification Web-App.png',
            link: 'https://github.com/JeevanLowrence/SkinCancerClassification'
        },
        {
            title: 'Conference Webpage',
            description: 'Led development of an interactive conference website for SRCASM 2021 using JavaScript and modern front-end practices',
            tags: ['JavaScript', 'HTML/CSS', 'UI/UX Design'],
            image: 'assets/images/SRCASM conference.png',
            link: 'https://jeevanlowrence.github.io/icrctc.github.io/'
        }
    ];
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="project-link">View Project</a>
                </div>
            </div>
        `).join('');
    }

    // Social Links
    const socialLinks = [
        { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/JeevanLowrence' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/jeevan-lowrence' },
        { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:jeevanlowrence4046@gmail.com' }
    ];
    const socialContainer = document.querySelector('.social-links');
    
    if (socialContainer) {
        socialContainer.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" title="${link.name}">
                <i class="${link.icon}"></i>
            </a>
        `).join('');
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for the fixed navbar height
                const navbarHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle initial hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const navbarHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
}

// Scroll Reveal Effect
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mouse Parallax Effect
function initMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const text = document.querySelector('.glowing-text');
        if (text) {
            text.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
            
            const hue = (x * 60) + 150;
            text.style.textShadow = `
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px hsla(${hue}, 100%, 50%, 0.5),
                0 0 30px hsla(${hue}, 100%, 50%, 0.3)`;
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const formContainer = form.parentElement;
            form.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you for your message, ${name}!</h3>
                <p>I'll get back to you as soon as possible.</p>
                <button class="send-another">Send Another Message</button>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Add event listener to "Send Another Message" button
            const sendAnotherBtn = successMessage.querySelector('.send-another');
            sendAnotherBtn.addEventListener('click', function() {
                form.reset();
                form.style.display = 'flex';
                formContainer.removeChild(successMessage);
            });
        });
    }
}

// Handle Intro Overlay Fade Out
function initIntroFade() {
    const contentOverlay = document.querySelector('.content-overlay');
    if (contentOverlay) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                const opacity = Math.max(0, 1 - scrollPosition / window.innerHeight);
                contentOverlay.style.opacity = opacity;
                
                // Hide completely when fully transparent
                if (opacity < 0.05) {
                    contentOverlay.style.visibility = 'hidden';
                } else {
                    contentOverlay.style.visibility = 'visible';
                }
            }
        });
    }
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    const cleanupThreeJS = initThreeJS();
    initDynamicContent();
    initSmoothScrolling();
    initScrollReveal();
    initMouseParallax();
    initContactForm();
    initIntroFade();

    // Cleanup if needed (for single-page apps)
    window.addEventListener('beforeunload', () => {
        if (cleanupThreeJS) cleanupThreeJS();
    });
});
