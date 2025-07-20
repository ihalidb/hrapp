import { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LeaveRequest {
  startDate: string;
  endDate: string;
  type: 'annual' | 'sick' | 'excuse' | 'unpaid';
  description: string;
}

const leaveTypes = [
  { id: 'annual', label: 'Yıllık İzin' },
  { id: 'sick', label: 'Hastalık İzni' },
  { id: 'excuse', label: 'Mazeret İzni' },
  { id: 'unpaid', label: 'Ücretsiz İzin' },
];

export function LeaveRequest() {
  const { user } = useAuth();
  const [request, setRequest] = useState<LeaveRequest>({
    startDate: '',
    endDate: '',
    type: 'annual',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('İzin talebiniz başarıyla oluşturuldu.');
      setRequest({
        startDate: '',
        endDate: '',
        type: 'annual',
        description: '',
      });
    } catch (err) {
      setError('İzin talebi oluşturulurken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            İzin Talebi
          </h2>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-5 w-5 mr-2" />
            Kalan İzin: 15 gün
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300 mr-2" />
              <span className="text-red-700 dark:text-red-200">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md p-4">
            <span className="text-green-700 dark:text-green-200">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={request.startDate}
                onChange={(e) => setRequest({ ...request, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={request.endDate}
                onChange={(e) => setRequest({ ...request, endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              İzin Türü
            </label>
            <select
              value={request.type}
              onChange={(e) => setRequest({ ...request, type: e.target.value as LeaveRequest['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            >
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Açıklama
            </label>
            <textarea
              value={request.description}
              onChange={(e) => setRequest({ ...request, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="İzin talebiniz için açıklama ekleyin"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Talep Oluştur'}
            </button>
          </div>
        </form>
      </div>

      {/* Aktif Talepler */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Aktif Taleplerim
        </h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm">
            Aktif izin talebiniz bulunmamaktadır.
          </div>
        </div>
      </div>
    </div>
  );
} 