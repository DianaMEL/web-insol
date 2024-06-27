import React from 'react';

const SubMenuTable = ({ subMenu }) => {
  const areas = ['area1', 'area2', 'area3', 'area4'];
  const enlaces = ['enlace1', 'enlace2', 'enlace3', 'enlace4'];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Área
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Proyecto (Enlace)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {areas.map((area_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subMenu[area_]?.area}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subMenu[enlaces[index]]?.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubMenuTable;
