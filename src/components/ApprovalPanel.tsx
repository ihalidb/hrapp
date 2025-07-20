import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';

interface ApprovalRequest {
  id: number;
  type: 'leave' | 'expense';
  employeeName: string;
  summary: string;
  date: string;
  details: string;
  status: 'pending' | 'approved' | 'rejected';
}

const sampleRequests: ApprovalRequest[] = [
  {
    id: 1,
    type: 'leave',
    employeeName: 'Ali Yıldız',
    summary: 'Yıllık İzin - 5 gün',
    date: '2024-03-25',
    details: '25-29 Mart tarihleri arası yıllık izin talebi',
    status: 'pending',
  },
  {
    id: 2,
    type: 'expense',
    employeeName: 'Fatma Öztürk',
    summary: 'Ulaşım Masrafı - 250 TL',
    date: '2024-03-20',
    details: 'Müşteri ziyareti için taksi masrafı',
    status: 'pending',
  },
];

interface ApprovalPanelProps {
  type: 'leave' | 'expense';
}

export function ApprovalPanel({ type }: ApprovalPanelProps) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(
    sampleRequests.filter(req => req.type === type)
  );
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-4">
      {requests.map(request => (
        <div
          key={request.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${
            request.status !== 'pending' ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {request.employeeName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {request.summary}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {request.date}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {request.status === 'pending' ? (
                <>
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="p-2 text-green-600 hover:text-green-700 dark:hover:text-green-500"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="p-2 text-red-600 hover:text-red-700 dark:hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    request.status === 'approved'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                  }`}
                >
                  {request.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                </span>
              )}
            </div>
          </div>

          {selectedRequest?.id === request.id && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Detaylar
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {request.details}
              </p>
            </div>
          )}
        </div>
      ))}

      {requests.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Bekleyen {type === 'leave' ? 'izin' : 'masraf'} talebi bulunmuyor.
        </div>
      )}
    </div>
  );
} 