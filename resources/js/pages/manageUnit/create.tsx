import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambahkan Unit',
        href: '/manageUnit/create',
    },
];

// interface ManageUnit {
//     id: number;
//     nama_unit: string;
// }

// interface PageProps {
//   units: {
//     data: ManageUnit[];
//   };
//   [key: string]: any; // This should be at the root level
// }

export default function CreateUnit() {
    // Inertia form handling
    const { data, setData, post, processing, errors } = useForm({
        nama_unit: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('unit.store')); // Pastikan route POST ini ada
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Unit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Tambah Unit</h2>

                        <div className="flex items-center gap-4 mb-4">
                            <label className="w-40 text-sm font-medium text-gray-700">Nama Unit</label>
                            <input
                                type="text"
                                name="nama_unit"
                                value={data.nama_unit}
                                onChange={(e) => setData('nama_unit', e.target.value)}
                                className="w-full py-2 px-4 rounded-full border border-gray-300"
                                required
                            />
                        </div>
                        {errors.nama_unit && <p className="text-red-500 text-sm">{errors.nama_unit}</p>}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
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