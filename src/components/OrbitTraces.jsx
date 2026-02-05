import { useRef, useEffect } from 'react';

export default function OrbitTraces() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let rotation = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Draw concentric ellipses
            for (let i = 1; i < 5; i++) {
                ctx.beginPath();
                ctx.ellipse(
                    cx, cy,
                    400 * i, 150 * i,
                    rotation * (i % 2 === 0 ? 1 : -1) * 0.2,
                    0, Math.PI * 2
                );
                ctx.stroke();
            }

            rotation += 0.002;
            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', top: 0, left: 0,
                pointerEvents: 'none', zIndex: 0
            }}
        />
    );
}
