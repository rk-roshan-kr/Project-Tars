import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';
import TerminalLog from '../components/TerminalLog';
import VizCard from '../components/VizCard';

// Horizontal Station Component
const Station = ({ title, children, id, width = '100vw' }) => (
    <div style={{
        width: width,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        position: 'relative',
        flexShrink: 0
    }}>
        <h2 className="font-display" style={{
            fontSize: 'var(--text-xl)', marginBottom: '2rem',
            color: 'var(--color-holo-white)',
            borderBottom: '1px solid var(--color-warning-red)',
            paddingBottom: '0.5rem',
            display: 'inline-block'
        }}>
            {title}
        </h2>
        <div className="glass-panel font-data" style={{
            padding: '3rem',
            maxWidth: '800px',
            fontSize: 'var(--text-base)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.95)',
            position: 'relative',
            zIndex: 10
        }}>
            {children}
        </div>

        <div style={{
            position: 'absolute', bottom: '15%', left: '50px',
            color: 'var(--color-warning-red)', fontFamily: 'var(--font-data)'
        }}>
            Station_0{id}
        </div>
    </div>
);

export default function System() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Map Vertical Scroll 0-1 to Horizontal Move 0% to -400% (for 5 sections)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);

    return (
        <>
            <div ref={targetRef} style={{ height: '500vh' }} />

            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                overflow: 'hidden', zIndex: 2
            }}>
                <OrbitTraces />
                <TerminalLog />

                <nav style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 100 }}>
                    <Link to="/" className="font-display" style={{ color: 'var(--color-holo-white)', textDecoration: 'none' }}>
                        &lt; RETURN
                    </Link>
                </nav>

                {/* SIGNAL BEAM */}
                <div style={{
                    position: 'absolute', top: '50%', left: 0, width: '100vw', height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 68, 68, 0.5) 20%, rgba(255, 68, 68, 0.1) 100%)',
                    zIndex: 0, pointerEvents: 'none'
                }} />

                {/* HORIZONTAL CONTENT TRACK */}
                <div style={{ display: 'flex', height: '100vh' }}>
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw', flexShrink: 0 }}>
                        <div>
                            <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}>
                                SYSTEM<br /><span className="text-red">TRAJECTORY</span>
                            </h1>
                            <p className="font-data" style={{ marginTop: '2rem', maxWidth: '600px', opacity: 0.9, fontSize: 'var(--text-lg)' }}>
                                A flight path through the validation pipeline.<br />
                                <span className="text-dim" style={{ fontSize: '0.8em' }}>// SCROLL TO NAVIGATE BEAM &rarr;</span>
                            </p>
                        </div>
                    </div>

                    <Station title="AMBIGUITY TOLERANCE" id="1">
                        <p><strong>Most pipelines chase certainty. TARS is built for ambiguity.</strong></p>
                        <p style={{ marginTop: '1.5rem' }}>
                            Traditional algorithms aggressively filter noise, often discarding faint planetary candidates in the process.
                            When signal-to-noise ratios drop, they fail safe.
                        </p>
                        <p style={{ marginTop: '1.5rem' }}>
                            TARS takes the opposite approach: it preserves "borderline" signals and uses a physics-aware veto layer to validate them.
                        </p>
                    </Station>

                    <Station title="OPERATIONAL LAYERS" id="2">
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '2rem' }}>
                                <strong className="text-red font-display">01. DETECTION</strong><br />
                                Retrieves potential transit events without destroying the underlying low-amplitude signal data.
                            </li>
                            <li style={{ marginBottom: '2rem' }}>
                                <strong className="text-red font-display">02. AGGREGATION</strong><br />
                                Accumulates witness events over time. A single dip is noise; three aligned dips form a candidate.
                            </li>
                            <li style={{ marginBottom: '2rem' }}>
                                <strong className="text-red font-display">03. VERIFICATION</strong><br />
                                Applies orbital dynamics protocols to filter out eclipsing binaries and stellar anomalies.
                            </li>
                        </ul>
                    </Station>

                    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <h2 className="font-display text-xl" style={{ marginBottom: '4rem', color: 'var(--color-holo-white)' }}>OUTPUT CLASSIFICATION</h2>
                        <div style={{ display: 'flex', gap: '3rem' }}>
                            <VizCard title="CASE 291" label="GOLDEN PASS" color="#00ff88" />
                            <VizCard title="CASE 884" label="GRAY RESCUE" color="#ffaa00" />
                            <VizCard title="CASE 112" label="PHYSICS VETO" color="#ff3333" />
                        </div>
                    </div>

                    <Station title="OPERATOR" id="4">
                        <p style={{ fontSize: 'var(--text-lg)' }}>
                            <strong>Roshan Kumar Gupta</strong>
                        </p>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-data-dim)' }}>
                            Building deterministic ML systems where physics makes the final call.
                        </p>
                        <div style={{ marginTop: '3rem' }}>
                            <Link to="/mentor" className="text-red font-display" style={{ textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
                                ACADEMIC SUPERVISION &rarr;
                            </Link>
                        </div>
                    </Station>

                </motion.div>
            </div>

            <div style={{
                position: 'fixed', top: '50%', left: 0, width: '100%', height: '1px',
                background: 'rgba(255, 68, 68, 0.4)',
                boxShadow: '0 0 30px rgba(255, 0, 0, 0.3)',
                zIndex: 1, pointerEvents: 'none', transform: 'translateY(-50%)'
            }} />
        </>
    );
}
