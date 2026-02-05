import { Link } from 'react-router-dom';

export default function Mentor() {
    return (
        <div style={{
            height: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center'
        }}>
            <nav style={{ position: 'fixed', top: '2rem', left: '2rem' }}>
                <Link to="/system" className="font-display" style={{ color: 'var(--color-holo-white)', textDecoration: 'none' }}>
                    &lt; RETURN
                </Link>
            </nav>

            <div className="glass-panel" style={{ padding: '4rem', maxWidth: '600px' }}>
                <h1 className="font-display text-xl" style={{ marginBottom: '2rem' }}>SUPERVISION</h1>

                <p className="font-data" style={{ marginBottom: '1rem', fontSize: 'var(--text-lg)' }}>
                    Research conducted under the guidance of
                </p>

                <h2 className="font-display text-red" style={{ fontSize: 'var(--text-xl)' }}>
                    [MENTOR NAME]
                </h2>

                <p className="font-data text-dim" style={{ marginTop: '1rem' }}>
                    Department of Computer Science<br />
                    [INSTITUTION NAME]
                </p>
            </div>
        </div>
    );
}
