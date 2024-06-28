import React from 'react';
import { CiLink } from "react-icons/ci";

const SubMenuTable = ({ subMenu }) => {
  const areas = ['area1', 'area2', 'area3', 'area4'];
  const enlaces = ['enlace1', 'enlace2', 'enlace3', 'enlace4'];

  return (
    <div className='ml-5 mr-5 -mt-8'>
      <div className="py-4">
    <h2 className="text-xl font-semibold text-gray-700">Actualmenete </h2>
  </div>
  <div className="bg-opacity-25 bg-gray-900 shadow-md rounded-lg overflow-hidden p-3">
  <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-2xl  font-semibold text-secondary r">
          Área
        </th>
        <th scope="col" className="px-6 py-3 text-left text-2xl font-semibold text-secondary r">
          Proyecto 
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {areas.map((area_, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-900">{subMenu[area_]?.area}</td>
          <td className="flex px-6 py-4 whitespace-nowrap text-xl text-gray-600">
          <CiLink className="inline-block mr-2 text-xl text-secondary" />
            {subMenu[enlaces[index]]?.titulo} 
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>
    </div>
  

  );
};

export default SubMenuTable;
