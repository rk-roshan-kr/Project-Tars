import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BootSequence({ onComplete }) {
    const [lines, setLines] = useState([
        "INITIALIZING TARS PROTOCOL v1.1...",
        "LOADING CORE MODULES...",
        "CONNECTING TO EVENT DETECTOR..."
    ]);

    useEffect(() => {
        // Simulate fast terminal loading
        const simulatedLog = [
            "CHECKING INTEGRITY...",
            "EEA: ONLINE",
            "ECHO: ONLINE",
            "ORBITAL VECTORS: CALIBRATED",
            "SYSTEM READY."
        ];

        let delay = 0;
        simulatedLog.forEach((log, i) => {
            delay += Math.random() * 200 + 100;
            setTimeout(() => {
                setLines(prev => [...prev.slice(-4), log]);
            }, delay);
        });

        setTimeout(onComplete, 1500);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'black',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* Horizontal collapse line */}
            <motion.div
                initial={{ scaleX: 0, height: '2px', opacity: 1 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleY: 1000, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'circIn' }}
                style={{ background: 'white', width: '100%' }}
            />

            <div className="font-data" style={{
                position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)',
                color: 'var(--color-holo-white)', fontSize: 'var(--text-xs)', textAlign: 'center'
            }}>
                {lines.map((l, i) => (
                    <div key={i} style={{ opacity: (i + 1) / lines.length }}>{l}</div>
                ))}
            </div>
        </div>
    );
}
