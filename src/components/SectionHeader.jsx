export function SectionHeader({ nhan, tieuDe, moTa }) {
  return (
    <div className="max-w-[760px]">
      <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-weathered-stone">
        {nhan}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-obsidian sm:text-4xl lg:text-[2.8rem]">
        {tieuDe}
      </h2>
      <p className="mt-5 max-w-[60ch] text-base leading-8 text-weathered-stone md:text-[1.05rem]">
        {moTa}
      </p>
    </div>
  )
}
