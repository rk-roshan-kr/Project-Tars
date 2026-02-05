import { useState, useEffect } from 'react';

const logs = [
    "[EEA] Signal coherence detected: Sector 74",
    "[ECHO] Physical validation initiated",
    "[DECISION] Candidate promoted to GRAY_EEA",
    "[WARN] SNR below threshold. Aggregating...",
    "[EEA] Consistency check: PASSED",
    "[SYSTEM] New Batch: 400 targets",
    "[PHYSICS] Orbital stability: 99.4%",
    "[SCAN] Processing Light Curve ID_9921",
    "[VETO] Binary star eclipse pattern identified"
];

export default function TerminalLog() {
    const [currentLogs, setCurrentLogs] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomLog = logs[Math.floor(Math.random() * logs.length)];
            setCurrentLogs(prev => {
                const newLogs = [...prev, `${new Date().toISOString().split('T')[1].slice(0, 8)} ${randomLog}`];
                return newLogs.slice(-5); // Keep last 5
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-data text-dim" style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            fontSize: '0.7rem', opacity: 0.6,
            textAlign: 'right', pointerEvents: 'none', zIndex: 5
        }}>
            {currentLogs.map((log, i) => (
                <div key={i}>{log}</div>
            ))}
        </div>
    );
}
