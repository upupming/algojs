/*
通过链表实现一个队列
虚拟头结点 head 不存储任何信息
*/
class ListNode<T> {
  val: T | null
  next: ListNode<T> | null
  constructor(val: T | null = null, next: ListNode<T> | null = null) {
    this.val = val
    this.next = next
  }
}
class Queue<T = number> {
  _size = 0
  head: ListNode<T>
  tail: ListNode<T>

  constructor() {
    this.head = this.tail = new ListNode()
  }

  get size() {
    return this._size
  }

  push(value: T) {
    this.tail.next = new ListNode(value)
    this.tail = this.tail.next
    this._size++
  }

  back() {
    return this.tail.val
  }

  shift() {
    if (!this._size) return null
    const first = this.head.next!
    this.head.next = first.next
    this._size--
    if (this._size === 0) this.tail = this.head
    return first.val
  }

  front() {
    if (!this._size) return null
    const first = this.head.next!
    return first.val
  }

  * values(): Generator<T, void, void> {
    let node = this.head.next
    while (node) {
      yield node.val!
      node = node.next
    }
  }
}

export { Queue }
