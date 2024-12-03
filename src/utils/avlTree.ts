import type { AVLNode } from '../types/avl';

export class AVLTreeUtil {
  private getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: AVLNode | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private updateHeight(node: AVLNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  private cloneNode(node: AVLNode | null): AVLNode | null {
    if (!node) return null;
    return {
      value: node.value,
      height: node.height,
      left: this.cloneNode(node.left),
      right: this.cloneNode(node.right)
    };
  }

  private rotateRight(y: AVLNode): AVLNode {
    const x = this.cloneNode(y.left)!;
    const T2 = x.right;

    x.right = this.cloneNode(y);
    x.right.left = T2;

    this.updateHeight(x.right);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode): AVLNode {
    const y = this.cloneNode(x.right)!;
    const T2 = y.left;

    y.left = this.cloneNode(x);
    y.left.right = T2;

    this.updateHeight(y.left);
    this.updateHeight(y);

    return y;
  }

  private findMin(node: AVLNode): AVLNode {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  needsRotation(root: AVLNode | null): { needs: boolean; type?: 'left' | 'right' | 'leftRight' | 'rightLeft' } {
    if (!root) return { needs: false };

    const balance = this.getBalance(root);
    const leftBalance = this.getBalance(root.left);
    const rightBalance = this.getBalance(root.right);

    if (balance > 1) {
      return {
        needs: true,
        type: leftBalance >= 0 ? 'right' : 'leftRight'
      };
    }

    if (balance < -1) {
      return {
        needs: true,
        type: rightBalance <= 0 ? 'left' : 'rightLeft'
      };
    }

    return { needs: false };
  }

  rotate(root: AVLNode): AVLNode {
    const newRoot = this.cloneNode(root)!;
    const balance = this.getBalance(newRoot);
    const leftBalance = this.getBalance(newRoot.left);
    const rightBalance = this.getBalance(newRoot.right);

    // Left Left Case
    if (balance > 1 && leftBalance >= 0) {
      
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
    }

    // Right Right Case
    if (balance < -1 && rightBalance <= 0) {
      
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
    }

    // Left Right Case
    if (balance > 1 && leftBalance < 0) {
      newRoot.left = this.rotateLeft(newRoot.left!);
      
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
    }

    // Right Left Case
    if (balance < -1 && rightBalance > 0) {
      newRoot.right = this.rotateRight(newRoot.right!);
      
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
    }

    return newRoot;
  }

  insert(root: AVLNode | null, value: number, autoRotate: boolean = true): AVLNode {
    if (!root) {
      return { value, height: 1, left: null, right: null };
    }

    const newRoot = this.cloneNode(root)!;

    if (value < newRoot.value) {
      newRoot.left = this.insert(newRoot.left, value, autoRotate);
    } else if (value > newRoot.value) {
      newRoot.right = this.insert(newRoot.right, value, autoRotate);
    } else {
      return newRoot;
    }

    this.updateHeight(newRoot);

    if (autoRotate) {
      const balance = this.getBalance(newRoot);

      // Left Left Case
      if (balance > 1 && value < newRoot.left!.value) {
        
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
      }

      // Right Right Case
      if (balance < -1 && value > newRoot.right!.value) {
        
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
      }

      // Left Right Case
      if (balance > 1 && value > newRoot.left!.value) {
        newRoot.left = this.rotateLeft(newRoot.left!);
        
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
      }

      // Right Left Case
      if (balance < -1 && value < newRoot.right!.value) {
        newRoot.right = this.rotateRight(newRoot.right!);
        
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
      }
    }

    return newRoot;
  }

  remove(root: AVLNode | null, value: number, autoRotate: boolean = true): AVLNode | null {
    if (!root) {
      return null;
    }

    const newRoot = this.cloneNode(root)!;

    if (value < newRoot.value) {
      newRoot.left = this.remove(newRoot.left, value, autoRotate);
    } else if (value > newRoot.value) {
      newRoot.right = this.remove(newRoot.right, value, autoRotate);
    } else {
      // Node with only one child or no child
      if (!newRoot.left) {
        return newRoot.right;
      } else if (!newRoot.right) {
        return newRoot.left;
      }

      // Node with two children
      const minNode = this.findMin(newRoot.right);
      newRoot.value = minNode.value;
      newRoot.right = this.remove(newRoot.right, minNode.value, autoRotate);
    }

    if (!newRoot) {
      return null;
    }

    this.updateHeight(newRoot);

    if (autoRotate) {
      const balance = this.getBalance(newRoot);
      const leftBalance = this.getBalance(newRoot.left);
      const rightBalance = this.getBalance(newRoot.right);

      // Left Left Case
      if (balance > 1 && leftBalance >= 0) {
        
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
      }

      // Right Right Case
      if (balance < -1 && rightBalance <= 0) {
        
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
      }

      // Left Right Case
      if (balance > 1 && leftBalance < 0) {
        newRoot.left = this.rotateLeft(newRoot.left!);
        
    while (newRoot.balanceFactor() > 1) {
        newRoot = this.rotateRight(newRoot);
    }
    return newRoot;
    
      }

      // Right Left Case
      if (balance < -1 && rightBalance > 0) {
        newRoot.right = this.rotateRight(newRoot.right!);
        
    while (newRoot.balanceFactor() < -1) {
        newRoot = this.rotateLeft(newRoot);
    }
    return newRoot;
    
      }
    }

    return newRoot;
  }
}