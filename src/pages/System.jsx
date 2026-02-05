import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';
import TerminalLog from '../components/TerminalLog';
import VizCard from '../components/VizCard';
import DataStream from '../components/DataStream';
import BeamGuide from '../components/BeamGuide';

// --- CONFIGURATION ---
const TOTAL_PHASES = 6;
const SCROLL_HEIGHT = '2000vh'; // Maximum runway for slow flight

// --- COMPONENTS ---

const PhaseLabel = ({ id, name }) => (
    <div className="font-display text-red" style={{
        fontSize: '0.9rem',
        opacity: 0.7,
        marginBottom: '1rem',
        letterSpacing: '0.1em'
    }}>
        PHASE_0{id} // {name}
    </div>
);

const Station = ({ phaseId, phaseName, title, children }) => (
    <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        position: 'relative',
        flexShrink: 0 // CRITICAL: Prevent flex shrinking
    }}>
        <PhaseLabel id={phaseId} name={phaseName} />
        <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '2rem',
            color: 'var(--color-holo-white)',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
            {title}
        </h2>
        <div className="glass-panel font-data" style={{
            padding: '3rem',
            maxWidth: '800px',
            fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderLeft: '2px solid var(--color-warning-red)'
        }}>
            {children}
        </div>
    </div>
);

// --- MAIN FLIGHT DECK ---

export default function System() {
    // 1. SCROLL RIG
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. SMOOTHING (Mass/Inertia Simulation)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30, // Lower stiffness = softer acceleration
        damping: 60,   // Higher damping = heavily weighted "fluid" brakes
        restDelta: 0.001
    });

    // 3. TRANSFORM MAPPING
    // Map 0-1 vertical progress to 0% -> -500% horizontal movement
    // adjusted for 6 full-screen sections (viewport is 100vw, total track is 600vw)
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-500%"]);

    return (
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#000' }}>

            {/* --- ENGINE ROOM (Fixed Backgrounds) --- */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <DataStream scrollYProgress={smoothProgress} />
                <OrbitTraces />
            </div>

            {/* --- FLIGHT CONTROLS (Fixed UI) --- */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
                <TerminalLog />

                {/* HEADS UP DISPLAY - Navigation */}
                <nav style={{ position: 'absolute', top: '2rem', left: '2rem', pointerEvents: 'auto' }}>
                    <Link to="/" className="font-display text-red" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                        &lt; ABORT MISSION
                    </Link>
                </nav>

                {/* HEADS UP DISPLAY - Signal Beam */}
                <div style={{
                    position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 68, 68, 0.4) 50%, transparent 100%)',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                }} />

                <BeamGuide />
            </div>

            {/* --- GHOST TRACK (The Scrollable Height) --- */}
            <div ref={containerRef} style={{ height: SCROLL_HEIGHT, position: 'relative', zIndex: 1 }}>

                {/* --- VISUAL VIEWPORT (Sticky Window) --- */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                    zIndex: 20
                }}>

                    {/* --- HORIZONTAL MOVER --- */}
                    <motion.div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%',
                        width: '600vw', // 6 sections * 100vw
                        x
                    }}>

                        {/* PHASE 0: INITIATE */}
                        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '12vw', flexShrink: 0 }}>
                            <div>
                                <div className="font-data text-dim mb-4">SYSTEM ONLINE. TRAJECTORY LOCKED.</div>
                                <h1 className="font-display" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.85 }}>
                                    SIGNAL<br />
                                    <span className="text-red">PIPELINE</span>
                                </h1>
                                <p className="font-data" style={{ marginTop: '2rem', maxWidth: '450px', opacity: 0.8, fontSize: '1.2rem' }}>
                                    Pilot your way through the noise floor.<br />
                                    <span className="text-red" style={{ fontSize: '0.8em', marginTop: '1rem', display: 'block' }}>
                                        // SCROLL TO ACCELERATE &rarr;
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* PHASE 1: DISTORTION */}
                        <Station phaseId="1" phaseName="DISTORTION" title={(<span className="glitch-text" data-text="THE NOISE FLOOR">THE NOISE FLOOR</span>)}>
                            <p><strong>You are now passing through the distortion field.</strong></p>
                            <p style={{ marginTop: '1.5rem' }}>
                                Standard algorithms fail here. They see chaos, apply a sigma-clip, and discard the data.
                            </p>
                            <p style={{ marginTop: '1.5rem' }}>
                                TARS does not filter. It listens to the static.
                            </p>
                        </Station>

                        {/* PHASE 2: DETECTION */}
                        <Station phaseId="2" phaseName="DETECTION" title="RECOVERING SIGNALS">
                            <p>
                                Using <span className="text-red">Median Absolute Deviation (MAD)</span>, we retrieve potential transit events without destroying the signal structure.
                            </p>
                            <div style={{ marginTop: '2rem', border: '1px solid #00ff88', padding: '1rem', color: '#00ff88', display: 'inline-block' }}>
                                // SYSTEM LOCK ESTABLISHED
                            </div>
                        </Station>

                        {/* PHASE 3: AGGREGATION */}
                        <Station phaseId="3" phaseName="AGGREGATION" title="THE WITNESS ORBIT">
                            <p>
                                A single dip is just noise. Three aligned dips form a candidate.
                            </p>
                            <p style={{ marginTop: '1.5rem' }}>
                                We aggregate "witness" events over time to build statistical confidence, stacking light curves until the planet reveals itself.
                            </p>
                        </Station>

                        {/* PHASE 4: VETO */}
                        <Station phaseId="4" phaseName="VERIFICATION" title="PHYSICS VETO">
                            <p style={{ borderLeft: '3px solid #ff4444', paddingLeft: '1rem', color: '#ffaaaa' }}>
                                <strong>WARNING: FALSE POSITIVE DETECTED.</strong>
                            </p>
                            <p style={{ marginTop: '1.5rem' }}>
                                Before confirmation, TARS applies orbital dynamics protocols.
                                Eclipsing binaries and stellar anomalies are ruthlessly filtered out.
                            </p>
                        </Station>

                        {/* PHASE 5: DECISION */}
                        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                            <PhaseLabel id="5" name="FINAL OUTPUT" />
                            <h2 className="font-display text-xl" style={{ marginBottom: '4rem', color: 'var(--color-holo-white)' }}>CLASSIFICATION</h2>
                            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <VizCard title="CASE 291" label="GOLDEN PASS" color="#00ff88" />
                                <VizCard title="CASE 884" label="GRAY RESCUE" color="#ffaa00" />
                                <VizCard title="CASE 112" label="PHYSICS VETO" color="#ff3333" />
                            </div>

                            <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                                <div className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>OPERATOR: ROSHAN KUMAR GUPTA</div>
                                <Link to="/mentor" className="font-data text-red" style={{ textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
                                    VIEW ACADEMIC SUPERVISION &rarr;
                                </Link>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
