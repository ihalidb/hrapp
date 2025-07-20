import { useState } from 'react';
import { Calendar, DollarSign, Clock, Users, FileText, Settings, Download } from 'lucide-react';
import { LeaveRequestForm } from '../components/LeaveRequestForm';
import { ExpenseForm } from '../components/ExpenseForm';

// Örnek kullanıcı verisi - gerçek uygulamada API'den gelecek
const currentUser = {
  name: 'Ahmet Yılmaz',
  role: 'admin', // 'admin' | 'manager' | 'employee'
  remainingDays: 8,
  lastExpense: {
    status: 'pending',
    amount: '250 TL',
    date: '2024-03-19'
  }
};

const teamStats = {
  pendingLeaves: 3,
  pendingExpenses: 2,
  totalEmployees: 25
};

export function Dashboard() {
  const [isLeaveFormOpen, setIsLeaveFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  const renderEmployeeContent = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Hoş geldiniz, {currentUser.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Kalan İzin</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {currentUser.remainingDays} gün
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Son Masraf</span>
            </div>
            <p className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              {currentUser.lastExpense.amount}
              <span className="ml-2 text-sm text-yellow-600 dark:text-yellow-400">
                (Onay Bekliyor)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Hızlı Aksiyonlar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsLeaveFormOpen(true)}
            className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Yeni İzin Talebi</span>
          </button>
          <button
            onClick={() => setIsExpenseFormOpen(true)}
            className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <DollarSign className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Masraf Girişi</span>
          </button>
        </div>
      </div>

      <LeaveRequestForm
        isOpen={isLeaveFormOpen}
        onClose={() => setIsLeaveFormOpen(false)}
      />
      <ExpenseForm
        isOpen={isExpenseFormOpen}
        onClose={() => setIsExpenseFormOpen(false)}
      />
    </div>
  );

  const renderManagerContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ekip</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {teamStats.totalEmployees}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Çalışan</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">İzin Talepleri</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {teamStats.pendingLeaves}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Bekleyen Onay</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Masraf Talepleri</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {teamStats.pendingExpenses}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Bekleyen Onay</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Hızlı Aksiyonlar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">İzin Onayları</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <DollarSign className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Masraf Onayları</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Users className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Ekip Listesi</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdminContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Kullanıcılar</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {teamStats.totalEmployees}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Kullanıcı</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Departmanlar</h3>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">5</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Aktif Departman</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Roller</h3>
            <Settings className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">3</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tanımlı Rol</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Raporlar</h3>
            <Download className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Aylık Rapor</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Sistem Yönetimi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Users className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Kullanıcı Yönetimi</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <FileText className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Departman Yönetimi</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Settings className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Sistem Ayarları</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Download className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">Raporlar</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentUser.role === 'employee' && renderEmployeeContent()}
      {currentUser.role === 'manager' && renderManagerContent()}
      {currentUser.role === 'admin' && renderAdminContent()}
    </div>
  );
} 