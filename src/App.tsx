import React, { useState } from 'react';
import { TreeVisualization } from './components/TreeVisualization';
import { Controls } from './components/Controls';
import { OperationLog } from './components/OperationLog';
import { NodeInfo } from './components/NodeInfo';
import type { AVLNode, Operation } from './types/avl';
import { AVLTreeUtil } from './utils/avlTree';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [selectedNode, setSelectedNode] = useState<{
    value: number;
    height: number;
    balance: number;
  } | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const avlTree = new AVLTreeUtil();
  const rotationNeeded = root ? avlTree.needsRotation(root) : { needs: false };

  const handleInsert = (value: number) => {
    setRoot((currentRoot) => {
      const newRoot = avlTree.insert(currentRoot, value, false);
      setOperations((prev) => [
        ...prev,
        { type: 'insertion', value, timestamp: Date.now() },
      ]);
      return newRoot;
    });
  };

  const handleRemove = (value: number) => {
    setRoot((currentRoot) => {
      const newRoot = avlTree.remove(currentRoot, value, false);
      setOperations((prev) => [
        ...prev,
        { type: 'deletion', value, timestamp: Date.now() },
      ]);
      return newRoot;
    });
  };

  const handleRotate = () => {
    if (root && rotationNeeded.needs && rotationNeeded.type) {
      setRoot((currentRoot) => {
        const newRoot = avlTree.rotate(currentRoot!);
        setOperations((prev) => [
          ...prev,
          { 
            type: 'rotation', 
            rotationType: rotationNeeded.type, 
            timestamp: Date.now() 
          },
        ]);
        return newRoot;
      });
    }
  };

  const handleClear = () => {
    setRoot(null);
    setOperations([]);
    setSelectedNode(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>AVL Tree Visualizer</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } shadow-md`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="space-y-6">
          <Controls 
            onInsert={handleInsert}
            onRemove={handleRemove}
            onClear={handleClear} 
            onRotate={handleRotate}
            canRotate={rotationNeeded.needs}
            darkMode={darkMode}
          />
          
          <div className={`rounded-lg shadow-md p-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="h-[800px]">
              <TreeVisualization 
                root={root} 
                onNodeHover={setSelectedNode}
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NodeInfo info={selectedNode} darkMode={darkMode} />
            <OperationLog operations={operations} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;