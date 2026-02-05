import { motion } from 'framer-motion';
import { useState } from 'react';

export default function VizCard({ title, label, color }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect(); // Use currentTarget for the container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt intensity
        const rotateX = ((y - centerY) / centerY) * -15; // Invert axis
        const rotateY = ((x - centerX) / centerX) * 15;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            className="glass-panel font-data"
            initial="rest"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: '300px',
                height: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                borderTop: `3px solid ${color}`,
                position: 'relative',
                overflow: 'hidden',
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s ease-out',
                boxShadow: `0 0 20px -10px ${color}`,
                cursor: 'crosshair',
                backgroundColor: 'rgba(5, 5, 5, 0.9)' // Ensure it's not transparent white
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="font-display text-xs" style={{ opacity: 0.8 }}>{title}</div>
                <motion.div
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    className="font-data text-xs" style={{ color }}
                >
                    [SCANNING]
                </motion.div>
            </div>

            {/* Visual Data Area */}
            <div style={{
                flex: 1, margin: '1.5rem 0',
                background: `linear-gradient(180deg, transparent 0%, ${color}22 50%, transparent 100%)`,
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Scanning Line */}
                <motion.div
                    variants={{
                        rest: { top: '50%', opacity: 0.5 },
                        hover: { top: ['0%', '100%'], opacity: 1, transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
                    }}
                    style={{
                        position: 'absolute', left: 0, right: 0, height: '2px', background: color,
                        boxShadow: `0 0 10px ${color}`
                    }}
                />

                {/* Mock Waveform */}
                <div style={{
                    position: 'absolute', bottom: '20%', left: '10%', right: '10%', height: '40%',
                    borderBottom: `2px solid ${color}`, opacity: 0.3
                }} />
            </div>

            {/* Footer Label */}
            <div>
                <div className="font-data text-xs" style={{ color: color, fontWeight: 'bold', marginBottom: '0.2rem' }}>
                    {label}
                </div>
                <motion.div
                    variants={{ rest: { opacity: 0, height: 0 }, hover: { opacity: 0.7, height: 'auto' } }}
                    className="font-data text-xs text-dim"
                >
                    Confidence: 99.4%
                </motion.div>
            </div>

            {/* Tech Corners */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
        </motion.div>
    );
}
