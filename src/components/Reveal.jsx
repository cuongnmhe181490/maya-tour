import { motion as Motion } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  )
}
