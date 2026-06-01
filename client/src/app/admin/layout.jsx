'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    RiDashboardLine,
    RiStackLine,
    RiProjectorLine,
    RiFileListLine,
    RiArticleLine,
    RiBriefcaseLine,
    RiFileUserLine,
    RiQuestionLine,
    RiChatQuoteLine,
    RiUserLine,
    RiSettingsLine,
    RiLayoutLine,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiMoonLine,
    RiSunLine,
} from 'react-icons/ri';
import styles from './AdminLayout.module.css';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
    const logout = useAuthStore((state) => state.logout);
    // const {
    //     user,
    //     isLoading,
    //     isAuthenticated,
    //     getCurrentUser,
    //     logout,
    // } = useAuthStore((state) => ({
    //     user: state.user,
    //     isLoading: state.isLoading,
    //     isAuthenticated: state.isAuthenticated,
    //     getCurrentUser: state.getCurrentUser,
    //     logout: state.logout,
    // }));

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                await getCurrentUser();
            } catch (_error) {
                router.replace('/login');
            }
        };

        bootstrapAuth();
    }, [getCurrentUser, router]);

    const canAccessDashboard =
        user?.role === 'admin' ||
        (Array.isArray(user?.permissions) && user.permissions.includes('dashboard_view'));

    const menuItems = useMemo(() => [
        ...(canAccessDashboard ? [{ name: 'Dashboard',     icon: RiDashboardLine,    path: '/admin/dashboard' }] : []),
        { name: 'Projects',     icon: RiProjectorLine, path: '/admin/projects' },
        { name: 'Inquiries',    icon: RiFileListLine,  path: '/admin/leadforms' },
        { name: 'Blogs',        icon: RiArticleLine,   path: '/admin/blogs' },
        { name: 'FAQs',         icon: RiQuestionLine,  path: '/admin/faqs' },
        { name: 'Testimonials', icon: RiChatQuoteLine, path: '/admin/testimonials' },
        { name: 'Careers',      icon: RiBriefcaseLine, path: '/admin/careers' },
        { name: 'Applications', icon: RiFileUserLine,  path: '/admin/applications' },
        { name: 'Series CMS',   icon: RiLayoutLine,    path: '/admin/series' },
        { name: 'Categories',   icon: RiStackLine,     path: '/admin/categories' },
        { name: 'Users',        icon: RiUserLine,      path: '/admin/users' },
        { name: 'Settings',     icon: RiSettingsLine,  path: '/admin/settings' },
    ], [canAccessDashboard]);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            router.replace('/login');
        } catch (error) {
            toast.error(error.message || 'Failed to logout');
        }
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f1117', color: '#fff', fontSize: '1rem' }}>
                Loading...
            </div>
        );
    }

    if (!isAuthenticated && !user) {
        return null;
    }

    return (
        <div className={`${styles.adminContainer} ${isDarkMode ? styles.dark : styles.light}`}>
            <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    {!isCollapsed && <h2 className={styles.logo}>Lift Admin</h2>}
                    <button onClick={toggleSidebar} className={styles.toggleBtn}>
                        {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                    </button>
                </div>

                <nav className={styles.navigation}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                <Icon className={styles.navIcon} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>{(user?.firstName || 'A').charAt(0).toUpperCase()}</div>
                        {!isCollapsed && (
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>{`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin'}</p>
                                <p className={styles.userRole}>{user?.role || 'Administrator'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <div className={styles.breadcrumb}>
                        <span>Admin Panel</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={toggleTheme} className={styles.themeToggle}>
                            {isDarkMode ? <RiSunLine /> : <RiMoonLine />}
                        </button>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                </header>
                <div className={styles.contentWrapper}>{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
