'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { properti, hargaLabel } from '@/lib/data';

const slides = properti.filter((p) => p.featured).slice(0, 4);

export default function Showcase() {
  const [i, setI] = useState(0);
  const [jalan, setJalan] = useState(true);
  // Hanya foto slide pertama yang diunduh di awal; foto lain menyusul setelah halaman selesai dimuat,
  // supaya tidak berebut jaringan dengan foto utama.
  const [dimuat, setDimuat] = useState([0]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setJalan(false);
    let t;
    const lanjut = () => { t = setTimeout(() => setDimuat(slides.map((_, k) => k)), 1500); };
    if (document.readyState === 'complete') lanjut(); else window.addEventListener('load', lanjut, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('load', lanjut); };
  }, []);
  useEffect(() => {
    if (!jalan) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [jalan]);
  const ke = (k) => { setDimuat((d) => (d.includes(k) ? d : [...d, k])); setI(k); };
  const cur = slides[i];

  return (
    <section className="relative h-[100svh] max-h-[1000px] min-h-[560px] w-full overflow-hidden bg-sand" aria-roledescription="carousel" aria-label="Koleksi pilihan">
      {slides.map((s, idx) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-[1200ms] ${idx === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden={idx !== i}>
          {dimuat.includes(idx) && <Image src={s.media.foto[0]} alt="" fill priority={idx === 0} sizes="100vw" className="object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/55" aria-hidden="true" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-10 pt-28 sm:pb-12 sm:pt-32 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Koleksi {String(i + 1).padStart(2, '0')} — {String(slides.length).padStart(2, '0')}</p>
          <h1 className="mt-7 font-display text-6xl font-light italic leading-[0.95] text-white md:text-8xl">Dilihat oleh<br />satu tamu.</h1>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div aria-live={jalan ? 'off' : 'polite'}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/85">{cur.jenisProperti} · {cur.lokasi.kecamatan}, {cur.wilayah}</p>
            <Link href={`/properti/${cur.id}`} className="mt-1 block font-display text-2xl text-white transition hover:text-gold md:text-3xl">{cur.judul}</Link>
            <p className="mt-1 font-display text-xl text-gold">{hargaLabel(cur)}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {slides.map((_, idx) => (
              <button key={idx} type="button" onClick={() => ke(idx)} aria-label={`Tampilkan ${slides[idx].judul}`} aria-current={idx === i ? 'true' : undefined} className="group grid h-11 place-items-center px-2"><span className={`block h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-gold' : 'w-3 bg-white/60 group-hover:bg-white'}`} /></button>
            ))}
            <button type="button" onClick={() => setJalan((v) => !v)} aria-label={jalan ? 'Jeda pergantian otomatis' : 'Putar pergantian otomatis'} className="ml-2 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black">{jalan ? <Pause size={16} /> : <Play size={16} />}</button>
            <button type="button" onClick={() => ke((i - 1 + slides.length) % slides.length)} aria-label="Sebelumnya" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => ke((i + 1) % slides.length)} aria-label="Berikutnya" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
