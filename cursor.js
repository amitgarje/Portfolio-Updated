/**
 * Futuristic Fluid Morphing Cursor
 * A complex, organic cursor system with "Liquid Blob" physics and 
 * high-velocity trailing particles.
 */

class FuturisticCursor {
    constructor() {
        this.root = document.documentElement;
        this.cursor = document.createElement('div');
        this.follower = document.createElement('div');
        this.trail = [];
        this.trailCount = 8;

        this.cursor.className = 'new-cursor-core';
        this.follower.className = 'new-cursor-fluid';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);

        // Create trail elements
        for (let i = 0; i < this.trailCount; i++) {
            const t = document.createElement('div');
            t.className = 'cursor-trail-dot';
            document.body.appendChild(t);
            this.trail.push({ el: t, x: 0, y: 0 });
        }

        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        this.followPos = { x: 0, y: 0 };

        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();
        this.handleInteractions();
    }

    handleInteractions() {
        const interactive = 'a, button, .bento-card, .flip-card, .ai-card, .project-card, .sq-btn';

        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactive)) {
                this.cursor.classList.add('is-active');
                this.follower.classList.add('is-active');
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactive)) {
                this.cursor.classList.remove('is-active');
                this.follower.classList.remove('is-active');
            }
        });
    }

    animate() {
        // Core follows mouse instantly (or with tiny lerp)
        this.pos.x += (this.mouse.x - this.pos.x) * 0.2;
        this.pos.y += (this.mouse.y - this.pos.y) * 0.2;

        this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

        // Fluid follows with "Liquid" delay
        this.followPos.x += (this.mouse.x - this.followPos.x) * 0.1;
        this.followPos.y += (this.mouse.y - this.followPos.y) * 0.1;

        // Dynamic scaling/morphing based on velocity
        const dx = this.mouse.x - this.followPos.x;
        const dy = this.mouse.y - this.followPos.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const scaleX = 1 + velocity * 0.005;
        const scaleY = 1 - velocity * 0.002;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        this.follower.style.transform = `translate3d(${this.followPos.x}px, ${this.followPos.y}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

        // Trail dots with lagging effect
        let tx = this.pos.x;
        let ty = this.pos.y;

        this.trail.forEach((dot, index) => {
            dot.x += (tx - dot.x) * (0.4 - index * 0.03);
            dot.y += (ty - dot.y) * (0.4 - index * 0.03);

            dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) scale(${1 - index * 0.1})`;
            dot.el.style.opacity = (1 - index / this.trailCount) * 0.5;

            tx = dot.x;
            ty = dot.y;
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    new FuturisticCursor();
});
