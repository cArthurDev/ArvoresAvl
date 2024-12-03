import React, { useState } from 'react';
import { Plus, Trash, RotateCcw, Minus } from 'lucide-react';

interface ControlsProps {
  onInsert: (value: number) => void;
  onRemove: (value: number) => void;
  onClear: () => void;
  onRotate: () => void;
  canRotate: boolean;
  darkMode: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  onInsert,
  onRemove,
  onClear, 
  onRotate, 
  canRotate,
  darkMode 
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value);
    if (!isNaN(num)) {
      onInsert(num);
      setValue('');
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    const num = parseInt(value);
    if (!isNaN(num)) {
      onRemove(num);
      setValue('');
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-4 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-black placeholder-gray-500'
          }`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Insert
        </button>
        <button
          type="button"
          onClick={handleRemove}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2"
        >
          <Minus className="w-4 h-4" />
          Remove
        </button>
        <button
          type="button"
          onClick={onRotate}
          disabled={!canRotate}
          className={`px-4 py-2 text-white rounded-md flex items-center gap-2 ${
            canRotate 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Rotate
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <Trash className="w-4 h-4" />
          Clear
        </button>
      </form>
    </div>
  );
}