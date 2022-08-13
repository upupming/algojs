/**
 * 默认是小根堆，修改排序函数可以改成大根堆
 */
class Heap<T = number> {
  _data: T[] = [null as unknown as T]
  compareFn: (a: T, b: T) => number
  constructor(compareFn: (a: T, b: T) => number = (a: T, b: T) => a < b ? -1 : (a > b ? 1 : 0)) {
    this.compareFn = compareFn
  }
  _swap(i: number, j: number) {
    [this._data[i], this._data[j]] = [this._data[j], this._data[i]]
  }
  _up(p: number) {
    while (p > 1) {
      // 如果 p 应该在父亲节点前面，就交换位置
      if (this.compareFn(this._data[p], this._data[p >> 1]) < 0) {
        this._swap(p, p >> 1)
        p >>= 1
      } else break
    }
  }
  _down(p: number) {
    let s = p << 1
    while (s < this._data.length) {
      if (s + 1 < this._data.length && this.compareFn(this._data[s + 1], this._data[s]) < 0) s++
      if (this.compareFn(this._data[s], this._data[p]) < 0) {
        this._swap(s, p)
        p = s, s = p << 1
      } else break
    }
  }
  push(val: T) {
    this._data.push(val)
    this._up(this._data.length - 1);
  }
  top() {
    return this._data[1]
  }
  pop() {
    let val = this._data[1]
    this._data[1] = this._data[this._data.length - 1]
    this._data.pop()
    this._down(1)
    return val
  }
  /** 删除第 k 个元素 */
  remove(k: number) {
    this._data[k] = this._data[this._data.length - 1]
    this._data.pop()
    this._up(k)
    this._down(k)
  }
  get size() {
    return this._data.length - 1
  }
}

export { Heap }
