import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BootSequence({ onComplete }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const sequence = [
            { text: "INITIALIZING TARS PROTOCOL v1.1", delay: 100 },
            { text: "LOADING KERNEL...", delay: 400 },
            { text: "CALIBRATING SENSORS...", delay: 800 },
            { text: "RADAR SWEEP: ACTIVE", delay: 1200 },
            { text: "ESTABLISHING UPLINK...", delay: 1600 },
            { text: "SYSTEM LOCK ACQUIRED.", delay: 2000 }
        ];

        let timeoutIds = [];

        sequence.forEach(({ text, delay }) => {
            const id = setTimeout(() => {
                setLogs(prev => [...prev.slice(-5), text]);
            }, delay);
            timeoutIds.push(id);
        });

        // Exit
        const exitId = setTimeout(onComplete, 2500);
        timeoutIds.push(exitId);

        return () => timeoutIds.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                top: 0, left: 0, width: '100vw', height: '100vh',
                background: '#000',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00ff88',
                fontFamily: 'var(--font-data)',
                overflow: 'hidden'
            }}
        >
            {/* RADAR SWEEP ANIMATION */}
            <div style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                marginBottom: '2rem'
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 136, 0.1) 60deg, rgba(0, 255, 136, 0.4) 90deg, transparent 90.1deg)',
                        borderRadius: '50%'
                    }}
                />
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '10px', height: '10px', background: '#00ff88', borderRadius: '50%',
                    boxShadow: '0 0 20px #00ff88'
                }} />
            </div>

            {/* LOG OUTPUT */}
            <div style={{ width: '300px', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ marginBottom: '0.5rem', color: i === logs.length - 1 ? '#fff' : 'rgba(0,255,136,0.6)' }}
                    >
                        {i === logs.length - 1 && <span style={{ marginRight: '10px' }}>&gt;</span>}
                        {log}
                    </motion.div>
                ))}
            </div>

            {/* CRT SCANLINE OVERLAY */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 10
            }} />
        </motion.div>
    );
}
