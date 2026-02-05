import { motion } from 'framer-motion';

export default function BeamGuide() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '15%', // Leading position, not dead center
            transform: 'translateY(-50%)',
            zIndex: 20,
            pointerEvents: 'none'
        }}>
            {/* CORE: Yondu's Arrow / Energy Photon */}
            <motion.div
                animate={{
                    x: [0, 10, 0], // Slight horizontal sway
                    y: [-2, 2, -2], // Weaving motion
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '60px',
                    height: '4px',
                    background: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 0 20px #fff, 0 0 40px #ff0055', // Bright core + red glow
                    position: 'relative'
                }}
            >
                {/* TRAIL / WHISTLE */}
                <motion.div
                    style={{
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        height: '1px',
                        width: '100px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 68, 68, 0.8))',
                        transform: 'translateY(-50%)'
                    }}
                />
            </motion.div>
        </div>
    );
}
