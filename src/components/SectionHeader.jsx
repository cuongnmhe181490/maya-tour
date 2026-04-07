export function SectionHeader({ nhan, tieuDe, moTa }) {
  return (
    <div className="max-w-[760px]">
      <p className="font-display text-[0.78rem] uppercase tracking-[0.44em] text-gold-sun/78">
        {nhan}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.02] text-parchment sm:text-5xl md:text-6xl">
        {tieuDe}
      </h2>
      <p className="mt-6 max-w-[58ch] text-base leading-8 text-parchment/72 md:text-lg">
        {moTa}
      </p>
    </div>
  )
}
