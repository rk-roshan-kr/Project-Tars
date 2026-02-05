import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OrbitTraces from '../components/OrbitTraces';

export default function Mentor() {
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

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
                <h1 className="font-display" style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 1,
                    marginBottom: '4rem',
                    color: 'var(--color-holo-white)'
                }}>
                    ACADEMIC<br /><span className="text-red">SUPERVISION</span>
                </h1>

                <div className="glass-panel font-data" style={{ padding: '3rem', borderLeft: '2px solid var(--color-warning-red)' }}>
                    <p className="text-dim" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>MENTORSHIP & GUIDANCE</p>

                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dr. Garima Thakur</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-warning-red)', marginBottom: '2rem' }}>Chandigarh University</p>

                    <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
                        This research into <span style={{ color: '#fff' }}>Deterministic Machine Learning for Exoplanet Validation</span> was conducted under the direct supervision of Dr. Thakur. Her guidance on signal processing methodologies and astrophysical vetting protocols was instrumental in the development of the T.A.R.S. (Transit Analysis & Recognition System) pipeline.
                    </p>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p className="text-dim" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>RESEARCH CONTEXT</p>
                        <p style={{ opacity: 0.6 }}>
                            Dr. Thakur provides critical oversight on the application of signal processing algorithms for the T.A.R.S. pipeline.
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <Link to="/operator" style={{ color: 'var(--color-warning-red)', textDecoration: 'none' }}>
                                View Primary Investigator Profile &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
