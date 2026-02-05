import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BootSequence from '../components/BootSequence';

export default function Landing() {
    const [isBooting, setIsBooting] = useState(false);
    const navigate = useNavigate();

    const handleInitiate = (e) => {
        e.preventDefault();
        setIsBooting(true);
    };

    const handleBootComplete = () => {
        navigate('/system');
    };

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <AnimatePresence>
                {isBooting && <BootSequence onComplete={handleBootComplete} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 2, ease: "circOut" }}
                style={{ textAlign: 'center', mixBlendMode: 'difference' }}
            >
                <h1 className="font-display" style={{
                    fontSize: 'var(--text-mega)',
                    fontWeight: 700,
                    lineHeight: 0.8,
                    letterSpacing: '-0.05em',
                    color: 'var(--color-holo-white)',
                    textShadow: '0 0 50px rgba(255,255,255,0.3)'
                }}>
                    PROJECT
                    <br />
                    <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--color-holo-white)' }}>TARS</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    marginTop: 'var(--space-unit)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                <p className="font-data text-dim" style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.2em' }}>
          // SYSTEMS ONLINE
                    <span className="text-red" style={{ marginLeft: '1rem' }}>v1.1</span>
                </p>

                <p className="font-data" style={{
                    maxWidth: '400px', textAlign: 'center', fontSize: 'var(--text-sm)', opacity: 0.8
                }}>
                    A validation-first instrument designed for signals that traditional pipelines ignore.
                </p>

                <button
                    onClick={handleInitiate}
                    className="font-data"
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-holo-white)',
                        color: 'var(--color-holo-white)',
                        padding: '1rem 3rem',
                        marginTop: '2rem',
                        fontSize: 'var(--text-base)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase'
                    }}
                >
                    Initiate Sequence
                </button>
            </motion.div>

            {/* Cinematic Glitch Overlay - decorative */}
            <div className="scanline"></div>
        </div>
    );
}
