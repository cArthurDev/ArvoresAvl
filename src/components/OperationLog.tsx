import React from 'react';
import type { Operation } from '../types/avl';
import { Clock } from 'lucide-react';

interface OperationLogProps {
  operations: Operation[];
  darkMode: boolean;
}

export const OperationLog: React.FC<OperationLogProps> = ({ operations, darkMode }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 max-h-[300px] overflow-y-auto ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        darkMode ? 'text-white' : 'text-black'
      }`}>Operation Log</h3>
      <div className="space-y-2">
        {operations.map((op, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm border-b pb-2 ${
              darkMode 
                ? 'text-gray-300 border-gray-700' 
                : 'text-gray-600 border-gray-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {op.type === 'insertion' && `Inserted ${op.value}`}
              {op.type === 'deletion' && `Deleted ${op.value}`}
              {op.type === 'rotation' && `Performed ${op.rotationType} rotation`}
            </span>
            <span className={`text-xs ml-auto ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {new Date(op.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}