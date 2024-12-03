import React, { useEffect, useRef } from 'react';
import type { AVLNode } from '../types/avl';
import { TreeNode } from './TreeNode';

interface TreeVisualizationProps {
  root: AVLNode | null;
  onNodeHover: (info: { value: number; height: number; balance: number }) => void;
  darkMode: boolean;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({ 
  root, 
  onNodeHover,
  darkMode 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 1000, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height: 800 });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const renderTree = (node: AVLNode | null, x: number, y: number, level: number) => {
    if (!node) return null;

    const verticalSpacing = 100;
    const horizontalSpacing = Math.min(dimensions.width / Math.pow(2, level + 1), 250);
    
    const elements: JSX.Element[] = [];

    if (node.left) {
      elements.push(
        <line stroke-width="1"
          key={`${node.value}-${node.left.value}-line`}
          x1={x}
          y1={y}
          x2={x - horizontalSpacing}
          y2={y + verticalSpacing}
          className={`stroke-2 ${darkMode ? 'stroke-gray-600' : 'stroke-gray-300'}`}
        />
      );
      elements.push(...renderTree(node.left, x - horizontalSpacing, y + verticalSpacing, level + 1));
    }

    if (node.right) {
      elements.push(
        <line stroke-width="1"
          key={`${node.value}-${node.right.value}-line`}
          x1={x}
          y1={y}
          x2={x + horizontalSpacing}
          y2={y + verticalSpacing}
          className={`stroke-2 ${darkMode ? 'stroke-gray-600' : 'stroke-gray-300'}`}
        />
      );
      elements.push(...renderTree(node.right, x + horizontalSpacing, y + verticalSpacing, level + 1));
    }

    elements.push(
      <TreeNode
        key={`node-${node.value}`}
        node={node}
        x={x}
        y={y}
        onHover={onNodeHover}
        darkMode={darkMode}
      />
    );

    return elements;
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={dimensions.height}
      className={`rounded-lg transition-colors duration-200 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`translate(0,40)`}>
        {root && renderTree(root, dimensions.width / 2, 40, 0)}
      </g>
    </svg>
  );
}