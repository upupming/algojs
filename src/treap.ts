/*
Treap = Tree + Heap
通过在每个节点上维护一个随机的权值，保证权值的大根堆性质，使得树具有随机性，能够维持比较平衡的左右子树高度
*/
class TreapNode<T> {
  value: T
  left: TreapNode<T> | null
  right: TreapNode<T> | null
  /** 随机权值，用来保证大根堆性质 */
  weight: number
  /** 本节点元素个数 */
  cnt: number
  /** 子树（包含自身）总元素个数 */
  size: number

  constructor(value: T, left: TreapNode<T> | null = null, right: TreapNode<T> | null = null) {
    this.value = value
    this.left = left
    this.right = right
    this.weight = Math.random()
    this.cnt = 1
    this.size = 1
    this.update()
  }
  update() {
    this.size = (this.left?.size ?? 0) + (this.right?.size ?? 0) + this.cnt
  }
  rotateRight() {
    const left = this.left!
    this.left = left.right; left.right = this
    this.update(); left.update()
    return left
  }
  rotateRightIfNeeded() {
    if (this.left) {
      if (this.weight < this.left.weight) {
        return this.rotateRight()
      }
    }
    return this
  }
  rotateLeft() {
    const right = this.right!
    this.right = right.left; right.left = this
    this.update(); right.update()
    return right
  }
  rotateLeftIfNeeded() {
    if (this.right) {
      if (this.weight < this.right.weight) {
        return this.rotateLeft()
      }
    }
    return this
  }
}
class Treap<T = number> {
  T_MAX: T
  T_MIN: T
  compareFn: (a: T, b: T) => number
  root: TreapNode<T>
  constructor(compareFn: (a: T, b: T) => number = (a: T, b: T) => a < b ? -1 : (a > b ? 1 : 0), T_MIN: T = '__T_MIN__' as unknown as T, T_MAX: T = '__T_MAX__' as unknown as T) {
    this.T_MIN = T_MIN
    this.T_MAX = T_MAX

    this.compareFn = (a: T, b: T) => {
      if (a === this.T_MAX || b === this.T_MIN) return 1
      if (a === this.T_MIN || b === this.T_MAX) return -1
      return compareFn(a, b)
    }
    // 两个哨兵节点，分别是正无穷大和负无穷大
    // 让 MAX 的 weight 为最大，这样永远也不会被旋走
    const minNode = new TreapNode<T>(this.T_MIN)
    const maxNode = new TreapNode<T>(this.T_MAX, minNode)
    minNode.weight = -1; maxNode.weight = 2

    this.root = maxNode
  }

