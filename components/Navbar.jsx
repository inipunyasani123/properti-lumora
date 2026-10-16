'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  // Menu ponsel tertutup saat pindah halaman atau menekan Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const tutup = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', tutup);
    return () => window.removeEventListener('keydown', tutup);
  }, [open]);

  // Transparan hanya di atas foto beranda; halaman lain langsung solid.
  const solid = scrolled || pathname !== '/' || open;
  const active = (href) => (href === '/' ? pathname === '/' : !!pathname && pathname.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'border-b border-white/10 bg-[#0d0b07]/95 py-3 backdrop-blur-xl' : 'py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" className="py-1 font-display text-2xl tracking-wide text-white">Lumora</Link>

        <div className="hidden flex-1 justify-center md:flex">
          <nav aria-label="Utama" className="flex gap-9 text-sm tracking-wide">
            {nav.map((l) => <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined} className={`py-2 ${active(l.href) ? 'text-gold' : 'text-white/85 transition hover:text-white'}`}>{l.label}</Link>)}
          </nav>
        </div>

        <Link href="/kontak?topik=jual" className="hidden rounded-full border border-gold/50 px-5 py-2 text-sm text-gold transition hover:bg-gold hover:text-black md:block">Titipkan properti</Link>

        <button type="button" className="-mr-2 grid h-11 w-11 place-items-center text-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} aria-controls="menu-ponsel">{open ? <X /> : <Menu />}</button>
      </div>

      {open && (
        <nav id="menu-ponsel" aria-label="Menu ponsel" className="border-t border-white/10 bg-[#0d0b07] px-6 py-3 md:hidden">
          {nav.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={active(l.href) ? 'page' : undefined} className={`block py-3 text-base ${active(l.href) ? 'text-gold' : 'text-white/85'}`}>{l.label}</Link>)}
          <Link href="/kontak?topik=jual" onClick={() => setOpen(false)} className="mt-1 block py-3 text-base text-gold">Titipkan properti</Link>
        </nav>
      )}
    </header>
  );
}
