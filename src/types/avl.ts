export interface AVLNode {
  value: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
}

export interface Operation {
  type: 'insertion' | 'deletion' | 'rotation';
  value?: number;
  rotationType?: 'left' | 'right' | 'leftRight' | 'rightLeft';
  timestamp: number;
}