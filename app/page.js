import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BedDouble, Bath, Maximize, CalendarCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Showcase from '@/components/Showcase';
import { properti, hargaLabel, tentang } from '@/lib/data';

export default function HomePage() {
  // Hunian pertama sudah menjadi slide pembuka di atas; galeri dimulai dari hunian berikutnya
  // supaya foto yang sama tidak muncul dua kali berturut-turut.
  const koleksi = [...properti.slice(1), properti[0]];
  const wilayah = Array.from(new Set(properti.map((p) => p.wilayah)));

  return (
    <main className="relative z-10">
      {/* Full-screen showcase */}
      <Showcase />

      {/* Statement */}
      <section className="px-6 py-20 text-center sm:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto mb-8 block h-px w-16 bg-gold" aria-hidden="true" />
          <p className="font-display text-3xl font-light italic leading-snug text-ink md:text-4xl">
            Enam hunian di Bali dan Jakarta. Tidak ada open house — setiap kunjungan hanya untuk satu tamu.
          </p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6 sm:mb-14">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold">Koleksi</p>
                <h2 className="mt-3 font-display text-4xl font-light text-ink md:text-6xl">{wilayah.join(' & ')}</h2>
              </div>
              <Link href="/properti" className="inline-flex items-center gap-2 py-2 text-sm uppercase tracking-[0.15em] text-ink transition hover:text-gold">Lihat semua <ArrowUpRight size={15} /></Link>
            </div>
          </Reveal>

          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20">
            {koleksi.map((p, i) => (
              <Reveal key={p.id} delay={i % 3 === 2 ? 0.1 : 0} className={`tunda-render ${i % 3 === 0 ? 'md:col-span-2' : ''}`}>
                <Link href={`/properti/${p.id}`} className="group block">
                  <div className={`relative overflow-hidden ${i % 3 === 0 ? 'aspect-[4/3] md:aspect-[16/7]' : 'aspect-[4/3]'}`}>
                    <Image src={p.media.foto[0]} alt="" fill sizes={i % 3 === 0 ? '100vw' : '(max-width:768px) 100vw, 50vw'} className="object-cover transition duration-[900ms] group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
                    <span className="absolute left-4 top-4 border border-gold/50 bg-black/75 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gold backdrop-blur sm:left-5 sm:top-5">{p.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:mt-5 sm:flex-nowrap">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{p.jenisProperti} · {p.lokasi.kecamatan}, {p.wilayah}</p>
                      <h3 className="mt-1.5 font-display text-2xl font-light text-ink transition group-hover:text-gold md:text-3xl">{p.judul}</h3>
                    </div>
                    <p className="shrink-0 font-display text-2xl text-gold">{hargaLabel(p)}</p>
                  </div>
                  <div className="mt-3 flex gap-6 border-t border-white/10 pt-3 text-sm text-ink/75">
                    {p.spesifikasi.kamarTidur > 0 && <span className="flex items-center gap-1.5"><BedDouble size={15} /> {p.spesifikasi.kamarTidur}</span>}
                    {p.spesifikasi.kamarMandi > 0 && <span className="flex items-center gap-1.5"><Bath size={15} /> {p.spesifikasi.kamarMandi}</span>}
                    <span className="flex items-center gap-1.5"><Maximize size={15} /> {p.spesifikasi.luasBangunan || p.spesifikasi.luasTanah} m²</span>
                    <span className="ml-auto flex items-center gap-1 text-ink transition group-hover:text-gold">Detail <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Private enquiry */}
      <section className="px-6 py-20 text-center sm:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"><CalendarCheck size={15} /> Kunjungan privat</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink md:text-6xl">{tentang.cta}</h2>
          <p className="mx-auto mt-5 max-w-md text-muted">Pilih sampai tiga hunian dalam satu wilayah. Kami mengurutkan rutenya dan menyiapkan penjemputan bila perlu.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/kunjungan" className="bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wide transition hover:opacity-90">Susun kunjungan</Link>
            <Link href="/kontak" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold">Tulis ke konselor</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
