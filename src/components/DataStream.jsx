import { useRef, useEffect } from 'react';

export default function DataStream({ scrollYProgress }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        let animationFrameId;
        let width, height;
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // PARTICLE SYSTEM
        const particleCount = 1000;
        const particles = new Float32Array(particleCount * 4); // x, y, z, speed

        // INITIALIZE
        for (let i = 0; i < particleCount; i++) {
            particles[i * 4] = (Math.random() - 0.5) * width * 2;
            particles[i * 4 + 1] = (Math.random() - 0.5) * height * 2;
            particles[i * 4 + 2] = Math.random() * 20; // Z depth
            particles[i * 4 + 3] = Math.random() * 0.5 + 0.1; // Speed
        }

        // MOUSE INTERACTION
        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            time += 0.01;

            // GET PHASE (0-1)
            const progress = scrollYProgress ? scrollYProgress.get() : 0;

            // Phases: 
            // 0.0-0.2: DISTORTION (Noise)
            // 0.2-0.4: DETECTION (Tunnel)
            // 0.4-0.6: ORBIT (Ring)
            // 0.6-0.8: VETO (Red Shift)
            // 0.8-1.0: DECISION (Calm)

            // GLOBAL FX
            let shake = 0;
            let speedMult = 1 + (progress * 10); // Standard propulsion
            let colorShift = 0;

            if (progress < 0.2) {
                // DISTORTION
                shake = (0.2 - progress) * 10;
                speedMult = 2;
            } else if (progress < 0.4) {
                // DETECTION
                speedMult = 20; // Warp speed
            } else if (progress < 0.6) {
                // ORBIT
                speedMult = 5;
            } else if (progress < 0.8) {
                // VETO
                colorShift = 1; // Red
                speedMult = 2;
                shake = 2;
            }

            // CLEAR
            ctx.fillStyle = `rgba(${colorShift * 20}, 0, 0, 0.2)`;
            ctx.fillRect(0, 0, width, height);

            // UPDATE & DRAW
            ctx.fillStyle = colorShift ? '#ff0000' : '#ffffff';

            for (let i = 0; i < particleCount; i++) {
                let x = particles[i * 4];
                let y = particles[i * 4 + 1];
                let z = particles[i * 4 + 2];
                let s = particles[i * 4 + 3];

                // PROPULSION
                z -= s * speedMult * 0.1;

                // MOUSE GRAVITY / REPULSION (The "Juice")
                // Only affect particles "close" to the screen (z < 10)
                if (z < 10) {
                    // Project 3D point to 2D
                    const perspective = 500 / z;
                    const sx = width / 2 + x / z * perspective;
                    const sy = height / 2 + y / z * perspective;

                    // Calculate distance to mouse
                    const dx = sx - mouseX;
                    const dy = sy - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) {
                        const force = (200 - dist) / 200;
                        // Repel
                        x += (dx / dist) * force * 50 * s; // Push x actual
                        y += (dy / dist) * force * 50 * s; // Push y actual
                        particles[i * 4] = x;
                        particles[i * 4 + 1] = y;
                    }
                }

                // ORBITAL TWIST (Phase 3)
                if (progress > 0.4 && progress < 0.6) {
                    const angle = 0.05;
                    const cos = Math.cos(angle);
                    const sin = Math.sin(angle);
                    const nx = x * cos - y * sin;
                    const ny = x * sin + y * cos;
                    x = nx;
                    y = ny;
                    particles[i * 4] = x;
                    particles[i * 4 + 1] = y;
                }

                // RESET
                if (z <= 0.1) {
                    z = 20;
                    x = (Math.random() - 0.5) * width * 2;
                    y = (Math.random() - 0.5) * height * 2;
                }

                particles[i * 4 + 2] = z;

                // PROJECT
                const perspective = 500 / z;
                const sx = width / 2 + x / z * perspective + (Math.random() - 0.5) * shake;
                const sy = height / 2 + y / z * perspective + (Math.random() - 0.5) * shake;

                // RENDER
                if (sx > 0 && sx < width && sy > 0 && sy < height) {
                    const size = (10 / z) * 0.5;
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // WAVEFORM (Phase 2 Local FX)
            if (progress > 0.2 && progress < 0.4) {
                ctx.beginPath();
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 2;
                for (let k = 0; k < width; k += 10) {
                    const wy = height / 2 + Math.sin(k * 0.01 + time * 10) * 50 * Math.sin(progress * Math.PI * 5);
                    if (k === 0) ctx.moveTo(k, wy);
                    else ctx.lineTo(k, wy);
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove); // Cleanup
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

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
