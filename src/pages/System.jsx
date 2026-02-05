import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';
import TerminalLog from '../components/TerminalLog';
import VizCard from '../components/VizCard';
import DataStream from '../components/DataStream';

// Helper for Phase Headers
const PhaseHeader = ({ id, name }) => (
    <div className="font-display text-red" style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>
        PHASE_{id} // {name}
    </div>
);

const Station = ({ phaseId, phaseName, title, children, width = '100vw' }) => (
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
        <PhaseHeader id={phaseId} name={phaseName} />
        <h2 className="font-display" style={{
            fontSize: 'var(--text-xl)', marginBottom: '2rem',
            color: 'var(--color-holo-white)',
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
    </div>
);

export default function System() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Map Vertical Scroll 0-1 to Horizontal Move 0% to -500% (6 Phases)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-500%"]);

    return (
        <>
            <DataStream scrollYProgress={scrollYProgress} />

            {/* GHOST SCROLL - Controls Length */}
            <div ref={targetRef} style={{ height: '600vh' }} />

            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                overflow: 'hidden', zIndex: 2
            }}>
                <OrbitTraces />
                <TerminalLog />

                <nav style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 100 }}>
                    <Link to="/" className="font-display" style={{ color: 'var(--color-holo-white)', textDecoration: 'none' }}>
                        &lt; ABORT MISSION
                    </Link>
                </nav>

                {/* SIGNAL BEAM GUIDE */}
                <div style={{
                    position: 'absolute', top: '50%', left: 0, width: '100vw', height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 68, 68, 0.4) 10%, rgba(255, 68, 68, 0.1) 100%)',
                    zIndex: 0, pointerEvents: 'none'
                }} />

                {/* HORIZONTAL PHASE TRACK */}
                <motion.div style={{ display: 'flex', height: '100vh', x }}>

                    {/* PHASE 0: INITIATE / ENTRY */}
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw', flexShrink: 0 }}>
                        <div>
                            <div className="font-data text-dim" style={{ marginBottom: '1rem' }}>SYSTEM ONLINE. TRAJECTORY LOCKED.</div>
                            <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}>
                                SIGNAL<br /><span className="text-red">PIPELINE</span>
                            </h1>
                            <p className="font-data" style={{ marginTop: '2rem', maxWidth: '400px', opacity: 0.8 }}>
                                Pilot your way through the noise.<br />
                                <span className="text-red" style={{ fontSize: '0.8em' }}>// SCROLL TO ACCELERATE &rarr;</span>
                            </p>
                        </div>
                    </div>

                    {/* PHASE 1: DISTORTION */}
                    <Station phaseId="01" phaseName="DISTORTION" title="AMBIGUITY TOLERANCE">
                        <p><strong>You are now passing through the noise floor.</strong></p>
                        <p style={{ marginTop: '1.5rem' }}>
                            Standard algorithms fail here. They see chaos and discard it.
                            TARS sees patterns in the static.
                        </p>
                    </Station>

                    {/* PHASE 2: DETECTION */}
                    <Station phaseId="02" phaseName="DETECTION" title="RECOVERING SIGNALS">
                        <p>
                            Using Median Absolute Deviation (MAD), we retrieve potential transit events without destroying the signal.
                        </p>
                        <p style={{ marginTop: '1.5rem', color: '#00ff88' }}>
                            // SYSTEM LOCK ESTABLISHED
                        </p>
                    </Station>

                    {/* PHASE 3: ORBIT / AGGREGATION */}
                    <Station phaseId="03" phaseName="AGGREGATION" title="THE WITNESS ORBIT">
                        <p>
                            A single dip is just noise. Three aligned dips form a candidate.
                            We aggregate "witness" events over time to build statistical confidence.
                        </p>
                    </Station>

                    {/* PHASE 4: VETO */}
                    <Station phaseId="04" phaseName="VERIFICATION" title="PHYSICS VETO">
                        <p style={{ borderLeft: '3px solid #ff4444', paddingLeft: '1rem' }}>
                            <strong>WARNING: ECLIPSE DETECTED.</strong>
                        </p>
                        <p style={{ marginTop: '1.5rem' }}>
                            Before confirmation, TARS applies orbital dynamics protocols.
                            Eclipsing binaries and stellar anomalies are ruthlessly filtered.
                        </p>
                    </Station>

                    {/* PHASE 5: DECISION */}
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <PhaseHeader id="05" name="DECISION" />
                        <h2 className="font-display text-xl" style={{ marginBottom: '4rem', color: 'var(--color-holo-white)' }}>FINAL OUTPUT</h2>
                        <div style={{ display: 'flex', gap: '3rem' }}>
                            <VizCard title="CASE 291" label="GOLDEN PASS" color="#00ff88" />
                            <VizCard title="CASE 884" label="GRAY RESCUE" color="#ffaa00" />
                            <VizCard title="CASE 112" label="PHYSICS VETO" color="#ff3333" />
                        </div>
                    </div>

                    {/* PHASE 6: OPERATOR */}
                    <Station phaseId="06" phaseName="OPERATOR" title="MISSION CONTROL">
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
        </>
    );
}