  print(p: TreapNode<T> | undefined | null = undefined) {
    if (p === null) return
    p ??= this.root
    console.log(`${p.left?.value} <-- ${p.value} --> ${p.right?.value}`)
    this.print(p.left)
    this.print(p.right)
  }
  /**
   *
   * @param value
   * @param p null 表示递归结束，undefined 用于外部调用 API 的时候甩传入
   * @param parent JS 不存在 C++ 中的引用，旋转的时候要修改父节点的指向，因此必须在递归的时候记录父节点和方向信息
   * @param direction
   * @returns
   */
  insert(value: T, p: TreapNode<T> | undefined = undefined, parent: TreapNode<T> | undefined = undefined, direction: 'left' | 'right' | undefined = undefined) {
    p ??= this.root
    const compareResult = this.compareFn(value, p.value)
    // 如果之前已经有相同关键码的节点，只需要 cnt++ 即可
    if (compareResult === 0) {
      p.cnt++
    }
    // 在左子树中插入
    else if (compareResult < 0) {
      if (!p.left) {
        p.left = new TreapNode(value)
      } else {
        this.insert(value, p.left, p, 'left')
        const r = p.rotateRightIfNeeded()
        if (direction && parent?.[direction]) {
          parent[direction] = r
        }
      }
    }
    // 在右子树中插入
    else {
      if (!p.right) {
        p.right = new TreapNode(value)
      } else {
        this.insert(value, p.right, p, 'right')
        const r = p.rotateLeftIfNeeded()
        if (direction && parent?.[direction]) {
          parent[direction] = r
        }
      }
    }
    p.update()
  }
  remove(value: T, p: TreapNode<T> | null | undefined = undefined, parent: TreapNode<T> | undefined = undefined, direction: 'left' | 'right' | undefined = undefined) {
    if (p === null) return false
    p ??= this.root
    const compareResult = this.compareFn(value, p.value)
    if (compareResult === 0) {
      if (p.cnt > 1) {
        p.cnt--; p.update()
        return true
      }
      let rotateDirection: 'left' | 'right' | null = null
      // 不是叶子节点，向下旋转
      if (p.left && p.right) {
        if (this.compareFn(p.left.value, p.right.value) < 0) {
          // rotate left
          rotateDirection = 'left'
        } else {
          // rotate right
          rotateDirection = 'right'
        }
      } else if (p.left) {
        // rotate right
        rotateDirection = 'right'
      } else if (p.right) {
        // rotate left
        rotateDirection = 'left'
      } else {
        // 叶子节点直接删除
        rotateDirection = null
      }
      let r
      if (rotateDirection === 'left') {
        r = p.rotateLeft()
      } else if (rotateDirection === 'right') {
        r = p.rotateRight()
      } else {
        r = null
      }
      if (direction && parent?.[direction]) {
        parent[direction] = r
      }
      return
    }
    compareResult < 0 ? this.remove(value, p.left, p, 'left') : this.remove(value, p.right, p, 'right')
    p.update()
  }

  getPrev(value: T) {
    let ans = this.T_MIN
    let p: TreapNode<T> | null = this.root
    while (p) {
      const compareResult = this.compareFn(value, p.value)
      if (compareResult === 0) {
        if (p.left) {
          p = p.left
          // 左子树一直往右走
          while (p.right) p = p.right
          ans = p.value
        }
        break
      }
      // value > p.value && p.value > ans
      if (compareResult > 0 && this.compareFn(p.value, ans) > 0) {
        ans = p.value
      }
      p = compareResult < 0 ? p.left : p.right
    }
    return ans
  }
  getNext(value: T) {
    let ans = this.T_MAX
    let p: TreapNode<T> | null = this.root
    while (p) {
      const compareResult = this.compareFn(value, p.value)
      if (compareResult === 0) {
        if (p.right) {
          p = p.right
          // 右子树一直往左走
          while (p.left) p = p.left
          ans = p.value
        }
        break
      }
      // value < p.value && p.value < ans
      if (compareResult < 0 && this.compareFn(p.value, ans) < 0) {
        ans = p.value
      }
      p = compareResult < 0 ? p.left : p.right
    }
    return ans
  }

  getRankByValue(value: T, p: TreapNode<T> | undefined | null = undefined): number {
    if (p === null) return 0
    p ??= this.root
    const compareResult = this.compareFn(value, p.value)
    let ans
    if (compareResult === 0) {
      ans = (p?.left?.size ?? 0) + 1
    } else if (compareResult < 0) {
      ans = this.getRankByValue(value, p.left)
    } else {
      ans = (p.left?.size ?? 0) + p.cnt + this.getRankByValue(value, p.right)
    }
    // 因为有负无穷大的存在，所以要减一
    if (p === this.root) ans--
    return ans
  }
  getValueByRank(rank: number, p: TreapNode<T> | undefined | null = undefined): T {
    if (p === null) return this.T_MAX
    if (p === undefined) {
      p = this.root
      // 因为有负无穷大的存在，所以要加一
      rank++
    }
    if ((p.left?.size ?? 0) >= rank) {
      return this.getValueByRank(rank, p.left)
    }
    if ((p.left?.size ?? 0) + p.cnt >= rank) {
      return p.value
    }
    return this.getValueByRank(rank - ((p.left?.size ?? 0) + p.cnt), p.right)
  }

  get size() {
    return this.root.size - 2
  }
}

export { Treap }
