import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { Check, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Requests',
        href: '/requests',
    },
];

interface Request {
    id: number;
    tanggal: string;
    nama_barang: string;
    penerima: string;
    qty: number;
    satuan: string;
    pic: string;
    status: 'done' | 'pending' | 'rejected';
    unit?: {
        nama_unit: string;
    };
    atkItem?: {
        nama_barang: string;
        kode_barang: string;
    };
}

interface PageProps {
    requests: {
        data: Request[];
        links: { url: string | null; label: string; active: boolean }[];
        per_page: number;
        total: number;
        from: number;
    };
    auth: { user: { role: string } };
    [key: string]: any;
}

export default function Index() {
    const { requests, auth } = usePage<PageProps>().props;
    const isAdmin = ['admin', 'superadmin'].includes(auth.user.role);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Requests" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="p-4 sm:p-6 text-gray-900">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                            <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 leading-tight">
                                List Permintaan
                            </h2>
                            <Link
                                href={route('requests.create')}
                                className="bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Request ATK
                            </Link>
                        </div>

                        {/* Tabel Responsif */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-center">No</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Tanggal</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Nama Barang</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Jumlah</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Satuan</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Penerima</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Unit</th>
                                        <th className="px-4 sm:px-6 py-3 text-center">Status</th>

                                        {/* Kolom Action hanya untuk Super Admin & Admin */}
                                        {isAdmin && (
                                            <th className="px-4 sm:px-6 py-3 text-center">Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {requests?.data?.map((req: Request, index: number) => (
                                        <tr key={req.id} className="hover:bg-gray-50">
                                            <td className="px-4 sm:px-6 py-3 text-center">{requests.from + index}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.tanggal}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.nama_barang || '-'}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.qty}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.satuan}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.penerima}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.pic}</td>
                                            <td className="px-4 sm:px-6 py-3 text-center">
                                                {req.status === 'done' ? (
                                                    <span className="text-green-600 font-semibold">Done</span>
                                                ) : req.status === 'rejected' ? (
                                                    <span className="text-red-600 font-semibold">Rejected</span>
                                                ) : (
                                                    <span className="text-yellow-600 font-semibold">Pending</span>
                                                )}
                                            </td>

                                            {/* Kolom Action hanya untuk Admin */}
                                            {isAdmin && (
                                                 <td className="px-4 sm:px-6 py-3 text-center">
        {req.status === 'pending' ? ( // Ubah kondisi menjadi req.status === 'pending'
            <div className="flex justify-center items-center gap-2">
                {/* Button Selesai */}
                <button
                    onClick={() => {
                        if (confirm('Lanjutkan ke form selesai?')) {
                            router.visit(route('requests.finishForm', req.id));
                        }
                    }}
                    className="flex justify-center items-center gap-1 px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                    title="Lanjutkan ke Form Selesai"
                >
                    <Check className="w-4 h-4" />
                    Selesai?
                </button>

                {/* Button Tolak */}
                <button
                    onClick={() => {
                        if (confirm('Apakah Anda yakin ingin menolak request ini?')) {
                            router.visit(route('requests.reject', req.id));
                        }
                    }}
                    className="flex justify-center items-center gap-1 px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                    title="Tolak Request"
                >
                    <X className="w-4 h-4" />
                    Tolak
                </button>
            </div>
        ) : (
            <span className="text-gray-500 font-semibold">-</span> // Tampilkan dash untuk semua status selain pending
        )}
    </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className="mt-4 flex justify-end">
                            {requests.total > requests.per_page && (
                                <div className="flex flex-wrap gap-2">
                                    {requests.links.map((link, index) => (
                                        <button
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                            className={`px-3 py-1 border rounded ${link.active
                                                ? 'bg-gray-500 text-white'
                                                : 'bg-white text-gray-700'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
