import { useState } from 'react';
import { Users, Plus, Edit2, Trash2 } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  title: string;
  managerId: number | null;
  imageUrl?: string;
}

interface EmployeeWithChildren extends Employee {
  children: EmployeeWithChildren[];
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'Ahmet Yılmaz', title: 'CEO', managerId: null },
  { id: 2, name: 'Mehmet Kaya', title: 'CTO', managerId: 1 },
  { id: 3, name: 'Ayşe Demir', title: 'HR Director', managerId: 1 },
  { id: 4, name: 'Fatma Öztürk', title: 'Senior Developer', managerId: 2 },
  { id: 5, name: 'Ali Yıldız', title: 'Developer', managerId: 4 },
  { id: 6, name: 'Zeynep Şahin', title: 'HR Specialist', managerId: 3 },
];

export function Organization() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const buildHierarchy = (employees: Employee[], managerId: number | null = null): EmployeeWithChildren[] => {
    return employees
      .filter(employee => employee.managerId === managerId)
      .map(employee => ({
        ...employee,
        children: buildHierarchy(employees, employee.id),
      }));
  };

  const hierarchy = buildHierarchy(employees);

  const renderEmployee = (employee: EmployeeWithChildren, level: number = 0) => {
    const hasChildren = employee.children.length > 0;

    return (
      <div key={employee.id} className="relative">
        <div
          className={`
            flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm
            ${level > 0 ? 'mt-4 ml-8' : ''}
          `}
        >
          <div className="flex-shrink-0">
            {employee.imageUrl ? (
              <img
                src={employee.imageUrl}
                alt={employee.name}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {employee.title}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedEmployee(employee)}
              className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => {/* Silme işlemi */}}
              className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {hasChildren && (
          <div className="ml-8 mt-4 space-y-4">
            {employee.children.map(child => renderEmployee(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Organizasyon Şeması
        </h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Çalışan
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <div className="space-y-6">
          {hierarchy.map(employee => renderEmployee(employee))}
        </div>
      </div>
    </div>
  );
} 