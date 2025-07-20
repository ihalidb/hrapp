const sampleData = [
  { id: 1, name: 'Ahmet Yılmaz', position: 'Software Developer', department: 'IT' },
  { id: 2, name: 'Ayşe Demir', position: 'HR Manager', department: 'Human Resources' },
  { id: 3, name: 'Mehmet Kaya', position: 'Sales Representative', department: 'Sales' },
  { id: 4, name: 'Fatma Öztürk', position: 'Marketing Specialist', department: 'Marketing' },
];

export function Personnel() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personeller</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İsim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pozisyon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleData.map((person) => (
              <tr key={person.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 