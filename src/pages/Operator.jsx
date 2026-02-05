import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';

export default function Operator() {
    return (
        <div style={{
            minHeight: '100vh',
            padding: '10vw',
            backgroundColor: '#000',
            position: 'relative'
        }}>
            <OrbitTraces />

            <nav style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 100 }}>
                <Link to="/system" className="font-display text-red" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                    &lt; RETURN TO CONSOLE
                </Link>
            </nav>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
                <h1 className="font-display" style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                    marginBottom: '4rem',
                    color: 'var(--color-holo-white)'
                }}>
                    MISSION<br /><span className="text-red">OPERATOR</span>
                </h1>

                <div className="glass-panel font-data" style={{ padding: '3rem', borderLeft: '2px solid var(--color-warning-red)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <p className="text-dim" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>OPERATOR ID: RKG-001</p>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Roshan Kumar Gupta</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-warning-red)', marginBottom: '2rem' }}>System Architect & Developer</p>
                        </div>
                        <div style={{ border: '1px solid #fff', padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: 0.8 }}>
                            [STATUS: ACTIVE]
                        </div>
                    </div>

                    <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: '1.1rem', marginBottom: '2rem' }}>
                        <strong>Department of Computer Science & Engineering</strong>
                    </p>

                    <p style={{ lineHeight: 1.8, opacity: 0.8, marginBottom: '2rem' }}>
                        Leading the development of <span style={{ color: '#fff' }}>T.A.R.S.</span>, a next-generation deterministic pipeline for exoplanet validation.
                        My research focuses on bridging the gap between raw astrophysical data and reliable machine learning classifications, specifically targeting high-noise environments where traditional pipelines fail.
                    </p>

                    <div style={{ padding: '1.5rem', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.3)' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--color-warning-red)' }}>CURRENT STATE (v1.1)</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                            <strong>INSTRUMENT VALIDATION:</strong> TARS is currently a high-precision filter. It operates as a deterministic detector, ensuring safety and purity in signal classification (Low Recall, High Precision).
                        </p>

                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#fff' }}>TRAJECTORY (v1.2)</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                            <strong>THE DISCOVERY ENGINE:</strong> Shifting focus from "Detection" to "Recovery".
                            By implementing <span style={{ color: '#00ff88' }}>Multi-Sector Stitching</span> and <span style={{ color: '#00ff88' }}>Adaptive Physics Thresholds</span>, the next iteration aims to recover long-period candidates hidden by geometric gaps in standard data pipelines.
                        </p>
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p className="text-dim" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>SUPERVISION</p>
                        <Link to="/mentor" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #333' }}>
                            Conducted under the guidance of Dr. Garima Thakur &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
