import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';
import { ShoppingBag, Pencil } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Items', href: '/atkItems' },
];

interface Item {
    id: number;
    nama_barang: string;
    kode_barang: string;
    qty: number;
    satuan: string;
    lokasi_simpan: string;
}

interface PageProps {
    filters: { q?: string; sort_qty?: string };
    items: {
        data: Item[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
    auth: { user: { role: string } };
    [key: string]: any;
}

export default function Index() {
    const { items, auth, filters } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.q || '');
    const [sortQty, setSortQty] = useState(filters.sort_qty || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/atkItems', { q: search, sort_qty: sortQty }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="p-6 text-gray-900">
                        {/* Search & Filter */}
                        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-6 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full p-3 pl-10 text-sm border rounded-lg focus:ring focus:ring-blue-300"
                                    placeholder="Cari Barang atau Kode Barang..."
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Sort Select */}
                            <select
                                value={sortQty}
                                onChange={(e) => setSortQty(e.target.value)}
                                className="w-full sm:w-auto border rounded-lg py-2 px-3 text-sm"
                            >
                                <option value="asc">Jumlah Terkecil</option>
                                <option value="desc">Jumlah Terbanyak</option>
                            </select>

                            {/* Buttons */}
                            <button type="submit" className="bg-gray-500 hover:bg-gray-900 text-white px-4 py-2 rounded w-full sm:w-auto">
                                Terapkan
                            </button>
                            {(search || sortQty) && (
                                <a href="/atkItems" className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-full sm:w-auto text-center">
                                    Reset
                                </a>
                            )}
                        </form>

                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg shadow border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="px-4 py-2 text-left">No</th>
                                        <th className="px-4 py-2 text-left">Nama Barang</th>
                                        <th className="px-4 py-2 text-left">Kode Barang</th>
                                        <th className="px-4 py-2 text-left">Jumlah</th>
                                        <th className="px-4 py-2 text-left">Satuan</th>
                                        <th className="px-4 py-2 text-left">Lokasi Simpan</th>
                                        <th className="px-4 py-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                    {items.data.length > 0 ? (
                                        items.data.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{items.from + index}</td>
                                                <td className="px-4 py-2">{item.nama_barang}</td>
                                                <td className="px-4 py-2">{item.kode_barang}</td>
                                                <td className="px-4 py-2">{item.qty}</td>
                                                <td className="px-4 py-2">{item.satuan}</td>
                                                <td className="px-4 py-2">{item.lokasi_simpan}</td>
                                                <td className="px-4 py-2 text-center flex justify-center flex-wrap gap-2">
                                                    <a href={`/barangKeluar/create?atk_item_id=${item.id}`} className="inline-flex items-center gap-x-1 bg-gray-500 hover:bg-gray-900 text-white px-3 py-1 rounded">
                                                        <ShoppingBag className="h-4 w-4" />
                                                        Ambil
                                                    </a>
                                                    {auth?.user?.role === 'superadmin' && (
                                                        <a href={`/atkItems/${item.id}/edit`} className="inline-flex items-center gap-x-1 bg-gray-500 hover:bg-gray-900 text-white px-3 py-1 rounded">
                                                            <Pencil className="h-4 w-4" />
                                                            Edit
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Info + Pagination */}
                        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
                            <div>Menampilkan {items.from} - {items.to} dari {items.total} barang</div>
                            <div className="flex flex-wrap gap-2">
                                {items.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                        className={`px-3 py-1 border rounded ${link.active ? 'bg-gray-500 text-white' : 'bg-white text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}