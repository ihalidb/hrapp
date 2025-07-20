import { useState } from 'react';
import { Download, FileText, BarChart2, Users, DollarSign } from 'lucide-react';

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  formats: ('pdf' | 'excel' | 'csv')[];
}

const reportTypes: ReportType[] = [
  {
    id: 'personnel',
    name: 'Personel Raporu',
    description: 'Tüm personel bilgileri ve istatistikleri',
    icon: Users,
    formats: ['pdf', 'excel', 'csv'],
  },
  {
    id: 'payroll',
    name: 'Bordro Raporu',
    description: 'Aylık maaş ve ödemeler raporu',
    icon: DollarSign,
    formats: ['pdf', 'excel'],
  },
  {
    id: 'attendance',
    name: 'Devam Raporu',
    description: 'Personel devam ve izin durumları',
    icon: FileText,
    formats: ['pdf', 'excel', 'csv'],
  },
  {
    id: 'analytics',
    name: 'Analiz Raporu',
    description: 'Departman bazlı performans ve maliyet analizi',
    icon: BarChart2,
    formats: ['pdf', 'excel'],
  },
];

export function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsGenerating(true);
    // Simüle edilmiş rapor oluşturma
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // Gerçek uygulamada burada dosya indirme işlemi olacak
    console.log('Generating report:', selectedReport, format, dateRange);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Raporlar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 cursor-pointer transition-colors ${
              selectedReport === report.id
                ? 'ring-2 ring-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-center justify-between">
              <report.icon
                className={`h-8 w-8 ${
                  selectedReport === report.id
                    ? 'text-blue-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
              <div className="flex space-x-1">
                {report.formats.map((format) => (
                  <span
                    key={format}
                    className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {format.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              {report.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {report.description}
            </p>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Rapor Parametreleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {reportTypes
              .find((r) => r.id === selectedReport)
              ?.formats.map((format) => (
                <button
                  key={format}
                  onClick={() => handleGenerateReport(format)}
                  disabled={isGenerating || !dateRange.startDate || !dateRange.endDate}
                  className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    isGenerating || !dateRange.startDate || !dateRange.endDate
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {format.toUpperCase()}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 