import React from 'react';
import { Info } from 'lucide-react';

interface NodeInfoProps {
  info: {
    value: number;
    height: number;
    balance: number;
  } | null;
  darkMode: boolean;
}

export const NodeInfo: React.FC<NodeInfoProps> = ({ info, darkMode }) => {
  if (!info) return null;

  return (
    <div className={`rounded-lg shadow-md p-4 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Info className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
          Node Information
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Value</p>
          <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
            {info.value}
          </p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Height</p>
          <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
            {info.height}
          </p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Balance</p>
          <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
            {info.balance}
          </p>
        </div>
      </div>
    </div>
  );
}