import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
// import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'History Keluar',
        href: '/barangKeluar',
    },
];

// interface BarangKeluar {
//     id: number;
//     tanggal: string;
//     penerima: string;
//     qty: number;
//     satuan: string;
//     pic: string;
//     unit?: {
//         nama_unit: string;
//     };
//     atk_item?: {
//         nama_barang: string;
//         kode_barang: string;
//     };
// }

interface BarangKeluar {
    id: number;
    tanggal: string;
    penerima: string;
    qty: number;
    satuan: string;
    pic: string;
    status: 'pending' | 'approved';
    approved_at?: string;
    rejection_reason?: string;
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
}

// interface PageProps {
//     barangKeluar: {
//         data: BarangKeluar[];
//         links: { url: string | null; label: string; active: boolean }[];
//         from: number;
//         to: number;
//         total: number;
//         per_page: number;
//     };
//     filters: {
//         start_date?: string;
//         end_date?: string;
//     };
//     [key: string]: any;
// }

interface PageProps {
    barangKeluar: {
        data: BarangKeluar[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        start_date?: string;
        end_date?: string;
        status?: string;
    };
    [key: string]: any;
}



// export default function Index() {
//     const page = usePage<PageProps>();
//     const { start_date } = page.props;
//     const { end_date } = page.props;
//     const { barangKeluar } = page.props;

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Barang Keluar" />
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
//                 <div className="relative flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-lg overflow-hidden">
//                     <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

//                     <div className="p-4 sm:p-6 text-gray-900">
//                         {/* Header + Filter */}
//                         <div className="bg-white p-4 rounded-lg shadow mb-6">
//                             <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 leading-tight mb-4 text-center sm:text-left">
//                                 Daftar Barang Keluar
//                             </h2>

//                             {/* Filter Form */}
//                             <form method="GET" action="/barangKeluar" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div className="flex flex-col">
//                                     <label htmlFor="start_date" className="text-sm font-medium text-gray-700 mb-1">
//                                         Dari Tanggal
//                                     </label>
//                                     <input
//                                         type="date"
//                                         id="start_date"
//                                         name="start_date"
//                                         defaultValue={start_date || ''}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />
//                                 </div>

//                                 <div className="flex flex-col">
//                                     <label htmlFor="end_date" className="text-sm font-medium text-gray-700 mb-1">
//                                         Hingga Tanggal
//                                     </label>
//                                     <input
//                                         type="date"
//                                         id="end_date"
//                                         name="end_date"
//                                         defaultValue={end_date || ''}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />
//                                 </div>

//                                 <div className="sm:col-span-2 flex gap-2 ml-auto">
//                                     <button
//                                         type="submit"
//                                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
//                                     >
//                                         Terapkan
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => router.visit('/barangMasuk', { preserveScroll: true })}
//                                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//                                     >
//                                         Reset
//                                     </button>
//                                 </div>

//                             </form>
//                         </div>

//                         {/* Table */}
//                         <div className="overflow-x-auto bg-white rounded-lg shadow">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50 text-gray-600 font-medium text-xs sm:text-sm">
//                                     <tr>
//                                         <th className="px-4 sm:px-6 py-3 text-left">No</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Tanggal</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Penerima</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Unit</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Nama Barang</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Kode Barang</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Jumlah</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">Satuan</th>
//                                         <th className="px-4 sm:px-6 py-3 text-left">PIC</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-100 text-gray-700 text-xs sm:text-sm">
//                                     {barangKeluar?.data?.map((item: BarangKeluar, index: number) => (
//                                         <tr key={item.id} className="hover:bg-gray-50">
//                                             <td className="px-4 sm:px-6 py-3">{barangKeluar.from + index}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.tanggal}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.penerima}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.unit?.nama_unit || '-'}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.atk_item?.nama_barang || '-'}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.atk_item?.kode_barang || '-'}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.qty}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.satuan}</td>
//                                             <td className="px-4 sm:px-6 py-3">{item.pic}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="mt-4 flex justify-end">
//                             {barangKeluar.total > barangKeluar.per_page && (
//                                 <div className="flex flex-wrap gap-2">
//                                     {barangKeluar.links.map((link, index) => (
//                                         <button
//                                             key={index}
//                                             disabled={!link.url}
//                                             onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
//                                             className={`px-3 py-1 border rounded ${link.active
//                                                 ? 'bg-gray-500 text-white'
//                                                 : 'bg-white text-gray-700'
//                                                 } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''
//                                                 }`}
//                                             dangerouslySetInnerHTML={{ __html: link.label }}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AppLayout>

//     );
// }


export default function Index() {
    const { barangKeluar, filters } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Keluar" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-lg overflow-hidden">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="p-4 sm:p-6 text-gray-900">
                        {/* Header + Filter */}
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 leading-tight mb-4 text-center sm:text-left">
                                Daftar Barang Keluar
                            </h2>

                            {/* Filter Form */}
                            <form method="GET" action="/barangKeluar" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="start_date" className="text-sm font-medium text-gray-700 mb-1">
                                        Dari Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        defaultValue={filters.start_date || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="end_date" className="text-sm font-medium text-gray-700 mb-1">
                                        Hingga Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        name="end_date"
                                        defaultValue={filters.end_date || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex gap-2 ml-auto">
                                    <button
                                        type="submit"
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                                    >
                                        Terapkan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.visit('/barangKeluar', { preserveScroll: true })}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-gray-600 font-medium text-xs sm:text-sm">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left">No</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Tanggal</th>                            
                                        <th className="px-4 sm:px-6 py-3 text-left">Nama Barang</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Kode Barang</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Jumlah</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Satuan</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Penerima</th>
                                        <th className="px-4 sm:px-6 py-3 text-left">Unit</th>
                                        {/* <th className="px-4 sm:px-6 py-3 text-left">Status</th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700 text-xs sm:text-sm">
                                    {barangKeluar?.data?.map((item: BarangKeluar, index: number) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 sm:px-6 py-3">{barangKeluar.from + index}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.tanggal}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.atk_item?.nama_barang || '-'}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.atk_item?.kode_barang || '-'}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.qty}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.satuan}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.penerima}</td>
                                            <td className="px-4 sm:px-6 py-3">{item.pic}</td>
                                            {/* <td className="px-4 sm:px-6 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    item.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-end">
                            {barangKeluar.total > barangKeluar.per_page && (
                                <div className="flex flex-wrap gap-2">
                                    {barangKeluar.links.map((link, index) => (
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
