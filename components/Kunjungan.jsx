'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, Car, Clock } from 'lucide-react';
import { properti, tempuh, hargaLabel } from '@/lib/data';

const MAKS = 3;
const DURASI = 60; // menit di tiap hunian
const MULAI = ['09.00', '10.00', '13.00'];
const WILAYAH = Array.from(new Set(properti.map((p) => p.wilayah)));
const JEMPUT = {
  Bali: ['Bertemu di hunian pertama', 'Dijemput dari hotel atau vila', 'Dijemput dari Bandara Ngurah Rai'],
  Jakarta: ['Bertemu di hunian pertama', 'Dijemput dari kantor atau rumah', 'Dijemput dari hotel'],
};

const keMenit = (j) => { const [h, m] = j.split('.').map(Number); return h * 60 + m; };
const keJam = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;

// Urutan dengan total waktu tempuh terpendek (paling banyak 3! = 6 kemungkinan).
function urutTerbaik(list) {
  if (list.length < 2) return list;
  const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((r) => [x, ...r])));
  const biaya = (r) => r.slice(1).reduce((t, p, i) => t + tempuh(r[i].lokasi.kecamatan, p.lokasi.kecamatan), 0);
  return perm(list).sort((a, b) => biaya(a) - biaya(b))[0];
}

function hariKeDepan(n) {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  d.setHours(0, 0, 0, 0);
  return Array.from({ length: n }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i + 2); return x; });
}

