document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

    async function fetchProjects() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            displayProjects(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    function displayProjects(projects) {
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <img src="${project.ProjectImage}" alt="${project.ProjectName} Image">
                <h2>${project.ProjectName}</h2>
                <p>${project.ProjectDescription}</p>
                <a href="${project.ProjectLink}" target="_blank">View Project</a>
            `;
            projectsContainer.appendChild(projectElement);
        });
    }

    fetchProjects();
});


document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skills-container');

    async function fetchSkills() {
        try {
            const response = await fetch('skills.json');
            const skills = await response.json();
            displaySkills(skills);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    }

    function displaySkills(skills) {
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skill');
            skillElement.innerHTML = `
                <img src="${skill.Icon}" alt="${skill.SkillName}">
                <p>${skill.SkillName}</p>
                <div class="skill-description">${skill.SkillDescription}</div>
            `;
            skillsContainer.appendChild(skillElement);
        });
    }

    fetchSkills();
});



document.addEventListener('DOMContentLoaded', () => {
    const iconContainer = document.getElementById('icon-container');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    let icons = [];
    let currentIndex = 0;

    async function fetchIcons() {
        try {
            const response = await fetch('icons.json');
            icons = await response.json();
            preloadImages(icons);
        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    }

    function preloadImages(icons) {
        let loadedImages = 0;
        const totalImages = icons.length;

        icons.forEach(icon => {
            const img = new Image();
            img.src = icon.src;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    updateIcon();
                    setInterval(updateIcon, 3000);
                }
            };
        });
    }

    function updateIcon() {
        if (icons.length > 0) {
            const icon = icons[currentIndex];
            iconContainer.innerHTML = `<img src="${icon.src}" alt="${icon.name}"><p>${icon.name}</p>`;
            currentIndex = (currentIndex + 1) % icons.length;
        }
    }

    fetchIcons();

    // Particle Network Initialization
    var particleNetworkCanvas = document.getElementById('particle-network');
    var particleNetworkOptions = {
        particleColor: '#fff',
        background: '#121212',
        interactive: true,
        velocity: 0.66,
        density: 10000
    };
    new ParticleNetwork(particleNetworkCanvas, particleNetworkOptions);

    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('bounce');
            setTimeout(() => mobileMenu.classList.remove('bounce'), 600);
        } else {
            mobileMenu.classList.add('bounce-reverse');
            setTimeout(() => mobileMenu.classList.remove('bounce-reverse'), 600);
        }
    });

    // Close menu on link click
    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('bounce-reverse');
            setTimeout(() => mobileMenu.classList.remove('bounce-reverse'), 600);
        }
    });
});

// ParticleNetwork class code
'use strict';

class Particle {
    constructor(parent) {
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.particleColor = parent.options.particleColor;

        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * parent.options.velocity,
            y: (Math.random() - 0.5) * parent.options.velocity
        };
    }

    update() {
        if (this.x > this.canvas.width + 20 || this.x < -20) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y > this.canvas.height + 20 || this.y < -20) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.particleColor;
        this.ctx.globalAlpha = 0.7;
        this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

class ParticleNetwork {
    constructor(canvas, options) {
        this.canvasDiv = canvas;
        this.canvasDiv.size = {
            width: this.canvasDiv.offsetWidth,
            height: this.canvasDiv.offsetHeight
        };
        this.options = {
            particleColor: options.particleColor || '#fff',
            background: options.background || '#1a252f',
            interactive: options.interactive !== undefined ? options.interactive : true,
            velocity: this.setVelocity(options.velocity),
            density: this.setDensity(options.density)
        };

        this.init();
    }

    init() {
        if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.particleColor)) {
            console.error('Please specify a valid particleColor hexadecimal color');
            return;
        }

        this.canvas = document.createElement('canvas');
        this.canvasDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvasDiv.size.width;
        this.canvas.height = this.canvasDiv.size.height;
        this.setStyles(this.canvasDiv, { position: 'relative' });
        this.setStyles(this.canvas, { zIndex: '20', position: 'relative', pointerEvents: 'none' });

        window.addEventListener('resize', () => {
            if (this.canvasDiv.offsetWidth === this.canvasDiv.size.width && this.canvasDiv.offsetHeight === this.canvasDiv.size.height) {
                return;
            }

            this.canvas.width = this.canvasDiv.size.width = this.canvasDiv.offsetWidth;
            this.canvas.height = this.canvasDiv.size.height = this.canvasDiv.offsetHeight;

            clearTimeout(this.resetTimer);
            this.resetTimer = setTimeout(() => {
                this.particles = [];
                for (let i = 0; i < (this.canvas.width * this.canvas.height) / this.options.density; i++) {
                    this.particles.push(new Particle(this));
                }
                if (this.options.interactive) {
                    this.particles.push(this.mouseParticle);
                }

                requestAnimationFrame(this.update.bind(this));
            }, 500);
        });

        this.particles = [];
        for (let i = 0; i < (this.canvas.width * this.canvas.height) / this.options.density; i++) {
            this.particles.push(new Particle(this));
        }

        if (this.options.interactive) {
            this.mouseParticle = new Particle(this);
            this.mouseParticle.velocity = { x: 0, y: 0 };
            this.particles.push(this.mouseParticle);

            document.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouseParticle.x = e.clientX - rect.left;
                this.mouseParticle.y = e.clientY - rect.top;
            });

            document.addEventListener('mouseup', () => {
                this.mouseParticle.velocity = {
                    x: (Math.random() - 0.5) * this.options.velocity,
                    y: (Math.random() - 0.5) * this.options.velocity
                };
                this.mouseParticle = new Particle(this);
                this.mouseParticle.velocity = { x: 0, y: 0 };
                this.particles.push(this.mouseParticle);
            });
        }

        requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();

            for (let j = this.particles.length - 1; j > i; j--) {
                const distance = Math.sqrt(Math.pow(this.particles[i].x - this.particles[j].x, 2) + Math.pow(this.particles[i].y - this.particles[j].y, 2));
                if (distance > 120) continue;

                this.ctx.beginPath();
                this.ctx.strokeStyle = this.options.particleColor;
                this.ctx.globalAlpha = (120 - distance) / 120;
                this.ctx.lineWidth = 0.7;
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
            }
        }

        if (this.options.velocity !== 0) {
            requestAnimationFrame(this.update.bind(this));
        }
    }

    setVelocity(velocity) {
        if (velocity === 'fast') return 1;
        if (velocity === 'slow') return 0.33;
        if (velocity === 'none') return 0;
        return velocity || 0.66;
    }

    setDensity(density) {
        if (density === 'high') return 5000;
        if (density === 'low') return 20000;
        return !isNaN(parseInt(density, 10)) ? density : 10000;
    }

    setStyles(div, styles) {
        for (const property in styles) {
            div.style[property] = styles[property];
        }
    }
}
