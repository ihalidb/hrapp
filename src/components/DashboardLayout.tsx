import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  Users,
  DollarSign,
  Network,
  LogOut,
  Sun,
  Moon,
  Settings,
  FileText,
  Download,
  CheckSquare,
  Calendar,
  Receipt,
  ClipboardList
} from 'lucide-react';

const adminMenuItems = [
  { path: '/dashboard', icon: Home, label: 'Genel Bakış' },
  { path: '/dashboard/users', icon: Users, label: 'Kullanıcı Yönetimi' },
  { path: '/dashboard/personnel', icon: FileText, label: 'Personel Listesi' },
  { path: '/dashboard/organization', icon: Network, label: 'Organizasyon Şeması' },
  { path: '/dashboard/settings', icon: Settings, label: 'Sistem Ayarları' },
  { path: '/dashboard/reports', icon: Download, label: 'Raporlar' },
];

const managerMenuItems = [
  { path: '/dashboard', icon: Home, label: 'Genel Bakış' },
  { path: '/dashboard/personnel', icon: Users, label: 'Ekip Listesi' },
  { path: '/dashboard/approvals/leave', icon: Calendar, label: 'İzin Onayları' },
  { path: '/dashboard/approvals/expense', icon: Receipt, label: 'Masraf Onayları' },
  { path: '/dashboard/organization', icon: Network, label: 'Organizasyon Şeması' },
  { path: '/dashboard/reports', icon: Download, label: 'Raporlar' },
];

const employeeMenuItems = [
  { path: '/dashboard', icon: Home, label: 'Genel Bakış' },
  { path: '/dashboard/leave-request', icon: Calendar, label: 'İzin Talebi' },
  { path: '/dashboard/expense-request', icon: Receipt, label: 'Masraf Talebi' },
  { path: '/dashboard/payroll', icon: DollarSign, label: 'Bordro' },
  { path: '/dashboard/organization', icon: Network, label: 'Organizasyon Şeması' },
  { path: '/dashboard/my-requests', icon: ClipboardList, label: 'Taleplerim' },
];

export function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = {
    admin: adminMenuItems,
    manager: managerMenuItems,
    employee: employeeMenuItems,
  }[user?.role || 'employee'];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10">
        <div className="px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                HR App
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {user?.name} ({user?.role})
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } fixed left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 z-20 mt-16`}
        >
          <nav className="mt-5 px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          } transition-all duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
} 