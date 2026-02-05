import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';
import TerminalLog from '../components/TerminalLog';
import VizCard from '../components/VizCard';

const Section = ({ title, children, align = "left" }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        style={{
            margin: '10rem 0',
            textAlign: align,
            display: 'flex',
            flexDirection: 'column',
            alignItems: align === 'right' ? 'flex-end' : 'flex-start'
        }}
    >
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
            position: 'relative'
        }}>
            {children}
        </div>
    </motion.section>
);

export default function System() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
            <OrbitTraces />
            <TerminalLog />

            <nav style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 20 }}>
                <Link to="/" className="font-display" style={{ color: 'var(--color-holo-white)', textDecoration: 'none' }}>
                    &lt; RETURN
                </Link>
            </nav>

            {/* HERO */}
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
                <div>
                    <h1 className="font-display" style={{ fontSize: 'var(--text-mega)', lineHeight: 0.9 }}>
                        SYSTEM<br /><span className="text-red">ARCHITECTURE</span>
                    </h1>
                    <p className="font-data" style={{ marginTop: '2rem', maxWidth: '600px', opacity: 0.9, fontSize: 'var(--text-lg)' }}>
                        A validation-first instrument designed for signals that traditional pipelines ignore.
                    </p>
                </div>
            </div>

            {/* SECTION 1: THE PROBLEM */}
            <Section title="AMBIGUITY TOLERANCE">
                <p>
                    <strong>Most pipelines chase certainty. TARS is built for ambiguity.</strong>
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    Traditional algorithms aggressively filter noise, often discarding faint planetary candidates in the process.
                    When signal-to-noise ratios drop, they fail safe.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    TARS takes the opposite approach: it preserves "borderline" signals and uses a physics-aware veto layer to validate them.
                </p>
            </Section>

            {/* SECTION 2: THE SOLUTION */}
            <Section title="OPERATIONAL LAYERS" align="right">
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
            </Section>

            {/* SECTION 3: VISUAL OUTPUTS */}
            <motion.section
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                style={{ margin: '15rem 0', textAlign: 'center' }}
            >
                <h2 className="font-display text-xl" style={{ marginBottom: '4rem' }}>OUTPUT CLASSIFICATION</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
                    <VizCard title="CASE 291" label="GOLDEN PASS" color="#00ff88" />
                    <VizCard title="CASE 884" label="GRAY RESCUE" color="#ffaa00" />
                    <VizCard title="CASE 112" label="PHYSICS VETO" color="#ff3333" />
                </div>
            </motion.section>

            {/* SECTION 4: BIO */}
            <Section title="OPERATOR">
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
            </Section>

            <footer style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.3 }} className="font-data">
                PROJECT TARS // INSTRUMENT v1.1
            </footer>
        </div>
    );
}
