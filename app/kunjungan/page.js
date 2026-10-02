import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import Kunjungan from '@/components/Kunjungan';

export const metadata = {
  title: 'Kunjungan privat',
  description: 'Susun satu hari kunjungan privat ke beberapa hunian Lumora di Bali atau Jakarta. Rute diurutkan otomatis agar perjalanan paling singkat.',
  alternates: { canonical: '/kunjungan' },
};

export default function KunjunganPage() {
  return (
    <main className="relative z-10">
      <PageHeader kicker="Kunjungan privat" title="Satu hari, beberapa hunian" subtitle="Pilih wilayah dan sampai tiga hunian. Kami mengurutkan rutenya; Anda cukup datang." />
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<p className="py-20 text-center text-muted">Memuat…</p>}>
            <Kunjungan />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
