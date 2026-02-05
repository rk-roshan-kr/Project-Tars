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
            {/* CORE: Yondu's Arrow / Energy Photon (Vertical) */}
            <motion.div
                animate={{
                    x: [-2, 2, -2], // Horizontal weaving
                    y: [0, 10, 0], // Slight vertical bob
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '4px',
                    height: '60px', // Vertical elongation
                    background: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 0 20px #fff, 0 0 40px #ff0055',
                    position: 'relative'
                }}
            >
                {/* TRAIL / WHISTLE (Behind/Above) */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '100%', // Trail behind (above) the arrow
                        left: '50%',
                        width: '1px',
                        height: '100px',
                        background: 'linear-gradient(0deg, transparent, rgba(255, 68, 68, 0.8))',
                        transform: 'translateX(-50%)' // Center trail
                    }}
                />
            </motion.div>
        </div>
    );
}
