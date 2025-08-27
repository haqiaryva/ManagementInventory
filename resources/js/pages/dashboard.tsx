import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react'; // Pastikan usePage di-import

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface MenuItem {
        title: string;
        link: string;
    }

export default function Dashboard() {
    const { auth } = usePage().props; // Sekarang bisa diakses
    const role = auth?.user?.role;

    let menuItems: MenuItem[] = [];
    if (role === 'superadmin' || role === 'admin') {
        menuItems = [
            { title: 'Masukkan ATK', link: '/barangMasuk/create' },
            { title: 'Masukkan Request', link: '/requests/create' },
            { title: 'Daftar Barang Masuk', link: '/barangMasuk' },
            { title: 'Daftar Barang Keluar', link: '/barangKeluar' },
        ];
    } else if (role === 'user') {
        menuItems = [
            { title: 'List Barang', link: '/atkItems' },
            { title: 'Masukkan Request', link: '/requests/create' },
        ];
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => window.location.href = item.link}
                            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 bg-white hover:shadow-lg transition-shadow cursor-pointer" // Tambahkan cursor-pointer
                            role="button" // Lebih semantik untuk elemen yang bisa diklik
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && (window.location.href = item.link)}
                        >
                            <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <h2 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-center px-2">
                                {item.title}
                            </h2>
                            <span className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-800 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}