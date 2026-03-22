/**
 * Glass Mesh Gradient Background (Restored & Optimized)
 */

class MeshBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.id = 'mesh-bg';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2'; // Behind everything
        this.canvas.style.pointerEvents = 'none';

        document.body.prepend(this.canvas);

        this.points = [];
        this.pointCount = 12;
        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();
    }

    init() {
        this.resize();
        for (let i = 0; i < this.pointCount; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 400 + 300,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            const colors = [
                'rgba(79, 70, 229, 0.15)',  // Indigo
                'rgba(37, 99, 235, 0.12)',  // Blue
                'rgba(147, 51, 234, 0.1)',  // Purple
                'rgba(236, 72, 153, 0.08)'  // Pink
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            const colors = [
                'rgba(37, 99, 235, 0.08)', // Blue
                'rgba(147, 51, 234, 0.06)', // Purple
                'rgba(59, 130, 246, 0.04)'  // Light Blue
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.points.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -p.radius) p.x = this.canvas.width + p.radius;
            if (p.x > this.canvas.width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = this.canvas.height + p.radius;
            if (p.y > this.canvas.height + p.radius) p.y = -p.radius;

            const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, 'rgba(0,0,0,0)');

            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MeshBackground();
});
