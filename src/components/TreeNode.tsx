import React from 'react';
import type { AVLNode } from '../types/avl';

interface TreeNodeProps {
  node: AVLNode;
  x: number;
  y: number;
  onHover: (info: { value: number; height: number; balance: number }) => void;
  darkMode: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  x, 
  y, 
  onHover,
  darkMode 
}) => {
  const balance = (node.left?.height || 0) - (node.right?.height || 0);
  const isUnbalanced = Math.abs(balance) > 1;

  return (
    <g 
      transform={`translate(${x},${y})`}
      className="transition-transform duration-500 ease-in-out"
    >
      <circle
        r="25"
        className={`stroke-2 cursor-pointer transition-all duration-300 ${
          darkMode 
            ? `${isUnbalanced ? 'stroke-red-400' : 'stroke-blue-400'} fill-gray-800` 
            : `${isUnbalanced ? 'stroke-red-500' : 'stroke-blue-500'} fill-white`
        }`}
        onMouseEnter={() => onHover({ value: node.value, height: node.height, balance })}
      />
      <text
        className={`text-sm font-medium ${darkMode ? 'fill-white' : 'fill-black'}`}
        textAnchor="middle"
        dy="-0.2em"
      >
        {node.value}
      </text>
      <text
        className={`text-xs ${
          darkMode 
            ? (isUnbalanced ? 'fill-red-400' : 'fill-blue-400')
            : (isUnbalanced ? 'fill-red-500' : 'fill-blue-500')
        }`}
        textAnchor="middle"
        dy="1em"
      >
        BF: {balance}
      </text>
    </g>
  );
}