export default function Kunjungan() {
  const [wilayah, setWilayah] = useState(WILAYAH[0]);
  const [pilih, setPilih] = useState([]);
  const [hari, setHari] = useState([]);
  const [h, setH] = useState(0);
  const [mulai, setMulai] = useState(MULAI[1]);
  const [jemput, setJemput] = useState(0);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    setHari(hariKeDepan(7));
    const p = properti.find((x) => String(x.id) === new URLSearchParams(window.location.search).get('id'));
    if (p) { setWilayah(p.wilayah); setPilih([p.id]); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const daftar = properti.filter((p) => p.wilayah === wilayah);
  const rute = useMemo(() => urutTerbaik(pilih.map((id) => properti.find((p) => p.id === id))), [pilih]);
  const jadwal = useMemo(() => {
    let t = keMenit(mulai);
    return rute.map((p, i) => {
      const jalan = i === 0 ? 0 : tempuh(rute[i - 1].lokasi.kecamatan, p.lokasi.kecamatan);
      t += jalan;
      const dari = t;
      t += DURASI;
      return { p, jalan, dari, sampai: t };
    });
  }, [rute, mulai]);

  const gantiWilayah = (w) => { setWilayah(w); setPilih([]); setJemput(0); };
  const toggle = (id) => setPilih((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < MAKS ? [...s, id] : s));
  const siap = pilih.length && hari[h] && nama.trim() && /\S+@\S+\.\S+/.test(email);
  const tgl = hari[h] ? hari[h].toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }) : '';

  const legend = 'text-xs uppercase tracking-[0.3em] text-gold';
  const field = 'mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-gold';
  const chip = 'block border border-white/15 px-4 py-2.5 text-center text-sm text-ink/85 transition peer-checked:border-gold peer-checked:bg-gold/15 peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold hover:border-gold/60';

  if (selesai) {
    return (
      <div className="mx-auto max-w-2xl border border-gold/30 p-8 md:p-12" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-gold text-gold"><Check size={22} /></span>
        <h2 className="mt-6 font-display text-4xl font-light text-ink">Permintaan kunjungan tercatat</h2>
        <p className="mt-3 text-ink/80">{tgl}, mulai {mulai} — {rute.length} hunian di {wilayah}. {JEMPUT[wilayah][jemput]}.</p>
        <ol className="mt-6 space-y-2 text-sm text-ink/85">
          {jadwal.map((j) => <li key={j.p.id}>{keJam(j.dari)}–{keJam(j.sampai)} · {j.p.judul}</li>)}
        </ol>
        <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-muted">
          Ini situs contoh, jadi tidak ada yang dikirim. Di layanan sungguhan, {rute[0].agen.nama} akan mengonfirmasi lewat {email} dalam satu hari kerja, lalu membagikan alamat lengkap dan nama pemilik.
        </p>
        <button type="button" onClick={() => setSelesai(false)} className="mt-6 border border-white/20 px-6 py-3 text-sm uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold">Ubah rencana</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (siap) setSelesai(true); }} className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-10">
        <fieldset>
          <legend className={legend}>01 · Wilayah</legend>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-sm">
            {WILAYAH.map((w) => (
              <label key={w} className="relative cursor-pointer">
                <input type="radio" name="wilayah" checked={wilayah === w} onChange={() => gantiWilayah(w)} className="peer sr-only" />
                <span className={chip}>{w}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={legend}>02 · Hunian ({pilih.length}/{MAKS})</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {daftar.map((p) => {
              const on = pilih.includes(p.id);
              return (
                <label key={p.id} className={`relative block cursor-pointer border transition ${on ? 'border-gold' : 'border-white/10 hover:border-gold/50'} ${!on && pilih.length >= MAKS ? 'opacity-50' : ''}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(p.id)} disabled={!on && pilih.length >= MAKS} className="peer sr-only" />
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <Image src={p.media.foto[0]} alt="" fill sizes="(max-width:640px) 100vw, 220px" className="object-cover" />
                    {on && <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-gold"><Check size={15} /></span>}
                  </span>
                  <span className="block p-3 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold">
                    <span className="block font-display text-lg leading-tight text-ink">{p.judul}</span>
                    <span className="mt-1 block text-xs text-muted">{p.lokasi.kecamatan} · {hargaLabel(p)}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className={legend}>03 · Hari & jam mulai</legend>
          {hari.length === 0 ? <p className="mt-4 text-sm text-muted">Memuat tanggal…</p> : (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {hari.map((d, i) => (
                <label key={i} className="relative cursor-pointer">
                  <input type="radio" name="hari" checked={h === i} onChange={() => setH(i)} className="peer sr-only" />
                  <span className={`${chip} px-2`}>
                    <span className="block text-[11px] uppercase tracking-wide">{d.toLocaleDateString('id-ID', { weekday: 'short' })}</span>
                    <span className="block font-display text-xl">{d.getDate()}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
          <div className="mt-3 grid grid-cols-3 gap-2 sm:max-w-sm">
            {MULAI.map((m) => (
              <label key={m} className="relative cursor-pointer">
                <input type="radio" name="mulai" checked={mulai === m} onChange={() => setMulai(m)} className="peer sr-only" />
                <span className={chip}>{m}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={legend}>04 · Titik awal & kontak</legend>
          <label className="mt-4 block text-sm text-ink/85">Titik awal
            <select value={jemput} onChange={(e) => setJemput(+e.target.value)} className={`${field} bg-sand`}>
              {JEMPUT[wilayah].map((j, i) => <option key={j} value={i}>{j}</option>)}
            </select>
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-ink/85">Nama<input value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" required className={field} /></label>
            <label className="block text-sm text-ink/85">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className={field} /></label>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-white/10 bg-sand p-6 md:p-8">
          <p className={legend}>Rencana hari itu</p>
          <h2 className="mt-3 font-display text-3xl font-light text-ink">{tgl || 'Pilih tanggal'}</h2>
          {jadwal.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Pilih satu sampai tiga hunian. Urutan kunjungan disusun otomatis agar perjalanan antarkawasan paling singkat.</p>
          ) : (
            <ol className="mt-6 space-y-0" aria-live="polite">
              {jadwal.map((j, i) => (
                <li key={j.p.id}>
                  {j.jalan > 0 && (
                    <p className="flex items-center gap-2 border-l border-dashed border-gold/40 py-3 pl-5 text-xs text-muted"><Car size={13} aria-hidden="true" /> ±{j.jalan} menit perjalanan</p>
                  )}
                  <div className="border-l border-gold py-2 pl-5">
                    <p className="flex items-center gap-2 text-xs text-gold"><Clock size={13} aria-hidden="true" /> {keJam(j.dari)}–{keJam(j.sampai)}</p>
                    <p className="mt-1 font-display text-xl leading-tight text-ink">{i + 1}. {j.p.judul}</p>
                    <p className="text-xs text-muted">{j.p.lokasi.kecamatan}, {j.p.lokasi.kota}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {jadwal.length > 0 && (
            <p className="mt-6 border-t border-white/10 pt-4 text-sm text-ink/80">Selesai sekitar <span className="text-gold">{keJam(jadwal[jadwal.length - 1].sampai)}</span>. Waktu tempuh adalah perkiraan di luar jam sibuk.</p>
          )}
          <button type="submit" disabled={!siap} className="mt-6 w-full bg-gold py-4 text-sm font-semibold uppercase tracking-[0.15em] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            {pilih.length ? 'Minta kunjungan ini' : 'Pilih hunian dulu'}
          </button>
          <p className="mt-3 text-center text-xs text-muted">Purwarupa: formulir ini tidak mengirim data.</p>
        </div>
      </aside>
    </form>
  );
}
