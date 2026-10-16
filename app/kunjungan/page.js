import PageHeader from '@/components/PageHeader';
import Kunjungan from '@/components/Kunjungan';
import { halaman } from '@/lib/seo';

export const metadata = halaman({
  judul: 'Kunjungan privat',
  deskripsi: 'Susun satu hari kunjungan privat ke beberapa hunian Lumora di Bali atau Jakarta. Rute diurutkan otomatis agar perjalanan paling singkat.',
  path: '/kunjungan',
});

export default function KunjunganPage() {
  return (
    <main className="relative z-10">
      <PageHeader kicker="Kunjungan privat" title="Satu hari, beberapa hunian" subtitle="Pilih wilayah dan sampai tiga hunian. Kami mengurutkan rutenya; Anda cukup datang." />
      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Kunjungan />
        </div>
      </section>
    </main>
  );
}
