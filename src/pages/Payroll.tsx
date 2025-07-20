import { useState } from 'react';
import { PayrollModal } from '../components/PayrollModal';

const samplePayrolls = [
  {
    id: 1,
    month: 'Temmuz 2023',
    totalSalary: '150,000 TL',
    employeeCount: 25,
    details: [
      { name: 'Ahmet Yılmaz', department: 'IT', salary: '15,000 TL' },
      { name: 'Ayşe Demir', department: 'İK', salary: '12,000 TL' },
      { name: 'Mehmet Kaya', department: 'Satış', salary: '10,000 TL' },
      { name: 'Fatma Öztürk', department: 'Pazarlama', salary: '11,000 TL' },
    ],
  },
  {
    id: 2,
    month: 'Haziran 2023',
    totalSalary: '145,000 TL',
    employeeCount: 24,
    details: [
      { name: 'Ahmet Yılmaz', department: 'IT', salary: '15,000 TL' },
      { name: 'Ayşe Demir', department: 'İK', salary: '12,000 TL' },
      { name: 'Mehmet Kaya', department: 'Satış', salary: '10,000 TL' },
    ],
  },
  {
    id: 3,
    month: 'Mayıs 2023',
    totalSalary: '140,000 TL',
    employeeCount: 23,
    details: [
      { name: 'Ahmet Yılmaz', department: 'IT', salary: '15,000 TL' },
      { name: 'Ayşe Demir', department: 'İK', salary: '12,000 TL' },
    ],
  },
];

export function Payroll() {
  const [selectedPayroll, setSelectedPayroll] = useState<typeof samplePayrolls[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (payroll: typeof samplePayrolls[0]) => {
    setSelectedPayroll(payroll);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayroll(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bordro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samplePayrolls.map((payroll) => (
          <div
            key={payroll.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">{payroll.month}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Toplam Maaş:</span>
                <span className="text-sm font-medium text-gray-900">
                  {payroll.totalSalary}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Çalışan Sayısı:</span>
                <span className="text-sm font-medium text-gray-900">
                  {payroll.employeeCount}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal(payroll)}
              className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Detayları Görüntüle
            </button>
          </div>
        ))}
      </div>

      {selectedPayroll && (
        <PayrollModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          payrollData={selectedPayroll}
        />
      )}
    </div>
  );
} 