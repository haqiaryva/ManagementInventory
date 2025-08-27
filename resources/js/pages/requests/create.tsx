import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Masukkan Request',
        href: '/requests/create',
    },
];

// interface ManageUnit {
//     id: number;
//     nama_unit: string;
// }

interface PageProps {
    units: { id: number; nama_unit: string }[];
    // atkItems: { id: number; nama_barang: string }[];
    auth: { user: { name: string } };
    [key: string]: any;
}

export default function CreateUnit() {
    const { units, auth } = usePage<PageProps>().props;
    // Inertia form handling
    const { data, setData, post, processing, errors } = useForm({
        nama_barang: '',
        tanggal: '',
        penerima: '',
        // unit_id: '', 
        qty: '',
        satuan: '',
        pic: auth.user.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('requests.store')); // Pastikan route POST ini ada
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Masukkan Request" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Request</h2>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Nama Barang</label>
                            <input
                                type="text"
                                name="nama_barang"
                                value={data.nama_barang}
                                onChange={(e) => setData('nama_barang', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Tanggal</label>
                            <input
                                type="date"
                                name="tanggal"
                                value={data.tanggal}
                                onChange={(e) => setData('tanggal', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>

                        {/* Unit */}
                        {/* <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Unit</label>
                            <select
                                name="unit_id"
                                value={data.unit_id}
                                onChange={(e) => setData('unit_id', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            >
                                <option value="">-- Pilih Unit --</option>
                                {units.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.nama_unit}
                                    </option>
                                ))}
                            </select>
                            {errors.unit_id && <p className="text-red-500 text-sm">{errors.unit_id}</p>}
                        </div> */}

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Jumlah</label>
                            <input
                                type="number"
                                name="qty"
                                value={data.qty}
                                onChange={(e) => setData('qty', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Satuan</label>
                            <input
                                type="text"
                                name="satuan"
                                value={data.satuan}
                                onChange={(e) => setData('satuan', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Penerima</label>
                            <input
                                type="text"
                                name="penerima"
                                value={data.penerima}
                                onChange={(e) => setData('penerima', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Unit</label>
                            <input
                                type="text"
                                name="pic"
                                value={data.pic}
                                className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-700"
                                required readOnly
                            />
                        </div>

                        {/* {errors.unit_id && <p className="text-red-500 text-sm">{errors.unit_id}</p>} */}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                // disabled={processing}
                                className="bg-gray-500 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-full transition duration-200 inline-flex items-center"
                            >
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