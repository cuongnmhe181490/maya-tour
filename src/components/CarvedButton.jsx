export function CarvedButton({ children, href }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center rounded-full border border-gold-sun/55 bg-[linear-gradient(180deg,rgba(217,180,74,0.22),rgba(110,86,42,0.38))] px-6 py-3 text-sm uppercase tracking-[0.28em] text-parchment shadow-[inset_0_1px_0_rgba(255,248,225,0.18),0_18px_40px_rgba(0,0,0,0.26)] transition duration-500 hover:-translate-y-0.5 hover:border-gold-sun hover:text-gold-sun"
      aria-label={typeof children === 'string' ? children : 'Mở liên kết'}
    >
      <span className="translate-y-px">{children}</span>
    </a>
  )
}
