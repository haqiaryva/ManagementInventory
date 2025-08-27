import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Head, usePage, router as Inertia } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: 'Ambil ATK', href: '/barangKeluar/create' },
];

export default function CreateBarangKeluar() {
  const { atkItem, units, auth } = usePage().props as any;

  const [form, setForm] = useState({
    atk_item_id: atkItem?.id,
    tanggal: '',
    qty: 1,
    satuan: atkItem?.satuan,
    penerima: '',
    unit_id: '',
    pic: auth?.user?.name ?? '',
  });

  // handle input
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    Inertia.post(route('barangKeluar.store'), form);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ambil ATK" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Ambil ATK</h2>

            {/* Nama Barang (readonly) */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Nama Barang</label>
              <input
                type="text"
                value={atkItem?.nama_barang}
                className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-700"
                disabled
              />
            </div>

            {/* Tanggal */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Jumlah */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Jumlah</label>
              <div className="w-full">
                <input
                  type="number"
                  name="qty"
                  min={1}
                  max={atkItem?.qty}
                  value={form.qty}
                  onChange={handleChange}
                  className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <small className="text-gray-500">Stok tersedia: {atkItem?.qty}</small>
              </div>
            </div>

            {/* Satuan (readonly + hidden input) */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Satuan</label>
              <input
                type="text"
                value={atkItem?.satuan}
                className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-700"
                disabled
              />
              <input type="hidden" name="satuan" value={atkItem.satuan} />
            </div>

            {/* Penerima */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Penerima</label>
              <input
                type="text"
                name="penerima"
                value={form.penerima}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Unit */}
            {/* <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Unit</label>
              <select
                name="unit_id"
                value={form.unit_id}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Pilih Unit --</option>
                {units?.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.nama_unit}
                  </option>
                ))}
              </select>
            </div> */}

            {/* PIC */}
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm font-medium text-gray-700">Unit</label>
              <input
                type="text"
                name="pic"
                value={form.pic}
                readOnly
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
                required
              />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-full transition duration-200 inline-flex items-center"
              >
                {/* ganti icon jika mau pakai svg react atau lucide */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
