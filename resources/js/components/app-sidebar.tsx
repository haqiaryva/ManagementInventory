import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, PackageSearch, SquareArrowDown, SquareArrowUp, TicketSlash, Building2, UsersRound, PackageX, CheckCircle } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';


const superadminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Items',
        href: '/atkItems',
        icon: PackageSearch,
    },

    {
        title: 'History Masuk',
        href: '/barangMasuk',
        icon: SquareArrowDown,
    },

    {
        title: 'History Keluar',
        href: '/barangKeluar',
        icon: SquareArrowUp,
    },

    {
        title: 'Requests',
        href: '/requests',
        icon: TicketSlash,
    },

    {
        title: 'Approval',
        href: '/approval',
        icon: CheckCircle,
    },

    {
        title: 'Barang Kosong',
        href: '/barangKosong',
        icon: PackageX,
    },

    {
        title: 'Manage Units',
        href: '/manageUser',
        icon: Building2,
    },

    // {
    //     title: 'Manage Units',
    //     href: '/units',
    //     icon: Building2,
    // },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Items',
        href: '/atkItems',
        icon: PackageSearch,
    },

    {
        title: 'History Masuk',
        href: '/barangMasuk',
        icon: SquareArrowDown,
    },

    {
        title: 'History Keluar',
        href: '/barangKeluar',
        icon: SquareArrowUp,
    },

    {
        title: 'Requests',
        href: '/requests',
        icon: TicketSlash,
    },

    {
        title: 'Approval',
        href: '/approval',
        icon: CheckCircle,
    },

    {
        title: 'Barang Kosong',
        href: '/barangKosong',
        icon: PackageX,
    },

];

const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Items',
        href: '/atkItems',
        icon: PackageSearch,
    },
    {
        title: 'Requests',
        href: '/requests',
        icon: TicketSlash,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

// export function AppSidebar() {

//     const { auth } = usePage().props as any;
//     const role = auth?.user?.role;
//     const menuItems = role === 'admin' ? mainNavItems : adminNavItems;

//     return (
//         <Sidebar collapsible="icon" variant="inset">
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href="/dashboard" prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={menuItems} />
//             </SidebarContent>

//             <SidebarFooter>
//                 {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }

export function AppSidebar() {
    const { auth } = usePage().props as { auth: any };
    const role = auth?.user?.role;

    // Pilih menu berdasarkan role
    let menuItems: NavItem[];
    switch (role) {
        case 'superadmin':
            menuItems = superadminNavItems;
            break;
        case 'admin':
            menuItems = adminNavItems;
            break;
        case 'user':
            menuItems = userNavItems;
            break;
        default:
            menuItems = userNavItems;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={menuItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
