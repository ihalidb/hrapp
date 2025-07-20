import { useState } from 'react';
import { Receipt, AlertCircle, Upload, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ExpenseRequest {
  date: string;
  type: 'transport' | 'accommodation' | 'food' | 'other';
  amount: string;
  description: string;
  files: File[];
}

const expenseTypes = [
  { id: 'transport', label: 'Ulaşım' },
  { id: 'accommodation', label: 'Konaklama' },
  { id: 'food', label: 'Yemek' },
  { id: 'other', label: 'Diğer' },
];

export function ExpenseRequest() {
  const { user } = useAuth();
  const [request, setRequest] = useState<ExpenseRequest>({
    date: '',
    type: 'transport',
    amount: '',
    description: '',
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setRequest((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setRequest((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Masraf talebiniz başarıyla oluşturuldu.');
      setRequest({
        date: '',
        type: 'transport',
        amount: '',
        description: '',
        files: [],
      });
    } catch (err) {
      setError('Masraf talebi oluşturulurken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Masraf Talebi
          </h2>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Receipt className="h-5 w-5 mr-2" />
            Bu ay: 1.250 TL
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
                Tarih
              </label>
              <input
                type="date"
                value={request.date}
                onChange={(e) => setRequest({ ...request, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tutar (TL)
              </label>
              <input
                type="number"
                value={request.amount}
                onChange={(e) => setRequest({ ...request, amount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Masraf Türü
            </label>
            <select
              value={request.type}
              onChange={(e) => setRequest({ ...request, type: e.target.value as ExpenseRequest['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            >
              {expenseTypes.map((type) => (
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
              placeholder="Masraf detaylarını açıklayın"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Belgeler
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Dosya Yükle</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">veya sürükleyip bırakın</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, JPG veya PNG (max. 10MB)
                </p>
              </div>
            </div>

            {/* Yüklenen Dosyalar */}
            {request.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {request.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            Aktif masraf talebiniz bulunmamaktadır.
          </div>
        </div>
      </div>
    </div>
  );
} 