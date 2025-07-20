import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

interface SystemSettings {
  companyName: string;
  emailDomain: string;
  maxLeavedays: number;
  maxExpenseAmount: number;
  autoApprovalLimit: number;
  notificationSettings: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
  backupSettings: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    retention: number;
  };
}

const defaultSettings: SystemSettings = {
  companyName: 'HR App',
  emailDomain: '@company.com',
  maxLeavedays: 20,
  maxExpenseAmount: 5000,
  autoApprovalLimit: 1000,
  notificationSettings: {
    email: true,
    push: false,
    slack: false,
  },
  backupSettings: {
    enabled: true,
    frequency: 'daily',
    retention: 30,
  },
};

export function Settings() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sistem Ayarları
        </h2>
        <button
          onClick={() => setSettings(defaultSettings)}
          className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Varsayılana Sıfırla
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Genel Ayarlar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Genel Ayarlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Şirket Adı
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-posta Domain
              </label>
              <input
                type="text"
                value={settings.emailDomain}
                onChange={(e) => setSettings({ ...settings, emailDomain: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* İzin ve Masraf Limitleri */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            İzin ve Masraf Limitleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maksimum İzin Günü
              </label>
              <input
                type="number"
                value={settings.maxLeavedays}
                onChange={(e) => setSettings({ ...settings, maxLeavedays: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maksimum Masraf Tutarı
              </label>
              <input
                type="number"
                value={settings.maxExpenseAmount}
                onChange={(e) => setSettings({ ...settings, maxExpenseAmount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Otomatik Onay Limiti
              </label>
              <input
                type="number"
                value={settings.autoApprovalLimit}
                onChange={(e) => setSettings({ ...settings, autoApprovalLimit: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Bildirim Ayarları
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotif"
                checked={settings.notificationSettings.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      email: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="emailNotif"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                E-posta Bildirimleri
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushNotif"
                checked={settings.notificationSettings.push}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      push: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="pushNotif"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Push Bildirimleri
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="slackNotif"
                checked={settings.notificationSettings.slack}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      slack: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="slackNotif"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Slack Bildirimleri
              </label>
            </div>
          </div>
        </div>

        {/* Yedekleme Ayarları */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Yedekleme Ayarları
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="backupEnabled"
                checked={settings.backupSettings.enabled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    backupSettings: {
                      ...settings.backupSettings,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="backupEnabled"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Otomatik Yedekleme
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Yedekleme Sıklığı
              </label>
              <select
                value={settings.backupSettings.frequency}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    backupSettings: {
                      ...settings.backupSettings,
                      frequency: e.target.value as 'daily' | 'weekly' | 'monthly',
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="daily">Günlük</option>
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Yedek Saklama Süresi (Gün)
              </label>
              <input
                type="number"
                value={settings.backupSettings.retention}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    backupSettings: {
                      ...settings.backupSettings,
                      retention: Number(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 