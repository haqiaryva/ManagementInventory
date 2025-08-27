import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { Check, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage User',
        href: '/manageUser',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        per_page: number;
        total: number;
        from: number;

    };
    [key: string]: any;
}

export default function Index() {
    const { users } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border shadow-lg">
                    <PlaceholderPattern className="absolute inset-0 size-0 stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="p-4 sm:p-6 text-gray-900">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                            <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 leading-tight">
                                List User
                            </h2>
                            <Link
                                href={route('manageUser.create')}
                                className="inline-flex items-center bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2">

                                    <path d="M2 21a8 8 0 0 1 13.292-6" />
                                    <circle cx="10" cy="8" r="5" />
                                    <path d="M19 16v6" />
                                    <path d="M22 19h-6" />
                                </svg>
                                Tambah Unit
                            </Link>
                        </div>

                        {/* Tabel Responsif */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="w-16 text-center px-4 sm:px-6 py-3 border-b">No</th>
                                        <th className="text-center px-6 py-3 border-b">Nama Unit</th>
                                        <th className="text-center px-6 py-3 border-b">Username</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {users?.data?.map((user: User, index: number) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="w-16 text-center px-4 sm:px-6 py-3">{users.from + index}</td>
                                            <td className="text-center px-6 py-3">{user.name}</td>
                                            <td className="text-center px-6 py-3">{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>


                        <div className="mt-4 flex justify-end">
                            {users.total > users.per_page && (
                                <div className="flex flex-wrap gap-2">
                                    {users.links.map((link, index) => (
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
