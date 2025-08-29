import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { Check, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Approval',
        href: '/approval',
    },
];

interface Request {
    id: number;
    tanggal: string;
    penerima: string;
    qty: number;
    satuan: string;
    pic: string;
    status: 'pending' | 'approved' | 'rejected';
    unit?: {
        nama_unit: string;
    };
    atk_item?: {
        nama_barang: string;
        kode_barang: string;
    };
    approver?: {
        name: string;
    };
    rejection_reason?: string;
}

interface PageProps {
    requests: {
        data: Request[];
        links: { url: string | null; label: string; active: boolean }[];
        per_page: number;
        total: number;
        from: number;
    };
    [key: string]: any;
}

export default function Index() {
    const { requests } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Approval" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="p-4 sm:p-6 text-gray-900">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                            <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 leading-tight">
                                Permintaan Barang Keluar
                            </h2>
                        </div>

                        {/* Tabel Responsif */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-center">No</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Tanggal</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Nama Barang</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Kode Barang</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Jumlah</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Satuan</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Penerima</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Unit</th>
                                        <th className="px-4 sm:px-6 py-3 text-center">Status</th>
                                        <th className="px-4 sm:px-6 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {requests?.data?.map((req: Request, index: number) => (
                                        <tr key={req.id} className="hover:bg-gray-50">
                                            <td className="px-4 sm:px-6 py-3 text-center">{requests.from + index}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.tanggal}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.atk_item?.nama_barang || '-'}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.atk_item?.kode_barang || '-'}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.qty}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.satuan}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.penerima}</td>
                                            <td className="px-4 sm:px-6 py-3">{req.pic}</td>
                                            <td className="px-4 sm:px-6 py-3 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 text-center">
                                                {req.status === 'pending' && (
                                                    <div className="flex gap-2 justify-center">
                                                        {/* Tombol Setujui */}
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Lanjutkan ke form selesai?')) {
                                                                    router.visit(route('approval.finishForm', req.id));
                                                                }
                                                            }}
                                                            className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                                                            title="Setujui"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                            Setujui
                                                        </button>
                                                        {/* Tombol Reject */}
                                                        <button
                                                            onClick={() => {
                                                                const reason = prompt('Masukkan alasan penolakan:');
                                                                if (reason) {
                                                                    router.post(route('approval.reject', req.id), { rejection_reason: reason });
                                                                }
                                                            }}
                                                            className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                                                            title="Tolak"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Tolak
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            {/* <td>
                                                {req.status === 'rejected' && req.rejection_reason
                                                    ? <span className="text-red-600" title={req.rejection_reason}>Ditolak</span>
                                                    : req.status}
                                            </td> */}

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
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