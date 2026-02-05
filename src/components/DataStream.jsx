import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function DataStream() {
    const canvasRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        let animationFrameId;
        let width, height;

        // WARP STATE
        let speedMultiplier = 1;
        let targetSpeed = 1;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // WARP TRIGGER
        speedMultiplier = 20; // Instant jump on load/route change

        // ENTITY CLASSES
        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = (Math.random() - 0.5) * width * 2; // Wide spread
                this.y = (Math.random() - 0.5) * height * 2;
                this.z = initial ? Math.random() * 20 : 20; // Start far back
                this.len = Math.random() * 50 + 10;
                this.color = Math.random() > 0.8 ? '#ff3333' : '#444444'; // Red or Dim Grey
                this.baseSpeed = Math.random() * 0.5 + 0.1;
            }

            update(speed) {
                // Move towards camera (decrease Z)
                this.z -= (0.1 * this.baseSpeed * speed);

                // Respawn if passed camera
                if (this.z <= 0.1) {
                    this.reset();
                }
            }

            draw() {
                if (this.z <= 0.1) return;

                const perspective = 500 / this.z; // FOV 500
                const screenX = width / 2 + this.x / this.z * perspective;
                const screenY = height / 2 + this.y / this.z * perspective;

                // Don't draw if out of bounds massively
                if (screenX < -100 || screenX > width + 100 || screenY < -100 || screenY > height + 100) return;

                const prevPerspective = 500 / (this.z + 0.5 * speedMultiplier * 0.1);
                const tailX = width / 2 + this.x / (this.z + 0.1) * perspective * 0.9;
                const tailY = height / 2 + this.y / (this.z + 0.1) * perspective * 0.9;

                // Length-based streak logic
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                // Opacity fades as it gets very close to avoid "popping"
                const opacity = Math.min(1, (this.z - 0.1) / 2);
                ctx.globalAlpha = opacity;
                ctx.lineWidth = (10 / this.z) * 0.5;

                ctx.moveTo(screenX, screenY);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        class Anomaly {
            constructor() {
                this.active = false;
                this.x = 0;
                this.y = 0;
                this.radius = 0;
                this.angle = 0;
                this.speed = 0;
                this.color = '#ffffff';
                this.type = 'probe'; // 'probe' or 'ufo'
            }

            spawn() {
                this.active = true;
                this.y = Math.random() * height * 0.6 + height * 0.2; // Central vertical band
                this.x = -100; // Start off-screen left
                this.speed = Math.random() * 2 + 1;
                this.angle = 0;
                this.type = Math.random() > 0.5 ? 'probe' : 'drone';
                this.color = this.type === 'probe' ? '#00aaaa' : '#ffaa00';
            }

            update() {
                if (!this.active) {
                    // Random chance to spawn (1 in 2000 frames ~ 33s)
                    if (Math.random() < 0.0005) this.spawn();
                    return;
                }

                this.x += this.speed;
                this.angle += 0.05;

                // Sine wave motion
                const hoverY = this.y + Math.sin(this.angle) * 20;

                // Draw
                ctx.save();
                ctx.translate(this.x, hoverY);

                // Glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;

                if (this.type === 'probe') {
                    // Small orb
                    ctx.beginPath();
                    ctx.arc(0, 0, 3, 0, Math.PI * 2);
                    ctx.fill();
                    // Scan line
                    ctx.strokeStyle = this.color;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, 50); // Downward scan
                    ctx.stroke();
                } else {
                    // Drone (diamond)
                    ctx.beginPath();
                    ctx.moveTo(0, -5);
                    ctx.lineTo(5, 0);
                    ctx.lineTo(0, 5);
                    ctx.lineTo(-5, 0);
                    ctx.fill();
                }

                ctx.restore();

                // Deactivate if off screen right
                if (this.x > width + 100) this.active = false;
            }
        }

        const particleCount = width < 768 ? 200 : 500;
        const particles = Array.from({ length: particleCount }, () => new Particle());
        const anomaly = new Anomaly();

        const render = () => {
            // Ease speed
            speedMultiplier += (targetSpeed - speedMultiplier) * 0.05;

            // Clear with trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);

            // Particles
            particles.forEach(p => {
                p.update(speedMultiplier);
                p.draw();
            });

            // Anomaly
            if (speedMultiplier < 2) { // Only show when not warping
                anomaly.update();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [location.pathname]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                zIndex: -1, background: '#000000'
            }}
        />
    );
}
