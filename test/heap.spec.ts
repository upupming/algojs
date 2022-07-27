import { describe, expect, it } from 'vitest'
import { Heap } from '../src/heap'

describe('Heap', () => {
  it('push increasingly', () => {
    const heap = new Heap()
    for (let i = 0; i <= 5; i++) heap.push(i)
    let ans = ''
    for (let i = 0; i <= 5; i++) {
      ans += String(heap.top())
      ans += String(heap.pop())
    }
    expect(ans).toEqual('001122334455')
  })
  it('push decreasingly', () => {
    const heap = new Heap()
    for (let i = 5; i >= 0; i--) heap.push(i)
    let ans = ''
    for (let i = 0; i <= 5; i++) {
      ans += String(heap.top())
      ans += String(heap.pop())
    }
    expect(ans).toEqual('001122334455')
  })
  it('init with increasing numbers', () => {
    const heap = new Heap();
    [0, 1, 2, 3, 4, 5].forEach(heap.push.bind(heap))
    let ans = ''
    for (let i = 0; i <= 5; i++) {
      ans += String(heap.top())
      ans += String(heap.pop())
    }
    expect(ans).toEqual('001122334455')
  })
  it('init with decreasing numbers', () => {
    const heap = new Heap<number>();
    [5, 4, 3, 2, 1, 0].forEach(heap.push.bind(heap))
    let ans = ''
    for (let i = 0; i <= 5; i++) {
      ans += String(heap.top())
      ans += String(heap.pop())
    }
    expect(ans).toEqual('001122334455')
  })
  it('should support custom less', () => {
    const heap = new Heap<number>((l, r) => r - l)
    for (let i = 0; i <= 5; i++) heap.push(i)
    let ans = ''
    for (let i = 0; i <= 5; i++) {
      ans += String(heap.top())
      ans += String(heap.pop())
    }
    expect(ans).toEqual('554433221100')
  })
})
