// Konten terpusat Lumora — koleksi hunian mewah (fiktif).
// Listing, konselor, dan harga adalah contoh purwarupa desain. Alamat sengaja hanya
// sampai tingkat kawasan; tidak ada nomor telepon sungguhan.

export const site = {
  name: 'Lumora',
  tagline: 'Enam hunian, dikunjungi secara privat',
  email: 'konselor@lumora.example',
  jam: 'Kunjungan dengan janji, setiap hari 09.00–17.00',
  url: 'https://properti-lumora.pintuweb.id',
  survei: { judul: 'Minta kunjungan privat', catatan: 'Alamat dan nama pemilik dibagikan setelah kunjungan dikonfirmasi.' },
  katalog: { judul: 'Koleksi', sub: 'Enam hunian di Bali dan Jakarta. Setiap kunjungan didampingi satu konselor, tanpa calon pembeli lain.' },
  kontak: { judul: 'Percakapan yang tidak terburu-buru', sub: 'Tulis kebutuhan Anda — atau langsung susun hari kunjungan untuk beberapa hunian sekaligus.' },
};

export const nav = [
  { label: 'Koleksi', href: '/properti' },
  { label: 'Kunjungan', href: '/kunjungan' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
];

export function formatHarga(n) {
  if (n >= 1e9) return 'Rp ' + (n / 1e9).toLocaleString('id-ID', { maximumFractionDigits: 2 }) + ' M';
  if (n >= 1e6) return 'Rp ' + (n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' Jt';
  return 'Rp ' + n.toLocaleString('id-ID');
}
export const hargaLabel = (p) => formatHarga(p.harga) + (p.status === 'Disewakan' ? `/${p.periode === 'tahun' ? 'thn' : 'bln'}` : '');

// Potret konselor: ilustrasi buatan sendiri (scripts/ilustrasi/potret.mjs), bukan foto orang sungguhan.
const konselor = {
  laras: { nama: 'Laras Adiningrat', kode: 'LM-01', wilayah: 'Jakarta', foto: '/images/agen/laras.webp', wajah: '/images/agen/laras-wajah.webp' },
  made: { nama: 'Made Wirawan', kode: 'LM-04', wilayah: 'Bali', foto: '/images/agen/made.webp', wajah: '/images/agen/made-wajah.webp' },
};
const f = (n) => `/images/properti/${n}.webp`;

export const properti = [
  {
    id: 1, judul: 'Villa tebing dengan kolam tak bertepi di Uluwatu', jenisProperti: 'Villa', status: 'Dijual', harga: 28500000000, featured: true, wilayah: 'Bali',
    spesifikasi: { luasTanah: 1200, luasBangunan: 620, kamarTidur: 5, kamarMandi: 6, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan tebing Uluwatu', kota: 'Badung', kecamatan: 'Kuta Selatan' },
    agen: konselor.made, media: { foto: [f('kolam-senja-samudra'), f('tebing-uluwatu'), f('teras-atap-laut'), f('kamar-dinding-kayu')], ket: ['Kolam tak bertepi saat matahari terbenam', 'Tebing kapur di sekitar Uluwatu', 'Teras atap menghadap laut', 'Suite utama'], video: null },
    sertifikat: 'SHM', tahun: 2021,
    deskripsi: 'Kolam 18 meter menggantung di atas tebing kapur, menghadap barat ke Samudra Hindia. Lima suite masing-masing dengan teras sendiri; paviliun staf terpisah di sisi jalan.',
    fasilitas: ['Kolam tak bertepi 18 m', 'Pemandangan matahari terbenam', 'Paviliun staf', 'Generator cadangan', 'Akses mobil sampai pintu'],
  },
  {
    id: 2, judul: 'Rumah batu di lembah Sayan', jenisProperti: 'Villa', status: 'Dijual', harga: 16800000000, featured: true, wilayah: 'Bali',
    spesifikasi: { luasTanah: 1500, luasBangunan: 480, kamarTidur: 4, kamarMandi: 4, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan lembah Sayan', kota: 'Gianyar', kecamatan: 'Ubud' },
    agen: konselor.made, media: { foto: [f('kolam-lembah-ubud'), f('sungai-campuhan'), f('kamar-kayu-gelap')], ket: ['Kolam menghadap hutan lembah', 'Lembah sungai di sekitar Ubud', 'Kamar tidur'], video: null },
    sertifikat: 'SHM', tahun: 2016,
    deskripsi: 'Dinding batu paras yang menyimpan sejuk siang hari, dan teras kayu yang menghadap ke sungai Ayung. Kebun 900 m² dengan pohon mangga dan cempaka yang sudah tua.',
    fasilitas: ['Kebun 900 m²', 'Pemandangan lembah', 'Ruang yoga', 'Kolam air garam', 'Kamar staf'],
  },
  {
    id: 3, judul: 'Rumah modern berhalaman dalam di Kemang', jenisProperti: 'Rumah', status: 'Dijual', harga: 24000000000, featured: true, wilayah: 'Jakarta',
    spesifikasi: { luasTanah: 650, luasBangunan: 720, kamarTidur: 5, kamarMandi: 5, jumlahLantai: 3 },
    lokasi: { alamat: 'Kawasan Kemang', kota: 'Jakarta Selatan', kecamatan: 'Mampang Prapatan' },
    agen: konselor.laras, media: { foto: [f('tangga-lengkung'), f('ruang-santai-tangga'), f('teras-halaman-dalam')], ket: ['Tangga lengkung dan dinding hijau', 'Ruang santai', 'Teras ke halaman dalam'], video: null },
    sertifikat: 'SHM', tahun: 2020,
    deskripsi: 'Halaman dalam dengan pohon tabebuya membuat setiap ruang mendapat cahaya tanpa membuka diri ke jalan. Lift rumah, basement untuk empat mobil, dan studio di lantai atas.',
    fasilitas: ['Halaman dalam', 'Lift rumah', 'Basement 4 mobil', 'Studio lantai atas', 'Panel surya'],
  },
  {
    id: 4, judul: 'Penthouse dua lantai di kawasan SCBD', jenisProperti: 'Apartemen', status: 'Disewakan', harga: 85000000, periode: 'bulan', featured: true, wilayah: 'Jakarta',
    spesifikasi: { luasTanah: 0, luasBangunan: 410, kamarTidur: 3, kamarMandi: 4, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan SCBD', kota: 'Jakarta Selatan', kecamatan: 'Kebayoran Baru' },
    agen: konselor.laras, media: { foto: [f('jakarta-hitam-putih'), f('ruang-makan-kota'), f('sofa-lampu-kuningan'), f('teras-atap-makan')], ket: ['Pemandangan pusat kota', 'Ruang makan menghadap kota', 'Ruang duduk', 'Teras atap'], video: null },
    sertifikat: 'Strata Title', tahun: 2017,
    deskripsi: 'Dua lantai teratas dengan lift pribadi dan teras atap. Disewakan lengkap dengan perabot; kontrak minimal satu tahun, biaya pengelolaan termasuk.',
    fasilitas: ['Lift pribadi', 'Teras atap', 'Furnished', 'Parkir 3 mobil', 'Concierge 24 jam'],
  },
  {
    id: 5, judul: 'Rumah tropis lima kamar di Canggu', jenisProperti: 'Villa', status: 'Disewakan', harga: 780000000, periode: 'tahun', featured: false, wilayah: 'Bali',
    spesifikasi: { luasTanah: 900, luasBangunan: 520, kamarTidur: 5, kamarMandi: 5, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan Berawa', kota: 'Badung', kecamatan: 'Kuta Utara' },
    agen: konselor.made, media: { foto: [f('kolam-gazebo-tropis'), f('villa-kolam-udara'), f('sawah-berundak-canggu')], ket: ['Kolam di antara pepohonan', 'Rumah dan kolam dari atas', 'Sawah berundak di sekitar Canggu'], video: null },
    sertifikat: 'SHM', tahun: 2019,
    deskripsi: 'Sewa tahunan untuk keluarga yang pindah ke Bali. Sepuluh menit ke sekolah internasional, lima menit ke pantai; staf rumah tangga bisa dilanjutkan.',
    fasilitas: ['Kolam 15 m', 'Furnished', 'Dekat sekolah internasional', 'Staf bisa dilanjutkan', 'Internet fiber'],
  },
  {
    id: 6, judul: 'Rumah keluarga di Pondok Indah', jenisProperti: 'Rumah', status: 'Dijual', harga: 32000000000, featured: false, wilayah: 'Jakarta',
    spesifikasi: { luasTanah: 820, luasBangunan: 900, kamarTidur: 6, kamarMandi: 6, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan Pondok Indah', kota: 'Jakarta Selatan', kecamatan: 'Kebayoran Lama' },
    agen: konselor.laras, media: { foto: [f('rumah-kolam-taman'), f('ruang-makan-tenang'), f('ruang-baca-sofa')], ket: ['Rumah, kolam, dan taman', 'Ruang makan dan keluarga', 'Ruang baca'], video: null },
    sertifikat: 'SHM', tahun: 2012,
    deskripsi: 'Rumah keluarga di jalan yang tenang, dengan kolam dan taman belakang. Direnovasi menyeluruh pada 2023 — kelistrikan, atap, dan seluruh kamar mandi.',
    fasilitas: ['Direnovasi 2023', 'Kolam renang', 'Taman belakang', 'Garasi 4 mobil', 'Rumah staf'],
  },
];

export const jenisList = ['Semua', ...Array.from(new Set(properti.map((p) => p.jenisProperti)))];
export const statusList = ['Semua', 'Dijual', 'Disewakan'];
export const kotaList = ['Semua', ...Array.from(new Set(properti.map((p) => p.lokasi.kota)))];
export const hargaFilter = [
  { v: 'j20', label: 'Beli di bawah Rp 20 M', status: 'Dijual', max: 2e10 },
  { v: 'j99', label: 'Beli Rp 20 M ke atas', status: 'Dijual', min: 2e10 },
  { v: 's1', label: 'Sewa', status: 'Disewakan', min: 1 },
];

const IKON = { Rumah: 'Home', Apartemen: 'Building2', Villa: 'Palmtree' };
export const kategori = jenisList.slice(1).map((j) => ({ jenis: j, icon: IKON[j] || 'Home' }));

export const stats = [
  { value: String(properti.length), label: 'Hunian' },
  { value: String(new Set(properti.map((p) => p.wilayah)).size), label: 'Wilayah' },
  { value: String(new Set(properti.map((p) => p.agen.kode)).size), label: 'Konselor' },
  { value: '1', label: 'Tamu per kunjungan' },
];

export const faqs = [
  { q: 'Mengapa koleksinya hanya enam?', a: 'Setiap hunian dipegang satu konselor yang mengenalnya sampai detail. Kami tidak menambah koleksi bila belum bisa melayaninya dengan baik.' },
  { q: 'Apakah nama pemilik dirahasiakan?', a: 'Ya. Nama pemilik dan alamat lengkap hanya dibagikan kepada tamu yang kunjungannya sudah dikonfirmasi.' },
  { q: 'Bisakah melihat beberapa hunian dalam satu hari?', a: 'Bisa — susun di halaman Kunjungan. Kami mengurutkan rute agar perjalanan antarkawasan sesingkat mungkin.' },
];

export const tentang = {
  judul: 'Sedikit hunian, satu tamu dalam satu waktu',
  subjudul: 'Kunjungan adalah intinya',
  cerita: [
    'Lumora tidak memasang papan "dijual" dan tidak mengadakan open house. Setiap hunian dikunjungi oleh satu tamu dalam satu waktu, didampingi konselor yang memegangnya.',
    'Di Bali, kunjungan bisa dimulai dari hotel atau bandara; di Jakarta, dari kantor Anda. Kami menyusun urutannya — Anda cukup memilih hunian dan harinya.',
  ],
  foto: f('kolam-malam-gazebo'),
  nilai: [
    ['Privat', 'Satu tamu per kunjungan, tanpa calon pembeli lain di lokasi.'],
    ['Diskret', 'Nama pemilik dan alamat hanya untuk tamu yang terkonfirmasi.'],
    ['Didampingi', 'Konselor yang sama dari kunjungan pertama sampai serah terima.'],
  ],
  cta: 'Susun hari kunjungan Anda',
};

// Perkiraan waktu tempuh antarkawasan (menit, di luar jam sibuk) untuk halaman Kunjungan.
export const WAKTU_TEMPUH = {
  'Kuta Selatan|Ubud': 90, 'Kuta Selatan|Kuta Utara': 55, 'Ubud|Kuta Utara': 60,
  'Mampang Prapatan|Kebayoran Baru': 20, 'Mampang Prapatan|Kebayoran Lama': 30, 'Kebayoran Baru|Kebayoran Lama': 25,
};
export const tempuh = (a, b) => (a === b ? 10 : WAKTU_TEMPUH[`${a}|${b}`] ?? WAKTU_TEMPUH[`${b}|${a}`] ?? 60);

export const halamanEkstra = [];
export const tautanDetail = (p) => ({ label: 'Gabungkan dalam satu hari kunjungan', sub: `Bersama hunian lain di ${p.wilayah}`, href: `/kunjungan?id=${p.id}` });

export const getProperti = (id) => properti.find((p) => String(p.id) === String(id));
export const propertiSerupa = (item, n = 3) => properti.filter((p) => p.id !== item.id && p.wilayah === item.wilayah).slice(0, n);
